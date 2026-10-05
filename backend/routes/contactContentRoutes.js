const express = require("express");

const ContactContent = require("../model/contactContent");

const {
  publicSingleton,
  updateSingleton,
} = require("../controllers/contentController");

const { protect } = require("../middleware/authMiddleware");


const router = express.Router();


const contactDefaults = {
  eyebrow: "LET'S BUILD SOMETHING GREAT",
  heading: "Have an Idea? Let's Turn It Into Reality.",
  description:
    "Whether you're launching a new product, transforming an existing business, or exploring what's possible with technology, we're ready to help.",
  email: "hello@fascave.com",
  phone: "",
  location: "India",
  address: "",
  hoursLabel: "Working Hours",
  hours: "Mon – Fri, 9:00 AM – 6:00 PM",
  socials: [
    {
      network: "LinkedIn",
      label: "LinkedIn",
      url: "https://www.linkedin.com/company/fascave",
    },
    {
      network: "X",
      label: "X (Twitter)",
      url: "https://x.com/fascave",
    },
    {
      network: "Instagram",
      label: "Instagram",
      url: "https://www.instagram.com/fascave",
    },
    {
      network: "GitHub",
      label: "GitHub",
      url: "https://github.com/fascave",
    },
  ],
};


router.get(
  "/",
  publicSingleton(ContactContent, contactDefaults)
);


router.put(
  "/",
  protect,
  updateSingleton(ContactContent, contactDefaults)
);


module.exports = router;
module.exports.contactDefaults = contactDefaults;
