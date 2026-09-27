import { features } from './data/features'
import FeatureCard from './FeatureCard'
import './ourservice.css'

export default function Features() {
  return (
    <section className="our-services">

      <h2 className="services-title">
        OUR SERVICES
      </h2>

      <div className="services-grid">

        {features.map((feature) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
          />
        ))}

      </div>

    </section>
  )
}