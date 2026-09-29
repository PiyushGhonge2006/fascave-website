const Message = require("../model/msgbutton");


// ======================================================
// CREATE MESSAGE
// POST /api/messages
// ======================================================

const createMessage = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      query,
      source,
    } = req.body;


    // --------------------------------------------
    // CHECK REQUIRED FIELDS
    // --------------------------------------------

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !query
    ) {
      return res.status(400).json({
        success: false,
        message:
          "First name, last name, email, phone and query are required.",
      });
    }


    // --------------------------------------------
    // EMAIL VALIDATION
    // --------------------------------------------

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }


    // --------------------------------------------
    // CREATE MESSAGE
    // --------------------------------------------

    const message = await Message.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      query: query.trim(),
      source:
        source === "navbar" ||
        source === "hero"
          ? source
          : "other",
    });


    // --------------------------------------------
    // SUCCESS RESPONSE
    // --------------------------------------------

    return res.status(201).json({
      success: true,
      message:
        "Your message has been submitted successfully.",
      data: message,
    });

  } catch (error) {

    console.error(
      "Create Message Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while submitting your message.",
    });
  }
};



// ======================================================
// GET ALL MESSAGES
// GET /api/messages
// ======================================================

const getMessages = async (req, res) => {
  try {

    const messages = await Message.find()
      .sort({ createdAt: -1 });


    return res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });

  } catch (error) {

    console.error(
      "Get Messages Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while fetching messages.",
    });
  }
};



// ======================================================
// GET SINGLE MESSAGE
// GET /api/messages/:id
// ======================================================

const getMessageById = async (req, res) => {
  try {

    const { id } = req.params;


    const message =
      await Message.findById(id);


    if (!message) {

      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });

    }


    return res.status(200).json({
      success: true,
      data: message,
    });

  } catch (error) {

    console.error(
      "Get Single Message Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while fetching the message.",
    });
  }
};



// ======================================================
// UPDATE MESSAGE STATUS
// PATCH /api/messages/:id/status
// ======================================================

const updateMessageStatus = async (
  req,
  res
) => {
  try {

    const { id } = req.params;
    const { status } = req.body;


    // --------------------------------------------
    // VALID STATUS
    // --------------------------------------------

    const allowedStatuses = [
      "new",
      "read",
      "replied",
    ];


    if (!allowedStatuses.includes(status)) {

      return res.status(400).json({
        success: false,
        message:
          "Invalid status. Allowed values: new, read, replied.",
      });

    }


    // --------------------------------------------
    // UPDATE
    // --------------------------------------------

    const updatedMessage =
      await Message.findByIdAndUpdate(
        id,
        { status },
        {
          new: true,
          runValidators: true,
        }
      );


    if (!updatedMessage) {

      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });

    }


    return res.status(200).json({
      success: true,
      message:
        "Message status updated successfully.",
      data: updatedMessage,
    });

  } catch (error) {

    console.error(
      "Update Message Status Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while updating the message.",
    });
  }
};



// ======================================================
// DELETE MESSAGE
// DELETE /api/messages/:id
// ======================================================

const deleteMessage = async (
  req,
  res
) => {
  try {

    const { id } = req.params;


    const deletedMessage =
      await Message.findByIdAndDelete(id);


    if (!deletedMessage) {

      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });

    }


    return res.status(200).json({
      success: true,
      message:
        "Message deleted successfully.",
    });

  } catch (error) {

    console.error(
      "Delete Message Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while deleting the message.",
    });
  }
};



module.exports = {
  createMessage,
  getMessages,
  getMessageById,
  updateMessageStatus,
  deleteMessage,
};