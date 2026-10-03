import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { goToContactForm } from '../../../utils/contactNavigation'
import Typewriter from './Typewriter'

export default function HeroSlide({
  slide,
  exiting = false,
  instant = false
}) {

  const navigate = useNavigate()

  /* The subtitle, the attribution and the buttons only
     arrive once the headline has finished typing, so the
     reader is never looking at three things at once. */
  const [titleDone, setTitleDone] = useState(
    exiting || instant
  )

  return (
    <div
      className={`hero-slide${
        exiting ? ' hero-slide--exiting' : ''
      }`}
    >
      <p className="hero-eyebrow">
        <span className="hero-eyebrow__dot" aria-hidden="true" />
        {slide.eyebrow}
      </p>

      <h1 className="hero-title">
        <Typewriter
          key={slide.id + String(exiting || instant)}
          text={slide.title}
          speed={80}
          startDelay={
            exiting || instant ? 0 : 350
          }
          instant={exiting || instant}
          onComplete={() => setTitleDone(true)}
        />
      </h1>

      <p
        className={`hero-subtitle${
          titleDone ? ' is-in' : ''
        }`}
      >
        {slide.subtitle}
      </p>

      <div
        className={`hero-author${
          titleDone ? ' is-in' : ''
        }`}
      >
        <span className="hero-author__rule" aria-hidden="true" />

        <div>
          <p className="hero-author__name">
            {slide.author}
          </p>

          <p className="hero-author__role">
            {slide.designation}
          </p>
        </div>
      </div>

      <div
        className={`hero-actions${
          titleDone ? ' is-in' : ''
        }`}
      >
        {/* Primary — opens the consultation form. */}
        <button
          type="button"
          className="hero-cta"
          onClick={() => goToContactForm(navigate)}
        >
          <span className="hero-cta__label">{slide.cta}</span>
          <ArrowRight
            size={17}
            strokeWidth={2}
            className="hero-cta__arrow"
            aria-hidden="true"
          />
        </button>

        {/* Secondary — quieter route into the site. */}
        {slide.ctaSecondary && (
          <button
            type="button"
            className="hero-cta hero-cta--ghost"
            onClick={() => navigate(slide.ctaSecondaryHref)}
          >
            <span className="hero-cta__label">{slide.ctaSecondary}</span>
          </button>
        )}
      </div>
    </div>
  )
}