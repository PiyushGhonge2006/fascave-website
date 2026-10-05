const mongoose = require("mongoose");


const aboutContentSchema =
  new mongoose.Schema(
    {
      eyebrow: {
        type: String,
        trim: true,
        default: "",
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

      image: {
        type: String,
        trim: true,
        default: "",
      },

      mission: {
        type: String,
        trim: true,
        default: "",
      },

      vision: {
        type: String,
        trim: true,
        default: "",
      },

      values: [
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

          icon: {
            type: String,
            trim: true,
            default: "",
          },
        },
      ],

      seoTitle: {
        type: String,
        trim: true,
        default: "",
      },

      seoDescription: {
        type: String,
        trim: true,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  );


const AboutContent =
  mongoose.model(
    "AboutContent",
    aboutContentSchema
  );


module.exports = AboutContent;
