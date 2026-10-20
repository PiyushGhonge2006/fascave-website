import React from "react";
import "./about_hero_section.css";

import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { goToContactForm } from "../../../utils/contactNavigation"

import Heroimg from "../../../assets/About_us/About-us-hero.png";


const stats = [
  {
    value: "400+",
    label: "Projects Delivered",
    icon: "✥",
  },
  {
    value: "8+",
    label: "Years of Experience",
    icon: "🏆",
  },
  {
    value: "100+",
    label: "Happy Clients",
    icon: "♟",
  },
  {
    value: "10+",
    label: "Industries Served",
    icon: "▦",
  },
];


function About_us_hero() {
  const navigate = useNavigate();

  return (
    <section
      className="about-hero-section"
      aria-labelledby="about-hero-title"
    >

      {/* =========================================
          HERO BACKGROUND IMAGE
          ========================================== */}

      <img
        className="about-hero-section__background"
        src={Heroimg}
        alt=""
        aria-hidden="true"
      />


      {/* =========================================
          DARK SUBTLE OVERLAY
          ========================================== */}

      <div
        className="about-hero-section__overlay"
        aria-hidden="true"
      />


      {/* =========================================
          HERO CONTENT
          ========================================== */}

      <div className="about-hero-section__content">

        {/* =========================================
            LEFT CONTENT
            ========================================== */}

        <div className="about-hero-section__copy">

          {/* Eyebrow */}

          <div className="about-hero-section__eyebrow">
            <span>ABOUT US</span>

            <span
              className="about-hero-section__eyebrow-line"
              aria-hidden="true"
            />
          </div>

          <h1 id="about-hero-title">
            We Build Digital
            <br />
            Solutions That
            <br />
            <span>Drive Growth</span>
          </h1>

          <p>
            We create smart, reliable digital solutions that help
            businesses grow, innovate, and succeed.
          </p>

          {/* =========================================
              BUTTONS
              ========================================== */}

          <div className="about-hero-section__actions">


            {/* Connect With Us */}

            <button
              type="button"
              className="hero-cta"
              onClick={() =>
                goToContactForm(navigate)
              }
            >
              <span className="hero-cta__label">
                Connect With Us
              </span>

              <ArrowRight
                size={17}
                strokeWidth={2}
                className="hero-cta__arrow"
                aria-hidden="true"
              />
            </button>

          </div>

        </div>


        {/* =========================================
            STATS BAR
            ========================================== */}

        <div
          className="about-hero-section__stats"
          aria-label="FasCave statistics"
        >

          {stats.map((stat) => (
            <div
              className="about-hero-section__stat"
              key={stat.label}
            >

              {/* Icon */}

              <span
                className="about-hero-section__stat-icon"
                aria-hidden="true"
              >
                {stat.icon}
              </span>


              {/* Text */}

              <div className="about-hero-section__stat-content">

                <strong>
                  {stat.value}
                </strong>

                <span>
                  {stat.label}
                </span>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}


export default About_us_hero;