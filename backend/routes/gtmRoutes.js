const GtmPartner = require("../model/gtmPartner");

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
  listAll(GtmPartner)
);


router.post(
  "/reorder",
  protect,
  reorder(GtmPartner)
);


router.get(
  "/:id",
  getOne(GtmPartner)
);


router.post(
  "/",
  protect,
  create(GtmPartner)
);


router.put(
  "/:id",
  protect,
  update(GtmPartner)
);


router.delete(
  "/:id",
  protect,
  remove(GtmPartner)
);


module.exports = router;
