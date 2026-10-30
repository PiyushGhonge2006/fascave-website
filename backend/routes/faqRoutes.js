const Faq = require("../model/faq");

const {
  listAll,
  getOne,
} = require("../controllers/crudController");

const express = require("express");


const router = express.Router();

const publicFilter = {
  isPublished: true,
  isActive: { $ne: false },
};


router.get(
  "/",
  listAll(Faq, {
    publishedOnly: true,
    publishedFilter: publicFilter,
  })
);


router.get(
  "/:id",
  getOne(Faq, {
    publishedOnly: true,
    publishedFilter: publicFilter,
  })
);


module.exports = router;
