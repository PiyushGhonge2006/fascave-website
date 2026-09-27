import React from "react";
import "./GTMPartner.css";

import AWS from "../../assets/images/GTMPartner/AWS.png";
import GoogleCloud from "../../assets/images/GTMPartner/Google_Cloud.png";
import Meta from "../../assets/images/GTMPartner/meta.png";
import MicrosoftAzure from "../../assets/images/GTMPartner/Microsoft_Azure.png";
import MicrosoftFasCave from "../../assets/images/GTMPartner/Microsoft_FasCave.png";

const partnerLogos = [
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
    const logos = [...partnerLogos, ...partnerLogos];

    return (
        <section className="gtm-partner-section">
            <div className="gtm-partner-header">
                <span className="gtm-partner-accent"></span>

                <h2>OUR GTM PARTNERS</h2>

                <p>
                    Our strategic partners help us deliver unmatched business value and
                    unique experiences
                </p>
            </div>

            <div className="gtm-partner-marquee">
                <div className="gtm-partner-track">
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