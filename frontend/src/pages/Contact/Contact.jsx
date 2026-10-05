import ContactCTA from "./components/ContactCTA";
import ContactForm from "./components/ContactForm";
import ContactHero from "./components/ContactHero";
import ContactInfo from "./components/ContactInfo";
import ContactProcess from "./components/ContactProcess";
import ContactVisual from "./components/ContactVisual";
import WhyContactUs from "./components/WhyContactUs";

import "./Contact.css";

/**
 * Contact page — composition only.
 *
 * Order: hero → direct channels → enquiry wizard beside the
 * idea-to-launch diagram → reasons → process → closing call-to-action.
 */
function Contact() {
  return (
    <main className="contact-page" id="contact">
      <ContactHero />

      <ContactInfo />

      <div className="contact-conversation">
        <ContactForm />
        <ContactVisual />
      </div>

      <WhyContactUs />

      <ContactProcess />

      <ContactCTA />
    </main>
  );
}

export default Contact;
