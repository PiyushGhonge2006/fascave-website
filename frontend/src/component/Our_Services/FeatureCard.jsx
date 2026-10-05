import { Link } from 'react-router-dom'

export default function FeatureCard({ feature }) {
  return (
    <Link
      to={`/features/${feature.id}`}
      className="feature-card-link fc-glow-hover"
      data-reveal="scale"
    >
      <article className="feature-card">

        <div className="feature-image-wrapper">
          <img
            src={feature.image}
            alt={feature.title}
            className="feature-image"
          />
        </div>

        <div className="feature-content">

          <h3>{feature.title}</h3>

          <p>{feature.description}</p>

        </div>

      </article>
    </Link>
  )
}
