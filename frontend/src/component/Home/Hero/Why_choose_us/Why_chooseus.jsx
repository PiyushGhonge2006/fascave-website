import React, { useMemo } from "react";

import {
  ArrowRight,
  Award,
  BadgeCheck,
  Briefcase,
  FileText,
  Gauge,
  Handshake,
  Headphones,
  Layers,
  Medal,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Users,
  UsersRound,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useSingleton } from "../../../../hooks/useContent";
import useRevealOnScroll from "../../../../hooks/useRevealOnScroll";
import "./why_us.css";


/* ======================================================
   ICONS
   ------------------------------------------------------------
   The CMS stores a Lucide icon name as a string, so this map
   is the only place that turns that string into a component.
   Anything unrecognised falls back to the section default.
   ====================================================== */

const iconMap = {
  Award,
  BadgeCheck,
  Briefcase,
  FileText,
  Gauge,
  Handshake,
  Headphones,
  Layers,
  Medal,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Users,
  UsersRound,
  Zap,
};

const resolveIcon = (name, fallback) =>
  iconMap[name] || iconMap[fallback] || Trophy;


/* ======================================================
   FALLBACKS
   ------------------------------------------------------------
   Rendered until the CMS responds, so the section never
   collapses to an empty band on a slow connection.
   ====================================================== */

const fallback = {
  eyebrow: "WHY CHOOSE US",
  heading:
    "Technology that earns its place in your business",
  description:
    "FasCave brings senior engineers, designers and strategists under one roof, so the solution we recommend is the one that actually moves your business forward.",
  ctaLabel: "Learn More About Us",
  ctaHref: "/about-us",
  stats: [
    { id: 1, value: "150+", label: "Projects Delivered", icon: "Trophy" },
    { id: 2, value: "40+", label: "Happy Clients", icon: "Users" },
    { id: 3, value: "8+", label: "Years of Experience", icon: "Award" },
    { id: 4, value: "100%", label: "Client Satisfaction", icon: "BadgeCheck" },
    { id: 5, value: "24/7", label: "Support & Maintenance", icon: "Headphones" },
  ],
  features: [
    {
      title: "Experience",
      icon: "Award",
      description:
        "Eight years of shipped work across web, mobile, cloud and data. We have already met the failure modes your project will meet.",
    },
    {
      title: "Quality Delivery",
      icon: "ShieldCheck",
      description:
        "Reviewed code, tested releases and an agreed scope. Nothing goes live until it is ready for real users.",
    },
    {
      title: "Dedicated Support",
      icon: "Headphones",
      description:
        "A named point of contact, 24/7 maintenance and honest response commitments for every system we hand over.",
    },
    {
      title: "Industry Expertise",
      icon: "Briefcase",
      description:
        "FMCG, jewellery, associations, consulting and B2B — patterns we can reuse instead of reinventing every project.",
    },
  ],
};


/* ======================================================
   STAT CARD
   ====================================================== */

function StatCard({ stat, index }) {
  const Icon = resolveIcon(stat.icon, "Trophy");

  return (
    <div
      className="why-stat-card"
      data-reveal
      style={{ "--why-stagger": `${index * 70}ms` }}
    >
      <span className="why-stat-icon" aria-hidden="true">
        <Icon size={20} strokeWidth={1.75} />
      </span>

      <div className="why-stat-value">{stat.value}</div>

      <div className="why-stat-label">{stat.label}</div>
    </div>
  );
}


/* ======================================================
   FEATURE CARD
   ====================================================== */

function FeatureCard({ feature, index }) {
  const Icon = resolveIcon(feature.icon, "ShieldCheck");

  return (
    <div
      className="why-feature-card"
      data-reveal
      style={{ "--why-stagger": `${index * 80}ms` }}
    >
      <span className="why-feature-icon" aria-hidden="true">
        <Icon size={22} strokeWidth={1.7} />
      </span>

      <h3 className="why-feature-title">{feature.title}</h3>

      <p className="why-feature-text">{feature.description}</p>
    </div>
  );
}


/* ======================================================
   SECTION
   ------------------------------------------------------------
   Dark band. Eyebrow, heading and description sit on the left
   with the CTA on the right; five statistics follow in a row,
   then four benefit boxes beneath them.
   ====================================================== */

export default function WhyChooseUs() {
  const navigate = useNavigate();

  const [sectionRef] = useRevealOnScroll({ stagger: 90 });

  const { data } = useSingleton("/api/why-choose-us", {});

  const content = useMemo(() => {
    const stats =
      Array.isArray(data?.stats) && data.stats.length
        ? data.stats
        : fallback.stats;

    const features =
      Array.isArray(data?.features) && data.features.length
        ? data.features
        : fallback.features;

    return {
      eyebrow: data?.eyebrow || fallback.eyebrow,
      heading: data?.heading || fallback.heading,
      description: data?.description || fallback.description,
      ctaLabel: data?.ctaLabel || fallback.ctaLabel,
      ctaHref: data?.ctaHref || fallback.ctaHref,
      stats,
      features,
    };
  }, [data]);

  return (
    <section
      className="why-section fc-section--dark"
      id="why-choose-us"
      aria-labelledby="why-title"
      ref={sectionRef}
    >
      {/* A single quiet grid wash, masked to the top edge. */}
      <div className="why-grid" aria-hidden="true" />

      <div className="why-container">

        {/* ---------- Heading block + CTA ---------- */}
        <div className="why-head" data-reveal>

          <div className="why-head__text">
            <span className="why-eyebrow">{content.eyebrow}</span>

            <h2 className="why-title" id="why-title">
              {content.heading}
            </h2>

            <p className="why-description">{content.description}</p>
          </div>

          <button
            type="button"
            className="why-button"
            onClick={() => navigate(content.ctaHref)}
          >
            <span>{content.ctaLabel}</span>
            <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
          </button>

        </div>

        {/* ---------- 5 statistics ---------- */}
        <div className="why-stats">
          {content.stats.map((stat, index) => (
            <StatCard
              key={stat.id ?? `${stat.label}-${index}`}
              stat={stat}
              index={index}
            />
          ))}
        </div>

        {/* ---------- 4 benefit boxes ---------- */}
        <div className="why-features">
          {content.features.map((feature, index) => (
            <FeatureCard
              key={`${feature.title}-${index}`}
              feature={feature}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
