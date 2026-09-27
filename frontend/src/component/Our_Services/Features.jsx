import FeatureCard from '../Our_Services/FeatureCard'
import { features } from '../Our_Services/data/features'
import './ourservice.css'

export default function Features() {
  return (
    <main className="features-page">

      <section className="features-section">

        <div className="features-grid">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
            />
          ))}
        </div>

      </section>

    </main>
  )
}