
import { reviewRows } from "../data/contactData";

function ContactFormReview({ values }) {
  return (
    <dl className="contact-enquiry__review">
      {reviewRows.map((row) => {
        const displayValue = row.format
          ? row.format(values)
          : values[row.name];

        return (
          <div
            key={row.name}
            className="contact-enquiry__review-row"
            data-wide={row.wide || undefined}
          >
            <dt>{row.label}</dt>

            <dd>
              {displayValue || "Not provided"}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

export default ContactFormReview;
