import { processSteps, contactCopy } from "../data/contactData";
import useRevealOnScroll from "../../../hooks/useRevealOnScroll";

/**
 * Delivery timeline.
 *
 * One observer drives two things: the staggered reveal of each stage and
 * the `is-visible` flag that lets CSS run the connecting line's progress
 * sweep exactly once.
 */
function ContactProcess() {
  const [sectionRef, isVisible] = useRevealOnScroll();
  const { process } = contactCopy;

  return (
    <section
      ref={sectionRef}
      className="contact-process"
      aria-labelledby="contact-process-title"
      data-visible={isVisible ? "true" : undefined}
    >
      <div className="contact-inner">
        <header className="contact-section__head" data-reveal>
          <span className="contact-eyebrow">{process.eyebrow}</span>

          <h2
            className="contact-section__title"
            id="contact-process-title"
          >
            {process.title}
          </h2>

          <p className="contact-section__subtitle">
            {process.subtitle}
          </p>
        </header>

        <ol className="contact-process__track">
          {processSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <li
                key={step.id}
                className="contact-process__item"
                data-reveal
                style={{ "--ct-reveal-delay": `${index * 120}ms` }}
              >
                <span className="contact-process__node" aria-hidden="true">
                  <Icon size={20} strokeWidth={1.8} />
                </span>

                <span className="contact-process__number">
                  {step.number}
                </span>

                <h3 className="contact-process__title">
                  {step.title}
                </h3>

                <p className="contact-process__text">{step.text}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export default ContactProcess;
