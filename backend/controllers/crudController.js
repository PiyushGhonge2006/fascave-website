const mongoose = require("mongoose");

const { toSlug } = require("./contentController");


// ======================================================
// LIST ALL
//
// `?published=true` narrows the response to public
// content only. The admin panel omits the flag, so it
// keeps seeing drafts, which is what it needs.
//
// Models that do not use `isPublished` pass their own
// `publishedFilter` and, if needed, their own `sort`.
// ======================================================

const DEFAULT_SORT = { order: 1, createdAt: -1 };

const listAll = (
  Model,
  {
    publishedOnly,
    publishedFilter = { isPublished: true },
    sort = DEFAULT_SORT,
  } = {}
) => {

  return async (req, res) => {

    try {

      const onlyPublished =
        publishedOnly || req.query.published === "true";

      const filter = onlyPublished
        ? { ...publishedFilter }
        : {};

      const items = await Model.find(filter)
        .sort(sort);

      return res.status(200).json({
        success: true,
        count: items.length,
        data: items,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message:
          "Something went wrong while fetching items.",
      });

    }

  };

};


const getOne =
  (
    Model,
    { byField = "slug", publishedFilter } = {}
  ) => {

    return async (req, res) => {

      try {

        const key =
          req.params.id ||
          req.params.slug;

        const isObjectId =
          mongoose.isValidObjectId(key);

        const filter = isObjectId
          ? { _id: key }
          : { [byField]: key };

        /* A public request (`?published=true`) must not be able
           to read a hidden item by guessing its id or slug. */
        if (
          req.query.published === "true" &&
          publishedFilter
        ) {

          Object.assign(
            filter,
            publishedFilter
          );

        }

        const item =
          await Model.findOne(filter);

        if (!item) {

          return res.status(404).json({
            success: false,
            message: "Item not found.",
          });

        }

        return res.status(200).json({
          success: true,
          data: item,
        });

      } catch (error) {

        return res.status(500).json({
          success: false,
          message:
            "Something went wrong while fetching the item.",
        });

      }

    };

  };


const create =
  (
    Model,
    { slugFrom, orderFromMax = false } = {}
  ) => {

    return async (req, res) => {

      try {

        const payload = {
          ...req.body,
        };


        // --------------------------------------------
        // AUTO SLUG
        // --------------------------------------------

        if (slugFrom) {

          payload.slug =
            payload.slug ||
            toSlug(payload[slugFrom]);

        }


        // --------------------------------------------
        // DEFAULT ORDER
        // --------------------------------------------

        if (
          payload.order === undefined
        ) {

          if (orderFromMax) {

            /* Counting documents breaks once an item in the
               middle is deleted, because the next insert
               reuses an existing order value. Read the
               highest order instead so new items always go
               to the end. */
            const last = await Model.findOne()
              .sort({ order: -1 })
              .select("order");

            payload.order =
              typeof last?.order === "number"
                ? last.order + 1
                : 0;

          } else {

            payload.order =
              await Model.countDocuments();

          }

        }


        // --------------------------------------------
        // PUBLISH TIMESTAMP
        // --------------------------------------------

        if (
          payload.status === "published" &&
          !payload.publishedAt
        ) {

          payload.publishedAt =
            new Date();

        }


        // --------------------------------------------
        // NORMALISE TAG ARRAYS
        // --------------------------------------------

        if (Array.isArray(payload.tags)) {

          payload.tags =
            payload.tags
              .map((tag) =>
                String(tag).trim()
              )
              .filter(Boolean);

        }

        if (Array.isArray(payload.techStack)) {

          payload.techStack =
            payload.techStack
              .map((technology) =>
                String(technology).trim()
              )
              .filter(Boolean);

        }

        const item =
          await Model.create(payload);

        return res.status(201).json({
          success: true,
          message: "Item created successfully.",
          data: item,
        });

      } catch (error) {

        if (
          error.name === "ValidationError"
        ) {

          return res.status(400).json({
            success: false,
            message: "Validation failed.",
            errors: Object.values(
              error.errors
            ).map((err) => err.message),
          });

        }


        // --------------------------------------------
        // DUPLICATE SLUG
        // --------------------------------------------

        if (error.code === 11000) {

          return res.status(409).json({
            success: false,
            message:
              "An item with this slug already exists.",
          });

        }

        return res.status(500).json({
          success: false,
          message:
            "Something went wrong while creating the item.",
        });

      }

    };

  };


