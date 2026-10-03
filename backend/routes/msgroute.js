const express = require("express");

const {
  createMessage,
  getMessages,
  getMessageById,
  updateMessageStatus,
  deleteMessage,
} = require("../controllers/msgcontrollers");

const {
  protect,
} = require("../middleware/authMiddleware");


const router = express.Router();


// ======================================================
// CREATE MESSAGE
// POST /
// The public entry point. /api/contact mounts this same
// router, so both paths reach the same handler.
// ======================================================

router.post(
  "/",
  createMessage
);


// ======================================================
// GET ALL MESSAGES
// ======================================================

router.get(
  "/",
  protect,
  getMessages
);


// ======================================================
// GET SINGLE MESSAGE
// ======================================================

router.get(
  "/:id",
  protect,
  getMessageById
);


// ======================================================
// UPDATE MESSAGE STATUS
// ======================================================

router.patch(
  "/:id/status",
  protect,
  updateMessageStatus
);


// ======================================================
// DELETE MESSAGE
// ======================================================

router.delete(
  "/:id",
  protect,
  deleteMessage
);


module.exports = router;