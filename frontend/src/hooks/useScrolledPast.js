import { useEffect, useState } from "react";

/** Fires once the fixed navbar is no longer sitting on a hero. */
const DEFAULT_THRESHOLD = 12;

/**
 * Reports whether the page has scrolled past `threshold` pixels.
 *
 * Deliberately coarse: it only flips state when the threshold is crossed,
 * so scrolling does not re-render the tree on every frame. Scroll and
 * resize listeners are passive and cleaned up on unmount.
 *
 * @param {number} [threshold]
 * @returns {boolean}
 */
export default function useScrolledPast(threshold = DEFAULT_THRESHOLD) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frameId = 0;

    const measure = () => {
      frameId = 0;
      setScrolled(window.scrollY > threshold);
    };

    const handleEvent = () => {
      /* Coalesce bursts of scroll events into one read per frame. */
      if (frameId) return;

      frameId = requestAnimationFrame(measure);
    };

    measure();

    window.addEventListener("scroll", handleEvent, { passive: true });
    window.addEventListener("resize", handleEvent, { passive: true });

    return () => {
      if (frameId) cancelAnimationFrame(frameId);

      window.removeEventListener("scroll", handleEvent);
      window.removeEventListener("resize", handleEvent);
    };
  }, [threshold]);

  return scrolled;
}
