import { reviewRows } from "../data/contactData";

/**
 * Read-only summary of everything entered so far, shown on the final
 * step before the enquiry is sent.
 */
function ContactFormReview({ values }) {
  return (
    <dl className="contact-enquiry__review">
      {reviewRows.map((row) => (
        <div
          key={row.name}
          className="contact-enquiry__review-row"
          data-wide={row.wide || undefined}
        >
          <dt>{row.label}</dt>
          <dd>{values[row.name] ? values[row.name] : "Not provided"}</dd>
        </div>
      ))}
    </dl>
  );
}

export default ContactFormReview;
