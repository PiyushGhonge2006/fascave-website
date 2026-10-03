const PortfolioItem = require("../model/portfolioItem");

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


/* The public site asks for `?published=true`, which narrows the
   list to visible items only. The admin panel omits the flag and
   therefore still receives hidden items so they can be shown
   again. `$ne: false` keeps pre-`isActive` records visible. */
router.get(
  "/",
  listAll(PortfolioItem, {
    publishedFilter: {
      isActive: { $ne: false },
    },
  })
);


router.post(
  "/reorder",
  protect,
  reorder(PortfolioItem)
);


router.get(
  "/:id",
  getOne(PortfolioItem, {
    byField: "slug",
  })
);


router.post(
  "/",
  protect,
  create(PortfolioItem, {
    slugFrom: "title",
  })
);


router.put(
  "/:id",
  protect,
  update(PortfolioItem, {
    slugFrom: "title",
  })
);


router.delete(
  "/:id",
  protect,
  remove(PortfolioItem)
);


module.exports = router;
