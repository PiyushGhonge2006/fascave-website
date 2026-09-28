const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const messageRoutes = require("./routes/msgroute");

const whyChooseUsRoutes =
  require("./routes/whyChooseUsRoutes");


const app = express();


// ======================================================
// DATABASE
// ======================================================

connectDB();


// ======================================================
// MIDDLEWARE
// ======================================================

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());


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
// WHY CHOOSE US ROUTES
// ======================================================

app.use(
  "/api/why-choose-us",
  whyChooseUsRoutes
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