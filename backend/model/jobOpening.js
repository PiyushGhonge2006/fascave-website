const mongoose = require("mongoose");

// ======================================================
// JOB OPENING
//
// A collection, so an admin can add or retire roles without
// touching code. Same shape conventions as Service / Faq /
// Testimonial: `order` for sorting, `isActive` for public
// visibility.
// ======================================================

const jobOpeningSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 160,
    },

    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },

    department: {
      type: String,
      trim: true,
      default: "",
    },

    location: {
      type: String,
      trim: true,
      default: "Remote",
    },

    type: {
      type: String,
      trim: true,
      default: "Full Time",
    },

    summary: {
      type: String,
      trim: true,
      default: "",
      maxlength: 600,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    requirements: {
      type: [String],
      default: [],
    },

    benefits: {
      type: [String],
      default: [],
    },

    /* Lucide icon name, used as the role card icon. */
    icon: {
      type: String,
      trim: true,
      default: "Briefcase",
    },

    order: {
      type: Number,
      default: 0,
    },

    /* Public visibility. Hidden roles stay in the admin list. */
    isActive: {
      type: Boolean,
      default: true,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "JobOpening",
  jobOpeningSchema
);
