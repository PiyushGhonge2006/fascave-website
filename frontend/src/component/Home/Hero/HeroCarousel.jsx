import { ChevronLeft, ChevronRight } from 'lucide-react'
import './Herosection.css'

export default function HeroCarousel({ onPrev, onNext }) {
  return (
    <div className="carousel-controls">
      <button
        type="button"
        className="carousel-arrow carousel-arrow--prev"
        onClick={onPrev}
        aria-label="Previous slide"
      >
        <ChevronLeft size={42} strokeWidth={1.25} aria-hidden="true" />
      </button>
      <button
        type="button"
        className="carousel-arrow carousel-arrow--next"
        onClick={onNext}
        aria-label="Next slide"
      >
        <ChevronRight size={42} strokeWidth={1.25} aria-hidden="true" />
      </button>
    </div>
  )
}