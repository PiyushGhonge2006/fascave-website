import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

/**
 * State for the "Book a Free Consultation" popup.
 *
 * Kept in its own module (no components) so the provider file can export a
 * single component, which is what keeps fast refresh working.
 */
export const ConsultationModalContext = createContext(null);

/** Owns the open/closed state. Called once, by the provider. */
export function useConsultationModalState() {
  const [isOpen, setIsOpen] = useState(false);

  const openConsultation = useCallback(() => setIsOpen(true), []);
  const closeConsultation = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, openConsultation, closeConsultation }),
    [isOpen, openConsultation, closeConsultation],
  );

  return value;
}

/** Used by whichever component opens the popup. */
export function useConsultationModal() {
  const context = useContext(ConsultationModalContext);

  if (!context) {
    throw new Error(
      "useConsultationModal must be used inside ConsultationProvider",
    );
  }

  return context;
}
