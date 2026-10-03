const Testimonial = require("../model/testimonial");

const {
  listAll,
  getOne,
  create,
  update,
  remove,
  reorder,
} = require("../controllers/crudController");

const {
  protect,
} = require("../middleware/authMiddleware");

const express = require("express");


const router = express.Router();


router.get(
  "/",
  listAll(Testimonial)
);


router.post(
  "/reorder",
  protect,
  reorder(Testimonial)
);


router.get(
  "/:id",
  getOne(Testimonial)
);


router.post(
  "/",
  protect,
  create(Testimonial)
);


router.put(
  "/:id",
  protect,
  update(Testimonial)
);


router.delete(
  "/:id",
  protect,
  remove(Testimonial)
);


module.exports = router;
