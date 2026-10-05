const mongoose = require("mongoose");


/* ======================================================
   MESSAGE
   ------------------------------------------------------------
   One collection behind both public enquiry entry points:

   - the "Start a Conversation" wizard on the Contact page
     and in the consultation popup, which submits a single
     `name` plus `company` / `projectType` / `budget`;
   - the older navbar and hero prompts, which submit
     `firstName` + `lastName` + `query`.

   So `fullName` is the field new writes use and
   `firstName` / `lastName` are kept for records already in
   the database and for the legacy shape. The admin UI reads
   whichever is present, so nothing that exists today breaks.
   ====================================================== */

const messageSchema = new mongoose.Schema(
  {
    /* What the visitor typed in the single "Name" field. */
    fullName: {
      type: String,
      trim: true,
      maxlength: 120,
    },

    /* Legacy split-name shape. */
    firstName: {
      type: String,
      trim: true,
      maxlength: 60,
    },

    lastName: {
      type: String,
      trim: true,
      maxlength: 60,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      maxlength: 120,
    },

    /* Optional on the wizard — a visitor may leave it blank. */
    phone: {
      type: String,
      trim: true,
      maxlength: 20,
    },

    company: {
      type: String,
      trim: true,
      maxlength: 120,
    },

    projectType: {
      type: String,
      trim: true,
      maxlength: 80,
    },

    budget: {
      type: String,
      trim: true,
      maxlength: 40,
    },

    /* The enquiry body. `query` is the legacy field name. */
    query: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: 2000,
    },

    source: {
      type: String,
      enum: [
        "navbar",
        "hero",
        "contact",
        "consultation",
        "other",
      ],
      default: "other",
    },

    status: {
      type: String,
      enum: ["new", "read", "replied"],
      default: "new",
    },

    /* Honeypot. Bots fill every field they find; a human
       never sees this one because the input is hidden and
       removed from the tab order. Anything arriving here is
       dropped silently. */
    trap: {
      type: String,
      default: "",
      select: false,
    },

    /* Useful for spotting repeat submissions and abuse. */
    ip: {
      type: String,
      default: "",
    },
  },

  {
    timestamps: true,
  }
);


/* ======================================================
   HELPERS
   ====================================================== */

// Every list view shows one name, whichever shape the
// record arrived in.
messageSchema.virtual("displayName").get(
  function () {
    if (this.fullName) {
      return this.fullName;
    }

    return [this.firstName, this.lastName]
      .filter(Boolean)
      .join(" ");
  }
);

messageSchema.set("toJSON", {
  virtuals: true,
});

messageSchema.set("toObject", {
  virtuals: true,
});


// The admin list queries on status and sorts by date;
// this keeps both cheap as the collection grows.
messageSchema.index({ status: 1, createdAt: -1 });


const Message = mongoose.model(
  "Message",
  messageSchema
);

module.exports = Message;