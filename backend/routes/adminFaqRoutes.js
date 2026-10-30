const Faq = require("../model/faq");

const {
  listAll,
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
  protect,
  listAll(Faq)
);


router.post(
  "/reorder",
  protect,
  reorder(Faq)
);


router.post(
  "/",
  protect,
  create(Faq, {
    orderFromMax: true,
  })
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
