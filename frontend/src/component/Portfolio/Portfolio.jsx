import "./Portfolio.css";

import wakeUpWaterImage from "../../assets/images/Portfolio/Rectangle6.png";
import sherekarJewelersImage from "../../assets/images/Portfolio/Rectangle7.png";
import apvaAssociationImage from "../../assets/images/Portfolio/Rectangle8.png";
import hilltopTuskiImage from "../../assets/images/Portfolio/Rectangle9.png";

/* Where the "View All Projects" button sends the visitor. */
const PROJECTS_PAGE_URL = "https://www.fascave.com/projects";

/*
 * All project content lives in this one array.
 * To add a project: copy an object below, change its values, and that is it.
 * The card is drawn automatically from the list.
 */
const portfolioData = [
    {
        title: "Wake UP Water",
        image: wakeUpWaterImage,
        category: "WATER & FMCG",
        year: "2026",
        duration: "6 months",
        client: "Wake UP Water",
        link: "https://www.fascave.com/projects",
        services: ["Web Development", "UI/UX Design"],
        challenge:
            "Reawakening the world with pure hydration through a modern digital experience.",
        technologies: ["React", "Node.js", "MongoDB"],
    },
    {
        title: "Sherekar Jewelers",
        image: sherekarJewelersImage,
        category: "JEWELLERY",
        year: "2026",
        duration: "5 months",
        client: "Sherekar Jewelers",
        link: "https://www.fascave.com/projects",
        services: ["Web Development", "Digital Solutions"],
        challenge:
            "Illuminating your world with the art of timeless craftsmanship through a premium digital presence.",
        technologies: ["React", "JavaScript", "CSS"],
    },
    {
        title: "APVA Association",
        image: apvaAssociationImage,
        category: "MEDIA & ASSOCIATION",
        year: "2026",
        duration: "4 months",
        client: "APVA Association",
        link: "https://www.fascave.com/projects",
        services: ["Web Development", "UI/UX Design"],
        challenge:
            "Capturing moments and empowering visual storytelling through a modern online platform.",
        technologies: ["React", "Node.js", "MongoDB"],
    },
    {
        title: "Hilltop Tuski",
        image: hilltopTuskiImage,
        category: "BUSINESS & CONSULTING",
        year: "2026",
        duration: "6 months",
        client: "Hilltop Tuski",
        link: "https://www.fascave.com/projects",
        services: ["Web Development", "Custom Solutions"],
        challenge:
            "Connecting Japan and India for exceptional business growth through digital solutions.",
        technologies: ["React", "Node.js", "API"],
    },
];

function Portfolio() {
    return (
        <section
            className="portfolio-section"
            id="portfolio"
            aria-labelledby="portfolio-title"
        >
            <div className="portfolio-container">

                {/* Short line, section title, text and the "View All Projects" button */}
                <div className="portfolio-header">
                    <span className="portfolio-header-line" aria-hidden="true" />

                    <h2 className="portfolio-title" id="portfolio-title">
                        OUR PORTFOLIO
                    </h2>

                    <p className="portfolio-description">
                        A selection of projects where FasCave delivered
                        technology solutions across web, mobile, cloud and data.
                    </p>

                    <button
                        type="button"
                        className="portfolio-button portfolio-button-solid"
                        onClick={() =>
                            window.open(PROJECTS_PAGE_URL, "_blank", "noopener")
                        }
                    >
                        View All Projects
                        <span aria-hidden="true">&#8599;</span>
                    </button>
                </div>

                {/* One card for every project in portfolioData */}
                <div className="portfolio-grid">
                    {portfolioData.map((project) => (
                        <article className="portfolio-card" key={project.title}>

                            <div className="portfolio-image">
                                <img
                                    src={project.image}
                                    alt={`${project.title} project by FasCave`}
                                    loading="lazy"
                                />

                                {/* Shown when the card is hovered */}
                                <div
                                    className="portfolio-image-overlay"
                                    aria-hidden="true"
                                >
                                    View Project
                                </div>
                            </div>

                            <div className="portfolio-card-body">

                                <div className="portfolio-card-meta">
                                    <span className="portfolio-category">
                                        {project.category}
                                    </span>

                                    <span className="portfolio-date">
                                        {project.year} &middot; {project.duration}
                                    </span>
                                </div>

                                <h3 className="portfolio-card-title">
                                    {project.title}
                                </h3>

                                <p className="portfolio-client">
                                    <span className="portfolio-client-label">
                                        Client
                                    </span>
                                    {project.client}
                                </p>

                                <div className="portfolio-tags">
                                    {project.services.map((service) => (
                                        <span
                                            className="portfolio-tag"
                                            key={service}
                                        >
                                            {service}
                                        </span>
                                    ))}
                                </div>

                                <div className="portfolio-challenge">
                                    <p className="portfolio-challenge-label">
                                        CHALLENGE
                                    </p>

                                    <p className="portfolio-challenge-text">
                                        {project.challenge}
                                    </p>
                                </div>

                                <div className="portfolio-technologies">
                                    {project.technologies.map((technology) => (
                                        <span
                                            className="portfolio-technology"
                                            key={technology}
                                        >
                                            {technology}
                                        </span>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    className="portfolio-button portfolio-button-outline"
                                    onClick={() => {
                                        if (project.link) {
                                            window.open(
                                                project.link,
                                                "_blank",
                                                "noopener"
                                            );
                                        }
                                    }}
                                >
                                    View Case Study
                                    <span aria-hidden="true">&#8599;</span>
                                </button>

                            </div>
                        </article>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default Portfolio;
