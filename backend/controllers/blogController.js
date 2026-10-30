const mongoose = require("mongoose");
const BlogPost = require("../model/blogPost");
const { toSlug } = require("./contentController");

// Generate a unique slug from the title.
const generateSlug = (value) => {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

// Normalize tags.
const normalizeTags = (tags) => {
  if (!Array.isArray(tags)) return [];

  return [...new Set(
    tags
      .map((tag) => String(tag).trim())
      .filter(Boolean)
  )];
};

// Prepare blog payload.
const preparePayload = (body) => {
  const payload = { ...body };

  delete payload._id;
  delete payload.__v;
  delete payload.createdAt;
  delete payload.updatedAt;

  if (payload.title) {
    payload.title = payload.title.trim();
  }

  if (payload.slug || payload.title) {
    payload.slug = generateSlug(
      payload.slug || toSlug(payload.title)
    );
  }

  if (payload.tags !== undefined) {
    payload.tags = normalizeTags(payload.tags);
  }

  if (payload.readMinutes !== undefined) {
    payload.readMinutes = Math.max(
      1,
      Number(payload.readMinutes) || 3
    );
  }

  return payload;
};

// GET /api/content/blog
// Public: ?published=true
// Admin: no query parameter
const getBlogs = async (req, res) => {
  try {
    const publishedOnly =
      req.query.published === "true";

    const filter = publishedOnly
      ? { status: "published" }
      : {};

    const blogs = await BlogPost.find(filter)
      .sort({
        publishedAt: -1,
        createdAt: -1,
      })
      .lean();

    return res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    console.error("Get blogs error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch blog posts.",
    });
  }
};

// GET /api/content/blog/:slug
// Only published blogs are publicly accessible.
const getBlogBySlug = async (req, res) => {
  try {
    const blog = await BlogPost.findOne({
      slug: req.params.slug,
      status: "published",
    }).lean();

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog article not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error("Get blog error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch blog article.",
    });
  }
};

// POST /api/content/blog
const createBlog = async (req, res) => {
  try {
    const payload = preparePayload(req.body);

    if (!payload.title) {
      return res.status(400).json({
        success: false,
        message: "Title is required.",
      });
    }

    if (!payload.slug) {
      payload.slug = generateSlug(payload.title);
    }

    payload.status =
      payload.status === "published"
        ? "published"
        : "draft";

    payload.publishedAt =
      payload.status === "published"
        ? new Date()
        : null;

    const blog = await BlogPost.create(payload);

    return res.status(201).json({
      success: true,
      message: "Blog created successfully.",
      data: blog,
    });
  } catch (error) {
    console.error("Create blog error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This blog slug already exists.",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to create blog.",
    });
  }
};

// PUT /api/content/blog/:id
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID.",
      });
    }

    const existing = await BlogPost.findById(id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    const payload = preparePayload(req.body);

    if (
      payload.status === "published" &&
      existing.status !== "published"
    ) {
      payload.publishedAt = new Date();
    }

    if (payload.status === "draft") {
      payload.publishedAt = null;
    }

    if (
      payload.status === "published" &&
      existing.status === "published"
    ) {
      delete payload.publishedAt;
    }

    const updated = await BlogPost.findByIdAndUpdate(
      id,
      { $set: payload },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully.",
      data: updated,
    });
  } catch (error) {
    console.error("Update blog error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This blog slug already exists.",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to update blog.",
    });
  }
};

// DELETE /api/content/blog/:id
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID.",
      });
    }

    const deleted = await BlogPost.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully.",
    });
  } catch (error) {
    console.error("Delete blog error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete blog.",
    });
  }
};

module.exports = {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
};