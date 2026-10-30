
const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 220,
    },

    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },

    excerpt: {
      type: String,
      trim: true,
      default: "",
    },

    content: {
      type: String,
      trim: true,
      default: "",
    },

    coverImage: {
      type: String,
      trim: true,
      default: "",
    },

    category: {
      type: String,
      trim: true,
      default: "",
    },

    author: {
      type: String,
      trim: true,
      default: "",
    },

    tags: [{
      type: String,
      trim: true,
    }],

    readMinutes: {
      type: Number,
      min: 1,
      default: 3,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    publishedAt: {
      type: Date,
      default: null,
    },

    // SEO Settings
    seo: {
      title: {
        type: String,
        trim: true,
        maxlength: 70,
        default: "",
      },

      description: {
        type: String,
        trim: true,
        maxlength: 160,
        default: "",
      },

      focusKeyword: {
        type: String,
        trim: true,
        default: "",
      },

      ogImage: {
        type: String,
        trim: true,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BlogPost", blogPostSchema);
