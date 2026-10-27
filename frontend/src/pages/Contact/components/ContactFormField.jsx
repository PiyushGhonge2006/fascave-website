import { AlertCircle, ChevronDown } from "lucide-react";

import {
  DEFAULT_COUNTRY_CODE,
  countryCallingCodes,
  formLimits,
  getCountryCallingCode,
} from "../data/contactData";

import { sanitizePhoneDigits } from "../utils/contactValidation";

const FIELD_ID_PREFIX = "ct-field";

const isFilledValue = (value) =>
  typeof value === "string" && value.trim().length > 0;

/**
 * One form control, rendered from its field definition.
 *
 * Handles the three shapes the enquiry needs (text-like input, select,
 * textarea) plus the combined calling-code + phone control. Owns the
 * accessible plumbing: label association, `aria-invalid`, hint/error
 * descriptions and the floating-label state.
 */
function ContactFormField({
  field,
  value,
  error,
  onChange,
  values,
}) {
  const controlId = `${FIELD_ID_PREFIX}-${field.name}`;
  const hintId = `${controlId}-hint`;
  const errorId = `${controlId}-error`;
  const countryId = `${controlId}-country`;

  const describedBy =
    [field.hint ? hintId : null, error ? errorId : null]
      .filter(Boolean)
      .join(" ") || undefined;

  const controlProps = {
    id: controlId,
    name: field.name,
    value: value ?? "",
    onChange: (event) =>
      onChange(field.name, event.target.value),
    "aria-invalid": error ? "true" : undefined,
    "aria-describedby": describedBy,
  };

  const isSelect = field.type === "select";
  const isTextArea = field.type === "textarea";
  const isPhone = field.name === "phone";

  const selectedCountry = isPhone
    ? getCountryCallingCode(values?.countryCode)
    : null;

  const phoneMaxLength =
    selectedCountry?.maxDigits ?? formLimits.phone;

  const phonePlaceholder = selectedCountry
    ? selectedCountry.example
    : "Phone number";

  const handlePhoneChange = (event) => {
    let digits = sanitizePhoneDigits(event.target.value);

    /*
      Tolerate a pasted international number ("+91 98765 43210") by
      dropping a leading calling code instead of storing extra digits.
    */
    if (selectedCountry) {
      const dialCode = selectedCountry.code.replace("+", "");

      if (
        digits.length > phoneMaxLength &&
        digits.startsWith(dialCode)
      ) {
        digits = digits.slice(dialCode.length);
      }
    }

    onChange("phone", digits.slice(0, phoneMaxLength));
  };

  return (
    <div
      className="contact-enquiry__field"
      data-control={field.type}
      data-filled={isFilledValue(value) || undefined}
      data-invalid={error ? "true" : undefined}
    >
      <label className="contact-enquiry__label" htmlFor={controlId}>
        {field.label}

        {!field.required && (
          <span className="contact-enquiry__optional">Optional</span>
        )}
      </label>

      {isSelect && (
        <div className="contact-enquiry__control">
          <select
            {...controlProps}
            className="contact-enquiry__input contact-enquiry__select"
          >
            <option value="">Select an option</option>

            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <ChevronDown
            className="contact-enquiry__chevron"
            size={16}
            strokeWidth={2.2}
            aria-hidden="true"
          />
        </div>
      )}

      {isPhone && (
        <div
          className="contact-enquiry__phone-group"
          role="group"
          aria-label="Phone number with country calling code"
        >
          <div className="contact-enquiry__country">
            <select
              id={countryId}
              name="countryCode"
              className="contact-enquiry__country-select"
              aria-label="Country calling code"
              aria-invalid={error ? "true" : undefined}
              aria-describedby={describedBy}
              title={`${selectedCountry.name} (${selectedCountry.code})`}
              value={values?.countryCode || DEFAULT_COUNTRY_CODE}
              onChange={(event) =>
                onChange("countryCode", event.target.value)
              }
            >
              {countryCallingCodes.map((country) => (
                <option key={country.code} value={country.code}>
                  {`${country.name} (${country.code})`}
                </option>
              ))}
            </select>

            <ChevronDown
              className="contact-enquiry__country-chevron"
              size={14}
              strokeWidth={2.2}
              aria-hidden="true"
            />
          </div>

          <input
            {...controlProps}
            type="tel"
            className="contact-enquiry__phone-input"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder={phonePlaceholder}
            onChange={handlePhoneChange}
          />
        </div>
      )}

      {!isSelect && !isTextArea && !isPhone && (
        <input
          {...controlProps}
          className="contact-enquiry__input"
          type={field.type}
          autoComplete={field.autoComplete}
          inputMode={field.inputMode}
          maxLength={field.maxLength}
        />
      )}

      {isTextArea && (
        <textarea
          {...controlProps}
          rows={field.rows}
          maxLength={field.maxLength}
          className="contact-enquiry__input contact-enquiry__textarea"
        />
      )}

      {field.hint && (
        <p className="contact-enquiry__hint" id={hintId}>
          {field.hint}
        </p>
      )}

      {error && (
        <p className="contact-enquiry__error" id={errorId}>
          <AlertCircle
            size={14}
            strokeWidth={2.1}
            aria-hidden="true"
          />
          {error}
        </p>
      )}
    </div>
  );
}

export default ContactFormField;
