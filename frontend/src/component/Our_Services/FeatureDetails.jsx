import { Link, useParams } from 'react-router-dom'
import { useServices } from './useServices'
import useRevealOnScroll from '../../hooks/useRevealOnScroll'
import ServiceHero from './component/ServiceHero'
import ServiceComparison from './component/Servicecompaison'
import ServicePoints from './component/Servicepoint'
import './ourservice.css'
import ServiceProcess from './component/ServiceProcess'
import ServiceBenefits from './component/ServiceBenefits'

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
      <ServiceHero feature={feature} />
      <ServiceComparison feature={feature} />
      <ServiceProcess />
      <ServiceBenefits feature={feature} />
      <ServicePoints feature={feature} />
    </main>
  );
}