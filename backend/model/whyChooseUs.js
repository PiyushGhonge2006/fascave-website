const mongoose = require("mongoose");

// ======================================================
// WHY CHOOSE US — single document
//
// `stats` keeps its original shape so existing records keep
// rendering. The heading block and the four feature boxes were
// added later; every one of them is optional with a safe
// default, so a document written by an older build still
// validates and still loads.
// ======================================================

const statSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      default: 0,
    },

    value: {
      type: String,
      trim: true,
      default: "",
    },

    label: {
      type: String,
      trim: true,
      default: "",
    },

    /* Optional accent token name. Empty means "use the
       section default". */
    color: {
      type: String,
      trim: true,
      default: "",
    },

    /* Lucide icon name, e.g. "Users". */
    icon: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    _id: false,
  }
);

const featureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      default: "",
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    /* Lucide icon name, e.g. "Award". */
    icon: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    _id: false,
  }
);

const whyChooseUsSchema = new mongoose.Schema(
  {
    eyebrow: {
      type: String,
      trim: true,
      default: "WHY CHOOSE US",
    },

    heading: {
      type: String,
      trim: true,
      default: "",
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    ctaLabel: {
      type: String,
      trim: true,
      default: "Learn More About Us",
    },

    ctaHref: {
      type: String,
      trim: true,
      default: "/about-us",
    },

    stats: {
      type: [statSchema],
      default: [],
    },

    features: {
      type: [featureSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "WhyChooseUs",
  whyChooseUsSchema
);
