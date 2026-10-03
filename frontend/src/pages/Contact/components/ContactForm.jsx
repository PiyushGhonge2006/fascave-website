import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Loader2, Send, Sparkles } from "lucide-react";

import ContactFormField from "./ContactFormField";
import ContactFormProgress from "./ContactFormProgress";
import ContactFormReview from "./ContactFormReview";
import ContactFormSuccess from "./ContactFormSuccess";

import {
  CONTACT_FORM_ANCHOR_ID,
  formSteps,
  initialContactValues,
} from "../data/contactData";
import { validateForm, validateStep } from "../utils/contactValidation";
import { prefersReducedMotion } from "../../../utils/motion";
import { apiUrl } from "../../../utils/apiBase";
import useRevealOnScroll from "../../../hooks/useRevealOnScroll";

import "./ContactForm.css";

/** The four states the enquiry can be in. */
const FORM_STATUS = {
  IDLE: "idle",
  SUBMITTING: "submitting",
  SUCCESS: "success",
  ERROR: "error",
};

/**
 * Hands the enquiry over to the API.
 *
 * The same controller serves POST /api/contact and POST
 * /api/messages, so enquiries and the navbar prompts land in
 * one inbox in the admin panel.
 *
 * `source` tells the inbox where the message came from —
 * the Contact page wizard and the consultation popup render
 * this identical component, so the caller says which.
 */
async function submitEnquiry(formData, source) {
  let response;

  try {
    response = await fetch(apiUrl("/api/contact"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, source, trap: formData.trap }),
    });
  } catch {
    /* fetch only rejects on a network-level failure, which
       here means the API could not be reached at all. */
    throw new Error(
      "We couldn't reach our servers just now. Please check your connection and try again.",
    );
  }

  /* Read the body either way: the API explains a 400 in
     there, and a non-JSON response must not throw while
     being parsed. */
  const payload = await response.json().catch(() => null);

  if (!response.ok || !payload?.success) {
    throw new Error(
      payload?.message ||
        "We couldn't send your message just now. Please try again.",
    );
  }

  return payload;
}

/** Builds the request payload → the shape the API will receive. */
function buildFormData(values) {
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    company: values.company.trim(),
    phone: values.phone.trim(),
    projectType: values.projectType,
    budget: values.budget,
    message: values.message.trim(),
    trap: values.trap,
  };
}

/**
 * The "Start a Conversation" wizard: step navigation, validation,
 * submission states and the review step.
 *
 * @param {string} [anchorId] DOM id for the section. Defaults to the id the
 *   Contact page uses for its own scroll anchor. The consultation popup
 *   passes a different one so both are never mounted with the same id.
 * @param {string} [source] Value stored with the enquiry so the admin
 *   inbox can tell the Contact page and the popup apart.
 */
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
  const isLastStep = stepIndex === formSteps.length - 1;
  const isSubmitting = status === FORM_STATUS.SUBMITTING;

  /* ---------- helpers ---------- */

  /**
   * Brings the top of the form back into view, then moves focus to the step
   * heading.
   *
   * Scrolling the section by reference (rather than by id) means this works
   * the same on the Contact page and inside the consultation popup, where the
   * scrollable element is the dialog body rather than the window.
   *
   * Focus is deferred one frame so it lands on the newly rendered heading,
   * and `preventScroll` stops it fighting the scroll above.
   */
  const announceStep = () => {
    sectionRef.current?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });

    window.requestAnimationFrame(() => {
      headingRef.current?.focus({ preventScroll: true });
    });
  };

  const focusFirstError = () => {
    formRef.current?.querySelector('[aria-invalid="true"]')?.focus();
  };

  /* ---------- handlers ---------- */

  const handleChange = (name, value) => {
    setValues((previous) => ({ ...previous, [name]: value }));

    /* Clear a message as soon as the visitor starts fixing the field. */
    setErrors((previous) => {
      if (!previous[name]) return previous;

      const next = { ...previous };
      delete next[name];

      return next;
    });
  };

  const handleContinue = () => {
    const stepErrors = validateStep(step, values);

    if (Object.keys(stepErrors).length > 0) {
      setErrors((previous) => ({ ...previous, ...stepErrors }));
      setFormMessage("Please complete the highlighted fields to continue.");
      focusFirstError();

      return;
    }

    setErrors({});
    setFormMessage("");
    setStepIndex((index) => Math.min(index + 1, formSteps.length - 1));
    announceStep();
  };

  const handleBack = () => {
    setFormMessage("");
    setStepIndex((index) => Math.max(index - 1, 0));
    announceStep();
  };

  /** Progress markers only ever navigate backwards. */
  const handleStepSelect = (index) => {
    if (index >= stepIndex) return;

    setStepIndex(index);
    setErrors({});
    setFormMessage("");
    announceStep();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    const { errors: allErrors, firstInvalidStep } = validateForm(
      formSteps,
      values,
    );

    if (firstInvalidStep !== -1) {
      setErrors(allErrors);
      setFormMessage(
        "Please review the highlighted fields before submitting.",
      );
      setStepIndex(firstInvalidStep);
      announceStep();
      focusFirstError();

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
        error?.message ??
          "We couldn't send your message just now. Please try again.",
      );
    }
  };

  const handleReset = () => {
    setValues(initialContactValues);
    setErrors({});
    setStepIndex(0);
    setFormMessage("");
    setStatus(FORM_STATUS.IDLE);
    announceStep();
  };

  const isSuccess = status === FORM_STATUS.SUCCESS;

/* Kept after a success so the greeting can use the name, but the form
   is unmounted at that point anyway. */
const submittedName = values.name.trim();

  return (
    <section
      ref={sectionRef}
      className="contact-enquiry"
      id={anchorId}
      aria-labelledby="contact-enquiry-title"
      data-status={status}
    >
      <span className="contact-enquiry__glow" aria-hidden="true" />

      <div className="contact-enquiry__card">
        {isSuccess ? (
          <ContactFormSuccess
            onReset={handleReset}
            name={submittedName}
          />
        ) : (
          <>
            <header className="contact-enquiry__head" data-reveal>
              <span className="contact-eyebrow">
                <Sparkles size={14} strokeWidth={2} aria-hidden="true" />
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
                Share a few details about your project and we'll get back to
                you.
              </p>
            </header>

            <ContactFormProgress
              steps={formSteps}
              currentStep={stepIndex}
              onStepSelect={handleStepSelect}
            />

            <form
              ref={formRef}
              className="contact-enquiry__form"
              onSubmit={handleSubmit}
              noValidate
              aria-busy={isSubmitting}
            >
              <div className="contact-enquiry__step" key={step.id}>
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
                      error={errors[field.name]}
                      onChange={handleChange}
                    />
                  ))}
                </div>
              )}

              {/* Honeypot. Hidden from people and from the tab
                  order; the server drops anything that arrives
                  here filled in. */}
              <div className="contact-enquiry__trap" aria-hidden="true">
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

              {/* Single polite live region for form-level messages. */}
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

                {isLastStep ? (
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
                        Sendingâ€¦
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
