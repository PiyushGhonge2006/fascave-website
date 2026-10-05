import { AlertCircle, ChevronDown } from "lucide-react";

/** Ids are namespaced so they never clash with other forms on the site. */
const FIELD_ID_PREFIX = "ct-field";

const isFilledValue = (value) =>
  typeof value === "string" && value.trim().length > 0;

/**
 * One form control, rendered from its field definition.
 *
 * Handles the three shapes the enquiry needs (text-like input, select,
 * textarea) and owns the accessible plumbing: label association,
 * `aria-invalid`, hint/error descriptions and the floating-label state.
 */
function ContactFormField({ field, value, error, onChange }) {
  const controlId = `${FIELD_ID_PREFIX}-${field.name}`;
  const hintId = `${controlId}-hint`;
  const errorId = `${controlId}-error`;

  const describedBy =
    [field.hint ? hintId : null, error ? errorId : null]
      .filter(Boolean)
      .join(" ") || undefined;

  const controlProps = {
    id: controlId,
    name: field.name,
    value,
    onChange: (event) => onChange(field.name, event.target.value),
    "aria-invalid": error ? "true" : undefined,
    "aria-describedby": describedBy,
    required: field.required || undefined,
  };

  const isSelect = field.type === "select";
  const isTextArea = field.type === "textarea";

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

      {isTextArea && (
        <textarea
          {...controlProps}
          rows={field.rows}
          maxLength={field.maxLength}
          className="contact-enquiry__input contact-enquiry__textarea"
        />
      )}

      {!isSelect && !isTextArea && (
        <input
          {...controlProps}
          className="contact-enquiry__input"
          type={field.type}
          autoComplete={field.autoComplete}
          inputMode={field.inputMode}
          maxLength={field.maxLength}
        />
      )}

      {field.hint && (
        <p className="contact-enquiry__hint" id={hintId}>
          {field.hint}
        </p>
      )}

      {error && (
        <p className="contact-enquiry__error" id={errorId}>
          <AlertCircle size={14} strokeWidth={2.1} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

export default ContactFormField;
