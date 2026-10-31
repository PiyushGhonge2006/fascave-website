
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { Link } from "react-router-dom";
import Typewriter from "./Typewriter";
import "./Herocarousel.css";

import heroSlide1 from "../../../assets/Herosectionimg/HeroSlide-1.png";
import heroSlide2 from "../../../assets/Herosectionimg/HeroSlide-2.png";
import heroSlide3 from "../../../assets/Herosectionimg/HeroSlide-3.png";
import heroSlide4 from "../../../assets/Herosectionimg/HeroSlide-4.png";

const slides = [
  {
    eyebrow: "BUSINESS • TECHNOLOGY",
    before: "Your Technology Partner ",
    highlight: "for Growth",
    description:
      "FasCave IT Solutions helps businesses transform ideas into powerful digital products with strategy, design and technology.",
    image: heroSlide1,
  },
  {
    eyebrow: "IDEA • DESIGN • DEVELOPMENT",
    before: "We Turn Ideas into ",
    highlight: "Digital Experiences",
    description:
      "From strategy and design to development and ongoing support, we help businesses grow in the digital world.",
    image: heroSlide2,
  },
  {
    eyebrow: "INNOVATION • TECHNOLOGY",
    before: "Innovative Solutions for a ",
    highlight: "Smarter Tomorrow",
    description:
      "We blend strategy, design and technology to build scalable digital products for modern businesses.",
    image: heroSlide3,
  },
  {
    eyebrow: "DIGITAL TRANSFORMATION",
    before: "Build Smarter. ",
    highlight: "Grow Faster.",
    description:
      "Scalable digital solutions that transform ideas into business growth through technology and innovation.",
    image: heroSlide4,
  },
];

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [typingKey, setTypingKey] = useState(0);

  const touchStart = useRef(null);

  const slide = slides[activeIndex];

  // Change slide
  const goToSlide = useCallback((index) => {
    setActiveIndex((index + slides.length) % slides.length);
    setTypingKey((key) => key + 1);
  }, []);

  // Previous slide
  const previous = useCallback(() => {
    goToSlide(activeIndex - 1);
  }, [activeIndex, goToSlide]);

  // Next slide
  const next = useCallback(() => {
    goToSlide(activeIndex + 1);
  }, [activeIndex, goToSlide]);

  // Auto-slide every 3.5 seconds
  useEffect(() => {
    if (paused) return undefined;

    const timer = window.setTimeout(next, 5000);

    return () => window.clearTimeout(timer);
  }, [activeIndex, paused, next]);

  // Touch swipe start
  const handleTouchStart = (event) => {
    const touch = event.touches[0];

    touchStart.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  };

  // Touch swipe end
  const handleTouchEnd = (event) => {
    if (!touchStart.current) return;

    const touch = event.changedTouches[0];

    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;

    if (
      Math.abs(deltaX) > 50 &&
      Math.abs(deltaX) > Math.abs(deltaY)
    ) {
      if (deltaX < 0) {
        next();
      } else {
        previous();
      }
    }

    touchStart.current = null;
  };

  return (
    <section
      className="hero-carousel"
      aria-label="Featured services"
      aria-roledescription="carousel"
      style={{
        backgroundImage: `url("${slide.image}")`,
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false);
        }
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => {
        touchStart.current = null;
      }}
    >
      <div className="hero-background-overlay" />

      <div className="hero-content">
        <div
          className="hero-copy"
          key={`${activeIndex}-${typingKey}`}
        >
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

          {/* Contact Us and Services Buttons */}
          <div className="hero-actions">

            <Link
              className="hero-button hero-button-primary"
              to="/contact"
            >
              Let's Connect
              <span aria-hidden="true">→</span>
            </Link>

            <Link
              className="hero-button hero-button-secondary"
              to="/features"
            >
              Services
            </Link>

          </div>
        </div>
      </div>

      {/* Previous Slide */}
      <button
        type="button"
        className="hero-arrow hero-arrow-prev"
        onClick={previous}
        aria-label="Previous slide"
      >
        ‹
      </button>

      {/* Next Slide */}
      <button
        type="button"
        className="hero-arrow hero-arrow-next"
        onClick={next}
        aria-label="Next slide"
      >
        ›
      </button>

      {/* Slide Dots and Counter */}
      <div className="hero-carousel-bottom">

        <div
          className="hero-dots"
          role="group"
          aria-label="Choose slide"
        >
          {slides.map((item, index) => (
            <button
              type="button"
              key={item.eyebrow}
              className={`hero-dot ${
                index === activeIndex ? "is-active" : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Show slide ${index + 1}`}
              aria-current={
                index === activeIndex ? "true" : undefined
              }
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
