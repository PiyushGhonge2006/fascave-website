import React from "react";
import {
  BarChart3,
  Trophy,
  Settings,
  Box,
} from "lucide-react";
import "./our_experience.css";

function Our_experience() {
  const experienceData = [
    {
      number: "01",
      icon: <BarChart3 size={30} strokeWidth={2.5} />,
      title: (
        <>
          <span>400+</span>
          <br />
          Projects Delivered
        </>
      ),
      description:
        "From startups and growing businesses to established organizations, we have successfully delivered diverse digital solutions across different industries.",
    },
    {
      number: "02",
      icon: <Trophy size={30} strokeWidth={2.5} />,
      title: (
        <>
          Years of Industry
          <br />
          <span>Experience</span>
        </>
      ),
      description:
        "Our journey since 2017 has helped us build strong technical expertise, understand real-world business challenges, and continuously evolve with changing technology.",
    },
    {
      number: "03",
      icon: <Settings size={30} strokeWidth={2.5} />,
      title: (
        <>
          Custom-Built
          <br />
          <span>Solutions</span>
        </>
      ),
      description:
        "Every business is different. We develop solutions tailored to specific requirements rather than relying on one-size-fits-all approaches.",
    },
    {
      number: "04",
      icon: <Box size={30} strokeWidth={2.5} />,
      title: (
        <>
          Our Own
          <br />
          <span>Products</span>
        </>
      ),
      description:
        "Alongside client projects, we continuously develop our own products and platforms, giving us valuable experience from both a service-provider and product-development perspective.",
    },
  ];

  return (
    <section
      className="our-experience-section"
      id="our-experience"
      aria-labelledby="our-experience-title"
    >
      <div className="our-experience-section__overlay" />

      <div className="our-experience-section__container">
        {/* Heading */}
        <div className="our-experience-section__header">
          <div className="our-experience-section__eyebrow">
            <span>OUR EXPERIENCE</span>
            <span
              className="our-experience-section__eyebrow-line"
              aria-hidden="true"
            />
          </div>

          <h2
            className="our-experience-section__title"
            id="our-experience-title"
          >
            Proven Experience.{" "}
            <span>Real Impact.</span>
          </h2>

          <p className="our-experience-section__description">
            From startups and growing businesses to established
            organizations, we have successfully delivered diverse
            digital solutions across different industries.
          </p>
        </div>

        {/* Cards */}
        <div className="our-experience-section__cards">
          {experienceData.map((item) => (
            <article
              className="experience-card"
              key={item.number}
            >
              <div className="experience-card__top">
                <div className="experience-card__icon">
                  {item.icon}
                </div>

                <span className="experience-card__number">
                  {item.number}
                </span>
              </div>

              <h3 className="experience-card__title">
                {item.title}
              </h3>

              <p className="experience-card__description">
                {item.description}
              </p>

              <span
                className="experience-card__line"
                aria-hidden="true"
              />
            </article>
          ))}
        </div>
      </div>

      <div
        className="our-experience-section__bottom-line"
        aria-hidden="true"
      />
    </section>
  );
}

export default Our_experience;