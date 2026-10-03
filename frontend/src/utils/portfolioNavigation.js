/* =========================================================
   PORTFOLIO NAVIGATION
   The portfolio showcase is a section on the home page
   (/#portfolio). Shared so the navbar and every call-to-action
   reach it the exact same way.
   ========================================================= */

import { prefersReducedMotion } from "./motion";

export const PORTFOLIO_ANCHOR_ID = "portfolio";

/** Time allowed for React to mount the home page before scrolling to it. */
const ROUTE_CHANGE_SETTLE_MS = 120;

function scrollToPortfolio() {
  document
    .getElementById(PORTFOLIO_ANCHOR_ID)
    ?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
}

/**
 * Scrolls to the portfolio when already on the home page, otherwise
 * navigates home first and scrolls once the section has rendered.
 *
 * @param {(path: string) => void} navigate `useNavigate` from react-router
 */
export function goToPortfolio(navigate) {
  if (window.location.pathname === "/") {
    scrollToPortfolio();
    return;
  }

  navigate("/");

  window.setTimeout(scrollToPortfolio, ROUTE_CHANGE_SETTLE_MS);
}
