
const mongoose = require("mongoose");

const homeContentSchema = new mongoose.Schema(
  {
    hero: {
      eyebrow: { type: String, trim: true, default: "" },
      heading: { type: String, trim: true, default: "" },
      highlightText: { type: String, trim: true, default: "" },
      description: { type: String, trim: true, default: "" },
      ctaLabel: { type: String, trim: true, default: "" },
      ctaHref: { type: String, trim: true, default: "/contact" },
      image: { type: String, trim: true, default: "" },
    },

    stats: [
      {
        value: { type: String, required: true },
        label: { type: String, required: true },
      },
    ],

    clients: [
      {
        name: { type: String, trim: true, default: "" },
        logo: { type: String, trim: true, default: "" },
        link: { type: String, trim: true, default: "" },
        isActive: { type: Boolean, default: true },
      },
    ],

    // Homepage section visibility
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

    // BASIC SEO METADATA
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
    seoKeywords: {
      type: String,
      trim: true,
      default: "",
    },
    seoAuthor: {
      type: String,
      trim: true,
      default: "FasCave",
    },
    seoRobots: {
      type: String,
      trim: true,
      default: "index, follow",
    },
    seoCanonicalUrl: {
      type: String,
      trim: true,
      default: "https://fascave.com/",
    },

    // OPEN GRAPH METADATA
    ogType: {
      type: String,
      trim: true,
      default: "website",
    },
    ogSiteName: {
      type: String,
      trim: true,
      default: "FasCave",
    },
    ogTitle: {
      type: String,
      trim: true,
      default: "",
    },
    ogDescription: {
      type: String,
      trim: true,
      default: "",
    },
    ogUrl: {
      type: String,
      trim: true,
      default: "https://fascave.com/",
    },
    ogImage: {
      type: String,
      trim: true,
      default: "",
    },
    ogImageAlt: {
      type: String,
      trim: true,
      default: "FasCave IT Solutions",
    },

    // TWITTER / X METADATA
    twitterCard: {
      type: String,
      trim: true,
      default: "summary_large_image",
    },
    twitterTitle: {
      type: String,
      trim: true,
      default: "",
    },
    twitterDescription: {
      type: String,
      trim: true,
      default: "",
    },
    twitterImage: {
      type: String,
      trim: true,
      default: "",
    },
    twitterImageAlt: {
      type: String,
      trim: true,
      default: "FasCave IT Solutions",
    },

    // WEBSITE APPEARANCE
    themeColor: {
      type: String,
      trim: true,
      default: "#061b33",
    },
    favicon: {
      type: String,
      trim: true,
      default: "/favicon.svg",
    },
  },
  {
    timestamps: true,
  }
);

const HomeContent = mongoose.model(
  "HomeContent",
  homeContentSchema
);

module.exports = HomeContent;
