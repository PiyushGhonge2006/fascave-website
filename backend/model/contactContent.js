const mongoose = require("mongoose");

// ======================================================
// CONTACT PAGE CONTENT — single document
//
// Only the values an admin genuinely needs to change: the
// company's own contact details and social links. The contact
// *form* and its storage are untouched — they live in the
// Message model and the /api/contact endpoint.
// ======================================================

const contactContentSchema = new mongoose.Schema(
  {
    /* Hero copy */
    eyebrow: {
      type: String,
      trim: true,
      default: "LET'S BUILD SOMETHING GREAT",
    },

    heading: {
      type: String,
      trim: true,
      default: "Have an Idea? Let's Turn It Into Reality.",
    },

    description: {
      type: String,
      trim: true,
      default:
        "Whether you're launching a new product, transforming an existing business, or exploring what's possible with technology, we're ready to help.",
    },

    /* Channels rendered by the contact page and the footer */
    email: {
      type: String,
      trim: true,
      default: "hello@fascave.com",
    },

    phone: {
      type: String,
      trim: true,
      default: "",
    },

    location: {
      type: String,
      trim: true,
      default: "India",
    },

    address: {
      type: String,
      trim: true,
      default: "",
    },

    hoursLabel: {
      type: String,
      trim: true,
      default: "Working Hours",
    },

    hours: {
      type: String,
      trim: true,
      default: "Mon – Fri, 9:00 AM – 6:00 PM",
    },

    /* Social links used by the footer */
    socials: {
      type: [
        {
          _id: false,
          network: {
            type: String,
            trim: true,
            default: "",
          },
          label: {
            type: String,
            trim: true,
            default: "",
          },
          url: {
            type: String,
            trim: true,
            default: "",
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ContactContent",
  contactContentSchema
);
