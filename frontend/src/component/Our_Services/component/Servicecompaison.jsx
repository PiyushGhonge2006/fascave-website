export default function ServiceComparison({ feature }) {
    return (
      <section className="service-comparison">
  
        <div
          className="comparison-heading"
          data-reveal
        >
          <span>
            BUSINESS TRANSFORMATION
          </span>
  
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
  
          <div
            className="comparison-column today"
            data-reveal="scale"
          >
            <h3>TODAY</h3>
  
            {feature.today?.map((item, index) => (
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
  
  
          {/* BUSINESS OUTCOME */}
  
          <div
            className="comparison-column outcome"
            data-reveal="scale"
          >
            <h3>BUSINESS OUTCOME</h3>
  
            {feature.outcome?.map((item, index) => (
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
    )
  }