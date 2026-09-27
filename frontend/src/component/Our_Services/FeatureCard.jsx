import { useNavigate } from 'react-router-dom'

export default function FeatureCard({ feature }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/features/${feature.id}`)
  }

  return (
    <article
      className="feature-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick()
        }
      }}
    >
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
  )
}