const HomeContent = require("../model/homeContent");

const {
  publicSingleton,
  updateSingleton,
} = require("../controllers/contentController");

const {
  protect,
} = require("../middleware/authMiddleware");

const express = require("express");


const router = express.Router();


const homeDefaults = {
  hero: {
    eyebrow: "Digital growth partner",
    heading: "We build brands that",
    highlightText: "compound",
    description:
      "FasCave helps ambitious companies turn digital presence into measurable revenue.",
    ctaLabel: "Start a project",
    ctaHref: "/contact",
    image: "",
  },
  stats: [
    { value: "150+", label: "Projects delivered" },
    { value: "40+", label: "Happy clients" },
    { value: "8+", label: "Years of experience" },
  ],
  clients: [],
};


router.get(
  "/",
  publicSingleton(
    HomeContent,
    homeDefaults
  )
);


router.put(
  "/",
  protect,
  updateSingleton(
    HomeContent,
    homeDefaults
  )
);


module.exports = router;
