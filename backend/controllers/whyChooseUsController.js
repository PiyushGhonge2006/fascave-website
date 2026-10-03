const WhyChooseUs = require("../model/whyChooseUs");

// ======================================================
// DEFAULTS
//
// The document is seeded on first read, so the section never
// renders empty on a fresh database and the admin panel always
// has a complete form to edit. Change these to re-baseline an
// untouched install — they are not applied to a document that
// already exists.
// ======================================================

const defaults = {
  eyebrow: "WHY CHOOSE US",
  heading:
    "Technology that earns its place in your business",
  description:
    "FasCave brings senior engineers, designers and strategists under one roof, so the solution we recommend is the one that actually moves your business forward — delivered on time, documented properly and supported afterwards.",
  ctaLabel: "Learn More About Us",
  ctaHref: "/about-us",
  stats: [
    {
      id: 1,
      value: "150+",
      label: "Projects Delivered",
      color: "brand",
      icon: "Trophy",
    },
    {
      id: 2,
      value: "40+",
      label: "Happy Clients",
      color: "accent",
      icon: "Users",
    },
    {
      id: 3,
      value: "8+",
      label: "Years of Experience",
      color: "brand",
      icon: "Award",
    },
    {
      id: 4,
      value: "100%",
      label: "Client Satisfaction",
      color: "accent",
      icon: "BadgeCheck",
    },
    {
      id: 5,
      value: "24/7",
      label: "Support & Maintenance",
      color: "brand",
      icon: "Headphones",
    },
  ],
  features: [
    {
      title: "Experience",
      icon: "Award",
      description:
        "Eight years of shipped work across web, mobile, cloud and data. We have already met the failure modes your project will meet.",
    },
    {
      title: "Quality Delivery",
      icon: "ShieldCheck",
      description:
        "Reviewed code, tested releases and an agreed scope. Nothing goes live until it is ready for real users.",
    },
    {
      title: "Dedicated Support",
      icon: "Headphones",
      description:
        "A named point of contact, 24/7 maintenance and honest response commitments for every system we hand over.",
    },
    {
      title: "Industry Expertise",
      icon: "Briefcase",
      description:
        "FMCG, jewellery, associations, consulting and B2B — patterns we can reuse instead of reinventing on every project.",
    },
  ],
};


// ======================================================
// PUBLIC READ
// Auto-creates the document on first request so the section
// has content without a manual seed step.
// ======================================================

const getWhyChooseUs = async (req, res) => {
  try {
    let data = await WhyChooseUs.findOne();

    if (!data) {
      data = await WhyChooseUs.create(defaults);
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while loading Why Choose Us content.",
    });
  }
};


// ======================================================
// CREATE — kept for compatibility with the original API.
// Refuses when a document already exists, because this is a
// singleton; admins edit through PUT instead.
// ======================================================

const createWhyChooseUs = async (req, res) => {
  try {
    const existing = await WhyChooseUs.findOne();

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Why Choose Us data already exists",
      });
    }

    const data = await WhyChooseUs.create({
      ...defaults,
      ...req.body,
    });

    return res.status(201).json({
      success: true,
      message: "Why Choose Us data created successfully",
      data,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: Object.values(error.errors).map(
          (err) => err.message
        ),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// ======================================================
// UPDATE
// Falls back to `defaults` when no document exists yet, so
// the very first admin save does not 404.
// ======================================================

const updateWhyChooseUs = async (req, res) => {
  try {
    const payload = { ...defaults, ...req.body };

    const data = await WhyChooseUs.findOneAndUpdate(
      {},
      payload,
      {
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Why Choose Us data not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Why Choose Us data updated successfully",
      data,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: Object.values(error.errors).map(
          (err) => err.message
        ),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


module.exports = {
  defaults,
  getWhyChooseUs,
  createWhyChooseUs,
  updateWhyChooseUs,
};
