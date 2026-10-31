const CareerApplication = require("../model/careerApplication");
const resumeUpload = require("../middleware/resumeUploadMiddleware");
const fs = require("fs");
const path = require("path");

const express = require("express");
const mongoose = require("mongoose");

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
    /* The public CTA now opens the centralized resume form instead of
       using these fields. They stay in the document for compatibility
       with existing saved careers content and the admin panel. */
    buttonLabel: "Send Your Resume",
    buttonHref: "",
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


/* Public single-role read used by /careers/:slug. Hidden and deleted
   roles both resolve to 404 so an old link never exposes stale data. */
const getPublicJob = async (req, res) => {
  try {
    const key = String(req.params.id || "").trim();

    const filter = mongoose.isValidObjectId(key)
      ? { _id: key, isActive: { $ne: false } }
      : { slug: key.toLowerCase(), isActive: { $ne: false } };

    const item = await JobOpening.findOne(filter);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Job opening not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching the job opening.",
    });
  }
};


router.get(
  "/jobs/:id",
  getPublicJob
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


/* ======================================================
   CAREER APPLICATIONS
====================================================== */

// PUBLIC: Submit career application

router.post(
  "/apply",
  (req, res, next) => {
    resumeUpload.array("resume", 5)(req, res, (error) => {
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }
      next();
    });
  },
  async (req, res) => {
    try {
      const {
        designation,
        fullName,
        gender,
        email,
        countryCode,
        mobile,
        dob,
        city,
        qualification,
        branch,
        college,
        passoutYear,
        experience,
        company,
        skills,
        otherSkill,
        source,
        otherSource,
        message,
      } = req.body;

      const files = req.files || [];

      if (!files.length) {
        return res.status(400).json({
          success: false,
          message: "Please upload your resume.",
        });
      }

      const parsedSkills = JSON.parse(skills || "[]");

      if (!Array.isArray(parsedSkills) || !parsedSkills.length) {
        throw new Error("Please select at least one skill.");
      }

      const application = await CareerApplication.create({
        designation,
        fullName,
        gender,
        email,
        countryCode,
        mobile,
        dob,
        city,
        qualification,
        branch,
        college,
        passoutYear,
        experience,
        company,
        skills: parsedSkills,
        otherSkill,
        source,
        otherSource,
        message,

        resume: files.map((file) => ({
          originalName: file.originalname,
          filename: file.filename,
          url: `/uploads/resumes/${file.filename}`,
          mimeType: file.mimetype,
          size: file.size,
        })),
      });

      return res.status(201).json({
        success: true,
        message: "Your career application has been submitted successfully.",
        data: {
          id: application._id,
          fullName: application.fullName,
          status: application.status,
        },
      });

    } catch (error) {
      console.error("CAREER APPLICATION ERROR:", error);

      if (req.files?.length) {
        req.files.forEach((file) => {
          fs.unlink(file.path, () => { });
        });
      }

      return res.status(400).json({
        success: false,
        message: error.message || "Application submission failed.",
      });
    }
  }
);


// ADMIN: Get all applications

router.get(
  "/applications",
  protect,
  async (req, res) => {
    try {
      const applications = await CareerApplication.find()
        .select("-__v")
        .sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        count: applications.length,
        data: applications,
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch career applications.",
      });
    }
  }
);


// ADMIN: Get single application

router.get(
  "/applications/:id",
  protect,
  async (req, res) => {
    try {
      const application = await CareerApplication.findById(
        req.params.id
      );

      if (!application) {
        return res.status(404).json({
          success: false,
          message: "Application not found.",
        });
      }

      return res.status(200).json({
        success: true,
        data: application,
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch application.",
      });
    }
  }
);


// ADMIN: Update application status

router.patch(
  "/applications/:id/status",
  protect,
  async (req, res) => {
    try {
      const allowedStatuses = [
        "New",
        "Reviewing",
        "Shortlisted",
        "Rejected",
      ];

      const { status, adminNotes } = req.body;

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid application status.",
        });
      }

      const application = await CareerApplication.findByIdAndUpdate(
        req.params.id,
        {
          status,
          ...(adminNotes !== undefined ? { adminNotes } : {}),
        },
        { new: true, runValidators: true }
      );

      if (!application) {
        return res.status(404).json({
          success: false,
          message: "Application not found.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Application updated successfully.",
        data: application,
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to update application.",
      });
    }
  }
);


// ADMIN: Delete application

router.delete(
  "/applications/:id",
  protect,
  async (req, res) => {
    try {
      const application = await CareerApplication.findById(
        req.params.id
      );

      if (!application) {
        return res.status(404).json({
          success: false,
          message: "Application not found.",
        });
      }

      // Delete associated resume files
      application.resume.forEach((resume) => {
        const filePath = path.resolve(
          __dirname,
          "..",
          process.env.UPLOAD_DIR || "uploads",
          "resumes",
          resume.filename
        );

        fs.unlink(filePath, (error) => {
          if (error && error.code !== "ENOENT") {
            console.error("Resume deletion error:", error);
          }
        });
      });

      await application.deleteOne();

      return res.status(200).json({
        success: true,
        message: "Application deleted successfully.",
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete application.",
      });
    }
  }
);

module.exports = router;
module.exports.careerDefaults = careerDefaults;
