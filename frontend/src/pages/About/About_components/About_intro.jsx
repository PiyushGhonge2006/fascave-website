import React from "react";
import {
  Rocket,
  CalendarDays,
  Settings,
  Users,
  Box,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import "./about_intro.css";

function About_intro() {
  const highlights = [
    {
      icon: Rocket,
      title: "400+",
      text: "Projects Delivered",
    },
    {
      icon: CalendarDays,
      title: "2017",
      text: "Our Journey Began",
    },
    {
      icon: Settings,
      title: "Custom-Built",
      text: "Solutions for Every Business",
    },
    {
      icon: Users,
      title: "Client-Focused",
      text: "Practical & Scalable Solutions",
    },
    {
      icon: Box,
      title: "Our Own Products",
      text: "Continuous Innovation",
    },
    {
      icon: BarChart3,
      title: "Long-Term Partnerships",
      text: "Grow Together",
    },
  ];

  return (
    <section className="about-intro" id="about-intro">
      {/* Heading */}
      <div className="about-intro__heading">
        <span className="about-intro__heading-line" />

        <h2>
          A growth studio built for{" "}
          <span>scale</span>
        </h2>
      </div>

      {/* Main Card */}
      <div className="about-intro__card">
        <div className="about-intro__grid">

          {/* LEFT SIDE */}
          <div className="about-intro__content">

            <div className="about-intro__eyebrow">
              ABOUT FASCAVE
            </div>

            <h3>
              Building Digital Solutions
              <br />
              That Create{" "}
              <span>Real Business Impact</span>
            </h3>

            <p>
              FasCave IT Solutions Pvt. Ltd. is a technology and
              digital solutions company helping businesses turn
              ideas into powerful digital products. Since 2017,
              we've delivered 400+ projects across websites,
              mobile apps, custom software and business
              automation.
            </p>

            <p>
              We combine creativity, technology and business
              understanding to build practical, scalable and
              result-driven solutions.
            </p>

            <a
              href="/contact"
              className="about-intro__button"
            >
              <span>Let's Build Together</span>

              <span className="about-intro__button-icon">
                <ArrowRight size={18} strokeWidth={2.2} />
              </span>
            </a>
          </div>

          {/* RIGHT SIDE */}
          <div className="about-intro__highlights">

            {highlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  className="about-highlight"
                  key={index}
                >
                  <div className="about-highlight__icon">
                    <Icon
                      size={30}
                      strokeWidth={1.8}
                    />
                  </div>

                  <div className="about-highlight__content">
                    <h4>{item.title}</h4>

                    <p>{item.text}</p>
                  </div>
                </div>
              );
            })}

          </div>

        </div>
      </div>
    </section>
  );
}

export default About_intro;