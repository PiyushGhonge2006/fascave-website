import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import "./ContactModal.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  query: "",
};

const ContactModal = ({ isOpen, onClose, source }) => {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Close with ESC + prevent background scrolling
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );

      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const response = await fetch(
        `${API_URL}/api/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            source,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to submit form."
        );
      }

      setMessage(
        "Your message has been submitted successfully!"
      );

      setMessageType("success");

      setFormData(initialForm);

      // Close modal after successful submission
      setTimeout(() => {
        onClose();
        setMessage("");
        setMessageType("");
      }, 1800);
    } catch (error) {
      console.error("Contact form error:", error);

      setMessage(
        error.message ||
          "Something went wrong. Please try again."
      );

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="contact-overlay"
      onMouseDown={onClose}
    >
      <div
        className="contact-modal"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        {/* Header */}
        <div className="contact-header">
          <h2>Contact</h2>

          <button
            type="button"
            className="contact-close"
            onClick={onClose}
            aria-label="Close contact form"
          >
            <X size={28} />
          </button>
        </div>

        {/* Form */}
        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >
          {/* First + Last Name */}
          <div className="contact-row">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={50}
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={50}
            />
          </div>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            maxLength={100}
          />

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            maxLength={20}
          />

          {/* Query */}
          <textarea
            name="query"
            placeholder="Your Query"
            value={formData.query}
            onChange={handleChange}
            required
            maxLength={2000}
          />

          {/* Success / Error Message */}
          {message && (
            <div
              className={`form-message ${messageType}`}
            >
              {message}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="submit-form-btn"
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : "Submit Form"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;