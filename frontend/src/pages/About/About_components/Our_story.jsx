import React from "react";
import {
  Eye,
  Target,
  ArrowRight,
} from "lucide-react";

import "./Our_story.css";


function Our_story() {
  return (
    <section
      className="our-story-section"
      id="our-story"
      aria-labelledby="our-story-title"
    >

      {/* Decorative background elements */}

      <span
        className="our-story-section__blob our-story-section__blob--top"
        aria-hidden="true"
      />

      <span
        className="our-story-section__blob our-story-section__blob--bottom"
        aria-hidden="true"
      />

      <div
        className="our-story-section__dots"
        aria-hidden="true"
      />


      <div className="our-story-section__container">

        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div className="our-story-section__left">

          {/* Eyebrow */}

          <div className="our-story-section__eyebrow">
            <span>OUR STORY</span>

            <span
              className="our-story-section__eyebrow-line"
              aria-hidden="true"
            />
          </div>


          {/* Heading */}

          <h2
            className="our-story-section__title"
            id="our-story-title"
          >
            From an Idea to a
            <br />
            Growing{" "}
            <span>Technology Company</span>
          </h2>


          {/* First paragraph */}

          <p className="our-story-section__paragraph">
            Our journey began in 2017, and in January 2024,
            we officially incorporated as a Private Limited
            company, strengthening our commitment to building
            scalable, reliable, and innovative technology
            solutions.
          </p>


          {/* Second paragraph */}

          <p className="our-story-section__paragraph">
            With years of hands-on experience and 400+ projects
            successfully delivered, we have worked across a wide
            range of requirements – from websites and mobile
            applications to custom software, business automation
            solutions, and our own technology products.
          </p>


          {/* =================================================
              OUR SERVICES BUTTON
          ================================================= */}

          <a
            href="/services"
            className="our-story-section__button"
          >
            <span>
              Our Services
            </span>

            <ArrowRight
              size={18}
              strokeWidth={2}
              aria-hidden="true"
            />
          </a>

        </div>


        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div className="our-story-section__right">

          {/* =================================================
              VISION
          ================================================= */}

          <article className="story-info-card story-info-card--vision">

            <div className="story-info-card__icon">
              <Eye
                size={42}
                strokeWidth={1.7}
              />
            </div>

            <div className="story-info-card__content">

              <h3>
                Our Vision
              </h3>

              <p>
                To be the leading provider of smart technology
                solutions that empower businesses, create
                meaningful opportunities, and contribute to a
                more connected and innovative future.
              </p>

            </div>

          </article>


          {/* =================================================
              MISSION
          ================================================= */}

          <article className="story-info-card story-info-card--mission">

            <div className="story-info-card__icon">
              <Target
                size={42}
                strokeWidth={1.7}
              />
            </div>

            <div className="story-info-card__content">

              <h3>
                Our Mission
              </h3>

              <p>
                To deliver reliable, innovative, and
                customer-centric digital solutions that help
                businesses grow, improve efficiency, and achieve
                long-term success through technology and
                creativity.
              </p>

            </div>

          </article>

        </div>

      </div>
    </section>
  );
}


export default Our_story;