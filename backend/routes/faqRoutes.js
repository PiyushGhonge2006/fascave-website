const Faq = require("../model/faq");

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
  listAll(Faq)
);


router.post(
  "/reorder",
  protect,
  reorder(Faq)
);


router.get(
  "/:id",
  getOne(Faq)
);


router.post(
  "/",
  protect,
  create(Faq)
);


router.put(
  "/:id",
  protect,
  update(Faq)
);


router.delete(
  "/:id",
  protect,
  remove(Faq)
);


module.exports = router;
