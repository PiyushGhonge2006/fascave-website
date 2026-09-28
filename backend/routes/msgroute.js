const express = require("express");

const {
  createMessage,
  getMessages,
  getMessageById,
  updateMessageStatus,
  deleteMessage,
} = require("../controllers/msgcontrollers");


const router = express.Router();


// ======================================================
// CREATE MESSAGE
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
  getMessages
);


// ======================================================
// GET SINGLE MESSAGE
// ======================================================

router.get(
  "/:id",
  getMessageById
);


// ======================================================
// UPDATE MESSAGE STATUS
// ======================================================

router.patch(
  "/:id/status",
  updateMessageStatus
);


// ======================================================
// DELETE MESSAGE
// ======================================================

router.delete(
  "/:id",
  deleteMessage
);


module.exports = router;