const mongoose = require("mongoose");


const blogPostSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        maxlength: 220,
      },

      slug: {
        type: String,
        required: [true, "Slug is required"],
        unique: true,
        trim: true,
        lowercase: true,
      },

      excerpt: {
        type: String,
        trim: true,
        default: "",
      },

      content: {
        type: String,
        trim: true,
        default: "",
      },

      coverImage: {
        type: String,
        trim: true,
        default: "",
      },

      category: {
        type: String,
        trim: true,
        default: "",
      },

      author: {
        type: String,
        trim: true,
        default: "",
      },

      tags: [
        {
          type: String,
          trim: true,
        },
      ],

      readMinutes: {
        type: Number,
        default: 3,
      },

      status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft",
      },

      publishedAt: {
        type: Date,
        default: null,
      },
    },
    {
      timestamps: true,
    }
  );


const BlogPost = mongoose.model(
  "BlogPost",
  blogPostSchema
);


module.exports = BlogPost;
