import React from "react";
import { Link } from "react-router-dom";

import fascaveLogo from "../../assets/Footer/FascaveLogo.png";
import microsoftFascave from "../../assets/Footer/background.png";

import "./Footer.css";

/* ================= SOCIAL ICONS ================= */

function FacebookIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M14.5 8H17V4h-2.5C11.46 4 10 5.46 10 8v2H7v4h3v6h4v-6h3l.5-4H14V8c0-.67.17-1 .5-1Z" />
        </svg>
    );
}

function LinkedinIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5.2 3.2A2.2 2.2 0 1 1 5.2 7.6a2.2 2.2 0 0 1 0-4.4ZM3.3 9h3.8v12H3.3V9Zm6.2 0H13v1.64h.05c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.66 4.8 6.12V21h-3.8v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94V21H9.5V9Z" />
        </svg>
    );
}


function InstagramIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" />
        </svg>
    );
}

function YoutubeIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M23 7.2a3 3 0 0 0-2.1-2.12C19.05 4.5 12 4.5 12 4.5s-7.05 0-8.9.58A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.12c1.85.58 8.9.58 8.9.58s7.05 0 8.9-.58A3 3 0 0 0 23 16.8a31 31 0 0 0 .5-4.8A31 31 0 0 0 23 7.2ZM9.8 15.5v-7l6 3.5-6 3.5Z" />
        </svg>
    );
}

function Footer() {
    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer className="site-footer">

            {/* ================= CTA ================= */}

            <section className="footer-cta">
                <div className="footer-cta-content">

                    <span className="footer-cta-label">
                        LET'S BUILD TOGETHER
                    </span>

                    <h2>Have a Project in Mind?</h2>

                    <p>
                        Tell us about your goals and we'll find the right technology
                        path forward. No commitment required.
                    </p>

                    <div className="footer-cta-buttons">

                        <Link
                            to="/contact"
                            className="footer-cta-primary"
                            onClick={scrollTop}
                        >
                            Start Your Project <span>↗</span>
                        </Link>

                        <Link
                            to="/contact"
                            className="footer-cta-secondary"
                            onClick={scrollTop}
                        >
                            Contact Us
                        </Link>

                    </div>

                </div>
            </section>


            {/* ================= MAIN FOOTER ================= */}

            <div className="footer-main">

                <div className="footer-grid">

                    {/* ================= COMPANY ================= */}

                    <div className="footer-company">

                        <Link
                            to="/"
                            className="footer-logo-link"
                            onClick={scrollTop}
                        >
                            <img
                                src={fascaveLogo}
                                alt="FasCave IT Solutions"
                                className="footer-logo"
                            />
                        </Link>

                        <p className="footer-description">
                            Best Software Company in Pune–Amravati, India offering
                            Website Development, App Development, Digital Marketing,
                            WhatsApp Business API, Cloud Data Analytics, Power & BI
                            Visualization.
                        </p>

                        <div className="footer-socials">

                            <a
                                href="https://www.facebook.com/fascave.it/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social facebook"
                                aria-label="Facebook"
                            >
                                <FacebookIcon />
                            </a>


                            <a
                                href="https://www.linkedin.com/company/fascave/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social linkedin"
                                aria-label="LinkedIn"
                            >
                                <LinkedinIcon />
                            </a>


                            <a
                                href="https://www.instagram.com/fascave.it/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social instagram"
                                aria-label="Instagram"
                            >
                                <InstagramIcon />
                            </a>

                            <a
                                href="https://www.youtube.com/@fascave.it.solutions"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social youtube"
                                aria-label="YouTube"
                            >
                                <YoutubeIcon />
                            </a>

                        </div>

                    </div>


                    {/* ================= SERVICES ================= */}

                    <div className="footer-column">

                        <h3>OUR SERVICES</h3>
                        <div className="footer-heading-line"></div>

                        <nav>
                            <Link to="/features" onClick={scrollTop}>
                                Web Development
                            </Link>

                            <Link to="/features" onClick={scrollTop}>
                                App Development
                            </Link>

                            <Link to="/features" onClick={scrollTop}>
                                Digital Marketing
                            </Link>

                            <Link to="/features" onClick={scrollTop}>
                                Cloud Data Analytics
                            </Link>

                            <Link to="/features" onClick={scrollTop}>
                                Power & BI Visualization
                            </Link>

                            <Link to="/features" onClick={scrollTop}>
                                Custom Solutions
                            </Link>
                        </nav>

                    </div>


                    {/* ================= CONTACT ================= */}

                    <div className="footer-column footer-contact">

                        <h3>CONTACT US</h3>
                        <div className="footer-heading-line"></div>

                        <div className="contact-block">
                            <span>OFFICE</span>

                            <p>
                                FasCave IT Solutions Private Limited
                                <br />
                                First Floor, Govind Complex B, 127,
                                <br />
                                Pote Patil Rd, Amravati,
                                <br />
                                Maharashtra 444604
                            </p>
                        </div>

                        <div className="contact-block">
                            <span>PHONE</span>

                            <a href="tel:+919209755990">
                                +91 9209755990
                            </a>
                        </div>

                        <div className="contact-block">
                            <span>EMAIL</span>

                            <a href="mailto:support@fascave.com">
                                support@fascave.com
                            </a>
                        </div>

                    </div>


                    {/* ================= PARTNER ================= */}

                    <div className="footer-column footer-partner">

                        <h3>PROUD PARTNERS</h3>
                        <div className="footer-heading-line"></div>

                        <div className="partner-image-wrapper">
                            <img
                                src={microsoftFascave}
                                alt="Microsoft for Startups"
                                className="partner-image"
                            />
                        </div>

                    </div>

                </div>


                {/* ================= BOTTOM ================= */}

                <div className="footer-bottom">

                    <p>
                        © 2026 FasCave IT Solutions Pvt. Ltd. All rights reserved.
                    </p>

                    <div className="footer-bottom-links">

                        <Link to="/" onClick={scrollTop}>
                            Home
                        </Link>

                        <span>|</span>

                        <Link to="/careers" onClick={scrollTop}>
                            Careers
                        </Link>

                        <span>|</span>

                        <Link to="/about-us" onClick={scrollTop}>
                            About
                        </Link>

                        <span>|</span>

                        <Link to="/contact" onClick={scrollTop}>
                            Contact
                        </Link>

                    </div>

                </div>

            </div>

        </footer>
    );
}

export default Footer;