import { useEffect } from "react";

import { prefersReducedMotion } from "../utils/motion";

/** Touch / stylus pointers get no parallax. */
const MOUSE_POINTER = "mouse";

/** Below this width the layout is single-column, so parallax adds nothing. */
const DESKTOP_MIN_WIDTH = 768;

/**
 * Mouse-follow parallax, driven entirely by CSS custom properties.
 *
 * Writes `--parallax-x` / `--parallax-y` (normalised to roughly -0.5 → 0.5)
 * straight onto the element, so:
 *  - React never re-renders while the pointer moves;
 *  - the effect is one `requestAnimationFrame` write per frame;
 *  - every descendant can react to the same value with its own multiplier.
 *
 * Offsets are viewport-relative on purpose: reading the element's rect on
 * every pointer move would force a layout on each frame.
 *
 * Disabled automatically for touch pointers, on narrow screens, and for
 * users who prefer reduced motion.
 *
 * @param {React.RefObject<HTMLElement>} ref
 * @param {object}  [options]
 * @param {number}  [options.minWidth] Pointer parallax is skipped below this.
 */
export default function useMouseParallax(ref, options = {}) {
  const { minWidth = DESKTOP_MIN_WIDTH } = options;

  useEffect(() => {
    const node = ref.current;

    if (!node || prefersReducedMotion()) {
      return undefined;
    }

    let frameId = 0;
    let lastWidth = window.innerWidth;

    const setOffset = (x, y) => {
      node.style.setProperty("--parallax-x", x.toFixed(4));
      node.style.setProperty("--parallax-y", y.toFixed(4));
    };

    const isTrackable = (event) => {
      /* Single-column layouts have nothing worth offsetting. */
      if (window.innerWidth < minWidth) return false;

      if (event.pointerType && event.pointerType !== MOUSE_POINTER) {
        return false;
      }

      return true;
    };

    const handleMove = (event) => {
      if (!isTrackable(event)) return;

      /* Coalesce bursts of pointer events into a single style write. */
      if (frameId) return;

      frameId = requestAnimationFrame(() => {
        frameId = 0;

        setOffset(
          event.clientX / window.innerWidth - 0.5,
          event.clientY / window.innerHeight - 0.5,
        );
      });
    };

    const handleLeave = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      }

      setOffset(0, 0);
    };

    /* Keep the scale correct when the window is resized across the breakpoint. */
    const handleResize = () => {
      lastWidth = window.innerWidth;

      if (lastWidth < minWidth) handleLeave();
    };

    node.addEventListener("pointermove", handleMove);
    node.addEventListener("pointerleave", handleLeave);
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      if (frameId) cancelAnimationFrame(frameId);

      node.removeEventListener("pointermove", handleMove);
      node.removeEventListener("pointerleave", handleLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [ref, minWidth]);
}
