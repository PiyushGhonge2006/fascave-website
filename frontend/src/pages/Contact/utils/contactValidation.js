/* =========================================================
   CONTACT FORM VALIDATION
   ------------------------------------------------------------
   Pure functions only — no React, no DOM. The form renders
   whatever messages come back from here, so wording and rules
   stay in one place and are trivial to unit test later.
   ========================================================= */

/** Practical lower bound: long enough to be useful, short enough to write. */
export const MIN_MESSAGE_LENGTH = 20;

/**
 * Deliberately simple and forgiving. The only real test is whether the
 * address is deliverable, which only a mail server can confirm.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Allows digits, spaces and the usual separators used in phone numbers. */
const PHONE_PATTERN = /^[+]?[\d\s().-]{7,20}$/;

const EMPTY = "";

const normalize = (value) => (typeof value === "string" ? value.trim() : EMPTY);

/* ------------------------------------------------------------
   INDIVIDUAL FIELD RULES
   ------------------------------------------------------------ */

export function isValidEmail(value) {
  return EMAIL_PATTERN.test(normalize(value));
}

export function isValidPhone(value) {
  return PHONE_PATTERN.test(normalize(value));
}

export function validateEmail(value) {
  const email = normalize(value);

  if (!email) return "Please enter your email address.";
  if (!isValidEmail(email)) {
    return "That email doesn't look right. Example: you@company.com";
  }

  return EMPTY;
}

export function validatePhone(value) {
  const phone = normalize(value);

  /* Optional field — an empty value is a valid value. */
  if (!phone) return EMPTY;

  if (!isValidPhone(phone)) {
    return "Please enter a valid phone number, or leave it blank.";
  }

  return EMPTY;
}

/**
 * Rules keyed by field name so the step definitions in `contactData`
 * stay purely descriptive and validation lives in one table.
 */
const FIELD_RULES = {
  name(value) {
    if (!normalize(value)) return "Please tell us your name.";

    if (normalize(value).length < 2) {
      return "Your name looks a little short.";
    }

    return EMPTY;
  },
  email: validateEmail,
  phone: validatePhone,
  company() {
    /* Always optional. */
    return EMPTY;
  },
  projectType(value) {
    if (!normalize(value)) return "Please choose a project type.";

    return EMPTY;
  },
  budget(value) {
    if (!normalize(value)) return "Please choose a budget range.";

    return EMPTY;
  },
  message(value) {
    const message = normalize(value);

    if (!message) return "Please tell us a little about the project.";

    if (message.length < MIN_MESSAGE_LENGTH) {
      return `Please add a little more detail — at least ${MIN_MESSAGE_LENGTH} characters.`;
    }

    return EMPTY;
  },
};

/** Validates one field. Unknown fields are always considered valid. */
export function validateField(name, value) {
  const rule = FIELD_RULES[name];

  return rule ? rule(value) : EMPTY;
}

/* ------------------------------------------------------------
   STEP / FORM LEVEL
   ------------------------------------------------------------ */

/** Validates every field of a single step. Returns a `field -> message` map. */
export function validateStep(step, values) {
  if (!step?.fields) return {};

  return step.fields.reduce((errors, field) => {
    const message = validateField(field.name, values[field.name]);

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
