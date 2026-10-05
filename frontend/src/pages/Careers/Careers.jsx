import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    ArrowRight,
    ArrowUpRight,
    Briefcase,
    Cpu,
    Flame,
    Orbit,
    Rocket,
    Send,
    Sparkles,
    Workflow,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { goToContactForm } from "../../utils/contactNavigation";
import {
    prefersReducedMotion,
    supportsIntersectionObserver,
} from "../../utils/motion";
import useRevealOnScroll from "../../hooks/useRevealOnScroll";
import { useCollection, useSingleton } from "../../hooks/useContent";
import {
    CONSOLE_BADGE,
    CONSOLE_LABEL,
    CONSOLE_SUB,
    CULTURE_POINTS,
    CULTURE_TAGS,
    HERO_CHIPS,
    HERO_FACTS,
    HERO_PARTICLES,
    TIMELINE,
    careersFallback,
    careerIcon,
    jobsFallback,
} from "./data/careersData";

import "./Careers.css";

/* =========================================================
   SMALL HELPERS
   ========================================= */

/*
  The CMS stores a highlight as display text — "8+", "150+".
  The counter animates, so pull the digits out and keep any
  suffix for the `<em>` beside it.
*/
function parseHighlight(value) {
    const text = String(value ?? "").trim();
    const digits = text.match(/\d+/);

    if (!digits) {
        return { value: 0, suffix: text };
    }

    return {
        value: Number(digits[0]),
        suffix: text.replace(/\d+/g, ""),
    };
}

/* Deep-merge the CMS document over the local fallbacks, so a
   partially filled admin form never blanks a section. */
function resolveSection(fallback, incoming) {
    if (!incoming || typeof incoming !== "object") return fallback;

    return { ...fallback, ...incoming };
}

/* Animated counter, no external libraries */
function useCountUp(target, active, duration = 1600) {
    const [value, setValue] = useState(() =>
        prefersReducedMotion() ? target : 0
    );
    const frameRef = useRef(0);

    useEffect(() => {
        if (!active || prefersReducedMotion()) return undefined;

        const start = performance.now();

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            setValue(Math.round(target * eased));

            if (progress < 1) {
                frameRef.current = requestAnimationFrame(tick);
            }
        };

        frameRef.current = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(frameRef.current);
    }, [target, active, duration]);

    return value;
}

function StatCard({ value, suffix, label, active, index }) {
    const current = useCountUp(value, active);

    return (
        <div
            className="careers-stat"
            style={{ "--careers-stat-delay": `${index * 90}ms` }}
        >
            <span className="careers-stat__value">
                {current}
                <em>{suffix}</em>
            </span>
            <span className="careers-stat__label">{label}</span>
        </div>
    );
}

/*
  One job opening. `meta` is assembled from whichever of
  location and type the admin filled in, so a role missing
  both still reads cleanly instead of showing a stray slash.
*/
function RoleCard({ role }) {
    const Icon = role.icon;

    return (
        <article
            className="careers-role-card"
            onMouseMove={(event) => {
                const card = event.currentTarget;
                const rect = card.getBoundingClientRect();

                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;

                card.style.setProperty("--rx", `${(-y * 7).toFixed(2)}deg`);
                card.style.setProperty("--ry", `${(x * 8).toFixed(2)}deg`);
            }}
            onMouseLeave={(event) => {
                const card = event.currentTarget;
                card.style.setProperty("--rx", "0deg");
                card.style.setProperty("--ry", "0deg");
            }}
        >
            <span className="careers-role-card__glow" aria-hidden="true" />

            <header className="careers-role-card__head">
                <span className="careers-role-card__icon">
                    <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
                </span>
                <h3 className="careers-role-card__title">{role.role}</h3>
            </header>

            <p className="careers-role-card__text">{role.description}</p>

            {role.meta && (
                <span className="careers-role-card__meta">
                    {role.meta}
                </span>
            )}

            <a className="careers-role-card__cta" href="#careers-apply">
                View Role
                <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </a>
        </article>
    );
}

