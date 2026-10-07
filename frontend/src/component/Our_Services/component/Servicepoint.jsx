const POINT_POSITIONS = [
  'point-top',
  'point-left-top',
  'point-right-top',
  'point-left-bottom',
  'point-right-bottom',
]

export default function Servicepoints({ feature }) {
  return (
    <section className="service-points">
      <div className="points-wrapper">

        {feature.points?.map((point, index) =>
          POINT_POSITIONS[index] ? (
            <div
              className={`point ${POINT_POSITIONS[index]}`}
              key={`${point}-${index}`}
            >
              <strong>{point}</strong>
            </div>
          ) : null
        )}

        {/* Center Core */}
        <div className="service-core">
          <div className="core-glow"></div>

          <div className="core-circle">
            <span>✦</span>
          </div>

          <div className="core-ring"></div>
        </div>

      </div>
    </section>
  )
}