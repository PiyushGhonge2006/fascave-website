const express = require("express");

const {
  getWhyChooseUs,
  createWhyChooseUs,
  updateWhyChooseUs,
} = require("../controllers/whyChooseUsController");

const router = express.Router();


// GET
router.get("/", getWhyChooseUs);


// CREATE
router.post("/", createWhyChooseUs);


// UPDATE
router.put("/", updateWhyChooseUs);


module.exports = router;