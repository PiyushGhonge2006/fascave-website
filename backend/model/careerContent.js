const mongoose = require("mongoose");

// ======================================================
// CAREERS PAGE CONTENT — single document
//
// Same pattern as About and Home: one editable record that
// the public page reads and the admin panel writes.
// ======================================================

const careerContentSchema = new mongoose.Schema(
  {
    hero: {
      eyebrow: {
        type: String,
        trim: true,
        default: "CAREERS AT FASCAVE",
      },

      heading: {
        type: String,
        trim: true,
        default: "Build Technology People Remember",
      },

      highlightText: {
        type: String,
        trim: true,
        default: "Remember",
      },

      description: {
        type: String,
        trim: true,
        default:
          "We are a small, senior team that ships production software for ambitious businesses. No bench, no hand-off — you talk to the people writing the code.",
      },

      ctaLabel: {
        type: String,
        trim: true,
        default: "See Open Roles",
      },

      ctaHref: {
        type: String,
        trim: true,
        default: "#open-roles",
      },

      image: {
        type: String,
        trim: true,
        default: "",
      },
    },

    intro: {
      eyebrow: {
        type: String,
        trim: true,
        default: "WHY FASCAVE",
      },

      heading: {
        type: String,
        trim: true,
        default: "A place to do the work you trained for",
      },

      description: {
        type: String,
        trim: true,
        default:
          "Short cycles, real ownership and clients who respect the craft. You will ship in your first week.",
      },
    },

    /* Free-form highlights shown under the hero. */
    highlights: {
      type: [
        {
          _id: false,
          value: {
            type: String,
            trim: true,
            default: "",
          },
          label: {
            type: String,
            trim: true,
            default: "",
          },
        },
      ],
      default: [],
    },

    culture: {
      eyebrow: {
        type: String,
        trim: true,
        default: "HOW WE WORK",
      },

      heading: {
        type: String,
        trim: true,
        default: "Small team, wide ownership",
      },

      description: {
        type: String,
        trim: true,
        default:
          "Everyone here talks to clients, everyone reviews code, and everyone carries a real deadline.",
      },

      /* Lucide icon name per item. */
      items: {
        type: [
          {
            _id: false,
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
        default: [],
      },
    },

    cta: {
      eyebrow: {
        type: String,
        trim: true,
        default: "JOIN THE TEAM",
      },

      heading: {
        type: String,
        trim: true,
        default: "Do not see your role?",
      },

      description: {
        type: String,
        trim: true,
        default:
          "Send us your portfolio anyway. We hire for trajectory more than for a perfect match on a job board.",
      },

      buttonLabel: {
        type: String,
        trim: true,
        default: "Send an Application",
      },

      buttonHref: {
        type: String,
        trim: true,
        default: "/contact",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "CareerContent",
  careerContentSchema
);
