import { useCallback, useEffect, useRef } from "react";
import { X, CalendarCheck, ShieldCheck } from "lucide-react";

import ContactForm from "../../pages/Contact/components/ContactForm";

import "./ConsultationModal.css";

const TITLE_ID = "consultation-modal-title";

/** Elements that can receive keyboard focus, in DOM order. */
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), ' +
  'select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * "Book a Free Consultation" popup.
 *
 * Renders the *same* enquiry wizard the Contact page uses, so there is only
 * one form in the codebase. The wizard's section chrome is neutralised by
 * `ConsultationModal.css` and the panel supplies its own dark surface.
 *
 * Rendered once, at the app root, by `ConsultationProvider` — never inline
 * where it is triggered, so the wizard keeps its state between opens only
 * for as long as the popup is mounted.
 */
function ConsultationModal({ isOpen, onClose }) {
  const panelRef = useRef(null);
  const restoreFocusRef = useRef(null);

  /* ---- Close on Escape ---- */
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      /* Keep Tab inside the dialog while it is open. */
      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll(FOCUSABLE);

      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !panelRef.current.contains(active))) {
        event.preventDefault();
        last.focus();
        return;
      }

      if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  /* ---- Lock page scroll, move focus in, restore it on close ---- */
  useEffect(() => {
    if (!isOpen) return undefined;

    restoreFocusRef.current = document.activeElement;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    /* Wait a frame so the panel exists before focusing into it. */
    const frame = window.requestAnimationFrame(() => {
      panelRef.current
        ?.querySelector('[data-autofocus], .consultation-modal__close')
        ?.focus();
    });

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = overflow;
      restoreFocusRef.current?.focus?.();
    };
  }, [isOpen]);

  const handleOverlayClick = useCallback(
    (event) => {
      /* Only a click on the backdrop itself closes the dialog. */
      if (event.target === event.currentTarget) onClose();
    },
    [onClose],
  );

  if (!isOpen) return null;

  return (
    <div
      className="consultation-modal__overlay"
      onClick={handleOverlayClick}
    >
      <div
        className="consultation-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={TITLE_ID}
        ref={panelRef}
      >
        <span
          className="consultation-modal__glow"
          aria-hidden="true"
        />
        <span
          className="consultation-modal__grid"
          aria-hidden="true"
        />

        <header className="consultation-modal__head">
          <div className="consultation-modal__head-copy">
            <span className="consultation-modal__badge">
              <CalendarCheck size={14} strokeWidth={2} aria-hidden="true" />
              Free 30-minute discovery call
            </span>

            <h2 id={TITLE_ID} className="consultation-modal__title">
              Book a Free Consultation
            </h2>

            <p className="consultation-modal__lead">
              Share a few details and we'll come back with a clear point of
              view, an honest estimate and a next step.
            </p>
          </div>

          <button
            type="button"
            className="consultation-modal__close"
            onClick={onClose}
            aria-label="Close consultation form"
          >
            <X size={20} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </header>

        <div className="consultation-modal__body">
          <ContactForm
            anchorId="consultation-modal-form"
            source="consultation"
          />
        </div>

        <footer className="consultation-modal__foot">
          <ShieldCheck size={14} strokeWidth={2} aria-hidden="true" />
          No spam, no obligation — your details stay with us.
        </footer>
      </div>
    </div>
  );
}

export default ConsultationModal;
