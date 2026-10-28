
import useRevealOnScroll from "../../hooks/useRevealOnScroll";
import { useCollection } from "../../hooks/useContent";
import { imageUrl } from "../../utils/apiBase";
import "./Portfolio.css";

import wakeUpWaterImage from "../../assets/images/Portfolio/Rectangle6.png";
import sherekarJewelersImage from "../../assets/images/Portfolio/Rectangle7.png";
import apvaAssociationImage from "../../assets/images/Portfolio/Rectangle8.png";
import hilltopTuskiImage from "../../assets/images/Portfolio/Rectangle9.png";

const PROJECTS_PAGE_URL = "https://www.fascave.com/projects";

const fallbackProjects = [
    {
        id: "wake-up-water",
        title: "Wake UP Water",
        image: wakeUpWaterImage,
        category: "WATER & FMCG",
        year: "2026",
        duration: "6 months",
        client: "Wake UP Water",
        link: PROJECTS_PAGE_URL,
        services: ["Web Development", "UI/UX Design"],
        challenge:
            "Reawakening the world with pure hydration through a modern digital experience.",
        technologies: ["React", "Node.js", "MongoDB"],
    },
    {
        id: "sherekar-jewelers",
        title: "Sherekar Jewelers",
        image: sherekarJewelersImage,
        category: "JEWELLERY",
        year: "2026",
        duration: "5 months",
        client: "Sherekar Jewelers",
        link: PROJECTS_PAGE_URL,
        services: ["Web Development", "Digital Solutions"],
        challenge:
            "Illuminating your world with the art of timeless craftsmanship through a premium digital presence.",
        technologies: ["React", "JavaScript", "CSS"],
    },
    {
        id: "apva-association",
        title: "APVA Association",
        image: apvaAssociationImage,
        category: "MEDIA & ASSOCIATION",
        year: "2026",
        duration: "4 months",
        client: "APVA Association",
        link: PROJECTS_PAGE_URL,
        services: ["Web Development", "UI/UX Design"],
        challenge:
            "Capturing moments and empowering visual storytelling through a modern online platform.",
        technologies: ["React", "Node.js", "MongoDB"],
    },
    {
        id: "hilltop-tuski",
        title: "Hilltop Tuski",
        image: hilltopTuskiImage,
        category: "BUSINESS & CONSULTING",
        year: "2026",
        duration: "6 months",
        client: "Hilltop Tuski",
        link: PROJECTS_PAGE_URL,
        services: ["Web Development", "Custom Solutions"],
        challenge:
            "Connecting Japan and India for exceptional business growth through digital solutions.",
        technologies: ["React", "Node.js", "API"],
    },
];

const toArray = (value) => {
    if (Array.isArray(value)) return value;
    if (typeof value === "string" && value.trim()) {
        return value.split(",").map((item) => item.trim()).filter(Boolean);
    }
    return [];
};

const mapPortfolioProject = (project, index) => {
    const rawImage = project.coverImage || project.image;
    const image = rawImage ? imageUrl(rawImage) : "";

    return {
        id: project._id || project.id || project.slug || `${project.title}-${index}`,
        title: project.title || "Untitled Project",
        image,
        category: project.category || "",
        year: project.year || "",
        duration: project.duration || "",
        client: project.clientName || project.client || "",
        link: project.projectUrl || project.link || "",
        services: toArray(project.services),
        challenge: project.description || project.challenge || "",
        technologies: toArray(project.techStack || project.technologies),
    };
};

