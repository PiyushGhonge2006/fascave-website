const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const path = require("path");

const messageRoutes = require("./routes/msgroute");

const {
  createMessage: contactEnquiry,
} = require("./controllers/msgcontrollers");

const whyChooseUsRoutes =
  require("./routes/whyChooseUsRoutes");

const authRoutes = require("./routes/authRoutes");

const uploadRoutes = require("./routes/uploadRoutes");

const homeRoutes = require("./routes/homeRoutes");

const aboutRoutes = require("./routes/aboutRoutes");

const serviceRoutes = require("./routes/serviceRoutes");

const portfolioRoutes = require("./routes/portfolioRoutes");

const gtmRoutes = require("./routes/gtmRoutes");

const faqRoutes = require("./routes/faqRoutes");

const testimonialRoutes = require("./routes/testimonialRoutes");

const blogRoutes = require("./routes/blogRoutes");

const careerRoutes = require("./routes/careerRoutes");

const contactContentRoutes =
  require("./routes/contactContentRoutes");

const statsRoutes = require("./routes/statsRoutes");

const seedAdmin = require("./seedAdmin");

const seedCareers = require("./seedCareers");


const app = express();


// ======================================================
// DATABASE
// ======================================================

connectDB().then(() => {

  seedAdmin();

  seedCareers();

});


// ======================================================
// MIDDLEWARE
// ======================================================

const allowedOrigins = (
  process.env.CLIENT_ORIGIN ||
  "http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);


// ======================================================
// STATIC UPLOADS
// ======================================================

app.use(
  "/uploads",
  express.static(
    path.resolve(
      process.env.UPLOAD_DIR || "uploads"
    )
  )
);


// ======================================================
// BASIC ROUTE
// ======================================================

app.get("/", (req, res) => {

  res.json({
    success: true,
    message:
      "FasCave backend is running.",
  });

});


// ======================================================
// MESSAGE ROUTES
// ======================================================

app.use(
  "/api/messages",
  messageRoutes
);


// ======================================================
// CONTACT ENQUIRY
// ------------------------------------------------------------
// Public POST. Same controller as POST /api/messages, so
// the Contact wizard and the consultation popup both land
// in the Messages inbox in the admin panel.
//
// Mounted on two paths because the wizard's TODO named
// /api/contact while the older prompts already post to
// /api/messages. The two can be merged once every caller
// has moved over.
// ======================================================

app.post(
  "/api/contact",
  contactEnquiry
);

app.post(
  "/api/contact/",
  contactEnquiry
);


// ======================================================
// WHY CHOOSE US ROUTES
// ======================================================

app.use(
  "/api/why-choose-us",
  whyChooseUsRoutes
);


// ======================================================
// AUTH ROUTES
// ======================================================

app.use(
  "/api/auth",
  authRoutes
);


// ======================================================
// UPLOAD ROUTES
// ======================================================

app.use(
  "/api/uploads",
  uploadRoutes
);


// ======================================================
// CONTENT ROUTES
// ======================================================

app.use(
  "/api/content/home",
  homeRoutes
);

app.use(
  "/api/content/about",
  aboutRoutes
);

app.use(
  "/api/content/services",
  serviceRoutes
);

app.use(
  "/api/content/portfolio",
  portfolioRoutes
);

app.use(
  "/api/content/gtm-partners",
  gtmRoutes
);

app.use(
  "/api/content/faq",
  faqRoutes
);

app.use(
  "/api/content/testimonials",
  testimonialRoutes
);

app.use(
  "/api/content/blog",
  blogRoutes
);

app.use(
  "/api/content/careers",
  careerRoutes
);

/* Editable contact details only. The enquiry form keeps
   posting to /api/contact and /api/messages. */
app.use(
  "/api/content/contact",
  contactContentRoutes
);


// ======================================================
// DASHBOARD STATS
// ======================================================

app.use(
  "/api/admin/stats",
  statsRoutes
);


// ======================================================
// ERROR HANDLER
// ======================================================

app.use(
  (error, req, res, next) => {

    if (
      error instanceof
      require("multer").MulterError
    ) {

      return res.status(400).json({
        success: false,
        message: error.message,
      });

    }

    if (error.message) {

      return res.status(400).json({
        success: false,
        message: error.message,
      });

    }

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
);


// ======================================================
// SERVER
// ======================================================

const PORT =
  process.env.PORT || 5000;


app.listen(
  PORT,
  () => {

    console.log(
      `Server running on port ${PORT}`
    );

  }
);