import { ArrowRight, RotateCcw } from "lucide-react";

import useContactCtas from "../hooks/useContactCtas";

/**
 * Success state shown once the API has confirmed the enquiry was stored.
 *
 * Only rendered after a 2xx from POST /api/contact, so the copy can promise
 * a real reply — the message is in the team's inbox by this point.
 */
function ContactFormSuccess({ onReset, name = "" }) {
  const { exploreWork } = useContactCtas();

  return (
    <div className="contact-enquiry__success">
      <div className="contact-enquiry__success-mark" aria-hidden="true">
        <svg viewBox="0 0 72 72" focusable="false">
          <circle
            className="contact-enquiry__success-ring"
            cx="36"
            cy="36"
            r="32"
            pathLength="1"
          />
          <path
            className="contact-enquiry__success-tick"
            d="M22 37.5 L32 47 L50 27"
            pathLength="1"
          />
        </svg>
      </div>

      <h2 className="contact-enquiry__success-title" id="contact-enquiry-title">
        Message Received
      </h2>

      <p className="contact-enquiry__success-text">
        Thanks for reaching out, {name ? `${name} — ` : ""}your enquiry is
        with our team. We'll get back to you shortly.
      </p>

      <button
        type="button"
        className="contact-btn contact-btn--ghost"
        onClick={onReset}
      >
        <RotateCcw size={16} strokeWidth={2.2} aria-hidden="true" />
        Send Another Message
      </button>

      <button
        type="button"
        className="contact-enquiry__success-link"
        onClick={exploreWork}
      >
        In the meantime, have a look at the work we have shipped.
        <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
      </button>
    </div>
  );
}

export default ContactFormSuccess;
