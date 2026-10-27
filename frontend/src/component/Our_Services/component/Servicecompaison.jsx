
export default function ServiceComparison({ feature }) {
  const todayItems = feature.today || [];
  const outcomeItems = feature.outcome || [];

  return (
    <section className="service-comparison">
      {/* Section heading */}
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
        {/* Desktop: TODAY column */}
        <div className="comparison-column today" data-reveal="scale">
          <h3>TODAY</h3>

          {todayItems.map((item, index) => (
            <div className="comparison-item" key={index}>
              <span className="bullet">•</span>
              <p>{item}</p>
            </div>
          ))}
        </div>

        {/* Desktop: BUSINESS OUTCOME column */}
        <div className="comparison-column outcome" data-reveal="scale">
          <h3>BUSINESS OUTCOME</h3>

          {outcomeItems.map((item, index) => (
            <div className="comparison-item" key={index}>
              <span className="bullet">•</span>
              <p>{item}</p>
            </div>
          ))}
        </div>

        {/* Mobile: each problem followed by its outcome */}
        <div className="comparison-mobile-pairs">
          {todayItems.map((problem, index) => (
            <div className="comparison-pair" key={index}>
              <h3 className="today-label">TODAY — PROBLEM</h3>

              <div className="comparison-item today-item">
                <span className="bullet">•</span>
                <p>{problem}</p>
              </div>

              {outcomeItems[index] && (
                <>
                  <h3 className="outcome-label">BUSINESS OUTCOME — SOLUTION</h3>

                  <div className="comparison-item outcome-item">
                    <span className="bullet">•</span>
                    <p>{outcomeItems[index]}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