const update =
  (Model, { slugFrom } = {}) => {

    return async (req, res) => {

      try {

        const payload = {
          ...req.body,
        };

        delete payload._id;
        delete payload.__v;


        // --------------------------------------------
        // AUTO SLUG
        // --------------------------------------------

        if (
          slugFrom &&
          payload[slugFrom] &&
          !payload.slug
        ) {

          payload.slug =
            toSlug(payload[slugFrom]);

        }


        // --------------------------------------------
        // PUBLISH TIMESTAMP
        // --------------------------------------------

        if (
          payload.status === "published"
        ) {

          const current =
            await Model.findById(
              req.params.id
            ).select("publishedAt");

          if (
            current &&
            !current.publishedAt
          ) {

            payload.publishedAt =
              new Date();

          }

        }

        if (Array.isArray(payload.tags)) {

          payload.tags =
            payload.tags
              .map((tag) =>
                String(tag).trim()
              )
              .filter(Boolean);

        }

        if (Array.isArray(payload.techStack)) {

          payload.techStack =
            payload.techStack
              .map((technology) =>
                String(technology).trim()
              )
              .filter(Boolean);

        }


        const item =
          await Model.findByIdAndUpdate(
            req.params.id,
            payload,
            {
              new: true,
              runValidators: true,
            }
          );

        if (!item) {

          return res.status(404).json({
            success: false,
            message: "Item not found.",
          });

        }

        return res.status(200).json({
          success: true,
          message: "Item updated successfully.",
          data: item,
        });

      } catch (error) {

        if (
          error.name === "ValidationError"
        ) {

          return res.status(400).json({
            success: false,
            message: "Validation failed.",
            errors: Object.values(
              error.errors
            ).map((err) => err.message),
          });

        }

        if (error.code === 11000) {

          return res.status(409).json({
            success: false,
            message:
              "An item with this slug already exists.",
          });

        }

        return res.status(500).json({
          success: false,
          message:
            "Something went wrong while updating the item.",
        });

      }

    };

  };


const remove = (Model) => {

  return async (req, res) => {

    try {

      const item =
        await Model.findByIdAndDelete(
          req.params.id
        );

      if (!item) {

        return res.status(404).json({
          success: false,
          message: "Item not found.",
        });

      }

      return res.status(200).json({
        success: true,
        message: "Item deleted successfully.",
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message:
          "Something went wrong while deleting the item.",
      });

    }

  };

};


const reorder = (Model) => {

  return async (req, res) => {

    try {

      const { ids } = req.body;

      if (!Array.isArray(ids)) {

        return res.status(400).json({
          success: false,
          message:
            "ids must be an array of item ids.",
        });

      }

      const uniqueIds = [
        ...new Set(ids.map(String)),
      ];

      if (
        uniqueIds.some(
          (id) =>
            !mongoose.isValidObjectId(id)
        )
      ) {

        return res.status(400).json({
          success: false,
          message:
            "One or more item ids are invalid.",
        });

      }


      const operations = uniqueIds.map(
        (id, index) => ({
          updateOne: {
            filter: { _id: id },
            update: { $set: { order: index } },
          },
        })
      );

      if (operations.length) {

        await Model.bulkWrite(operations);

      }

      const items =
        await Model.find()
          .sort({ order: 1 });

      return res.status(200).json({
        success: true,
        message: "Order updated successfully.",
        data: items,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message:
          "Something went wrong while reordering items.",
      });

    }

  };

};


module.exports = {
  listAll,
  getOne,
  create,
  update,
  remove,
  reorder,
};
