const Message = require("../model/msgbutton");


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const ALLOWED_SOURCES = [
  "navbar",
  "hero",
  "contact",
  "consultation",
  "other",
];


const asText = (value) =>
  typeof value === "string" ? value.trim() : "";


// ======================================================
// CREATE MESSAGE
// POST /api/messages  and  POST /api/contact
// ------------------------------------------------------------
// Accepts both shapes the site posts:
//   legacy   { firstName, lastName, email, phone, query }
//   enquiry  { name, email, phone, company,
//              projectType, budget, message }
// ======================================================

const createMessage = async (req, res) => {
  try {
    const {
      name,
      firstName,
      lastName,
      email,
      phone,
      company,
      projectType,
      budget,
      message,
      query,
      source,
      trap,
    } = req.body;


    // --------------------------------------------
    // HONEYPOT
    // --------------------------------------------
    // Answer with a normal-looking success so a bot gets
    // no signal that it was caught, but store nothing.

    if (asText(trap)) {
      return res.status(201).json({
        success: true,
        message:
          "Your message has been submitted successfully.",
      });
    }


    // --------------------------------------------
    // NORMALISE THE TWO SHAPES INTO ONE
    // --------------------------------------------

    const fullName =
      asText(name) ||
      [asText(firstName), asText(lastName)]
        .filter(Boolean)
        .join(" ");

    const body = asText(message) || asText(query);

    const cleanedEmail =
      asText(email).toLowerCase();


    // --------------------------------------------
    // REQUIRED FIELDS
    // --------------------------------------------

    if (!fullName) {
      return res.status(400).json({
        success: false,
        message: "Please tell us your name.",
      });
    }

    if (!cleanedEmail) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    if (!body) {
      return res.status(400).json({
        success: false,
        message: "Please add a message.",
      });
    }


    // --------------------------------------------
    // EMAIL VALIDATION
    // --------------------------------------------

    if (!EMAIL_REGEX.test(cleanedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }


    // --------------------------------------------
    // CREATE MESSAGE
    // --------------------------------------------

    const record = await Message.create({
      fullName,
      email: cleanedEmail,
      phone: asText(phone),
      company: asText(company),
      projectType: asText(projectType),
      budget: asText(budget),
      query: body,
      source: ALLOWED_SOURCES.includes(source)
        ? source
        : "other",
      ip: req.ip || "",
    });


    // --------------------------------------------
    // SUCCESS RESPONSE
    // --------------------------------------------
    // No `_id`, no email, no ip — the sender does not
    // need the stored record back.

    return res.status(201).json({
      success: true,
      message:
        "Your message has been submitted successfully.",
      data: {
        id: record._id,
        status: record.status,
      },
    });

  } catch (error) {

    console.error(
      "Create Message Error:",
      error
    );

    // A Mongoose validation failure carries a useful
    // message; anything else is ours, not the visitor's.
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message:
          Object.values(error.errors)[0]?.message ||
          "Please check the details you entered.",
      });
    }

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