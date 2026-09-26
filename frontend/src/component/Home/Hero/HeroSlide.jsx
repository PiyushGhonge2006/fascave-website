import { useState } from 'react'
import Typewriter from './Typewriter'

export default function HeroSlide({ slide, exiting = false, instant = false }) {
  const [titleDone, setTitleDone] = useState(exiting || instant)

  return (
    <div className={`hero-slide${exiting ? ' hero-slide--exiting' : ''}`}>
      <div className="hero-slide__word" aria-hidden="true">
        {slide.backgroundWord}
      </div>

      <div className="hero-content">
        <p className="hero-eyebrow">{slide.eyebrow}</p>

        <h1 className="hero-title">
          <Typewriter
            key={slide.id + String(exiting || instant)}
            text={slide.title}
            speed={80}
            startDelay={exiting || instant ? 0 : 350}
            instant={exiting || instant}
            onComplete={() => setTitleDone(true)}
          />
        </h1>

        <p className={`hero-subtitle${titleDone ? ' is-in' : ''}`}>
          {slide.subtitle}
        </p>

        <div className={`hero-author${titleDone ? ' is-in' : ''}`}>
          <p className="hero-author__name">{slide.author}</p>
          <p className="hero-author__role">{slide.designation}</p>
        </div>

        <button type="button" className={`hero-cta${titleDone ? ' is-in' : ''}`}>
          {slide.cta}
        </button>
      </div>
    </div>
  )
}