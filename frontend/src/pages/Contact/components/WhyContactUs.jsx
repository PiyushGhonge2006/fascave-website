import { benefits, contactCopy } from "../data/contactData";
import useRevealOnScroll from "../../../hooks/useRevealOnScroll";

/** What a visitor gets out of starting a conversation with us. */
function WhyContactUs() {
  const [sectionRef] = useRevealOnScroll();
  const { why } = contactCopy;

  return (
    <section
      ref={sectionRef}
      className="contact-why"
      aria-labelledby="contact-why-title"
    >
      <div className="contact-inner">
        <header className="contact-section__head" data-reveal>
          <span className="contact-eyebrow">{why.eyebrow}</span>

          <h2 className="contact-section__title" id="contact-why-title">
            {why.title}
          </h2>

          <p className="contact-section__subtitle">{why.subtitle}</p>
        </header>

        <ul className="contact-why__grid">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <li
                key={benefit.id}
                className="contact-why__card"
                data-reveal
                style={{ "--ct-reveal-delay": `${index * 100}ms` }}
              >
                <span className="contact-why__edge" aria-hidden="true" />

                <header className="contact-why__head">
                  <span className="contact-why__number">
                    {benefit.number}
                  </span>

                  <span className="contact-why__icon" aria-hidden="true">
                    <Icon size={22} strokeWidth={1.7} />
                  </span>
                </header>

                <h3 className="contact-why__title">{benefit.title}</h3>
                <p className="contact-why__text">{benefit.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default WhyContactUs;
