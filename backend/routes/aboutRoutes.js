const AboutContent = require("../model/aboutContent");

const {
  publicSingleton,
  updateSingleton,
} = require("../controllers/contentController");

const {
  protect,
} = require("../middleware/authMiddleware");

const express = require("express");


const router = express.Router();


const aboutDefaults = {
  eyebrow: "About FasCave",
  heading: "A growth studio built for scale",
  description:
    "We are a team of strategists, designers and engineers helping brands grow with clarity and craft.",
  image: "",
  mission:
    "To make world-class digital growth accessible to every ambitious company.",
  vision:
    "To become the most trusted growth partner for emerging brands.",
  values: [
    {
      title: "Clarity first",
      description:
        "No vanity metrics. We focus on outcomes that compound.",
      icon: "Compass",
    },
    {
      title: "Craft matters",
      description:
        "Strategy and design are inseparable in our work.",
      icon: "Sparkles",
    },
    {
      title: "Built to last",
      description:
        "Systems and content designed to keep working after launch.",
      icon: "Layers",
    },
  ],
};


router.get(
  "/",
  publicSingleton(
    AboutContent,
    aboutDefaults
  )
);


router.put(
  "/",
  protect,
  updateSingleton(
    AboutContent,
    aboutDefaults
  )
);


module.exports = router;
