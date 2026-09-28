const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      maxlength: 100,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      maxlength: 20,
    },

    query: {
      type: String,
      required: [true, "Query is required"],
      trim: true,
      maxlength: 2000,
    },

    source: {
      type: String,
      enum: ["navbar", "hero", "other"],
      default: "other",
    },

    status: {
      type: String,
      enum: ["new", "read", "replied"],
      default: "new",
    },
  },

  {
    timestamps: true,
  }
);

const Message = mongoose.model(
  "Message",
  messageSchema
);

module.exports = Message;