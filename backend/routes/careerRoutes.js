const express = require("express");

const CareerContent = require("../model/careerContent");
const JobOpening = require("../model/jobOpening");

const {
  publicSingleton,
  updateSingleton,
} = require("../controllers/contentController");

const {
  listAll,
  create,
  update,
  remove,
  reorder,
} = require("../controllers/crudController");

const { protect } = require("../middleware/authMiddleware");


const router = express.Router();


// ======================================================
// PAGE CONTENT — singleton, same defaults pattern as
// About and Home so the page is never blank on a fresh
// database.
// ======================================================

const careerDefaults = {
  hero: {
    eyebrow: "CAREERS AT FASCAVE",
    heading: "Build Technology People Remember",
    highlightText: "Remember",
    description:
      "We are a small, senior team that ships production software for ambitious businesses. No bench, no hand-off — you talk to the people writing the code.",
    ctaLabel: "See Open Roles",
    // Matches the id on the open-positions section in
    // frontend/src/pages/Careers/Careers.jsx.
    ctaHref: "#careers-roles",
    image: "",
  },

  intro: {
    eyebrow: "WHY FASCAVE",
    heading: "A place to do the work you trained for",
    description:
      "Short cycles, real ownership and clients who respect the craft. You will ship in your first week.",
  },

  highlights: [
    { value: "8+", label: "Years shipping" },
    { value: "150+", label: "Projects delivered" },
    { value: "40+", label: "Happy clients" },
    { value: "5", label: "Core disciplines" },
  ],

  culture: {
    eyebrow: "HOW WE WORK",
    heading: "Small team, wide ownership",
    description:
      "Everyone here talks to clients, everyone reviews code, and everyone carries a real deadline.",
    items: [
      {
        title: "Direct client contact",
        description:
          "Your name is on the call and in the repository. No layer of account managers between you and the problem.",
        icon: "MessagesSquare",
      },
      {
        title: "Real ownership",
        description:
          "You pick up a feature and see it through to production, supported by a team that reviews your work.",
        icon: "KeyRound",
      },
      {
        title: "Learning budget",
        description:
          "Conferences, courses and certifications are funded. We ask that you share what you learn with the team.",
        icon: "GraduationCap",
      },
      {
        title: "Work-life balance",
        description:
          "Sensible hours, remote-friendly, and no expectation of a 2am deploy because someone else broke something.",
        icon: "HeartHandshake",
      },
    ],
  },

  cta: {
    eyebrow: "JOIN THE TEAM",
    heading: "Do not see your role?",
    description:
      "Send us your portfolio anyway. We hire for trajectory more than for a perfect match on a job board.",
    buttonLabel: "Send an Application",
    buttonHref: "/contact",
  },
};


router.get(
  "/",
  publicSingleton(CareerContent, careerDefaults)
);


router.put(
  "/",
  protect,
  updateSingleton(CareerContent, careerDefaults)
);


// ======================================================
// JOB OPENINGS
//
// Declared before `/:id` so "jobs" is never read as an id.
// The public site asks for `?published=true` and receives
// visible roles only; the admin panel omits the flag and also
// receives hidden ones.
// ======================================================

router.get(
  "/jobs",
  listAll(JobOpening, {
    publishedFilter: {
      isActive: { $ne: false },
    },
  })
);


router.post(
  "/jobs/reorder",
  protect,
  reorder(JobOpening)
);


router.post(
  "/jobs",
  protect,
  create(JobOpening, {
    slugFrom: "title",
  })
);


router.put(
  "/jobs/:id",
  protect,
  update(JobOpening, {
    slugFrom: "title",
  })
);


router.delete(
  "/jobs/:id",
  protect,
  remove(JobOpening)
);


module.exports = router;
module.exports.careerDefaults = careerDefaults;
