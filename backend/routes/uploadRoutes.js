const express = require("express");

const {
  uploadImage,
  deleteImage,
} = require("../controllers/uploadController");

const {
  protect,
} = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");


const router = express.Router();


router.post(
  "/",
  protect,
  upload.single("image"),
  uploadImage
);


router.delete(
  "/:filename",
  protect,
  deleteImage
);


module.exports = router;
