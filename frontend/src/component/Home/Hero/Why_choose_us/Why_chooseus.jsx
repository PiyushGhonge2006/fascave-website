import React, { useEffect, useState } from "react";

import {
  Users,
  FileText,
  Headphones,
  Trophy,
  UsersRound,
  ArrowRight,
} from "lucide-react";

import "./why_us.css";


// Icon mapping
const iconMap = {
  Users,
  FileText,
  Headphones,
  Trophy,
  UsersRound,
};


// ================================
// STAT CARD
// ================================

function StatCard({ stat }) {

  const Icon = iconMap[stat.icon];

  return (
    <div className={`why-stat-card ${stat.color}`}>

      <div className="why-stat-icon">
        {Icon && (
          <Icon
            size={42}
            strokeWidth={2.2}
          />
        )}
      </div>

      <div className="why-stat-content">

        <div className="why-stat-value">
          {stat.value}
        </div>

        <div className="why-stat-label">
          {stat.label}
        </div>

      </div>

    </div>
  );
}


// ================================
// MAIN COMPONENT
// ================================

export default function WhyChooseUs() {

  const [stats, setStats] = useState([]);

  // Fetch data from backend
  useEffect(() => {

    fetch("http://localhost:5000/api/why-choose-us")

      .then((response) => response.json())

      .then((result) => {

        if (result.success) {
          setStats(result.data.stats);
        }

      })

      .catch((error) => {

        console.error(
          "Error fetching Why Choose Us data:",
          error
        );

      });

  }, []);


  return (

    <section className="why-section">

      {/* ================================
          BACKGROUND DOTTED WAVES
      ================================= */}

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

              <circle
                cx="2"
                cy="2"
                r="1.6"
                fill="#5f6fff"
              />

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

              <circle
                cx="2"
                cy="2"
                r="1.6"
                fill="#5f6fff"
              />

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


      {/* ================================
          MAIN CONTAINER
      ================================= */}

      <div className="why-container">


        {/* TOP LEFT */}

        <div className="why-card-position card-top-left">

          {stats[0] && (
            <StatCard stat={stats[0]} />
          )}

        </div>


        {/* TOP RIGHT */}

        <div className="why-card-position card-top-right">

          {stats[1] && (
            <StatCard stat={stats[1]} />
          )}

        </div>


        {/* MIDDLE LEFT */}

        <div className="why-card-position card-middle-left">

          {stats[2] && (
            <StatCard stat={stats[2]} />
          )}

        </div>


        {/* MIDDLE RIGHT */}

        <div className="why-card-position card-middle-right">

          {stats[3] && (
            <StatCard stat={stats[3]} />
          )}

        </div>


        {/* BOTTOM CENTER */}

        <div className="why-card-position card-bottom-center">

          {stats[4] && (
            <StatCard stat={stats[4]} />
          )}

        </div>


        {/* ================================
            CENTER CONTENT
        ================================= */}

        <div className="why-center-content">

          <h2 className="why-title">

            <span>
              WHY
            </span>

            <span className="why-gradient-text">
              CHOOSE US
            </span>

          </h2>


          <p className="why-description">

            Choose Us For Tailored IT Solutions That Drive Success,
            <br />

            With Expert Professionals Dedicated To Your Business Growth.

          </p>


          <button className="why-button">

            <span>
              Learn More About Us
            </span>

            <ArrowRight size={20} />

          </button>

        </div>


      </div>

    </section>

  );
}