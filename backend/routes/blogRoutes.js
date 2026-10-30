const express = require("express");
const router = express.Router();

const {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const { protect } = require("../middleware/authMiddleware");

// Public routes
router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);

// Protected admin routes
router.post("/", protect, createBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

module.exports = router;