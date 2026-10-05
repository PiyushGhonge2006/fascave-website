import { ChevronLeft, ChevronRight } from 'lucide-react'
import './Herosection.css'

export default function HeroCarousel({
  slides = [],
  current = 0,
  onSelect,
  onPrev,
  onNext
}) {
  return (
    <div className="carousel-controls">

      {/* Arrows first, so keyboard users land on them early
          in the tab order. */}
      <div className="carousel-arrows">
        <button
          type="button"
          className="carousel-arrow carousel-arrow--prev"
          onClick={onPrev}
          aria-label="Previous slide"
        >
          <ChevronLeft size={26} strokeWidth={1.5} aria-hidden="true" />
        </button>

        <button
          type="button"
          className="carousel-arrow carousel-arrow--next"
          onClick={onNext}
          aria-label="Next slide"
        >
          <ChevronRight size={26} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>

      {/* One indicator per slide, labelled with that slide's
          eyebrow so the control is self-describing. */}
      <div className="carousel-indicators" role="tablist">
        {slides.map((slide, index) => {
          const isActive = index === current

          return (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Show slide ${index + 1}: ${slide.eyebrow}`}
              className={`carousel-dot${
                isActive ? ' is-active' : ''
              }`}
              onClick={() => onSelect(index)}
            >
              <span className="carousel-dot__track">
                <span className="carousel-dot__fill" />
              </span>

              <span className="carousel-dot__label">
                {slide.eyebrow}
              </span>
            </button>
          )
        })}
      </div>

    </div>
  )
}