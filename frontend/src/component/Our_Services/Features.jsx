import FeatureCard from './FeatureCard'
import { useServices } from './useServices'
import useRevealOnScroll from '../../hooks/useRevealOnScroll'
import './ourservice.css'

export default function Features() {
  /* One observer for the whole section; cards cascade in on their own. */
  const [sectionRef] = useRevealOnScroll({ stagger: 90 })

  const features = useServices()

  return (
    <section className="our-services" ref={sectionRef}>

      <div className="services-container">

        <h2 className="services-title" data-reveal>
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

      </div>

    </section>
  )
}
