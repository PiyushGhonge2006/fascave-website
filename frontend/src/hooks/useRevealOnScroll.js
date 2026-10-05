import { useEffect, useRef, useState } from "react";

import {
  prefersReducedMotion,
  supportsIntersectionObserver,
} from "../utils/motion";

/** Fraction of a target that must be visible before it animates in. */
const REVEAL_THRESHOLD = 0.15;

/** Triggers slightly before the element reaches the fold, for a natural feel. */
const REVEAL_ROOT_MARGIN = "0px 0px -60px 0px";

/** Never delay a sibling by more than ~640ms, however long the grid is. */
const MAX_STAGGER_INDEX = 8;

/**
 * Marks the children of each shared parent with an incrementing
 * `--reveal-delay`, so a whole grid cascades in without a single
 * inline `style` prop per card.
 *
 * Only fills in the delay when the author has not set one inline,
 * which keeps hand-tuned delays (Careers) exactly as they were.
 */
function applyAutoStagger(root, step) {
  const perParent = new Map();

  root.querySelectorAll("[data-reveal]").forEach((element) => {
    const key = element.parentElement;

    if (!key) return;

    const index = perParent.get(key) ?? 0;

    perParent.set(key, index + 1);

    if (index === 0) return;
    if (element.style.getPropertyValue("--reveal-delay")) return;

    element.style.setProperty(
      "--reveal-delay",
      `${Math.min(index, MAX_STAGGER_INDEX) * step}ms`,
    );
  });
}

/**
 * Reveal-on-scroll for a whole section.
 *
 * A single IntersectionObserver watches the section root and every
 * `[data-reveal]` element inside it:
 *  - the section root flips to `is-revealed` and reports `isRevealed`,
 *    which components use to start section-level timelines;
 *  - each `[data-reveal]` descendant gets `is-revealed` and is unobserved,
 *    so animations run once and nothing animates off-screen.
 *
 * @param {object}  [options]
 * @param {boolean} [options.disabled] Skip observation and render the final state.
 * @param {number}  [options.stagger]  Auto-stagger step in ms. 0 disables it.
 * @param {number}  [options.threshold]
 * @param {string}  [options.rootMargin]
 * @returns {[React.RefObject, boolean]} `[ref, isRevealed]`
 */
export default function useRevealOnScroll(options = {}) {
  const {
    disabled = false,
    stagger = 0,
    threshold = REVEAL_THRESHOLD,
    rootMargin = REVEAL_ROOT_MARGIN,
  } = options;

  const ref = useRef(null);

  /* Nothing to animate in these cases — render the final state directly. */
  const revealsImmediately =
    disabled ||
    !supportsIntersectionObserver() ||
    prefersReducedMotion();

  const [isRevealed, setIsRevealed] = useState(revealsImmediately);

  useEffect(() => {
    const root = ref.current;

    if (!root) {
      return undefined;
    }

    const targets = [
      root,
      ...root.querySelectorAll("[data-reveal]"),
    ];

    if (stagger > 0) {
      applyAutoStagger(root, stagger);
    }

    /* No observer, or motion is unwelcome: show everything immediately. */
    if (revealsImmediately) {
      targets.forEach((target) => target.classList.add("is-revealed"));

      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-revealed");

          if (entry.target === root) {
            setIsRevealed(true);
          }

          observer.unobserve(entry.target);
        });
      },
      { threshold, rootMargin },
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [revealsImmediately, stagger, threshold, rootMargin]);

  return [ref, isRevealed];
}
