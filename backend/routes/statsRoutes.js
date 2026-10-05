const mongoose = require("mongoose");

const Message = require("../model/msgbutton");

const BlogPost = require("../model/blogPost");

const Service = require("../model/service");

const PortfolioItem = require("../model/portfolioItem");

const GtmPartner = require("../model/gtmPartner");

const Faq = require("../model/faq");

const Testimonial = require("../model/testimonial");

const JobOpening = require("../model/jobOpening");

const {
  protect,
} = require("../middleware/authMiddleware");

const express = require("express");


const router = express.Router();


router.get(
  "/",
  protect,
  async (req, res) => {

    try {

      const since = new Date(
        Date.now() -
          7 * 24 * 60 * 60 * 1000
      );

      const [
        totalMessages,
        newMessages,
        repliedMessages,
        last7DaysMessages,
        draftPosts,
        publishedPosts,
        services,
        portfolioItems,
        partners,
        faqs,
        testimonials,
        jobOpenings,
        hiddenPortfolioItems,
        recentMessages,
        topPosts,
      ] = await Promise.all([
        Message.countDocuments(),
        Message.countDocuments({
          status: "new",
        }),
        Message.countDocuments({
          status: "replied",
        }),
        Message.countDocuments({
          createdAt: { $gte: since },
        }),
        BlogPost.countDocuments({
          status: "draft",
        }),
        BlogPost.countDocuments({
          status: "published",
        }),
        Service.countDocuments(),
        PortfolioItem.countDocuments(),
        GtmPartner.countDocuments(),
        Faq.countDocuments(),
        Testimonial.countDocuments(),
        JobOpening.countDocuments(),
        PortfolioItem.countDocuments({
          isActive: false,
        }),

        Message.find()
          .sort({ createdAt: -1 })
          .limit(5)
          .select(
            "fullName firstName lastName email source status createdAt"
          ),

        BlogPost.find()
          .sort({ createdAt: -1 })
          .limit(5)
          .select("title status createdAt"),
      ]);


      return res.status(200).json({
        success: true,
        data: {
          messages: {
            total: totalMessages,
            new: newMessages,
            replied: repliedMessages,
            last7Days:
              last7DaysMessages,
          },

          blog: {
            drafts: draftPosts,
            published: publishedPosts,
          },

          content: {
            services,
            portfolioItems,
            partners,
            faqs,
            testimonials,
            jobOpenings,
            hiddenPortfolioItems,
          },

          recentMessages,
          topPosts,
        },
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message:
          "Something went wrong while loading dashboard stats.",
      });

    }

  }
);


module.exports = router;
