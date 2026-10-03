const mongoose = require("mongoose");


const faqSchema =
  new mongoose.Schema(
    {
      question: {
        type: String,
        required: [true, "Question is required"],
        trim: true,
        maxlength: 400,
      },

      answer: {
        type: String,
        required: [true, "Answer is required"],
        trim: true,
        maxlength: 5000,
      },

      category: {
        type: String,
        trim: true,
        default: "general",
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


const Faq = mongoose.model(
  "Faq",
  faqSchema
);


module.exports = Faq;
