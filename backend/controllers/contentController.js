const mongoose = require("mongoose");

const HomeContent = require("../model/homeContent");


const toSlug = (value) => {

  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

};


const publicSingleton = (
  Model,
  defaults = {}
) => {

  return async (req, res) => {

    try {

      let data =
        await Model.findOne();


      // --------------------------------------------
      // AUTO CREATE ON FIRST READ
      // --------------------------------------------

      if (!data) {

        data = await Model.create(
          defaults
        );

      }

      return res.status(200).json({
        success: true,
        data,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message:
          "Something went wrong while fetching content.",
      });

    }

  };

};


const updateSingleton = (
  Model,
  defaults = {}
) => {

  return async (req, res) => {

    try {

      const existing =
        await Model.findOne();

      if (!existing) {

        await Model.create(defaults);

      }


      // --------------------------------------------
      // MERGE NESTED SINGLETON SECTIONS
      // --------------------------------------------

      const payload = {
        ...req.body,
      };

      if (existing) {

        for (
          const key of Object.keys(payload)
        ) {

          const current =
            existing[key];

          const incoming =
            payload[key];

          const isPlainObject =
            current &&
            typeof current === "object" &&
            !Array.isArray(current) &&
            incoming &&
            typeof incoming === "object" &&
            !Array.isArray(incoming);

          if (isPlainObject) {

            payload[key] = {
              ...current.toObject
                ? current.toObject()
                : current,
              ...incoming,
            };

          }

        }

      }


      const data =
        await Model.findOneAndUpdate(
          {},
          payload,
          {
            new: true,
            runValidators: true,
            setDefaultsOnInsert: true,
          }
        );

      return res.status(200).json({
        success: true,
        message:
          "Content updated successfully.",
        data,
      });

    } catch (error) {

      if (
        error.name === "ValidationError"
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Validation failed.",
          errors: Object.values(
            error.errors
          ).map((err) => err.message),
        });

      }

      return res.status(500).json({
        success: false,
        message:
          "Something went wrong while updating content.",
      });

    }

  };

};


module.exports = {
  publicSingleton,
  updateSingleton,
  toSlug,
};
