import { Link, useParams } from 'react-router-dom'
import { useServices } from './useServices'
import useRevealOnScroll from '../../hooks/useRevealOnScroll'
import './ourservice.css'

/* The five points sit at fixed positions around the core, so
   the list is rendered into those slots and any extras are
   dropped rather than breaking the layout. */
const POINT_POSITIONS = [
  'point-top',
  'point-left-top',
  'point-right-top',
  'point-left-bottom',
  'point-right-bottom',
]

export default function FeatureDetails() {

  const { featureId } = useParams()

  const [pageRef] = useRevealOnScroll({ stagger: 90 })

  const features = useServices()

  const feature = features.find(
    (item) => item.id === featureId
  )

  if (!feature) {
    return (
      <main className="details-page">

        <div className="details-not-found">
          <h1>Service Not Found</h1>

          <Link
            to="/"
            className="back-button"
          >
            ← Back to Home
          </Link>
        </div>

      </main>
    )
  }

  return (
    <main className="details-page" ref={pageRef}>

      {/* HERO / MAIN SERVICE */}
      <section className="service-hero">

        <div className="service-hero-image" data-reveal="left">
          <img
            src={feature.image}
            alt={feature.title}
          />
        </div>

        <div className="service-hero-content" data-reveal="right">

          <span className="details-label">
            OUR SERVICES
          </span>

          <h1>{feature.title}</h1>

          <p className="details-description">
            {feature.description}
          </p>

          <p className="details-text">
            {feature.details}
          </p>

          <Link
            to="/"
            className="details-button"
          >
            ← Back to Services
          </Link>

        </div>

      </section>


      {/* SECOND SECTION */}
      <section className="service-comparison">

        <div className="comparison-heading" data-reveal>

          <span>BUSINESS TRANSFORMATION</span>

          <h2>
            Where your business is today,
            <br />
            and what changes.
          </h2>

          <p>
            Transform existing processes into smarter,
            scalable and technology-driven solutions.
          </p>

        </div>


        <div className="comparison-grid">

          {/* TODAY */}

          <div className="comparison-column today" data-reveal="scale">

            <h3>TODAY</h3>

          {feature.today?.map((item, index) => (

              <div
                className="comparison-item"
                key={index}
              >

                <span className="bullet">
                  •
                </span>

                <p>{item}</p>

              </div>

          ))}

          </div>


          {/* OUTCOME */}

          <div className="comparison-column outcome" data-reveal="scale">

            <h3>BUSINESS OUTCOME</h3>

            {feature.outcome?.map((item, index) => (

              <div
                className="comparison-item"
                key={index}
              >

                <span className="bullet">
                  •
                </span>

                <p>{item}</p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* THIRD SECTION */}
      <section className="service-points">

        <div className="points-wrapper">

          {feature.points?.map((point, index) => (
            POINT_POSITIONS[index] ? (
              <div
                className={`point ${POINT_POSITIONS[index]}`}
                key={`${point}-${index}`}
              >
                <strong>{point}</strong>
              </div>
            ) : null
          ))}


          <div className="service-core">

            <div className="core-glow"></div>

            <div className="core-circle">
              <span>✦</span>
            </div>

            <div className="core-ring"></div>

          </div>

        </div>

      </section>

    </main>
  )
}