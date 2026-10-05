const mongoose = require("mongoose");


const gtmPartnerSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxlength: 160,
      },

      logo: {
        type: String,
        trim: true,
        default: "",
      },

      website: {
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

      tier: {
        type: String,
        enum: [
          "preferred",
          "partner",
          "reseller",
        ],
        default: "partner",
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


const GtmPartner =
  mongoose.model(
    "GtmPartner",
    gtmPartnerSchema
  );


module.exports = GtmPartner;
