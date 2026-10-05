/* =========================================================
   CONTACT NAVIGATION
   "Book a Free Consultation" and other contact CTAs must land
   on the enquiry form, not just the top of the contact page.
   Shared so every entry point behaves identically.
   ========================================================= */

import { scrollToSection } from "./motion";
import { CONTACT_FORM_ANCHOR_ID } from "../pages/Contact/data/contactData";

export const CONTACT_PATH = "/contact";

/** Time allowed for React to mount the contact page before scrolling to it. */
const ROUTE_CHANGE_SETTLE_MS = 120;

function scrollToContactForm() {
  scrollToSection(CONTACT_FORM_ANCHOR_ID);
}

/**
 * Scrolls to the enquiry form when already on the contact page, otherwise
 * navigates there first and scrolls once the section has rendered.
 *
 * @param {(path: string) => void} navigate `useNavigate` from react-router
 */
export function goToContactForm(navigate) {
  if (window.location.pathname === CONTACT_PATH) {
    scrollToContactForm();
    return;
  }

  navigate(CONTACT_PATH);

  window.setTimeout(scrollToContactForm, ROUTE_CHANGE_SETTLE_MS);
}
