const mongoose = require("mongoose");


const portfolioItemSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        maxlength: 160,
      },

      slug: {
        type: String,
        required: [true, "Slug is required"],
        unique: true,
        trim: true,
        lowercase: true,
      },

      clientName: {
        type: String,
        trim: true,
        default: "",
      },

      category: {
        type: String,
        trim: true,
        default: "",
      },

      description: {
        type: String,
        trim: true,
        default: "",
      },

      coverImage: {
        type: String,
        trim: true,
        default: "",
      },

      gallery: [
        {
          url: {
            type: String,
            trim: true,
            default: "",
          },

          caption: {
            type: String,
            trim: true,
            default: "",
          },
        },
      ],

      projectUrl: {
        type: String,
        trim: true,
        default: "",
      },

      techStack: [
        {
          type: String,
          trim: true,
        },
      ],

      order: {
        type: Number,
        default: 0,
      },

      /* Public visibility. Hiding never deletes the document —
         the admin panel keeps it, flagged as hidden. Records
         created before this field existed have no value at all,
         so the public route filters on `isActive: { $ne: false }`
         rather than `isActive: true`. */
      isActive: {
        type: Boolean,
        default: true,
      },

      /* Legacy draft flag, kept so older admin data still reads. */
      isPublished: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );


const PortfolioItem =
  mongoose.model(
    "PortfolioItem",
    portfolioItemSchema
  );


module.exports = PortfolioItem;
