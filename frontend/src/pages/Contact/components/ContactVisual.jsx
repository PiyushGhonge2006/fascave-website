import { ideaFlowCenter, ideaFlowNodes } from "../data/contactData";
import useRevealOnScroll from "../../../hooks/useRevealOnScroll";

import "./ContactVisual.css";

/* Grid centre, in the SVG's 3 x 3 user-unit space. */
const CENTER_X = 1.5;
const CENTER_Y = 1.5;

/** Cell centre for a node placed in the same 3 x 3 grid. */
function cellCenter(node) {
  return {
    x: node.column - 0.5,
    y: node.row - 0.5,
  };
}

/**
 * Animated "idea to launch" diagram.
 *
 * Nodes and connectors share one 3 x 3 coordinate space, so the lines stay
 * locked to the nodes at every breakpoint without a single hard-coded
 * percentage in CSS. Presented as a single image with a text alternative,
 * since the visual carries no information the surrounding copy doesn't.
 */
function ContactVisual() {
  const [visualRef] = useRevealOnScroll();
  const CenterIcon = ideaFlowCenter.icon;

  return (
    <div ref={visualRef} className="contact-visual" data-reveal>
      <p className="contact-visual__eyebrow">Idea to launch</p>

      <div
        className="contact-visual__stage"
        role="img"
        aria-label="A diagram showing your idea moving through strategy, design, development, AI and cloud, to launch."
      >
        <span className="contact-visual__field" aria-hidden="true">
          <i className="contact-visual__ring contact-visual__ring--one" />
          <i className="contact-visual__ring contact-visual__ring--two" />
        </span>

        <svg
          className="contact-visual__links"
          viewBox="0 0 3 3"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          {ideaFlowNodes.map((node, index) => {
            const { x, y } = cellCenter(node);

            return (
              <g key={node.id}>
                <line
                  className="contact-visual__link"
                  x1={CENTER_X}
                  y1={CENTER_Y}
                  x2={x}
                  y2={y}
                  pathLength="1"
                  vectorEffect="non-scaling-stroke"
                />
                <line
                  className="contact-visual__link-pulse"
                  x1={CENTER_X}
                  y1={CENTER_Y}
                  x2={x}
                  y2={y}
                  pathLength="1"
                  vectorEffect="non-scaling-stroke"
                  style={{ animationDelay: `${index * 0.42}s` }}
                />
              </g>
            );
          })}
        </svg>

        <div className="contact-visual__grid" aria-hidden="true">
          {ideaFlowNodes.map((node) => {
            const Icon = node.icon;

            return (
              <span
                key={node.id}
                className="contact-visual__node"
                style={{
                  gridColumn: node.column,
                  gridRow: node.row,
                }}
              >
                <Icon size={15} strokeWidth={1.9} />
                {node.label}
              </span>
            );
          })}

          <span
            className="contact-visual__node contact-visual__node--center"
            style={{
              gridColumn: ideaFlowCenter.column,
              gridRow: ideaFlowCenter.row,
            }}
          >
            <CenterIcon size={20} strokeWidth={1.8} />
            {ideaFlowCenter.label}
          </span>
        </div>
      </div>

      <p className="contact-visual__caption">
        <span>Idea</span>
        <span aria-hidden="true">→</span>
        <span>Strategy</span>
        <span aria-hidden="true">→</span>
        <span>Design</span>
        <span aria-hidden="true">→</span>
        <span>Technology</span>
        <span aria-hidden="true">→</span>
        <span>Launch</span>
      </p>
    </div>
  );
}

export default ContactVisual;
