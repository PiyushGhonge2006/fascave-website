import React from "react";
import useRevealOnScroll from "../../../../hooks/useRevealOnScroll";
import "./WhatWeDo.css";

const services = [
  {
    number: "01",
    title: "Advise",
    icon: "◉",
    description:
      "Digital strategy, process study aand solution architecture that turn business goals into a roadmap with measurable outcomes.",
  },
  {
    number: "02",
    title: "Build",
    icon: "</>",
    description:
      "Web, mobile, custom software and enterprise platforms — engineered, tested and built to be maintained for years.",
  },
  {
    number: "03",
    title: "Automate",
    icon: "⚙",
    description:
      "AI and intelligent automation that remove the manual effort and error from the work your teams repeat every day.",
  },
  {
    number: "04",
    title: "Sustain",
    icon: "◉",
    description:
      "Cloud operations, security, maintenance and continuous improvement that keep systems dependable long after launch.",
  },
];

const Whatwe_do = () => {
  const [sectionRef] = useRevealOnScroll({ stagger: 110 });

  return (
    <section className="what-we-do" ref={sectionRef}>
      {/* Background dotted effects */}
      <div className="dots dots-left"></div>
      <div className="dots dots-right"></div>

      {/* Soft blue glow */}
      <div className="blue-glow glow-one"></div>
      <div className="blue-glow glow-two"></div>

      <div className="what-container">
        {/* Heading */}
        <div className="what-header" data-reveal>
          <div className="eyebrow">
            <span>WHAT WE DO</span>
            <div className="eyebrow-line"></div>
          </div>

          <h2>
            One team owns{" "}
            <span>the entire journey.</span>
          </h2>

          <p>
            From strategy and architecture through engineering, deployment and
            long-term support — one accountable team, so nothing is lost in the
            handoff between vendors.
          </p>
        </div>

        {/* Cards */}
        <div className="what-services-grid">
          {services.map((service) => (
            <div className="service-card" key={service.number} data-reveal="scale">
              <div className="card-top">
                <div className="service-icon">
                  {service.icon}
                </div>

                <div className="service-number">
                  {service.number}
                </div>
              </div>

              <h3>{service.title}</h3>

              <p>{service.description}</p>

              <div className="card-hover-line"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Whatwe_do;