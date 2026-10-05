import {
  ConsultationModalContext,
  useConsultationModalState,
} from "./consultationModalContext";

import ConsultationModal from "./ConsultationModal";

/**
 * Owns the "Book a Free Consultation" popup so it can be mounted once at the
 * app root and opened from any component. The state lives here rather than in
 * the Navbar, so the trigger and the dialog never have to live in the same
 * file and the wizard keeps its state while the popup stays open.
 */
export default function ConsultationProvider({ children }) {
  const { isOpen, openConsultation, closeConsultation } =
    useConsultationModalState();

  return (
    <ConsultationModalContext.Provider
      value={{ isOpen, openConsultation, closeConsultation }}
    >
      {children}

      <ConsultationModal isOpen={isOpen} onClose={closeConsultation} />
    </ConsultationModalContext.Provider>
  );
}
