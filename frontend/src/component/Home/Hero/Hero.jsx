import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

import { slides } from '../data/heroslides'
import HeroSlide from './HeroSlide'
import HeroCarousel from './HeroCarousel'

import robotAnimation from '../../../assets/Robo/Robot.json'

import usePrefersReducedMotion from '../../../hooks/usePrefersReducedMotion'
import { useSingleton } from '../../../hooks/useContent'
import { goToContactForm } from '../../../utils/contactNavigation'

import './Herosection.css'

const AUTOPLAY_MS = 8500
const EXIT_MS = 800

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [exiting, setExiting] = useState(null)
  const [paused, setPaused] = useState(false)

  const reduced = usePrefersReducedMotion()
  const navigate = useNavigate()

  const { data: home } = useSingleton('/api/content/home', {})

  /* The CMS holds one hero, not the four-slide carousel.
     The first slide takes its text from the database.
     The artwork, theme and background word remain in code. */
  const heroSlides = useMemo(() => {
    const hero = home?.hero

    if (!hero?.heading && !hero?.description) {
      return slides
    }

    return slides.map((slide, index) =>
      index === 0
        ? {
            ...slide,
            eyebrow: hero.eyebrow || slide.eyebrow,
            title: hero.heading || slide.title,
            subtitle: hero.description || slide.subtitle,
            cta: hero.ctaLabel || slide.cta,
          }
        : slide
    )
  }, [home])

  const activeSlide = heroSlides[current] || heroSlides[0]

  const exitTimer = useRef(null)

  const goTo = useCallback(
    (nextIndex) => {
      const total = heroSlides.length
      const next = ((nextIndex % total) + total) % total

      if (next === current) return

      clearTimeout(exitTimer.current)

      setExiting(current)
      setCurrent(next)

      exitTimer.current = setTimeout(() => {
        setExiting(null)
      }, EXIT_MS)
    },
    [current, heroSlides.length]
  )

  const goNext = useCallback(
    () => goTo(current + 1),
    [goTo, current]
  )

  const goPrev = useCallback(
    () => goTo(current - 1),
    [goTo, current]
  )

  useEffect(() => {
    if (paused || reduced) return undefined

    const timer = setTimeout(goNext, AUTOPLAY_MS)

    return () => clearTimeout(timer)
  }, [paused, reduced, goNext])

  useEffect(
    () => () => {
      clearTimeout(exitTimer.current)
    },
    []
  )

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goPrev()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        goNext()
      }
    },
    [goPrev, goNext]
  )

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="FasCave services"
      aria-live="polite"
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={handleKeyDown}
    >
      {/* =====================================================
          BACKGROUND
          ===================================================== */}

      <div className="hero-bg" aria-hidden="true">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-bg__layer hero-bg__layer--${slide.theme}${
              index === current ? ' is-active' : ''
            }`}
          />
        ))}

        <div className="hero-bg__words">
          {heroSlides.map((slide, index) => (
            <span
              key={`word-${slide.id}`}
              className={`hero-bg__word${
                index === current ? ' is-active' : ''
              }`}
            >
              {slide.backgroundWord}
            </span>
          ))}
        </div>

        <div className="hero-aurora" />
        <div className="hero-bg__grid" />
        <div className="hero-bg__grain" />
      </div>

      {/* =====================================================
          MAIN HERO
          ===================================================== */}

      <div className="hero-inner">

        {/* LEFT CONTENT */}
        <div className="hero-copy">
          {heroSlides.map((slide, index) => {
            if (index === current) {
              return (
                <HeroSlide
                  key={slide.id}
                  slide={slide}
                  instant={reduced}
                />
              )
            }

            if (index === exiting) {
              return (
                <HeroSlide
                  key={`exit-${slide.id}`}
                  slide={slide}
                  exiting
                  instant
                />
              )
            }

            return null
          })}
        </div>

        {/* RIGHT ROBOT */}
        <div className="hero-visual">

          <div className="hero-robot" aria-hidden="true">
            <DotLottieReact
              data={JSON.stringify(robotAnimation)}
              loop={!reduced}
              autoplay={!reduced}
              backgroundColor="transparent"
            />
          </div>

          {/* Existing callouts are preserved */}
          <div className="hero-callouts">
            {(activeSlide?.callouts || []).map((callout, index) => (
              <div
                key={`${callout.label}-${index}`}
                className={`hero-callout hero-callout--${index + 1}`}
              >
                <span className="hero-callout__label">
                  {callout.label}
                </span>

                <span className="hero-callout__value">
                  {callout.value}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* =====================================================
          CAROUSEL CONTROLS
          ===================================================== */}

      <div className="hero-controls">
        <div className="hero-controls__inner">

          <HeroCarousel
            slides={heroSlides}
            current={current}
            onSelect={goTo}
            onPrev={goPrev}
            onNext={goNext}
          />

          <p className="hero-counter" aria-hidden="true">
            <span className="hero-counter__current">
              {String(current + 1).padStart(2, '0')}
            </span>

            <span className="hero-counter__rule" />

            <span className="hero-counter__total">
              {String(heroSlides.length).padStart(2, '0')}
            </span>
          </p>

        </div>
      </div>

      {/* =====================================================
          CHAT BUTTON
          ===================================================== */}

      <button
        type="button"
        className="chat-button"
        aria-label="Send us a message"
        onClick={() => goToContactForm(navigate)}
      >
        <MessageCircle
          size={26}
          strokeWidth={1.75}
          aria-hidden="true"
        />
      </button>
    </section>
  )
}