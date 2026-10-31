import CareerApplicationForm from "./components/CareerApplicationForm";
import { apiUrl } from "../../utils/apiBase";

import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    ArrowRight,
    Briefcase,
    Cpu,
    Flame,
    Orbit,
    Rocket,
    Sparkles,
    Workflow,
} from "lucide-react";

import { Link } from "react-router-dom";

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
} from "./data/careersData";

import ResumeButton from "./components/ResumeButton";
import "./Careers.css";


/* =========================================================
   SMALL HELPERS
========================================================= */

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


/* Deep-merge CMS document over local fallbacks */
function resolveSection(fallback, incoming) {
    if (!incoming || typeof incoming !== "object") return fallback;

    return { ...fallback, ...incoming };
}


/* Animated counter */
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


/* =========================================================
   STAT CARD
========================================================= */

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

            <span className="careers-stat__label">
                {label}
            </span>
        </div>
    );
}


/* =========================================================
   ROLE CARD
========================================================= */

function RoleCard({ role }) {
    const Icon = role.icon;

    return (
        <Link
            className="careers-role-card"
            to={`/careers/${encodeURIComponent(role.slug)}`}
            aria-label={`View role: ${role.role}`}
        >
            <span
                className="careers-role-card__glow"
                aria-hidden="true"
            />

            <header className="careers-role-card__head">
                <span className="careers-role-card__icon">
                    <Icon
                        size={22}
                        strokeWidth={1.7}
                        aria-hidden="true"
                    />
                </span>

                <h3 className="careers-role-card__title">
                    {role.role}
                </h3>
            </header>

            <p className="careers-role-card__text">
                {role.description}
            </p>

            {role.meta && (
                <span className="careers-role-card__meta">
                    {role.meta}
                </span>
            )}

            <span
                className="careers-role-card__cta"
                aria-hidden="true"
            >
                View Role

                <ArrowRight
                    size={16}
                    strokeWidth={2.2}
                    aria-hidden="true"
                />
            </span>
        </Link>
    );
}


/* =========================================================
   CAREERS PAGE
========================================================= */

