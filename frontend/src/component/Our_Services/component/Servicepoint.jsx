import React from "react";
import "./servicepoint.css";
import fascaveLogo from '../../../assets/logo-fascave/Logo.png'

const features = [
  {
    id: "responsive",
    title: "Modern & Responsive",
    description:
      "Beautiful, user-friendly and responsive designs that work seamlessly on all devices.",
    icon: "monitor",
    position: "top",
  },
  {
    id: "scalable",
    title: "Scalable Architecture",
    description:
      "Built with clean and scalable architecture to grow with your business needs.",
    icon: "layers",
    position: "left-top",
  },
  {
    id: "performance",
    title: "High Performance",
    description:
      "Optimized for speed, security and reliability to deliver a seamless user experience.",
    icon: "zap",
    position: "right-top",
  },
  {
    id: "security",
    title: "Secure Development",
    description:
      "We follow best practices to ensure your data and systems remain safe and protected.",
    icon: "shield",
    position: "left-bottom",
  },
  {
    id: "future",
    title: "Future Ready",
    description:
      "Leveraging modern technologies to create innovative and future-ready solutions.",
    icon: "chart",
    position: "right-bottom",
  },
];

function FeatureIcon({ type }) {
  const common = {
    width: 30,
    height: 30,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const icons = {
    monitor: (
      <>
        <rect x="3" y="4" width="18" height="13" rx="1.5" />
        <path d="M8 21h8M12 17v4" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
      </>
    ),
    zap: <path d="m13 2-9 12h7l-1 8 10-13h-7l1-7Z" />,
    shield: (
      <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
    ),
    chart: (
      <>
        <path d="M3 21h18" />
        <rect x="5" y="12" width="4" height="7" />
        <rect x="11" y="8" width="4" height="11" />
        <rect x="17" y="3" width="4" height="16" />
      </>
    ),
  };

  return <svg {...common}>{icons[type]}</svg>;
}

function FeatureCard({ feature }) {
  return (
    <article className={`fc-feature-card fc-${feature.position}`}>
      <div className="fc-icon">
        <FeatureIcon type={feature.icon} />
      </div>

      <div className="fc-feature-content">
        <h3>{feature.title}</h3>
        <span className="fc-accent-line" />
        <p>{feature.description}</p>
      </div>
    </article>
  );
}

export default function Servicepoint() {
  return (
    <section className="fc-why-section" id="why-choose-us">
      <div className="fc-background-glow" />
      <div className="fc-orbit-glow fc-orbit-glow-one" />
      <div className="fc-orbit-glow fc-orbit-glow-two" />

      <div className="fc-section-heading">f

        <h2>
          Modern &amp; <span>Responsive</span>
        </h2>

        <p>
          We build modern, high-performing and future-ready digital solutions
          that help businesses grow and stay ahead in a fast-changing world.
        </p>
      </div>

      <div className="fc-network-stage">
        <div className="fc-orbit fc-orbit-outer" />
        <div className="fc-orbit fc-orbit-middle" />
        <div className="fc-orbit fc-orbit-inner" />

        <svg
          className="fc-connections"
          viewBox="0 0 1200 520"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <g className="fc-connection-lines">
            <path d="M600 165 C600 195 600 200 600 225" />
            <path d="M310 205 C405 205 410 260 480 280" />
            <path d="M890 205 C795 205 790 260 720 280" />
            <path d="M310 425 C405 425 410 365 480 345" />
            <path d="M890 425 C795 425 790 365 720 345" />
          </g>

          <g className="fc-connection-dots">
            <circle cx="600" cy="165" r="4" />
            <circle cx="600" cy="225" r="4" />
            <circle cx="310" cy="205" r="4" />
            <circle cx="480" cy="280" r="4" />
            <circle cx="890" cy="205" r="4" />
            <circle cx="720" cy="280" r="4" />
            <circle cx="310" cy="425" r="4" />
            <circle cx="480" cy="345" r="4" />
            <circle cx="890" cy="425" r="4" />
            <circle cx="720" cy="345" r="4" />
          </g>
        </svg>

        {features.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}


        <div className="fc-center-brand">
          <div className="fc-center-tile">
            <img
              src={fascaveLogo}
              alt="FasCave IT Solutions"
              className="fc-real-logo"
            />

            <span>FASCAVE</span>
            <small>IT SOLUTIONS</small>
          </div>
        </div>
      </div>

      <div className="fc-bottom-note">
        <span className="fc-note-dot" />
        ENGINEERED FOR PERFORMANCE
        <span className="fc-note-dot" />
      </div>
    </section>
  );
}
