const BlogPost = require("../model/blogPost");

const {
  listAll,
  getOne,
  create,
  update,
  remove,
} = require("../controllers/crudController");

const {
  protect,
} = require("../middleware/authMiddleware");

const express = require("express");


const router = express.Router();


// Blog uses `status` instead of `isPublished`, and reads
// better newest-first by publish date rather than by the
// `order` field that the other collections share.
router.get(
  "/",
  listAll(BlogPost, {
    publishedFilter: { status: "published" },
    sort: { publishedAt: -1 },
  })
);


router.get(
  "/:id",
  getOne(BlogPost, {
    byField: "slug",
  })
);


router.post(
  "/",
  protect,
  create(BlogPost, {
    slugFrom: "title",
  })
);


router.put(
  "/:id",
  protect,
  update(BlogPost, {
    slugFrom: "title",
  })
);


router.delete(
  "/:id",
  protect,
  remove(BlogPost)
);


module.exports = router;
