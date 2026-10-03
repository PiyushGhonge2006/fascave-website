import React from "react";
import useRevealOnScroll from "../../hooks/useRevealOnScroll";
import { useCollection } from "../../hooks/useContent";
import { imageUrl } from "../../utils/apiBase";
import "./GTMPartner.css";

import AWS from "../../assets/images/GTMPartner/AWS.png";
import GoogleCloud from "../../assets/images/GTMPartner/Google_Cloud.png";
import Meta from "../../assets/images/GTMPartner/meta.png";
import MicrosoftAzure from "../../assets/images/GTMPartner/Microsoft_Azure.png";
import MicrosoftFasCave from "../../assets/images/GTMPartner/Microsoft_FasCave.png";

/* Used when the CMS has nothing to return, so the strip
   is never empty. */
const fallbackLogos = [
    {
        name: "AWS",
        image: AWS,
    },
    {
        name: "Google Cloud",
        image: GoogleCloud,
    },
    {
        name: "Meta",
        image: Meta,
    },
    {
        name: "Microsoft Azure",
        image: MicrosoftAzure,
    },
    {
        name: "Microsoft",
        image: MicrosoftFasCave,
    },
];

const GTMPartner = () => {
  const { items: partners } = useCollection(
    "/api/content/gtm-partners",
    fallbackLogos
  );

  const fromCms = partners.filter((partner) => partner?.logo);

  const partnerLogos = fromCms.length
    ? fromCms.map((partner) => ({
        name: partner.name,
        image: imageUrl(partner.logo),
      }))
    : fallbackLogos;

  /* Duplicated once so the marquee loops without a gap. */
  const logos = [...partnerLogos, ...partnerLogos];

  const [sectionRef] = useRevealOnScroll();

    return (
        <section className="gtm-partner-section" ref={sectionRef}>
            <div className="gtm-partner-header" data-reveal>
                <span className="gtm-partner-accent"></span>

                <h2>OUR GTM PARTNERS</h2>

                <p>
                    Our strategic partners help us deliver unmatched business value and
                    unique experiences
                </p>
            </div>

            <div className="gtm-partner-marquee fc-marquee" data-reveal="fade">
                <div className="gtm-partner-track fc-marquee-track">
                    {logos.map((partner, index) => (
                        <div
                            className="gtm-partner-logo"
                            key={`${partner.name}-${index}`}
                        >
                            <img src={partner.image} alt={partner.name} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GTMPartner;