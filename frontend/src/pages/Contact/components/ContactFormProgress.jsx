import { AlertCircle, Check } from "lucide-react";

/**
 * Wizard progress: a thin fill bar plus one step marker per step.
 *
 * Markers for already-completed steps act as "go back" buttons; later
 * steps stay disabled so the wizard can't be skipped past validation.
 * A completed step that currently holds an error is flagged visually.
 */
function ContactFormProgress({
  steps,
  currentStep,
  errors = {},
  onStepSelect,
}) {
  const fillPercent = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="contact-enquiry__progress">
      <div
        className="contact-enquiry__progress-bar"
        role="presentation"
      >
        <span
          className="contact-enquiry__progress-fill"
          style={{ width: `${fillPercent}%` }}
        />
      </div>

      <ol className="contact-enquiry__steps">
        {steps.map((step, index) => {
          const state =
            index < currentStep
              ? "done"
              : index === currentStep
                ? "current"
                : "todo";

          const invalid = Boolean(
            step.fields?.some((field) => errors[field.name]),
          );

          const stateLabel =
            state === "done"
              ? "completed"
              : state === "current"
                ? "current"
                : "not started";

          return (
            <li
              key={step.id}
              className="contact-enquiry__step-item"
              data-state={state}
              data-invalid={invalid || undefined}
            >
              <button
                type="button"
                className="contact-enquiry__step-button"
                onClick={() => onStepSelect(index)}
                disabled={index > currentStep}
                aria-current={index === currentStep ? "step" : undefined}
                aria-label={`Step ${index + 1}: ${step.shortTitle} — ${stateLabel}${
                  invalid ? ", needs attention" : ""
                }`}
              >
                <span
                  className="contact-enquiry__step-badge"
                  aria-hidden="true"
                >
                  {invalid ? (
                    <AlertCircle size={13} strokeWidth={2.6} />
                  ) : state === "done" ? (
                    <Check size={13} strokeWidth={3} />
                  ) : (
                    index + 1
                  )}
                </span>

                <span className="contact-enquiry__step-label">
                  {step.shortTitle}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <p className="contact-enquiry__progress-meta">
        Step {currentStep + 1} of {steps.length}
      </p>
    </div>
  );
}

export default ContactFormProgress;
