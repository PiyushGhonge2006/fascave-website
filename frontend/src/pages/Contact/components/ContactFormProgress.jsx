import { Check } from "lucide-react";

/**
 * Wizard progress: a thin fill bar plus one step marker per step.
 *
 * Markers for already-completed steps act as "go back" buttons; later
 * steps stay disabled so the wizard can't be skipped past validation.
 */
function ContactFormProgress({ steps, currentStep, onStepSelect }) {
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

          return (
            <li
              key={step.id}
              className="contact-enquiry__step-item"
              data-state={state}
            >
              <button
                type="button"
                className="contact-enquiry__step-button"
                onClick={() => onStepSelect(index)}
                disabled={index > currentStep}
                aria-current={index === currentStep ? "step" : undefined}
              >
                <span
                  className="contact-enquiry__step-badge"
                  aria-hidden="true"
                >
                  {state === "done" ? (
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
