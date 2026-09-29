import { Link, useParams } from 'react-router-dom'
import { features } from './data/features'
import './ourservice.css'

export default function FeatureDetails() {

  const { featureId } = useParams()

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
    <main className="details-page">

      {/* HERO / MAIN SERVICE */}
      <section className="service-hero">

        <div className="service-hero-image">
          <img
            src={feature.image}
            alt={feature.title}
          />
        </div>

        <div className="service-hero-content">

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

        <div className="comparison-heading">

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

          <div className="comparison-column today">

            <h3>TODAY</h3>

            {feature.today.map((item, index) => (

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

          <div className="comparison-column outcome">

            <h3>BUSINESS OUTCOME</h3>

            {feature.outcome.map((item, index) => (

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

          <div className="point point-top">
            <strong>{feature.points[0]}</strong>
          </div>

          <div className="point point-left-top">
            <strong>{feature.points[1]}</strong>
          </div>

          <div className="point point-right-top">
            <strong>{feature.points[2]}</strong>
          </div>

          <div className="point point-left-bottom">
            <strong>{feature.points[3]}</strong>
          </div>

          <div className="point point-right-bottom">
            <strong>{feature.points[4]}</strong>
          </div>


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