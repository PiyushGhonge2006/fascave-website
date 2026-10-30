const mongoose = require("mongoose");

const homeContentSchema =
  new mongoose.Schema(
    {
      hero: {
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

        highlightText: {
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
          default: "",
        },

        ctaHref: {
          type: String,
          trim: true,
          default: "/contact",
        },

        image: {
          type: String,
          trim: true,
          default: "",
        },
      },

      stats: [
        {
          value: {
            type: String,
            required: true,
          },

          label: {
            type: String,
            required: true,
          },
        },
      ],

      clients: [
        {
          name: {
            type: String,
            trim: true,
            default: "",
          },

          logo: {
            type: String,
            trim: true,
            default: "",
          },

          link: {
            type: String,
            trim: true,
            default: "",
          },

          isActive: {
            type: Boolean,
            default: true,
          },
        },
      ],

      // Overall home section visibility
      portfolioSectionVisible: {
        type: Boolean,
        default: true,
      },

      servicesSectionVisible: {
        type: Boolean,
        default: true,
      },

      clientsSectionVisible: {
        type: Boolean,
        default: true,
      },

      whyChooseUsSectionVisible: {
        type: Boolean,
        default: true,
      },

      gtmPartnersSectionVisible: {
        type: Boolean,
        default: true,
      },

      faqSectionVisible: {
        type: Boolean,
        default: true,
      },

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

const HomeContent =
  mongoose.model(
    "HomeContent",
    homeContentSchema
  );

module.exports = HomeContent;