import { useNavigate } from "react-router-dom";

import { goToPortfolio } from "../../../utils/portfolioNavigation";
import { scrollToSection } from "../../../utils/motion";
import { CONTACT_FORM_ANCHOR_ID } from "../data/contactData";

/**
 * The two calls-to-action used across the page, so the hero and the
 * closing section always navigate in exactly the same way.
 */
export default function useContactCtas() {
  const navigate = useNavigate();

  return {
    startConversation: () => scrollToSection(CONTACT_FORM_ANCHOR_ID),
    exploreWork: () => goToPortfolio(navigate),
  };
}
