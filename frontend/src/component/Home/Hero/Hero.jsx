import { useCallback, useEffect, useRef, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { slides } from '../data/heroslides'
import HeroSlide from './HeroSlide'
import HeroCarousel from './HeroCarousel'
import Silhouette from './Silhouette'
import './Herosection.css'

const AUTOPLAY_MS = 8500
const EXIT_MS = 800
const PARALLAX_MAX = 10

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = () => setReduced(mq.matches)
    mq.addEventListener?.('change', handler)
    return () => mq.removeEventListener?.('change', handler)
  }, [])

  return reduced
}

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [exiting, setExiting] = useState(null)
  const [paused, setPaused] = useState(false)
  const reduced = usePrefersReducedMotion()

  const bgRef = useRef(null)
  const figRef = useRef(null)
  const rafRef = useRef(null)
  const exitTimer = useRef(null)

  const goTo = useCallback(
    (nextIndex) => {
      const total = slides.length
      const next = ((nextIndex % total) + total) % total
      if (next === current) return
      clearTimeout(exitTimer.current)
      setExiting(current)
      setCurrent(next)
      exitTimer.current = setTimeout(() => setExiting(null), EXIT_MS)
    },
    [current],
  )

  const goNext = useCallback(() => goTo(current + 1), [goTo, current])
  const goPrev = useCallback(() => goTo(current - 1), [goTo, current])

  useEffect(() => {
    if (paused || reduced) return undefined
    const timer = setTimeout(goNext, AUTOPLAY_MS)
    return () => clearTimeout(timer)
  }, [paused, reduced, goNext])

  useEffect(
    () => () => {
      clearTimeout(exitTimer.current)
    },
    [],
  )

  const handleMouseMove = useCallback(
    (event) => {
      if (reduced) return
      if (window.matchMedia('(max-width: 767px)').matches) return
      if (rafRef.current !== null) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        const nx = (event.clientX / window.innerWidth - 0.5) * 2
        const ny = (event.clientY / window.innerHeight - 0.5) * 2
        if (bgRef.current) {
          bgRef.current.style.transform = `translate3d(${(-nx * PARALLAX_MAX).toFixed(2)}px, ${(-ny * PARALLAX_MAX).toFixed(2)}px, 0) scale(1.03)`
        }
        if (figRef.current) {
          figRef.current.style.transform = `translate3d(${(nx * PARALLAX_MAX * 0.5).toFixed(2)}px, ${(ny * PARALLAX_MAX * 0.5).toFixed(2)}px, 0)`
        }
      })
    },
    [reduced],
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
    [goPrev, goNext],
  )

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="Featured insight carousel"
      aria-live="polite"
      tabIndex={0}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={handleKeyDown}
    >
      <div className="hero-bg" ref={bgRef} aria-hidden="true">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-bg__layer theme-${slide.theme}${
              index === current ? ' is-active' : ''
            }`}
          />
        ))}
        <div className="hero-bg__overlay" />
        <div className="hero-bg__grain" />
      </div>

      {slides.map((slide, index) => {
        if (index === current) {
          return (
            <HeroSlide
              key={slide.id}
              slide={slide}
              exiting={false}
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

      <div className="hero-fig" ref={figRef} aria-hidden="true">
        <Silhouette />
      </div>

      <div className="platform" aria-hidden="true">
        <span className="platform__glow" />
        <span className="platform__ring platform__ring--outer" />
        <span className="platform__ring platform__ring--inner" />
      </div>

      <HeroCarousel onPrev={goPrev} onNext={goNext} />

      <button
        type="button"
        className="chat-button"
        aria-label="Send us a message"
      >
        <MessageCircle size={26} strokeWidth={1.75} aria-hidden="true" />
      </button>
    </section>
  )
}