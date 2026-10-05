import { useEffect } from "react";

import useRevealOnScroll from "../../hooks/useRevealOnScroll";
import { useSingleton } from "../../hooks/useContent";
import { imageUrl } from "../../utils/apiBase";
import "./About.css";

const MAPS_URL =
    "https://www.google.com/maps/search/?api=1&query=First+Floor%2C+Govind+Complex+B%2C+127%2C+Pote+Patil+Rd%2C+Kathora%2C+Maharashtra%2C+India+-+444604";

const iconShapes = {
    mission: (
        <>
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="3.6" />
            <path d="M12 2.4v2.8M12 18.8v2.8M2.4 12h2.8M18.8 12h2.8" />
        </>
    ),
    vision: (
        <>
            <path d="M2 12s3.8-6.4 10-6.4S22 12 22 12s-3.8 6.4-10 6.4S2 12 2 12Z" />
            <circle cx="12" cy="12" r="3.2" />
        </>
    ),
    office: (
        <>
            <path d="M4 21V5.5A1.5 1.5 0 0 1 5.5 4h6A1.5 1.5 0 0 1 13 5.5V21" />
            <path d="M13 9.5h4.5A1.5 1.5 0 0 1 19 11v10" />
            <path d="M2.5 21h19" />
            <path d="M7 8h3M7 12h3M7 16h3" />
        </>
    ),
    pin: (
        <>
            <path d="M12 21.2s7-5.9 7-11.2a7 7 0 1 0-14 0c0 5.3 7 11.2 7 11.2Z" />
            <circle cx="12" cy="10" r="2.6" />
        </>
    ),
    mail: (
        <>
            <rect x="2.6" y="4.6" width="18.8" height="14.8" rx="2.6" />
            <path d="m3.4 7.4 8.6 5.8 8.6-5.8" />
        </>
    ),
    phone: (
        <path d="M6.4 3h3.2l1.5 4-2.1 1.4a12.4 12.4 0 0 0 6.6 6.6l1.4-2.1 4 1.5v3.2a2 2 0 0 1-2.2 2A17.2 17.2 0 0 1 4.4 5.2 2 2 0 0 1 6.4 3Z" />
    ),
    globe: (
        <>
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18" />
            <path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" />
        </>
    ),
    Compass: (
        <>
            <circle cx="12" cy="12" r="9" />
            <path d="m15.4 8.6-2 4.8-4.8 2 2-4.8 4.8-2Z" />
        </>
    ),
    Sparkles: (
        <>
            <path d="M12 3.2 13.7 8l4.8 1.7-4.8 1.7L12 16.2 10.3 11.4 5.5 9.7 10.3 8 12 3.2Z" />
            <path d="M18.4 15.2l.8 2.1 2.1.8-2.1.8-.8 2.1-.8-2.1-2.1-.8 2.1-.8.8-2.1Z" />
        </>
    ),
    Layers: (
        <>
            <path d="m12 3 8.4 4.4L12 11.8 3.6 7.4 12 3Z" />
            <path d="m4.4 11 7.6 4 7.6-4" />
            <path d="m4.4 14.8 7.6 4 7.6-4" />
        </>
    ),
};

function Icon({ name, className = "about-icon" }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
        >
            {iconShapes[name]}
        </svg>
    );
}

