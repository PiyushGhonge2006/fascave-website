import { Link, useParams } from 'react-router-dom'
import {features} from './data/features'
import './ourservice.css'

export default function FeatureDetails() {
  const { featureId } = useParams()

  const feature = features.find(
    (item) => item.id === featureId
  )

  if (!feature) {
    return (
      <main className="details-page">
        <h1>Feature Not Found</h1>

        <Link to="/features" className="back-button">
          ← Back to Features
        </Link>
      </main>
    )
  }

  return (
    <main className="details-page">

      <div className="details-container">

        <Link
          to="/features"
          className="back-button"
        >
          ← Back to Features
        </Link>

        <div className="details-card">

          <div className="details-image">
            <img
              src={feature.image}
              alt={feature.title}
            />
          </div>

          <div className="details-content">

            <span className="details-label">
              WEBSITE FEATURE
            </span>

            <h1>{feature.title}</h1>

            <p className="details-description">
              {feature.description}
            </p>

            <p className="details-text">
              {feature.details}
            </p>

            <Link
              to="/features"
              className="details-button"
            >
              Explore Other Features
            </Link>

          </div>

        </div>

      </div>

    </main>
  )
}