const mongoose = require("mongoose");

const whyChooseUsSchema = new mongoose.Schema(
  {
    stats: [
      {
        id: {
          type: Number,
          required: true,
        },

        value: {
          type: String,
          required: true,
        },

        label: {
          type: String,
          required: true,
        },

        color: {
          type: String,
          required: true,
        },

        icon: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "WhyChooseUs",
  whyChooseUsSchema
);