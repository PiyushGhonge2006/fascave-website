import React from "react";
import HeroCarousel from "./HeroCarousel";
import "./Herosection.css";

export default function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-background-glow" />
      <div className="hero-grid-pattern" />

      <HeroCarousel />
    </section>
  );
}