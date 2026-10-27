
import { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  Send,
  Sparkles,
} from "lucide-react";

import ContactFormField from "./ContactFormField";
import ContactFormProgress from "./ContactFormProgress";
import ContactFormReview from "./ContactFormReview";
import ContactFormSuccess from "./ContactFormSuccess";

import {
  CONTACT_FORM_ANCHOR_ID,
  formSteps,
  initialContactValues,
} from "../data/contactData";

import {
  validateField,
  validateForm,
  validateStep,
} from "../utils/contactValidation";

import { prefersReducedMotion } from "../../../utils/motion";
import { apiUrl } from "../../../utils/apiBase";
import useRevealOnScroll from "../../../hooks/useRevealOnScroll";

import "./ContactForm.css";

const FORM_STATUS = {
  IDLE: "idle",
  SUBMITTING: "submitting",
  SUCCESS: "success",
  ERROR: "error",
};

async function submitEnquiry(formData, source) {
  let response;

  try {
    response = await fetch(apiUrl("/api/contact"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        source,
        trap: formData.trap,
      }),
    });
  } catch {
    throw new Error(
      "We couldn't reach our servers just now. Please check your connection and try again.",
    );
  }

  const payload = await response.json().catch(() => null);

  if (!response.ok || !payload?.success) {
    throw new Error(
      payload?.message ||
      "We couldn't send your message just now. Please try again.",
    );
  }

  return payload;
}

function buildFormData(values) {
  const phone = (values.phone || "").trim();

  return {
    name: values.name.trim(),
    email: values.email.trim(),
    company: values.company.trim(),
    phone: phone
      ? `${values.countryCode || "+91"} ${phone}`
      : "",
    projectType: values.projectType,
    budget: values.budget,
    message: values.message.trim(),
    trap: values.trap,
  };
}