/* =========================================================
   PAGE
========================================= */

function Careers() {
    const navigate = useNavigate();

    /* ---- CMS -------------------------------------------------------
       The singleton carries every editable string on this page; the
       jobs collection carries the role cards. Both fall back to the
       local copy in data/careersData.js, so the page renders fully
       before the request lands and stays usable if it fails.
       ------------------------------------------------------------ */
    const { data: careers } = useSingleton(
        "/api/content/careers",
        careersFallback
    );

    const { items: jobItems } = useCollection(
        "/api/content/careers/jobs",
        jobsFallback
    );

    const {
        hero,
        intro,
        culture,
        cta,
        stats,
        roles,
        reasons,
        openCount,
    } = useMemo(() => {
        const doc = careers && Object.keys(careers).length
            ? careers
            : careersFallback;

        const nextHero = resolveSection(careersFallback.hero, doc.hero);
        const nextIntro = resolveSection(careersFallback.intro, doc.intro);
        const nextCulture = resolveSection(
            careersFallback.culture,
            doc.culture
        );
        const nextCta = resolveSection(careersFallback.cta, doc.cta);

        const nextHighlights = Array.isArray(doc.highlights) &&
            doc.highlights.length
            ? doc.highlights
            : careersFallback.highlights;

        const nextReasons = Array.isArray(nextCulture.items) &&
            nextCulture.items.length
            ? nextCulture.items
            : careersFallback.culture.items;

        const nextRoles = jobItems
            .filter((job) => job?.title)
            .map((job) => ({
                id: job._id || job.slug || job.title,
                role: job.title,
                description: job.summary || job.department || "",
                meta: [job.location, job.type].filter(Boolean).join(" / "),
                icon: careerIcon(job.icon),
            }));

        return {
            hero: nextHero,
            intro: nextIntro,
            culture: nextCulture,
            cta: nextCta,
            // Highlights are stored as text ("8+"), the counter needs
            // the digits and a suffix.
            stats: nextHighlights.map((item) => ({
                ...item,
                ...parseHighlight(item.value),
            })),
            roles: nextRoles,
            reasons: nextReasons.map((item) => ({
                ...item,
                icon: careerIcon(item.icon, "Sparkles"),
            })),
            openCount: nextRoles.length,
        };
    }, [careers, jobItems]);

    const statsRef = useRef(null);
    const [statsActive, setStatsActive] = useState(
        () => !supportsIntersectionObserver()
    );
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    /* ---- Mouse parallax (hero only, disabled on touch / reduced motion) */
    const handleHeroMouseMove = useCallback(
        (event) => {
            if (prefersReducedMotion()) return;
            if (event.pointerType && event.pointerType !== "mouse") return;

            const rect = event.currentTarget.getBoundingClientRect();

            const px = (event.clientX - rect.left) / rect.width - 0.5;
            const py = (event.clientY - rect.top) / rect.height - 0.5;

            setTilt({ x: px, y: py });
        },
        []
    );

    const handleHeroMouseLeave = useCallback(() => {
        setTilt({ x: 0, y: 0 });
    }, []);

    /* ---- Stats counter trigger */
    useEffect(() => {
        const node = statsRef.current;
        if (!node || !supportsIntersectionObserver()) return undefined;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setStatsActive(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.3 }
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, []);

    const [positionsRef] = useRevealOnScroll();
    const [reasonsRef] = useRevealOnScroll();
    const [cultureRef] = useRevealOnScroll();
    const [timelineRef] = useRevealOnScroll();

    /* Keeps the page above the fixed navbar */
    const heroStyle = {
        "--careers-tilt-x": `${(tilt.x * -14).toFixed(2)}px`,
        "--careers-tilt-y": `${(tilt.y * -10).toFixed(2)}px`,
        "--careers-glow-x": `${(50 + tilt.x * 16).toFixed(2)}%`,
        "--careers-glow-y": `${(38 + tilt.y * 14).toFixed(2)}%`,
    };

    return (
        <main className="careers-page" id="careers">
            {/* ================= HERO ================= */}
            <section
                className="careers-hero"
                style={heroStyle}
                onMouseMove={handleHeroMouseMove}
                onMouseLeave={handleHeroMouseLeave}
                aria-labelledby="careers-hero-title"
            >
                <span className="careers-hero__grid" aria-hidden="true" />
                <span className="careers-hero__glow" aria-hidden="true" />
                <span className="careers-hero__beam" aria-hidden="true" />
                <span className="careers-hero__ring" aria-hidden="true" />
                <span className="careers-hero__scan" aria-hidden="true" />

                <div className="careers-hero__particles" aria-hidden="true">
                    {HERO_PARTICLES.map((particle, index) => (
                        <i
                            key={index}
                            className="careers-particle"
                            style={{
                                left: particle.left,
                                top: particle.top,
                                width: particle.size,
                                height: particle.size,
                                animationDelay: particle.delay,
                                animationDuration: particle.dur,
                                "--careers-drift": `${particle.drift}px`,
                            }}
                        />
                    ))}
                </div>

                <div className="careers-hero__inner">
                    <div className="careers-hero__copy">
                        <span className="careers-eyebrow">
                            <Sparkles size={14} strokeWidth={2} aria-hidden="true" />
                            {hero.eyebrow}
                        </span>

                        <h1
                            className="careers-hero__title"
                            id="careers-hero-title"
                        >
                            {hero.heading}
                            <span className="careers-hero__title-accent">
                                {hero.highlightText}
                            </span>
                        </h1>

                        <p className="careers-hero__lead">
                            {hero.description}
                        </p>

                        <div className="careers-hero__actions">
                            <a className="careers-btn careers-btn--primary" href={hero.ctaHref}>
                                {hero.ctaLabel}
                                <ArrowRight
                                    size={17}
                                    strokeWidth={2.4}
                                    aria-hidden="true"
                                />
                            </a>

                            <a className="careers-btn careers-btn--ghost" href="#careers-culture">
                                Meet Our Culture
                            </a>
                        </div>

                        <ul className="careers-hero__facts">
                            {HERO_FACTS.map(({ icon: Icon, label }) => (
                                <li key={label}>
                                    <Icon size={15} strokeWidth={1.9} aria-hidden="true" />
                                    {label}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ---- Floating career command center ---- */}
                    <div className="careers-console" aria-hidden="true">
                        <div className="careers-console__float">
                            <span className="careers-console__orbit careers-console__orbit--one" />
                            <span className="careers-console__orbit careers-console__orbit--two" />

                            <div className="careers-console__card">
                                <div className="careers-console__head">
                                    <span className="careers-console__dot" />
                                    <span className="careers-console__dot" />
                                    <span className="careers-console__dot" />
                                    <span className="careers-console__label">
                                        {CONSOLE_LABEL}
                                    </span>
                                </div>

                                <div className="careers-console__body">
                                    <span className="careers-console__eyebrow">
                                        OPEN POSITIONS
                                    </span>

                                    <div className="careers-console__figure">
                                        <span className="careers-console__number">
                                            {openCount}
                                        </span>
                                        <span className="careers-console__pulse" />
                                    </div>

                                    <div className="careers-console__meta">
                                        <span className="careers-console__badge">
                                            <Flame size={13} strokeWidth={2} />
                                            {CONSOLE_BADGE}
                                        </span>
                                        <span className="careers-console__sub">
                                            {CONSOLE_SUB}
                                        </span>
                                    </div>

                                    <div className="careers-console__bars">
                                        <span style={{ "--careers-bar": "82%" }} />
                                        <span style={{ "--careers-bar": "64%" }} />
                                        <span style={{ "--careers-bar": "47%" }} />
                                        <span style={{ "--careers-bar": "91%" }} />
                                        <span style={{ "--careers-bar": "58%" }} />
                                        <span style={{ "--careers-bar": "73%" }} />
                                    </div>
                                </div>
                            </div>

                            {HERO_CHIPS.map((chip) => {
                                const Icon = chip.icon;

                                return (
                                    <div
                                        key={chip.label}
                                        className="careers-console__chip"
                                        style={{
                                            top: chip.pos,
                                            animationDelay: chip.delay,
                                        }}
                                    >
                                        <span className="careers-console__chip-line" />
                                        <span className="careers-console__chip-body">
                                            <Icon size={15} strokeWidth={1.9} />
                                            {chip.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <a className="careers-scroll" href="#careers-roles" aria-label="Scroll to open positions">
                    <span />
                </a>
            </section>

            {/* ================= OPEN POSITIONS ================= */}
            <section
                className="careers-section careers-roles"
                id="careers-roles"
                aria-labelledby="careers-roles-title"
                ref={positionsRef}
            >
                <div className="careers-inner">
                    <header className="careers-section__head" data-reveal>
                        <span className="careers-eyebrow">
                            <Briefcase size={14} strokeWidth={2} aria-hidden="true" />
                            {intro.eyebrow}
                        </span>

                        <h2 className="careers-section__title" id="careers-roles-title">
                            {intro.heading}
                        </h2>

                        <p className="careers-section__subtitle">
                            {intro.description}
                        </p>
                    </header>
                </div>

                <div className="careers-marquee" data-reveal>
                    <div className="careers-marquee__track">
                        {[0, 1].map((group) => (
                            <div
                                className="careers-marquee__group"
                                key={group}
                                aria-hidden={group === 1 ? "true" : undefined}
                            >
                                {roles.map((role) => (
                                    <RoleCard
                                        key={`${group}-${role.id}`}
                                        role={role}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= STATS ================= */}
            <section
                className="careers-section careers-stats-section"
                aria-label="Company statistics"
                ref={statsRef}
            >
                <div className="careers-inner">
                    <div
                        className={`careers-stats${
                            statsActive ? " is-active" : ""
                        }`}
                    >
                        {stats.map((stat, index) => (
                            <StatCard
                                key={stat.label}
                                {...stat}
                                index={index}
                                active={statsActive}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= WHY JOIN US ================= */}
            <section
                className="careers-section careers-why"
                aria-labelledby="careers-why-title"
            >
                <div className="careers-inner" ref={reasonsRef}>
                    <header className="careers-section__head" data-reveal>
                        <span className="careers-eyebrow">
                            <Cpu size={14} strokeWidth={2} aria-hidden="true" />
                            {culture.eyebrow}
                        </span>

                        <h2 className="careers-section__title" id="careers-why-title">
                            {culture.heading}
                        </h2>
                    </header>

                    <div className="careers-why__grid">
                        {reasons.map((reason, index) => {
                            const Icon = reason.icon;

                            return (
                                <article
                                    className="careers-why-card"
                                    key={reason.title}
                                    data-reveal
                                    style={{
                                        "--careers-delay": `${index * 90}ms`,
                                    }}
                                >
                                    <span className="careers-why-card__edge" aria-hidden="true" />

                                    <header className="careers-why-card__head">
                                        <span className="careers-why-card__num">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <span className="careers-why-card__icon">
                                            <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
                                        </span>
                                    </header>

                                    <h3 className="careers-why-card__title">
                                        {reason.title}
                                    </h3>
                                    <p className="careers-why-card__text">
                                        {reason.description}
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ================= CULTURE ================= */}
            <section
                className="careers-section careers-culture"
                id="careers-culture"
                aria-labelledby="careers-culture-title"
            >
                <span className="careers-culture__wash" aria-hidden="true" />
                <span className="careers-culture__grid" aria-hidden="true" />

                <div className="careers-inner" ref={cultureRef}>
                    <div className="careers-culture__layout">
                        <div className="careers-culture__copy" data-reveal>
                            <span className="careers-eyebrow">
                                <Orbit size={14} strokeWidth={2} aria-hidden="true" />
                                OUR CULTURE
                            </span>

                            <h2
                                className="careers-section__title"
                                id="careers-culture-title"
                            >
                                More Than A Job
                            </h2>

                            <p className="careers-culture__text">
                                We believe great work happens when curious people
                                are given the freedom to experiment, collaborate,
                                and build.
                            </p>

                            <ul className="careers-culture__points">
                                {CULTURE_POINTS.map((point) => (
                                    <li key={point}>
                                        <span className="careers-culture__point-dot" />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="careers-culture__field" aria-hidden="true">
                            <span className="careers-culture__core" />
                            <span className="careers-culture__halo" />

                            {CULTURE_TAGS.map((tag) => (
                                <span
                                    className={`careers-culture-tag careers-culture-tag--${tag.tone}`}
                                    key={tag.label}
                                    style={{
                                        left: `${tag.x}%`,
                                        top: `${tag.y}%`,
                                        animationDuration: tag.dur,
                                        animationDelay: tag.delay,
                                    }}
                                >
                                    {tag.label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= TIMELINE ================= */}
            <section
                className="careers-section careers-journey"
                aria-labelledby="careers-journey-title"
            >
                <div className="careers-inner" ref={timelineRef}>
                    <header className="careers-section__head" data-reveal>
                        <span className="careers-eyebrow">
                            <Workflow size={14} strokeWidth={2} aria-hidden="true" />
                            LIFE AT FASCAVE
                        </span>

                        <h2 className="careers-section__title" id="careers-journey-title">
                            How Your Journey Runs
                        </h2>
                    </header>

                    <ol className="careers-timeline">
                        {TIMELINE.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <li
                                    className="careers-timeline__step"
                                    key={step.stage}
                                    data-reveal
                                    style={{ "--careers-delay": `${index * 130}ms` }}
                                >
                                    <span className="careers-timeline__node">
                                        <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                                    </span>

                                    <h3 className="careers-timeline__stage">
                                        {step.stage}
                                    </h3>
                                    <p className="careers-timeline__text">
                                        {step.description}
                                    </p>

                                    {index < TIMELINE.length - 1 && (
                                        <span
                                            className="careers-timeline__arrow"
                                            aria-hidden="true"
                                        >
                                            <ArrowRight size={16} strokeWidth={2.2} />
                                        </span>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </section>

            {/* ================= APPLY CTA ================= */}
            <section
                className="careers-section careers-apply"
                id="careers-apply"
                aria-labelledby="careers-apply-title"
            >
                <span className="careers-apply__orb" aria-hidden="true" />
                <span className="careers-apply__ring" aria-hidden="true" />
                <span className="careers-apply__grid" aria-hidden="true" />

                <div className="careers-inner">
                    <div className="careers-apply__content">
<span className="careers-eyebrow">
                                <Rocket size={14} strokeWidth={2} aria-hidden="true" />
                                {cta.eyebrow}
                            </span>

                            <h2
                                className="careers-apply__title"
                                id="careers-apply-title"
                            >
                                {cta.heading}
                            </h2>

                            <p className="careers-apply__subtitle">
                                {cta.description}
                            </p>

                            <div className="careers-apply__actions">
                                <a
                                    className="careers-btn careers-btn--primary"
                                    href={cta.buttonHref}
                                >
                                    {cta.buttonLabel}
                                    <ArrowUpRight
                                        size={17}
                                        strokeWidth={2.4}
                                        aria-hidden="true"
                                    />
                                </a>

                                <button
                                    type="button"
                                    className="careers-btn careers-btn--ghost"
                                    onClick={() => goToContactForm(navigate)}
                                >
                                    Send Your Resume
                                    <Send
                                        size={16}
                                        strokeWidth={2.2}
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Careers;