function Portfolio() {
    const [sectionRef] = useRevealOnScroll({ stagger: 120 });
    const { items = [], status } = useCollection("/api/content/portfolio");

    if (status === "error" || status === "loading") {
        const portfolioData = fallbackProjects;
        return (
            <section
                className="portfolio-section"
                id="portfolio"
                aria-labelledby="portfolio-title"
                ref={sectionRef}
            >
                <div className="portfolio-container">
                    <div className="portfolio-header" data-reveal>
                        <span className="portfolio-header-line" aria-hidden="true" />
                        <h2 className="portfolio-title" id="portfolio-title">OUR PORTFOLIO</h2>
                        <p className="portfolio-description">
                            A selection of projects where FasCave delivered technology solutions across web, mobile, cloud and data.
                        </p>
                        <button
                            type="button"
                            className="portfolio-button portfolio-button-solid"
                            onClick={() => window.open(PROJECTS_PAGE_URL, "_blank", "noopener,noreferrer")}
                        >
                            View All Projects
                            <span aria-hidden="true">&#8599;</span>
                        </button>
                    </div>
                    <div className="portfolio-grid">
                        {portfolioData.map((project, index) => (
                            <article className="portfolio-card" key={project.id || project.title || index} data-reveal="scale">
                                <div className="portfolio-image">
                                    {project.image && <img src={project.image} alt={`${project.title} project by FasCave`} loading="lazy" />}
                                    <div className="portfolio-image-overlay" aria-hidden="true">View Project</div>
                                </div>
                                <div className="portfolio-card-body">
                                    <div className="portfolio-card-meta">
                                        {project.category && <span className="portfolio-category">{project.category}</span>}
                                        {(project.year || project.duration) && (
                                            <span className="portfolio-date">
                                                {[project.year, project.duration].filter(Boolean).join(" · ")}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="portfolio-card-title">{project.title}</h3>
                                    {project.client && (
                                        <p className="portfolio-client">
                                            <span className="portfolio-client-label">Client</span>
                                            {project.client}
                                        </p>
                                    )}
                                    {project.services && project.services.length > 0 && (
                                        <div className="portfolio-tags">
                                            {project.services.map((service, i) => (
                                                <span className="portfolio-tag" key={`${project.id}-service-${i}`}>{service}</span>
                                            ))}
                                        </div>
                                    )}
                                    {project.challenge && (
                                        <div className="portfolio-challenge">
                                            <p className="portfolio-challenge-label">CHALLENGE</p>
                                            <p className="portfolio-challenge-text">{project.challenge}</p>
                                        </div>
                                    )}
                                    {project.technologies && project.technologies.length > 0 && (
                                        <div className="portfolio-technologies">
                                            {project.technologies.map((technology, i) => (
                                                <span className="portfolio-technology" key={`${project.id}-technology-${i}`}>{technology}</span>
                                            ))}
                                        </div>
                                    )}
                                    {project.link && (
                                        <button
                                            type="button"
                                            className="portfolio-button portfolio-button-outline"
                                            onClick={() => window.open(project.link, "_blank", "noopener,noreferrer")}
                                        >
                                            View Case Study
                                            <span aria-hidden="true">&#8599;</span>
                                        </button>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (status === "empty" || !Array.isArray(items) || items.length === 0) {
        return (
            <section
                className="portfolio-section"
                id="portfolio"
                aria-labelledby="portfolio-title"
                ref={sectionRef}
            >
                <div className="portfolio-container">
                    <div className="portfolio-header" data-reveal>
                        <span className="portfolio-header-line" aria-hidden="true" />
                        <h2 className="portfolio-title" id="portfolio-title">OUR PORTFOLIO</h2>
                        <p className="portfolio-description">
                            A selection of projects where FasCave delivered technology solutions across web, mobile, cloud and data.
                        </p>
                        <button
                            type="button"
                            className="portfolio-button portfolio-button-solid"
                            onClick={() => window.open(PROJECTS_PAGE_URL, "_blank", "noopener,noreferrer")}
                        >
                            View All Projects
                            <span aria-hidden="true">&#8599;</span>
                        </button>
                    </div>
                    <div className="portfolio-grid"></div>
                </div>
            </section>
        );
    }

    const portfolioData = items.map(mapPortfolioProject);

    return (
        <section
            className="portfolio-section"
            id="portfolio"
            aria-labelledby="portfolio-title"
            ref={sectionRef}
        >
            <div className="portfolio-container">
                <div className="portfolio-header" data-reveal>
                    <span
                        className="portfolio-header-line"
                        aria-hidden="true"
                    />

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
                            window.open(
                                PROJECTS_PAGE_URL,
                                "_blank",
                                "noopener,noreferrer"
                            )
                        }
                    >
                        View All Projects
                        <span aria-hidden="true">&#8599;</span>
                    </button>
                </div>

                <div className="portfolio-grid">
                    {portfolioData.map((project, index) => (
                        <article
                            className="portfolio-card"
                            key={project.id || project.title || index}
                            data-reveal="scale"
                        >
                            <div className="portfolio-image">
                                {project.image && (
                                    <img
                                        src={project.image}
                                        alt={`${project.title} project by FasCave`}
                                        loading="lazy"
                                    />
                                )}

                                <div
                                    className="portfolio-image-overlay"
                                    aria-hidden="true"
                                >
                                    View Project
                                </div>
                            </div>

                            <div className="portfolio-card-body">
                                <div className="portfolio-card-meta">
                                    {project.category && (
                                        <span className="portfolio-category">
                                            {project.category}
                                        </span>
                                    )}

                                    {(project.year || project.duration) && (
                                        <span className="portfolio-date">
                                            {[project.year, project.duration]
                                                .filter(Boolean)
                                                .join(" · ")}
                                        </span>
                                    )}
                                </div>

                                <h3 className="portfolio-card-title">
                                    {project.title}
                                </h3>

                                {project.client && (
                                    <p className="portfolio-client">
                                        <span className="portfolio-client-label">
                                            Client
                                        </span>
                                        {project.client}
                                    </p>
                                )}

                                {project.services.length > 0 && (
                                    <div className="portfolio-tags">
                                        {project.services.map((service, i) => (
                                            <span
                                                className="portfolio-tag"
                                                key={`${project.id}-service-${i}`}
                                            >
                                                {service}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {project.challenge && (
                                    <div className="portfolio-challenge">
                                        <p className="portfolio-challenge-label">
                                            CHALLENGE
                                        </p>

                                        <p className="portfolio-challenge-text">
                                            {project.challenge}
                                        </p>
                                    </div>
                                )}

                                {project.technologies.length > 0 && (
                                    <div className="portfolio-technologies">
                                        {project.technologies.map((technology, i) => (
                                            <span
                                                className="portfolio-technology"
                                                key={`${project.id}-technology-${i}`}
                                            >
                                                {technology}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {project.link && (
                                    <button
                                        type="button"
                                        className="portfolio-button portfolio-button-outline"
                                        onClick={() =>
                                            window.open(
                                                project.link,
                                                "_blank",
                                                "noopener,noreferrer"
                                            )
                                        }
                                    >
                                        View Case Study
                                        <span aria-hidden="true">&#8599;</span>
                                    </button>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Portfolio;
