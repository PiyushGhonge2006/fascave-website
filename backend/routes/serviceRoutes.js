const Service = require("../model/service");

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
  listAll(Service)
);


router.post(
  "/reorder",
  protect,
  reorder(Service)
);


router.get(
  "/:id",
  getOne(Service, {
    byField: "slug",
  })
);


router.post(
  "/",
  protect,
  create(Service, {
    slugFrom: "title",
  })
);


router.put(
  "/:id",
  protect,
  update(Service, {
    slugFrom: "title",
  })
);


router.delete(
  "/:id",
  protect,
  remove(Service)
);


module.exports = router;
