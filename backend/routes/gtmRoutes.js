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

const publicFilter = {
  isPublished: true,
  isActive: { $ne: false },
};


router.get(
  "/",
  listAll(GtmPartner, {
    publishedFilter: publicFilter,
  })
);


router.post(
  "/reorder",
  protect,
  reorder(GtmPartner)
);


router.get(
  "/:id",
  getOne(GtmPartner, {
    publishedFilter: publicFilter,
  })
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
