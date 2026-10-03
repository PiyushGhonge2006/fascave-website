/* =========================================================
   MOTION UTILITIES
   Small, dependency-free helpers shared across pages:
   reduced-motion detection, feature detection and
   accessible section scrolling.
   ========================================================= */

/** Users who ask the OS to minimise motion get instant behaviour. */
export function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Older browsers simply render revealed content instead of animating it. */
export function supportsIntersectionObserver() {
  return (
    typeof window !== "undefined" && "IntersectionObserver" in window
  );
}

/**
 * Scrolls a section into view.
 * Honours `prefers-reduced-motion` so navigation stays instant for users
 * who asked for reduced motion. `scroll-margin-top` on the target keeps
 * the section clear of the fixed navbar.
 */
export function scrollToSection(sectionId, options = {}) {
  const section = document.getElementById(sectionId);

  if (!section) {
    return;
  }

  section.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
    ...options,
  });
}
