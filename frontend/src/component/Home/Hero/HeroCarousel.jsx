
import React, { useCallback, useEffect, useState } from "react";
import Typewriter from "./Typewriter";
import "./Herocarousel.css";

import heroSlide1 from "../../../assets/Herosectionimg/HeroSlide-1.png";
import heroSlide2 from "../../../assets/Herosectionimg/HeroSlide-2.png";
import heroSlide3 from "../../../assets/Herosectionimg/HeroSlide-3.png";

const slides = [
  {
    eyebrow: "BUSINESS • TECHNOLOGY",
    before: "Your Technology Partner ",
    highlight: "for Growth",
    description:
      "FasCave IT Solutions helps businesses transform ideas into powerful digital products with strategy, design and technology.",
    primary: "Get Started",
    secondary: "Explore Services",
    primaryHref: "#contact",
    secondaryHref: "#services",
    image: heroSlide1,
  },
  {
    eyebrow: "IDEA • DESIGN • DEVELOPMENT",
    before: "We Turn Ideas into ",
    highlight: "Digital Experiences",
    description:
      "From strategy and design to development and ongoing support, we help businesses grow in the digital world.",
    primary: "Start a Project",
    secondary: "View Portfolio",
    primaryHref: "#contact",
    secondaryHref: "#portfolio",
    image: heroSlide2,
  },
  {
    eyebrow: "INNOVATION • TECHNOLOGY",
    before: "Innovative Solutions for a ",
    highlight: "Smarter Tomorrow",
    description:
      "We blend strategy, design and technology to build scalable digital products for modern businesses.",
    primary: "Get Started",
    secondary: "Our Services",
    primaryHref: "#contact",
    secondaryHref: "#services",
    image: heroSlide3,
  },
];

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [typingKey, setTypingKey] = useState(0);

  const slide = slides[activeIndex];

  const goToSlide = useCallback((index) => {
    setActiveIndex((index + slides.length) % slides.length);
    setTypingKey((key) => key + 1);
  }, []);

  const previous = useCallback(() => {
    goToSlide(activeIndex - 1);
  }, [activeIndex, goToSlide]);

  const next = useCallback(() => {
    goToSlide(activeIndex + 1);
  }, [activeIndex, goToSlide]);

  useEffect(() => {
    if (paused) return undefined;

    const timer = window.setTimeout(next, 7000);
    return () => window.clearTimeout(timer);
  }, [activeIndex, paused, next]);

  return (
    <section
      className="hero-carousel"
      aria-label="Featured services"
      aria-roledescription="carousel"
      style={{ backgroundImage: `url("${slide.image}")` }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false);
        }
      }}
    >
      <div className="hero-background-overlay" />

      <div className="hero-content">
        <div className="hero-copy" key={`${activeIndex}-${typingKey}`}>
          <p className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            {slide.eyebrow}
          </p>

          <h1 className="hero-title">
            <Typewriter
              key={typingKey}
              text={slide.before}
              highlight={slide.highlight}
              speed={45}
            />
          </h1>

          <p className="hero-description">
            {slide.description}
          </p>

          <div className="hero-actions">
            <a
              className="hero-button hero-button-primary"
              href={slide.primaryHref}
            >
              {slide.primary}
              <span aria-hidden="true">→</span>
            </a>

            <a
              className="hero-button hero-button-secondary"
              href={slide.secondaryHref}
            >
              {slide.secondary}
            </a>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="hero-arrow hero-arrow-prev"
        onClick={previous}
        aria-label="Previous slide"
      >
        ‹
      </button>

      <button
        type="button"
        className="hero-arrow hero-arrow-next"
        onClick={next}
        aria-label="Next slide"
      >
        ›
      </button>

      <div className="hero-carousel-bottom">
        <div className="hero-dots" role="group" aria-label="Choose slide">
          {slides.map((item, index) => (
            <button
              type="button"
              key={item.eyebrow}
              className={`hero-dot ${
                index === activeIndex ? "is-active" : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Show slide ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>

        <span className="hero-slide-counter">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(slides.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
