const mongoose = require("mongoose");


const serviceSchema =
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

      shortDescription: {
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

      image: {
        type: String,
        trim: true,
        default: "",
      },

      features: [
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
      ],

      order: {
        type: Number,
        default: 0,
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


const Service = mongoose.model(
  "Service",
  serviceSchema
);


module.exports = Service;