function Careers() {

    /* =====================================================
       CMS CONTENT
    ===================================================== */

    const { data: careers } = useSingleton(
        "/api/content/careers",
        careersFallback
    );

    const {
        items: jobItems,
        status: jobsStatus
    } = useCollection(
        "/api/content/careers/jobs",
        []
    );


    /* =====================================================
       RESOLVE CAREERS DATA
    ===================================================== */

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

        const nextHero = resolveSection(
            careersFallback.hero,
            doc.hero
        );

        const nextIntro = resolveSection(
            careersFallback.intro,
            doc.intro
        );

        const nextCulture = resolveSection(
            careersFallback.culture,
            doc.culture
        );

        const nextCta = resolveSection(
            careersFallback.cta,
            doc.cta
        );

        const nextHighlights =
            Array.isArray(doc.highlights) && doc.highlights.length
                ? doc.highlights
                : careersFallback.highlights;

        const nextReasons =
            Array.isArray(nextCulture.items) && nextCulture.items.length
                ? nextCulture.items
                : careersFallback.culture.items;

        const nextRoles = jobItems
            .filter((job) => job?.title)
            .map((job) => ({
                id: job._id || job.slug || job.title,
                slug: job.slug || job._id,
                role: job.title,
                description: job.summary || job.department || "",
                meta: [job.location, job.type]
                    .filter(Boolean)
                    .join(" / "),
                icon: careerIcon(job.icon),
            }));

        return {
            hero: nextHero,
            intro: nextIntro,
            culture: nextCulture,
            cta: nextCta,

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


    /* =====================================================
       STATES AND REFS
    ===================================================== */

    const statsRef = useRef(null);

    const [statsActive, setStatsActive] = useState(
        () => !supportsIntersectionObserver()
    );

    const [tilt, setTilt] = useState({
        x: 0,
        y: 0
    });


    /* =====================================================
       HERO MOUSE PARALLAX
    ===================================================== */

    const handleHeroMouseMove = useCallback(
        (event) => {

            if (prefersReducedMotion()) return;

            if (
                event.pointerType &&
                event.pointerType !== "mouse"
            ) {
                return;
            }

            const rect = event.currentTarget.getBoundingClientRect();

            const px =
                (event.clientX - rect.left) / rect.width - 0.5;

            const py =
                (event.clientY - rect.top) / rect.height - 0.5;

            setTilt({
                x: px,
                y: py
            });
        },
        []
    );


    const handleHeroMouseLeave = useCallback(() => {
        setTilt({
            x: 0,
            y: 0
        });
    }, []);


    /* =====================================================
       CAREER APPLICATION API SUBMISSION
    ===================================================== */

    const handleApplicationSubmit = async (applicationData) => {

        const payload = new FormData();

        // Add normal form fields
        Object.entries(applicationData).forEach(([key, value]) => {

            if (
                key === "resume" ||
                key === "skills"
            ) {
                return;
            }

            payload.append(key, value ?? "");
        });


        // Add skills as JSON
        payload.append(
            "skills",
            JSON.stringify(applicationData.skills || [])
        );


        // Add resume files
        (applicationData.resume || []).forEach((file) => {
            payload.append("resume", file);
        });


        // Send application to backend
        const response = await fetch(
            apiUrl("/api/content/careers/apply"),
            {
                method: "POST",
                body: payload,
            }
        );


        const responseText = await response.text();

        let result;

        try {
            result = JSON.parse(responseText);
        } catch (error) {
            console.error("Non-JSON API Response:", responseText);
            throw new Error(
                `Server returned HTML instead of JSON. Status: ${response.status}. Check API URL and backend route.`
            );
        }

        if (!response.ok) {
            throw new Error(result.message || "Unable to submit your application.");
        }

        return result;
    };


    /* =====================================================
       STATS COUNTER TRIGGER
    ===================================================== */

    useEffect(() => {

        const node = statsRef.current;

        if (
            !node ||
            !supportsIntersectionObserver()
        ) {
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        setStatsActive(true);

                        observer.disconnect();
                    }
                });
            },
            {
                threshold: 0.3
            }
        );

        observer.observe(node);

        return () => observer.disconnect();

    }, []);


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const [positionsRef] = useRevealOnScroll();
    const [reasonsRef] = useRevealOnScroll();
    const [cultureRef] = useRevealOnScroll();
    const [timelineRef] = useRevealOnScroll();


    /* =====================================================
       HERO STYLE
    ===================================================== */

    const heroStyle = {
        "--careers-tilt-x": `${(tilt.x * -14).toFixed(2)}px`,
        "--careers-tilt-y": `${(tilt.y * -10).toFixed(2)}px`,
        "--careers-glow-x": `${(50 + tilt.x * 16).toFixed(2)}%`,
        "--careers-glow-y": `${(38 + tilt.y * 14).toFixed(2)}%`,
    };


    /* =====================================================
       PAGE JSX
    ===================================================== */

    return (

        <main
            className="careers-page"
            id="careers"
        >

            {/* ================= HERO ================= */}

            <section
                className="careers-hero"
                style={heroStyle}
                onMouseMove={handleHeroMouseMove}
                onMouseLeave={handleHeroMouseLeave}
                aria-labelledby="careers-hero-title"
            >

                <span
                    className="careers-hero__grid"
                    aria-hidden="true"
                />

                <span
                    className="careers-hero__glow"
                    aria-hidden="true"
                />

                <span
                    className="careers-hero__beam"
                    aria-hidden="true"
                />

                <span
                    className="careers-hero__ring"
                    aria-hidden="true"
                />

                <span
                    className="careers-hero__scan"
                    aria-hidden="true"
                />


                <div
                    className="careers-hero__particles"
                    aria-hidden="true"
                >

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

                            <Sparkles
                                size={14}
                                strokeWidth={2}
                                aria-hidden="true"
                            />

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

                            <a
                                className="careers-btn careers-btn--primary"
                                href={hero.ctaHref}
                            >

                                {hero.ctaLabel}

                                <ArrowRight
                                    size={17}
                                    strokeWidth={2.4}
                                    aria-hidden="true"
                                />

                            </a>


                            <a
                                className="careers-btn careers-btn--ghost"
                                href="#careers-culture"
                            >
                                Meet Our Culture
                            </a>

                        </div>


                        <ul className="careers-hero__facts">

                            {HERO_FACTS.map(({ icon: Icon, label }) => (

                                <li key={label}>

                                    <Icon
                                        size={15}
                                        strokeWidth={1.9}
                                        aria-hidden="true"
                                    />

                                    {label}

                                </li>

                            ))}

                        </ul>

                    </div>


                    {/* FLOATING CAREER COMMAND CENTER */}

                    <div
                        className="careers-console"
                        aria-hidden="true"
                    >

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

                                            <Flame
                                                size={13}
                                                strokeWidth={2}
                                            />

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

                                            <Icon
                                                size={15}
                                                strokeWidth={1.9}
                                            />

                                            {chip.label}

                                        </span>

                                    </div>

                                );
                            })}

                        </div>

                    </div>

                </div>


                <a
                    className="careers-scroll"
                    href="#careers-roles"
                    aria-label="Scroll to open positions"
                >
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

                    <header
                        className="careers-section__head"
                        data-reveal
                    >

                        <span className="careers-eyebrow">

                            <Briefcase
                                size={14}
                                strokeWidth={2}
                                aria-hidden="true"
                            />

                            {intro.eyebrow}

                        </span>


                        <h2
                            className="careers-section__title"
                            id="careers-roles-title"
                        >
                            {intro.heading}
                        </h2>


                        <p className="careers-section__subtitle">
                            {intro.description}
                        </p>

                    </header>

                </div>


                <div className="careers-inner">

                    <div
                        className="careers-roles__grid"
                        data-reveal
                        aria-live="polite"
                    >

                        {jobsStatus === "loading" && (

                            <div
                                className="careers-roles__state"
                                role="status"
                            >

                                <span
                                    className="careers-roles__spinner"
                                    aria-hidden="true"
                                />

                                <h3>Loading open roles…</h3>

                                <p>
                                    Fetching the latest openings from our team.
                                </p>

                            </div>

                        )}


                        {jobsStatus === "error" && (

                            <div
                                className="careers-roles__state"
                                role="alert"
                            >

                                <h3>We could not load open roles</h3>

                                <p>
                                    Please check your connection and refresh
                                    the page, or send us your resume below.
                                </p>

                            </div>

                        )}


                        {(jobsStatus === "empty" ||
                            (jobsStatus === "ready" && roles.length === 0)
                        ) && (

                                <div className="careers-roles__state">

                                    <h3>No open roles right now</h3>

                                    <p>
                                        We are not hiring at the moment, but we
                                        are always happy to meet good people.
                                    </p>

                                </div>

                            )}


                        {jobsStatus === "ready" &&
                            roles.map((role) => (

                                <RoleCard
                                    key={role.id}
                                    role={role}
                                />

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
                        className={`careers-stats${statsActive ? " is-active" : ""}`}
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

                <div
                    className="careers-inner"
                    ref={reasonsRef}
                >

                    <header
                        className="careers-section__head"
                        data-reveal
                    >

                        <span className="careers-eyebrow">

                            <Cpu
                                size={14}
                                strokeWidth={2}
                                aria-hidden="true"
                            />

                            {culture.eyebrow}

                        </span>


                        <h2
                            className="careers-section__title"
                            id="careers-why-title"
                        >
                            {culture.heading}
                        </h2>

                    </header>


                    <div className="careers-why__grid">

                        {reasons.map((reason, index) => {

                            const Icon = reason.icon;

                            return (

                                <article
                                    className="careers-why-card"
                                    key={index}
                                    data-reveal
                                    style={{
                                        "--careers-delay": `${index * 90}ms`,
                                    }}
                                >

                                    <span
                                        className="careers-why-card__edge"
                                        aria-hidden="true"
                                    />


                                    <header className="careers-why-card__head">

                                        <span className="careers-why-card__num">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                        <span className="careers-why-card__icon">

                                            <Icon
                                                size={22}
                                                strokeWidth={1.7}
                                                aria-hidden="true"
                                            />

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

                <span
                    className="careers-culture__wash"
                    aria-hidden="true"
                />

                <span
                    className="careers-culture__grid"
                    aria-hidden="true"
                />


                <div
                    className="careers-inner"
                    ref={cultureRef}
                >

                    <div className="careers-culture__layout">

                        <div
                            className="careers-culture__copy"
                            data-reveal
                        >

                            <span className="careers-eyebrow">

                                <Orbit
                                    size={14}
                                    strokeWidth={2}
                                    aria-hidden="true"
                                />

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


                        <div
                            className="careers-culture__field"
                            aria-hidden="true"
                        >

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

                <div
                    className="careers-inner"
                    ref={timelineRef}
                >

                    <header
                        className="careers-section__head"
                        data-reveal
                    >

                        <span className="careers-eyebrow">

                            <Workflow
                                size={14}
                                strokeWidth={2}
                                aria-hidden="true"
                            />

                            LIFE AT FASCAVE

                        </span>


                        <h2
                            className="careers-section__title"
                            id="careers-journey-title"
                        >
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
                                    style={{
                                        "--careers-delay": `${index * 130}ms`,
                                    }}
                                >

                                    <span className="careers-timeline__node">

                                        <Icon
                                            size={20}
                                            strokeWidth={1.8}
                                            aria-hidden="true"
                                        />

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
                                            <ArrowRight
                                                size={16}
                                                strokeWidth={2.2}
                                            />
                                        </span>

                                    )}

                                </li>

                            );
                        })}

                    </ol>

                </div>

            </section>


            {/* ================= CAREER APPLICATION ================= */}

            <section
                className="careers-application-section"
                id="careers-apply"
            >

                <div className="careers-application-inner">

                    {/* LEFT CONTENT */}

                    <div className="careers-application-copy">

                        <span className="careers-eyebrow">
                            JOIN OUR TEAM
                        </span>


                        <h2>
                            Build Your Career With
                            <span> FasCave</span>
                        </h2>


                        <p>
                            Be a part of a team that creates impactful
                            digital solutions. Share your details and
                            take the next step in your professional journey.
                        </p>


                        <div className="careers-application-benefits">

                            <div className="careers-application-benefit">
                                <span>♧</span>
                                <p>
                                    Innovative<br />
                                    Work Culture
                                </p>
                            </div>


                            <div className="careers-application-benefit">
                                <span>♙</span>
                                <p>
                                    Growth<br />
                                    Opportunities
                                </p>
                            </div>


                            <div className="careers-application-benefit">
                                <span>▥</span>
                                <p>
                                    Meaningful<br />
                                    Projects
                                </p>
                            </div>


                            <div className="careers-application-benefit">
                                <span>✧</span>
                                <p>
                                    Supportive<br />
                                    Team
                                </p>
                            </div>

                        </div>

                    </div>


                    {/* RIGHT APPLICATION FORM */}

                    <div className="careers-application-form-wrapper">

                        <CareerApplicationForm
                            onSubmit={handleApplicationSubmit}
                        />

                    </div>

                </div>

            </section>

        </main>
    );
}

export default Careers;