import { Link } from 'react-router-dom'

import serviceHeroImage from '../../../assets/service_img/service_hero.png'
export default function ServiceHero({ feature }) {
  return (
    <section className="service-hero">

      {/* LEFT CONTENT */}
      <div
        className="service-hero-content"
        data-reveal="left"
      >

        <span className="details-label">
          OUR SERVICES
        </span>

        <h1>
          {feature.title}
        </h1>

        <p className="details-description">
          {feature.description}
        </p>

        <p className="details-text">
          {feature.details}
        </p>

        <div className="service-hero-actions">

          <Link
            to="/contact"
            className="consultation-button"
          >
            Get Free Consultation
          </Link>

          <Link
            to="/"
            className="details-button"
          >
            ← Back to Services
          </Link>

        </div>

      </div>


      {/* RIGHT IMAGE */}
      <div
        className="service-hero-image"
        data-reveal="right"
      >

        <img
          src={serviceHeroImage}
          alt="Digital business solutions"
        />

      </div>

    </section>
  )
}