function ContactForm({
  anchorId = CONTACT_FORM_ANCHOR_ID,
  source = "contact",
}) {
  const [sectionRef] = useRevealOnScroll();

  const formRef = useRef(null);
  const headingRef = useRef(null);

  const [values, setValues] = useState(initialContactValues);
  const [errors, setErrors] = useState({});
  const [stepIndex, setStepIndex] = useState(0);
  const [status, setStatus] = useState(FORM_STATUS.IDLE);
  const [formMessage, setFormMessage] = useState("");

  const step = formSteps[stepIndex];

  // Detect Review by its type instead of assuming the last
  // array entry is always the Review step.
  const reviewStepIndex = formSteps.findIndex(
    (item) => item.type === "review",
  );

  const isReviewStep =
    reviewStepIndex !== -1 && stepIndex === reviewStepIndex;

  const isSubmitting = status === FORM_STATUS.SUBMITTING;
  const isSuccess = status === FORM_STATUS.SUCCESS;

  const submittedName = values.name.trim();

  const scrollToForm = () => {
    sectionRef.current?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  };

  const announceStep = () => {
    scrollToForm();

    window.requestAnimationFrame(() => {
      headingRef.current?.focus({ preventScroll: true });
    });
  };

  const focusFirstError = () => {
    formRef.current
      ?.querySelector('[aria-invalid="true"]')
      ?.focus();
  };

  const handleChange = (name, value) => {
    const nextValues = {
      ...values,
      [name]: value,
    };

    setValues(nextValues);

    /*
      Clear or refresh any existing error as soon as the visitor starts
      fixing the field. Changing the calling code can also resolve (or
      invalidate) the phone number, so both are re-checked together.
    */
    setErrors((previous) => {
      const affectedFields =
        name === "countryCode" ? ["phone"] : [name];

      const revalidateUnconditionally = name === "countryCode";

      if (
        !revalidateUnconditionally &&
        !affectedFields.some((field) => previous[field])
      ) {
        return previous;
      }

      const next = { ...previous };

      affectedFields.forEach((field) => {
        const message = validateField(
          field,
          nextValues[field],
          nextValues,
        );

        if (message) {
          next[field] = message;
        } else {
          delete next[field];
        }
      });

      return next;
    });

    setFormMessage("");
  };

  const handleContinue = () => {
    if (isSubmitting || isReviewStep) return;

    const stepErrors = validateStep(step, values);

    if (Object.keys(stepErrors).length > 0) {
      setErrors((previous) => ({
        ...previous,
        ...stepErrors,
      }));

      setFormMessage(
        "Please complete the highlighted fields to continue.",
      );

      window.requestAnimationFrame(focusFirstError);
      return;
    }

    setErrors({});
    setFormMessage("");

    // Move exactly one step forward, including into Review.
    setStepIndex((currentIndex) =>
      Math.min(currentIndex + 1, formSteps.length - 1),
    );

    announceStep();
  };

  const handleBack = () => {
    if (isSubmitting) return;

    setFormMessage("");

    setStepIndex((currentIndex) =>
      Math.max(currentIndex - 1, 0),
    );

    announceStep();
  };

  const handleStepSelect = (index) => {
    // Allow users to revisit completed steps only.
    if (
      index >= stepIndex ||
      isSubmitting ||
      index < 0 ||
      index >= formSteps.length
    ) {
      return;
    }

    setStepIndex(index);
    setErrors({});
    setFormMessage("");

    announceStep();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    // Block submission unless the current step is Review.
    if (!isReviewStep) {
      setFormMessage(
        "Please complete the previous steps and review your project before submitting.",
      );
      return;
    }

    const {
      errors: allErrors,
      firstInvalidStep,
    } = validateForm(formSteps, values);

    if (firstInvalidStep !== -1) {
      setErrors(allErrors);

      setFormMessage(
        "Please complete the required fields before submitting.",
      );

      setStepIndex(firstInvalidStep);
      scrollToForm();

      window.requestAnimationFrame(focusFirstError);
      return;
    }

    setErrors({});
    setFormMessage("");
    setStatus(FORM_STATUS.SUBMITTING);

    try {
      await submitEnquiry(buildFormData(values), source);
      setStatus(FORM_STATUS.SUCCESS);
    } catch (error) {
      setStatus(FORM_STATUS.ERROR);

      setFormMessage(
        error?.message ||
        "Unable to submit your project. Please try again.",
      );
    }
  };

  /*
    Enter inside a text input should advance the wizard, never submit it
    early. Textareas keep their normal newline behaviour.
  */
  const handleFormKeyDown = (event) => {
    if (
      event.key !== "Enter" ||
      event.target.tagName !== "INPUT" ||
      isReviewStep ||
      isSubmitting
    ) {
      return;
    }

    event.preventDefault();
    handleContinue();
  };

  const handleReset = () => {
    setValues(initialContactValues);
    setErrors({});
    setStepIndex(0);
    setFormMessage("");
    setStatus(FORM_STATUS.IDLE);

    announceStep();
  };

  if (!Array.isArray(formSteps) || formSteps.length === 0) {
    return null;
  }

  if (reviewStepIndex === -1) {
    console.error(
      'Contact form configuration is missing a step with type: "review".',
    );
  }

  return (
    <section
      ref={sectionRef}
      className="contact-enquiry"
      id={anchorId}
      aria-labelledby="contact-enquiry-title"
      data-status={status}
    >
      <span
        className="contact-enquiry__glow"
        aria-hidden="true"
      />

      <div className="contact-enquiry__card">
        {isSuccess ? (
          <ContactFormSuccess
            onReset={handleReset}
            name={submittedName}
          />
        ) : (
          <>
            <header
              className="contact-enquiry__head"
              data-reveal
            >
              <span className="contact-eyebrow">
                <Sparkles
                  size={14}
                  strokeWidth={2}
                  aria-hidden="true"
                />
                Start a conversation
              </span>

              <h2
                className="contact-enquiry__title"
                id="contact-enquiry-title"
                ref={headingRef}
                tabIndex={-1}
              >
                Tell Us What You're Building
              </h2>

              <p className="contact-enquiry__subtitle">
                Share a few details about your project and we'll
                get back to you.
              </p>
            </header>

            <ContactFormProgress
              steps={formSteps}
              currentStep={stepIndex}
              errors={errors}
              onStepSelect={handleStepSelect}
            />

            <form
              ref={formRef}
              className="contact-enquiry__form"
              onSubmit={handleSubmit}
              onKeyDown={handleFormKeyDown}
              noValidate
              aria-busy={isSubmitting}
            >
              <div
                className="contact-enquiry__step"
                key={step.id}
              >
                <h3 className="contact-enquiry__step-title">
                  {step.title}
                </h3>

                <p className="contact-enquiry__step-text">
                  {step.description}
                </p>

                {step.type === "review" ? (
                  <ContactFormReview values={values} />
                ) : (
                  <div className="contact-enquiry__fields">
                    {step.fields.map((field) => (
                      <ContactFormField
                        key={field.name}
                        field={field}
                        value={values[field.name]}
                        values={values}
                        error={errors[field.name]}
                        onChange={handleChange}
                      />
                    ))}
                  </div>
                )}

                <div
                  className="contact-enquiry__trap"
                  aria-hidden="true"
                >
                  <label htmlFor={`${anchorId}-trap`}>
                    Leave this field empty
                  </label>

                  <input
                    id={`${anchorId}-trap`}
                    name="trap"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={values.trap}
                    onChange={(event) =>
                      handleChange("trap", event.target.value)
                    }
                  />
                </div>
              </div>

              <p
                className="contact-enquiry__alert"
                role="status"
                aria-live="polite"
                data-visible={formMessage ? "true" : undefined}
              >
                {formMessage}
              </p>

              <div className="contact-enquiry__actions">
                {stepIndex > 0 && (
                  <button
                    type="button"
                    className="contact-btn contact-btn--ghost"
                    onClick={handleBack}
                    disabled={isSubmitting}
                  >
                    <ArrowLeft
                      size={16}
                      strokeWidth={2.3}
                      aria-hidden="true"
                    />
                    Back
                  </button>
                )}

                {isReviewStep ? (
                  <button
                    type="submit"
                    className="contact-btn contact-btn--primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2
                          className="contact-spinner"
                          size={17}
                          strokeWidth={2.4}
                          aria-hidden="true"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Submit Project
                        <Send
                          size={16}
                          strokeWidth={2.2}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="contact-btn contact-btn--primary"
                    onClick={handleContinue}
                    disabled={isSubmitting}
                  >
                    Continue
                    <ArrowRight
                      size={16}
                      strokeWidth={2.3}
                      aria-hidden="true"
                    />
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
}

export default ContactForm;
