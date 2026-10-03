const mongoose = require("mongoose");


const testimonialSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxlength: 120,
      },

      role: {
        type: String,
        trim: true,
        default: "",
      },

      company: {
        type: String,
        trim: true,
        default: "",
      },

      avatar: {
        type: String,
        trim: true,
        default: "",
      },

      quote: {
        type: String,
        required: [true, "Quote is required"],
        trim: true,
        maxlength: 2000,
      },

      rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5,
      },

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


const Testimonial =
  mongoose.model(
    "Testimonial",
    testimonialSchema
  );


module.exports = Testimonial;
