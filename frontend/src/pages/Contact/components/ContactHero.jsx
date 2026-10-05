import { useRef } from "react";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";

import {
  contactCopy,
  heroChips,
  heroLinePaths,
  heroMeta,
  heroPanel,
  heroParticles,
} from "../data/contactData";
import useContactCtas from "../hooks/useContactCtas";
import useMouseParallax from "../../../hooks/useMouseParallax";
import useRevealOnScroll from "../../../hooks/useRevealOnScroll";

/**
 * Contact hero: headline, calls-to-action, availability panel and the
 * animated background layers. The parallax listener is attached here,
 * so nothing above this component needs to know about it.
 */
function ContactHero() {
  const heroRef = useRef(null);
  const [panelRef] = useRevealOnScroll();
  const { startConversation, exploreWork } = useContactCtas();

  useMouseParallax(heroRef);

  const { hero } = contactCopy;

  return (
    <section
      ref={heroRef}
      className="contact-hero"
      aria-labelledby="contact-hero-title"
    >
      {/* ---------- decorative background ---------- */}
      <span className="contact-hero__grid" aria-hidden="true" />
      <span className="contact-hero__glow" aria-hidden="true" />

      <span className="contact-hero__orbits" aria-hidden="true">
        <i className="contact-hero__orbit contact-hero__orbit--blue" />
        <i className="contact-hero__orbit contact-hero__orbit--violet" />
        <i className="contact-hero__orbit contact-hero__orbit--orange" />
      </span>

      <svg
        className="contact-hero__lines"
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="ctHeroStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3d7bff" stopOpacity="0" />
            <stop offset="50%" stopColor="#6f9bff" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {heroLinePaths.map((line, index) => (
          <g key={line.id}>
            <path
              d={line.d}
              fill="none"
              stroke="url(#ctHeroStroke)"
              strokeWidth="1"
              pathLength="1"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={line.d}
              fill="none"
              stroke="#9dc0ff"
              strokeWidth="1.4"
              pathLength="1"
              vectorEffect="non-scaling-stroke"
              className="contact-hero__line-pulse"
              style={{ animationDelay: `${index * 1.9}s` }}
            />
          </g>
        ))}
      </svg>

      <ul className="contact-hero__particles" aria-hidden="true">
        {heroParticles.map((particle) => (
          <li
            key={particle.id}
            className="contact-particle"
            style={{
              left: particle.left,
              top: particle.top,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
              "--ct-particle-drift": `${particle.drift}px`,
            }}
          />
        ))}
      </ul>

      {/* ---------- content ---------- */}
      <div className="contact-hero__inner">
        <div className="contact-hero__content">
          <span className="contact-eyebrow">
            <Sparkles size={14} strokeWidth={2} aria-hidden="true" />
            {hero.eyebrow}
          </span>

          <h1 className="contact-hero__title" id="contact-hero-title">
            <span className="contact-hero__title-line">
              {hero.titleLead}
            </span>
            <span className="contact-hero__title-line">
              {hero.titlePrefix}{" "}
              <em className="contact-hero__title-accent">
                {hero.titleAccent}
              </em>{" "}
              {hero.titleSuffix}
            </span>
          </h1>

          <p className="contact-hero__lead">{hero.lead}</p>

          <div className="contact-hero__actions">
            <button
              type="button"
              className="contact-btn contact-btn--primary"
              onClick={startConversation}
            >
              Start a Conversation
              <ArrowUpRight size={17} strokeWidth={2.4} aria-hidden="true" />
            </button>

            <button
              type="button"
              className="contact-btn contact-btn--ghost"
              onClick={exploreWork}
            >
              Explore Our Work
              <ArrowRight size={17} strokeWidth={2.4} aria-hidden="true" />
            </button>
          </div>

          <ul className="contact-hero__meta">
            {heroMeta.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.id}>
                  <Icon size={15} strokeWidth={1.9} aria-hidden="true" />
                  {item.label}
                </li>
              );
            })}
          </ul>
        </div>

        {/* ---------- availability panel ---------- */}
        <div className="contact-hero__visual">
          <article ref={panelRef} className="contact-panel" data-reveal>
            <span className="contact-panel__edge" aria-hidden="true" />

            <header className="contact-panel__head">
              <span className="contact-panel__pulse" aria-hidden="true" />
              {heroPanel.status}
            </header>

            <div className="contact-panel__body">
              <span className="contact-panel__label">{heroPanel.label}</span>
              <p className="contact-panel__title">{heroPanel.title}</p>
              <p className="contact-panel__text">{heroPanel.text}</p>

              <dl className="contact-panel__rows">
                {heroPanel.rows.map((row) => (
                  <div className="contact-panel__row" key={row.id}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <button
              type="button"
              className="contact-btn contact-btn--primary contact-btn--block"
              onClick={startConversation}
            >
              Start a Conversation
              <ArrowUpRight size={17} strokeWidth={2.4} aria-hidden="true" />
            </button>
          </article>

          {heroChips.map((chip) => {
            const Icon = chip.icon;

            return (
              <span
                key={chip.id}
                className="contact-chip"
                style={{
                  top: chip.top,
                  left: chip.left,
                  animationDelay: chip.delay,
                }}
                aria-hidden="true"
              >
                <Icon size={14} strokeWidth={1.9} />
                {chip.label}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ContactHero;
