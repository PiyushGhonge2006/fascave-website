
import { useEffect } from "react";

import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    ArrowLeft,
    Award,
    BadgeCheck,
    Briefcase,
    Building2,
    FileText,
    ListChecks,
    MapPin,
    Sparkles,
} from "lucide-react";

import { useJobOpening } from "../../hooks/useJobOpening";

import "./Careers.css";
import "./CareerDetails.css";

// ========================================
// SMALL HELPERS
// ========================================

const asList = (value) =>
    Array.isArray(value)
        ? value.map((item) => String(item || "").trim()).filter(Boolean)
        : [];

const splitTitle = (value) => {
    const text = String(value || "").trim();

    if (!text) {
        return { lead: "", accent: "" };
    }

    const words = text.split(/\s+/);

    if (words.length === 1) {
        return { lead: "", accent: text };
    }

    const accent = words.pop();

    return {
        lead: `${words.join(" ")} `,
        accent,
    };
};

const getSummary = (job) => {
    const summary = String(job.summary || "").trim();

    if (summary) {
        return summary;
    }

    return String(job.description || "")
        .split(/\n\s*\n/)[0]
        .trim();
};

const getFacts = (job) => {
    const location = String(job.location || "").trim();
    const workMode = String(job.workMode || "").trim();

    return [
        {
            icon: Briefcase,
            label: "Job Type",
            value: job.type,
        },
        {
            icon: MapPin,
            label: workMode ? "Location / Work Mode" : "Location",
            value: [location, workMode].filter(Boolean).join(" / "),
        },
        {
            icon: Building2,
            label: "Department",
            value: job.department,
        },
        {
            icon: Award,
            label: "Experience",
            value: job.experience,
        },
    ]
        .map((fact) => ({
            ...fact,
            value: String(fact.value || "").trim(),
        }))
        .filter((fact) => fact.value);
};

// ========================================
// INFO PANEL
// ========================================

function InfoPanel({ facts }) {
    if (!facts.length) return null;

    return (
        <dl className="careers-detail__info">
            {facts.map((fact) => {
                const Icon = fact.icon;

                return (
                    <div
                        className="careers-detail__info-item"
                        key={fact.label}
                    >
                        <span className="careers-detail__info-icon">
                            <Icon
                                size={18}
                                strokeWidth={1.8}
                                aria-hidden="true"
                            />
                        </span>

                        <div className="careers-detail__info-copy">
                            <dt>{fact.label}</dt>
                            <dd>{fact.value}</dd>
                        </div>
                    </div>
                );
            })}
        </dl>
    );
}

// ========================================
// DETAIL CARD
// ========================================

