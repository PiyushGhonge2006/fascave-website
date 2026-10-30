const mongoose = require("mongoose");


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
  },
  {
    _id: false,
  }
);


const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 180,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    shortDescription: {
      type: String,
      trim: true,
      default: "",
      maxlength: 500,
    },

    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: 5000,
    },

    icon: {
      type: String,
      trim: true,
      default: "",
    },

    image: {
      type: String,
      trim: true,
      default: "",
    },

    features: {
      type: [featureSchema],
      default: [],
    },

    order: {
      type: Number,
      default: 0,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },

    /* Visibility switch used by the admin panel. Public routes
       require both this and isPublished so older records that
       predate isActive keep rendering. */
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);


const Service = mongoose.model(
  "Service",
  serviceSchema
);

module.exports = Service;
