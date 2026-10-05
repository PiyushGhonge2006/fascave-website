const express = require("express");

const {
  getWhyChooseUs,
  createWhyChooseUs,
  updateWhyChooseUs,
} = require("../controllers/whyChooseUsController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();


// GET
router.get("/", getWhyChooseUs);


// CREATE
router.post(
  "/",
  protect,
  createWhyChooseUs
);


// UPDATE
router.put(
  "/",
  protect,
  updateWhyChooseUs
);


module.exports = router;