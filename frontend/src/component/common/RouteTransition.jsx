import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

/**
 * Wraps the routed page so every navigation gets a short, calm entrance.
 *
 * Two jobs, both tiny:
 *  - `key`-ing on the pathname remounts the subtree, which restarts the
 *    `.fc-page` animation in the global motion stylesheet;
 *  - scrolling back to the top on navigation, because the browser keeps the
 *    previous scroll offset across a pushState navigation, which otherwise
 *    drops you into the middle of the new page.
 *
 * Scroll restoration is skipped for in-page anchors (a `#hash`), so the
 * existing "jump to a section" behaviour is untouched.
 */
export default function RouteTransition({ children }) {
  const { pathname, hash } = useLocation();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    /* An anchor on the current page: let the browser handle it. */
    if (hash) return;

    /* Avoid a visible jump while the new page is still fading in. */
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash, reduced]);

  return (
    <div className="fc-page" key={pathname}>
      {children}
    </div>
  );
}