function About() {
    const [pageRef] = useRevealOnScroll({ stagger: 130 });

    const { data: about } = useSingleton(
        "/api/content/about",
        {}
    );

    /* The office block below is still written in code, so
       these act as the defaults whenever the CMS has not
       been filled in yet. */
    const heading = about?.heading || "About Us";
    const introTitle = about?.eyebrow || "FasCave Information";
    const intro = about?.description ||
        "FasCave is a technology solutions company focused on building modern digital experiences and innovative solutions for businesses.";
    const mission = about?.mission ||
        "To deliver reliable, scalable and innovative technology solutions that help businesses grow and adapt to the digital world.";
    const vision = about?.vision ||
        "To become a trusted technology partner by creating impactful digital solutions that connect people, businesses and technology.";
    const values = (about?.values || []).filter(
        (value) => value?.title || value?.description
    );
    const heroImage = imageUrl(about?.image);

    /* The admin panel can set the page title, so the tab
       follows whatever is saved there. */
    useEffect(() => {
        if (!about?.seoTitle) {
            return;
        }

        const previous = document.title;
        document.title = about.seoTitle;

        return () => {
            document.title = previous;
        };
    }, [about?.seoTitle]);

    return (
        <section className="about-page" aria-labelledby="about-heading-title" ref={pageRef}>

            <div className="about-container">

                <header className="about-heading">
                    <span className="about-heading__rule" aria-hidden="true" />
                    <h1 id="about-heading-title">{heading}</h1>
                </header>

                <section className="about-info-banner" aria-labelledby="about-info-title">
                    <span className="about-info-banner__sheen" aria-hidden="true" />
                    <h2 id="about-info-title">{introTitle}</h2>
                    <p>{intro}</p>
                </section>

                {heroImage && (
                    <div className="about-hero-image" data-reveal="scale">
                        <img
                            src={heroImage}
                            alt="FasCave"
                        />
                    </div>
                )}

                <div className="mission-vision-grid">

                    <article className="about-card" data-reveal="scale">
                        <span className="about-card__icon">
                            <Icon name="mission" />
                        </span>
                        <h2>Our Mission</h2>
                        <p>{mission}</p>
                    </article>

                    <article className="about-card" data-reveal="scale">
                        <span className="about-card__icon">
                            <Icon name="vision" />
                        </span>
                        <h2>Our Vision</h2>
                        <p>{vision}</p>
                    </article>

                </div>


                <div className="office-section">

                    <section className="office-details" data-reveal="left">
                        <h3 className="office-card__title">
                            <span className="office-card__icon">
                                <Icon name="office" />
                            </span>
                            Office Details
                        </h3>

                        <div className="office-info">

                            <p className="office-company">
                                <span className="office-company__icon">
                                    <Icon name="office" />
                                </span>
                                <strong>FasCave IT Solutions Pvt. Ltd.</strong>
                            </p>

                            <address className="office-address">
                                <span className="office-address__icon">
                                    <Icon name="pin" />
                                </span>
                                <span>
                                    First Floor, Govind Complex B, 127, Pote Patil Rd, Kathora
                                    <br />
                                    Maharashtra, India &ndash; 444604
                                </span>
                            </address>

                            <ul className="office-contact">
                                <li>
                                    <span className="office-contact__icon">
                                        <Icon name="mail" />
                                    </span>
                                    <span className="office-contact__text">
                                        <strong>Email:</strong> contact@fascave.com
                                    </span>
                                </li>
                                <li>
                                    <span className="office-contact__icon">
                                        <Icon name="phone" />
                                    </span>
                                    <span className="office-contact__text">
                                        <strong>Phone:</strong> +91 9209755990
                                    </span>
                                </li>
                                <li>
                                    <span className="office-contact__icon">
                                        <Icon name="globe" />
                                    </span>
                                    <span className="office-contact__text">
                                        <strong>Website:</strong> www.fascave.com
                                    </span>
                                </li>
                            </ul>

                        </div>
                    </section>

                    <a
                        className="office-map"
                        href={MAPS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View FasCave office location on Google Maps (opens in a new tab)"
                        data-reveal="right"
                    >
                        <h3 className="office-card__title">
                            <span className="office-card__icon">
                                <Icon name="pin" />
                            </span>
                            View on Map
                        </h3>

                        <div className="office-map__stage" aria-hidden="true">
                            <span className="office-map__marker" />
                        </div>

                        <p className="office-map__text">
                            <span>FasCave Office Location</span>
                            <span>Pune, Maharashtra</span>
                        </p>
                    </a>

                </div>
                {values.length > 0 && (
                    <div className="mission-vision-grid">
                        {values.map((value, index) => (
                            <article
                                className="about-card"
                                key={`${value.title}-${index}`}
                                data-reveal="scale"
                            >
                                {value.icon && (
                                    <span className="about-card__icon">
                                        <Icon name={value.icon} />
                                    </span>
                                )}
                                <h2>{value.title}</h2>
                                <p>{value.description}</p>
                            </article>
                        ))}
                    </div>
                )}

            </div>

        </section>
    );
}

export default About;
