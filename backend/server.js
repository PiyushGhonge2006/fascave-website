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

const authRoutes =
  require("./routes/authRoutes");

const uploadRoutes =
  require("./routes/uploadRoutes");

const homeRoutes =
  require("./routes/homeRoutes");

const aboutRoutes =
  require("./routes/aboutRoutes");

const serviceRoutes =
  require("./routes/serviceRoutes");

const portfolioRoutes =
  require("./routes/portfolioRoutes");

const gtmRoutes =
  require("./routes/gtmRoutes");

const faqRoutes =
  require("./routes/faqRoutes");

const testimonialRoutes =
  require("./routes/testimonialRoutes");

const blogRoutes =
  require("./routes/blogRoutes");

const careerRoutes =
  require("./routes/careerRoutes");

const contactContentRoutes =
  require("./routes/contactContentRoutes");

const statsRoutes =
  require("./routes/statsRoutes");

const seedAdmin =
  require("./seedAdmin");

const seedCareers =
  require("./seedCareers");


// ======================================================
// FAQ MODEL
// ======================================================

const Faq =
  require("./model/faq");


const app = express();


// ======================================================
// DATABASE
// ======================================================

connectDB().then(() => {

  seedAdmin();

  seedCareers();

});


// ======================================================
// CORS
// ======================================================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
];

if (process.env.CLIENT_ORIGIN) {

  const envOrigins =
    process.env.CLIENT_ORIGIN
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean);

  allowedOrigins.push(
    ...envOrigins
  );
}

app.use(
  cors({
    origin: function (origin, callback) {

      if (!origin) {
        return callback(null, true);
      }

      if (
        allowedOrigins.includes(origin)
      ) {
        return callback(null, true);
      }

      console.log(
        "CORS blocked origin:",
        origin
      );

      return callback(
        new Error(
          `CORS blocked origin: ${origin}`
        )
      );
    },

    credentials: true,
  })
);


// ======================================================
// MIDDLEWARE
// ======================================================

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);


// ======================================================
// STATIC UPLOADS
// ======================================================

const uploadDir = path.resolve(
  __dirname,
  process.env.UPLOAD_DIR || "uploads"
);

console.log("UPLOAD DIRECTORY:", uploadDir);

app.use(
  "/uploads",
  express.static(uploadDir)
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


// ======================================================
// FAQ - PUBLIC GET ALL
// ======================================================
// This is intentionally handled directly here.
// It guarantees:
//
// GET /api/content/faq
//
// returns FAQ data from MongoDB.
//
// Admin POST / PUT / DELETE remain handled by faqRoutes.
// ======================================================

app.get(
  "/api/content/faq",
  async (req, res) => {

    try {

      console.log(
        "FAQ GET REQUEST RECEIVED"
      );

      const faqs =
        await Faq.find({
          isPublished: true,
        }).sort({
          order: 1,
          createdAt: 1,
        });

      console.log(
        `FAQS FOUND: ${faqs.length}`
      );

      return res.status(200).json({

        success: true,

        data: faqs,

      });

    } catch (error) {

      console.error(
        "FAQ FETCH ERROR:",
        error
      );

      return res.status(500).json({

        success: false,

        message:
          "Failed to fetch FAQs",

        error:
          error.message,

      });

    }

  }
);


// ======================================================
// FAQ - REMAINING ADMIN / SINGLE FAQ ROUTES
// ======================================================

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


// ======================================================
// CONTACT CONTENT
// ======================================================

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

        message:
          error.message,

      });

    }

    if (error.message) {

      return res.status(400).json({

        success: false,

        message:
          error.message,

      });

    }

    return res.status(500).json({

      success: false,

      message:
        "Server Error",

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