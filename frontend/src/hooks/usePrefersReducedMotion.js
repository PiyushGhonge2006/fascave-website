import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Reactive `prefers-reduced-motion`.
 *
 * Returns `false` during the server render / first paint, then corrects
 * itself in an effect. Callers must not branch layout on the first value —
 * only animation, which is why the CSS also has a reduced-motion block.
 *
 * @returns {boolean}
 */
export default function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia(QUERY).matches,
  );

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return undefined;
    }

    const mq = window.matchMedia(QUERY);
    const handler = (event) => setReduced(event.matches);

    if (mq.addEventListener) {
      mq.addEventListener("change", handler);

      return () => mq.removeEventListener("change", handler);
    }

    /* Safari < 14 only has the deprecated API. */
    mq.addListener(handler);

    return () => mq.removeListener(handler);
  }, []);

  return reduced;
}