function DetailCard({
    title,
    icon: Icon,
    items,
    fallback,
    className = "",
}) {
    const values = asList(items);

    return (
        <section
            className={`careers-detail__card${className ? ` ${className}` : ""}`}
        >
            <header className="careers-detail__card-head">
                <span className="careers-detail__card-icon">
                    <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
                </span>

                <h2>{title}</h2>
            </header>

            {values.length > 0 ? (
                <ul className="careers-detail__list">
                    {values.map((item, index) => (
                        <li key={`${index}-${item.slice(0, 24)}`}>
                            <span aria-hidden="true" />
                            {item}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="careers-detail__empty">{fallback}</p>
            )}
        </section>
    );
}

// ========================================
// DETAIL STATE
// ========================================

function DetailState({ title, children, tone = "default" }) {
    return (
        <main className="careers-page careers-detail">
            <div className="careers-inner">
                <div
                    className={`careers-detail__state careers-detail__state--${tone}`}
                    role={tone === "error" ? "alert" : "status"}
                >
                    <h1>{title}</h1>
                    {children}
                </div>
            </div>
        </main>
    );
}

// ========================================
// CAREER DETAILS PAGE
// ========================================

const CareerDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const { job, status } = useJobOpening(slug);

    // Update document title
    useEffect(() => {
        if (!job?.title) return undefined;

        const previous = document.title;
        document.title = `${job.title} | FasCave Careers`;

        return () => {
            document.title = previous;
        };
    }, [job?.title]);

    // Loading state
    if (status === "loading") {
        return (
            <DetailState title="Loading role">
                <span
                    className="careers-detail__spinner"
                    aria-hidden="true"
                />
                <p>Fetching the latest details for this opening.</p>
            </DetailState>
        );
    }

    // Not found state
    if (status === "notfound") {
        return (
            <DetailState title="Role not found" tone="muted">
                <p>
                    This role may have been closed or removed. Browse our
                    current openings to find another opportunity.
                </p>

                <Link
                    className="careers-btn careers-btn--primary"
                    to="/careers"
                >
                    <ArrowLeft size={16} strokeWidth={2.2} aria-hidden="true" />
                    Back to Careers
                </Link>
            </DetailState>
        );
    }

    // Error state
    if (status === "error" || !job) {
        return (
            <DetailState
                title="We could not load this role"
                tone="error"
            >
                <p>
                    Please check your connection and refresh the page, or
                    return to the Careers page to see all openings.
                </p>

                <Link
                    className="careers-btn careers-btn--primary"
                    to="/careers"
                >
                    <ArrowLeft size={16} strokeWidth={2.2} aria-hidden="true" />
                    Back to Careers
                </Link>
            </DetailState>
        );
    }

    // Prepare job data
    const heading = splitTitle(job.title);
    const summary = getSummary(job);
    const facts = getFacts(job);

    const paragraphs = String(job.description || "")
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

    const preferredSkills = asList(job.preferredSkills);

    // ========================================
    // PAGE JSX
    // ========================================

    return (
        <main className="careers-page careers-detail">

            {/* HERO SECTION */}

            <section className="careers-detail__hero">
                <div className="careers-inner">

                    <Link
                        className="careers-detail__back"
                        to="/careers"
                    >
                        <ArrowLeft
                            size={16}
                            strokeWidth={2.2}
                            aria-hidden="true"
                        />
                        Back to Careers
                    </Link>

                    <header className="careers-detail__heading">

                        <span className="careers-detail__eyebrow">
                            FasCave Careers
                        </span>

                        <h1>
                            {heading.lead}

                            <span className="careers-detail__title-accent">
                                {heading.accent}
                            </span>
                        </h1>

                        {summary && (
                            <p className="careers-detail__summary">
                                {summary}
                            </p>
                        )}

                    </header>

                    <hr className="careers-detail__divider" />

                    <InfoPanel facts={facts} />

                </div>
            </section>

            {/* JOB DETAILS */}

            <section className="careers-detail__content">
                <div className="careers-inner careers-detail__stack">

                    {paragraphs.length > 0 && (
                        <section className="careers-detail__card">

                            <header className="careers-detail__card-head">
                                <span className="careers-detail__card-icon">
                                    <FileText
                                        size={19}
                                        strokeWidth={1.8}
                                        aria-hidden="true"
                                    />
                                </span>

                                <h2>About the Role</h2>
                            </header>

                            <div className="careers-detail__body">
                                {paragraphs.map((paragraph, index) => (
                                    <p key={`${index}-${paragraph.slice(0, 24)}`}>
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                        </section>
                    )}

                    <div className="careers-detail__grid">

                        <DetailCard
                            title="Key Responsibilities"
                            icon={ListChecks}
                            items={job.responsibilities}
                            fallback="Responsibilities for this role will be discussed during the hiring process."
                        />

                        <DetailCard
                            title="Requirements"
                            icon={BadgeCheck}
                            items={job.requirements}
                            fallback="Requirements for this role will be discussed during the hiring process."
                        />

                        {preferredSkills.length > 0 && (
                            <DetailCard
                                title="Preferred Skills"
                                icon={Sparkles}
                                items={job.preferredSkills}
                                className="careers-detail__card--full"
                            />
                        )}

                    </div>
                </div>
            </section>

            {/* APPLY NOW SECTION */}

            <section className="careers-detail__apply">
                <div className="careers-inner">

                    <div className="careers-detail__apply-card">

                        <span className="careers-detail__apply-eyebrow">
                            Interested in this position?
                        </span>

                        <h2>Apply Now</h2>

                        <p>
                            Share your portfolio and tell us what you have
                            built. We read every application and will reach
                            out if there is a fit.
                        </p>

                        <button
                            type="button"
                            className="careers-btn careers-btn--primary"
                            onClick={() => navigate("/careers#careers-apply")}
                        >
                            Apply Now
                            <ArrowLeft
                                size={16}
                                style={{ transform: "rotate(180deg)" }}
                            />
                        </button>

                    </div>
                </div>
            </section>

        </main>
    );
};

export default CareerDetails;
