/* =========================================================
   CONTACT FORM VALIDATION
   ------------------------------------------------------------
   Pure functions only — no React, no DOM. The form renders
   whatever messages come back from here, so wording and rules
   stay in one place and are trivial to unit test later.
   ========================================================= */

import {
  DEFAULT_COUNTRY_CODE,
  budgetOptions,
  countryCallingCodes,
  formLimits,
  projectTypes,
} from "../data/contactData";

/** Practical lower bound: long enough to be useful, short enough to write. */
export const MIN_MESSAGE_LENGTH = 20;

/** Kept in sync with `formLimits` in `contactData`. */
export const MAX_MESSAGE_LENGTH = formLimits.message;

const MIN_NAME_LENGTH = 2;

/**
 * Deliberately simple and forgiving. A syntactically valid address is
 * not proof that it exists — only the receiving mail server can say.
 */
const EMAIL_PATTERN =
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$/;

/** Letters (including accents), marks, spaces, apostrophes, dots, hyphens. */
const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M}\s'’.-]*$/u;
const HAS_LETTER = /\p{L}/u;

/** National number input may contain digits and common visual separators. */
const PHONE_INPUT_PATTERN = /^[\d\s().-]+$/;

const EMPTY = "";

const normalize = (value) => (typeof value === "string" ? value.trim() : EMPTY);

const normalizeName = (value) => normalize(value).replace(/\s+/g, " ");

const digitsOnly = (value) => normalize(value).replace(/\D/g, "");

/* ------------------------------------------------------------
   INDIVIDUAL FIELD RULES
   ------------------------------------------------------------ */

export function isValidEmail(value) {
  const email = normalize(value);

  if (!email || email.length > formLimits.email) return false;
  if (email.includes("..")) return false;
  if (!EMAIL_PATTERN.test(email)) return false;

  const [local, domain] = email.split("@");

  if (local.startsWith(".") || local.endsWith(".")) return false;

  const tld = domain.split(".").pop();

  return /^[A-Za-z]{2,}$/.test(tld || "");
}

export function isValidPhone(value, countryCode = DEFAULT_COUNTRY_CODE) {
  return validatePhone(value, countryCode) === EMPTY;
}

export function validateName(value) {
  const name = normalizeName(value);

  if (!name) return "Please tell us your name.";
  if (name.length < MIN_NAME_LENGTH) {
    return `Your name must be at least ${MIN_NAME_LENGTH} characters.`;
  }
  if (name.length > formLimits.name) {
    return `Your name must be ${formLimits.name} characters or fewer.`;
  }
  if (!NAME_PATTERN.test(name) || !HAS_LETTER.test(name)) {
    return "Please use letters, spaces, apostrophes and hyphens only.";
  }

  return EMPTY;
}

export function validateEmail(value) {
  const email = normalize(value);

  if (!email) return "Please enter your email address.";
  if (email.length > formLimits.email) {
    return `Your email must be ${formLimits.email} characters or fewer.`;
  }
  if (!isValidEmail(email)) {
    return "That email doesn't look right. Example: you@company.com";
  }

  return EMPTY;
}

/**
 * Phone is optional. An empty value is valid, but a value that is
 * present must match the selected country's national-number rules.
 */
export function validatePhone(value, countryCode = DEFAULT_COUNTRY_CODE) {
  const phone = normalize(value);

  if (!phone) return EMPTY;

  const country = countryCallingCodes.find(
    (item) => item.code === countryCode,
  );

  if (!country) {
    return "Please choose a valid country calling code.";
  }

  if (!PHONE_INPUT_PATTERN.test(phone)) {
    return "Please enter the phone number using digits only.";
  }

  const digits = digitsOnly(phone);

  if (digits.length < country.minDigits || digits.length > country.maxDigits) {
    if (country.minDigits === country.maxDigits) {
      return `Numbers from ${country.name} must be exactly ${country.minDigits} digits.`;
    }

    return `Numbers from ${country.name} must be between ${country.minDigits} and ${country.maxDigits} digits.`;
  }

  if (country.pattern && !country.pattern.test(digits)) {
    return `That doesn't look like a valid phone number for ${country.name}.`;
  }

  return EMPTY;
}

export function validateCompany(value) {
  const company = normalize(value);

  /* Optional: blank (including whitespace-only) is allowed. */
  if (!company) return EMPTY;

  if (company.length > formLimits.company) {
    return `Company must be ${formLimits.company} characters or fewer.`;
  }

  const hasControlCharacter = Array.from(company).some((character) => {
    const codePoint = character.codePointAt(0);

    return codePoint < 32 || codePoint === 127;
  });

  if (hasControlCharacter) {
    return "Please remove unsupported characters from the company name.";
  }

  return EMPTY;
}

const isConfiguredOption = (options, value) =>
  options.includes(normalize(value));

/**
 * Rules keyed by field name so the step definitions in `contactData`
 * stay purely descriptive and validation lives in one table.
 */
const FIELD_RULES = {
  name: validateName,
  email: validateEmail,
  phone: validatePhone,
  company: validateCompany,
  projectType(value) {
    const projectType = normalize(value);

    if (!projectType) return "Please choose a project type.";

    if (!isConfiguredOption(projectTypes, projectType)) {
      return "Please choose a project type from the list.";
    }

    return EMPTY;
  },
  budget(value) {
    const budget = normalize(value);

    if (!budget) return "Please choose a budget range.";

    if (!isConfiguredOption(budgetOptions, budget)) {
      return "Please choose a budget range from the list.";
    }

    return EMPTY;
  },
  message(value) {
    const message = normalize(value);

    if (!message) return "Please tell us a little about the project.";

    if (message.length < MIN_MESSAGE_LENGTH) {
      return `Please add a little more detail — at least ${MIN_MESSAGE_LENGTH} characters.`;
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return `Please keep your message to ${MAX_MESSAGE_LENGTH} characters or fewer.`;
    }

    return EMPTY;
  },
};

/**
 * Validates one field.
 *
 * Unknown fields are rejected rather than silently treated as valid, so
 * a typo in a step definition cannot bypass validation. The honeypot is
 * deliberately not part of any step, so it never reaches this function.
 */
export function validateField(name, value, values = {}) {
  const rule = FIELD_RULES[name];

  if (!rule) return "This field could not be validated.";

  return rule(value, values.countryCode || DEFAULT_COUNTRY_CODE);
}

/* ------------------------------------------------------------
   STEP / FORM LEVEL
   ------------------------------------------------------------ */

/** Validates every field of a single step. Returns a `field -> message` map. */
export function validateStep(step, values) {
  if (!step?.fields) return {};

  return step.fields.reduce((errors, field) => {
    const message = validateField(
      field.name,
      values[field.name],
      values,
    );

    return message ? { ...errors, [field.name]: message } : errors;
  }, {});
}

/**
 * Validates the whole wizard so the final submit is never trusted blindly.
 *
 * @returns {{ errors: Object, firstInvalidStep: number }}
 *   `firstInvalidStep` is `-1` when every step is valid.
 */
export function validateForm(steps, values) {
  const errors = {};
  let firstInvalidStep = -1;

  steps.forEach((step, index) => {
    const stepErrors = validateStep(step, values);

    if (firstInvalidStep === -1 && Object.keys(stepErrors).length > 0) {
      firstInvalidStep = index;
    }

    Object.assign(errors, stepErrors);
  });

  return { errors, firstInvalidStep };
}

export {
  digitsOnly as sanitizePhoneDigits,
  digitsOnly,
};
