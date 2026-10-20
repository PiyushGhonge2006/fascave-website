import React from "react";

import About_us_hero from "./About_components/About_us_hero";
import Our_story from "./About_components/Our_story";
import Our_experience from "./About_components/Our_experience";
import About_intro from "./About_components/About_intro";
import Office_location from "./About_components/Office_location";

import ServiceProcess from "../../component/Our_Services/component/ServiceProcess";

function About() {
  return (
    <>
      {/* About Hero */}
      <About_us_hero />

      {/* Our Story */}
      <Our_story />

      {/* Our Experience */}
      <Our_experience />

      {/* About FasCave */}
      <About_intro />

      {/* Services Process */}
      <ServiceProcess />

      {/* Office Information + Map */}
      <Office_location />
    </>
  );
}

export default About;