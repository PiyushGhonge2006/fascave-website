import { ArrowRight, ArrowUpRight, Rocket } from "lucide-react";

import { contactCopy } from "../data/contactData";
import useContactCtas from "../hooks/useContactCtas";
import useRevealOnScroll from "../../../hooks/useRevealOnScroll";

/** Closing call-to-action. */
function ContactCTA() {
  const [sectionRef] = useRevealOnScroll();
  const { startConversation, exploreWork } = useContactCtas();
  const { cta } = contactCopy;

  return (
    <section
      ref={sectionRef}
      className="contact-cta"
      aria-labelledby="contact-cta-title"
    >
      <span className="contact-cta__orb" aria-hidden="true" />
      <span className="contact-cta__grid" aria-hidden="true" />

      <div className="contact-cta__inner">
        <div className="contact-cta__card" data-reveal>
          <span className="contact-cta__edge" aria-hidden="true" />

          <span className="contact-eyebrow">
            <Rocket size={14} strokeWidth={2} aria-hidden="true" />
            {cta.eyebrow}
          </span>

          <h2 className="contact-cta__title" id="contact-cta-title">
            {cta.title}
          </h2>

          <p className="contact-cta__text">{cta.text}</p>

          <div className="contact-cta__actions">
            <button
              type="button"
              className="contact-btn contact-btn--primary"
              onClick={startConversation}
            >
              Start a Conversation
              <ArrowUpRight
                size={17}
                strokeWidth={2.4}
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              className="contact-btn contact-btn--ghost"
              onClick={exploreWork}
            >
              Explore Our Work
              <ArrowRight size={17} strokeWidth={2.4} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactCTA;
