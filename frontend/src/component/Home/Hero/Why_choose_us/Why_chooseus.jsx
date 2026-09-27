import React from "react";
import {
  Users,
  FileText,
  Headphones,
  Trophy,
  UsersRound,
  ArrowRight,
} from "lucide-react";

import "./why_us.css";

const stats = [
  {
    id: 1,
    value: "6+",
    label: "Years Experience",
    icon: Users,
    color: "blue",
  },
  {
    id: 2,
    value: "400+",
    label: "Projects Done",
    icon: FileText,
    color: "purple",
  },
  {
    id: 3,
    value: "24/7",
    label: "Team Support",
    icon: Headphones,
    color: "pink",
  },
  {
    id: 4,
    value: "10+",
    label: "Industry Awards",
    icon: Trophy,
    color: "lightBlue",
  },
  {
    id: 5,
    value: "15+",
    label: "Core Professionals",
    icon: UsersRound,
    color: "yellow",
  },
];

function StatCard({ stat }) {
  const Icon = stat.icon;

  return (
    <div className={`why-stat-card ${stat.color}`}>
      <div className="why-stat-icon">
        <Icon size={42} strokeWidth={2.2} />
      </div>

      <div className="why-stat-content">
        <div className="why-stat-value">{stat.value}</div>
        <div className="why-stat-label">{stat.label}</div>
      </div>
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="why-section">

      {/* Background dotted waves */}
      <div className="why-wave why-wave-top">
        <svg
          viewBox="0 0 600 500"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="topDots"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.6" fill="#5f6fff" />
            </pattern>

            <mask id="topMask">
              <ellipse
                cx="600"
                cy="-20"
                rx="420"
                ry="360"
                fill="white"
              />
            </mask>
          </defs>

          <rect
            width="600"
            height="500"
            fill="url(#topDots)"
            mask="url(#topMask)"
            opacity="0.85"
          />
        </svg>
      </div>

      <div className="why-wave why-wave-bottom">
        <svg
          viewBox="0 0 600 500"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="bottomDots"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.6" fill="#5f6fff" />
            </pattern>

            <mask id="bottomMask">
              <ellipse
                cx="0"
                cy="520"
                rx="420"
                ry="360"
                fill="white"
              />
            </mask>
          </defs>

          <rect
            width="600"
            height="500"
            fill="url(#bottomDots)"
            mask="url(#bottomMask)"
            opacity="0.85"
          />
        </svg>
      </div>

      <div className="why-container">

        {/* Top Left */}
        <div className="why-card-position card-top-left">
          <StatCard stat={stats[0]} />
        </div>

        {/* Top Right */}
        <div className="why-card-position card-top-right">
          <StatCard stat={stats[1]} />
        </div>

        {/* Middle Left */}
        <div className="why-card-position card-middle-left">
          <StatCard stat={stats[2]} />
        </div>

        {/* Middle Right */}
        <div className="why-card-position card-middle-right">
          <StatCard stat={stats[3]} />
        </div>

        {/* Bottom Center */}
        <div className="why-card-position card-bottom-center">
          <StatCard stat={stats[4]} />
        </div>

        {/* Center Content */}
        <div className="why-center-content">

          <h2 className="why-title">
            <span>WHY</span>
            <span className="why-gradient-text">CHOOSE US</span>
          </h2>

          <p className="why-description">
            Choose Us For Tailored IT Solutions That Drive Success,
            <br />
            With Expert Professionals Dedicated To Your Business Growth.
          </p>

          <button className="why-button">
            <span>Learn More About Us</span>
            <ArrowRight size={20} />
          </button>

        </div>

      </div>
    </section>
  );
}