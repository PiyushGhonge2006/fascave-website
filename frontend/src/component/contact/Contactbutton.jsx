import React, {
  createContext,
  useContext,
  useState,
} from "react";

import ContactModal from "./ContactModal";

const ContactContext = createContext(null);

export const ContactProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("other");

  const openContact = (buttonSource = "other") => {
    setSource(buttonSource);
    setIsOpen(true);
  };

  const closeContact = () => {
    setIsOpen(false);
  };

  return (
    <ContactContext.Provider
      value={{
        openContact,
        closeContact,
      }}
    >
      {children}

      <ContactModal
        isOpen={isOpen}
        onClose={closeContact}
        source={source}
      />
    </ContactContext.Provider>
  );
};

export const useContact = () => {
  const context = useContext(ContactContext);

  if (!context) {
    throw new Error(
      "useContact must be used inside ContactProvider"
    );
  }

  return context;
};