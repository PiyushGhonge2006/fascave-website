import { useEffect, useMemo, useState } from "react";

import useRevealOnScroll from "../../hooks/useRevealOnScroll";
import { useCollection } from "../../hooks/useContent";
import { imageUrl } from "../../utils/apiBase";
import "./Portfolio.css";

const PROJECTS_PAGE_URL = "https://www.fascave.com/projects";
const REFRESH_INTERVAL_MS = 30000;

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

const uniqueProjects = (items) => {
    const seen = new Set();

    return items.filter((project, index) => {
        const key =
            project?._id ||
            project?.slug ||
            project?.id ||
            `row-${index}`;

        if (seen.has(key)) {
            return false;
        }

        seen.add(key);
        return true;
    });
};

function PortfolioCard({ project }) {
    const [imageFailed, setImageFailed] = useState(false);

    useEffect(() => {
        setImageFailed(false);
    }, [project.image]);

    const showImage = Boolean(project.image) && !imageFailed;

    return (
        <article className="portfolio-card" data-reveal="scale">
            <div className="portfolio-image">
                {showImage ? (
                    <img
                        src={project.image}
                        alt={`${project.title} project by FasCave`}
                        loading="lazy"
                        onError={() => setImageFailed(true)}
                    />
                ) : (
                    <div
                        className="portfolio-image-fallback"
                        aria-hidden="true"
                    >
                        <span>
                            {project.title.charAt(0).toUpperCase()}
                        </span>
                    </div>
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
                                .join(" \u00b7 ")}
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
    );
}

/*
 * The grid mounts only after the request finishes, so it owns its
 * own reveal observer. Observing it from the section (which mounts
 * before the cards exist) would leave every card at opacity 0.
 */
function PortfolioGrid({ projects }) {
    const [gridRef] = useRevealOnScroll({ stagger: 120 });

    return (
        <div className="portfolio-grid" ref={gridRef}>
            {projects.map((project) => (
                <PortfolioCard
                    key={project.id}
                    project={project}
                />
            ))}
        </div>
    );
}

function Portfolio() {
    const [sectionRef] = useRevealOnScroll({ stagger: 120 });

    const {
        items = [],
        status,
        reload,
    } = useCollection("/api/content/portfolio");

    useEffect(() => {
        const timer = window.setInterval(
            reload,
            REFRESH_INTERVAL_MS
        );

        return () => window.clearInterval(timer);
    }, [reload]);

    const projects = useMemo(
        () =>
            uniqueProjects(items).map(mapPortfolioProject),
        [items]
    );

    const hasProjects = projects.length > 0;
    const showLoading = status === "loading" && !hasProjects;
    const showError = status === "error" && !hasProjects;
    const showEmpty = !showLoading && !showError && !hasProjects;

    return (
        <section
            className="portfolio-section"
            id="portfolio"
            aria-labelledby="portfolio-title"
            aria-busy={status === "loading"}
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

                {showLoading && (
                    <div
                        className="portfolio-state"
                        role="status"
                        aria-live="polite"
                    >
                        <span
                            className="portfolio-spinner"
                            aria-hidden="true"
                        />
                        <h3 className="portfolio-state-title">
                            Loading projects
                        </h3>
                        <p className="portfolio-state-text">
                            Fetching the latest FasCave case studies.
                        </p>
                    </div>
                )}

                {showError && (
                    <div
                        className="portfolio-state"
                        role="alert"
                    >
                        <h3 className="portfolio-state-title">
                            We could not load our projects
                        </h3>
                        <p className="portfolio-state-text">
                            Please check your connection and try again.
                        </p>
                        <button
                            type="button"
                            className="portfolio-button portfolio-button-solid"
                            onClick={reload}
                        >
                            Try again
                        </button>
                    </div>
                )}

                {showEmpty && (
                    <div
                        className="portfolio-state"
                        role="status"
                    >
                        <h3 className="portfolio-state-title">
                            No projects to show yet
                        </h3>
                        <p className="portfolio-state-text">
                            New case studies will appear here as soon as
                            they are published.
                        </p>
                    </div>
                )}

                {hasProjects && (
                    <PortfolioGrid
                        key={projects
                            .map((project) => project.id)
                            .join("|")}
                        projects={projects}
                    />
                )}
            </div>
        </section>
    );
}

export default Portfolio;
