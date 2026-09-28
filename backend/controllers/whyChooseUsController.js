const WhyChooseUs = require("../model/whyChooseUs");

// GET Why Choose Us data
const getWhyChooseUs = async (req, res) => {
  try {
    const data = await WhyChooseUs.findOne();

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Why Choose Us data not found",
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// CREATE initial data
const createWhyChooseUs = async (req, res) => {
  try {
    const existingData = await WhyChooseUs.findOne();

    if (existingData) {
      return res.status(400).json({
        success: false,
        message: "Why Choose Us data already exists",
      });
    }

    const data = await WhyChooseUs.create(req.body);

    res.status(201).json({
      success: true,
      message: "Why Choose Us data created successfully",
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// UPDATE Why Choose Us
const updateWhyChooseUs = async (req, res) => {
  try {
    const data = await WhyChooseUs.findOneAndUpdate(
      {},
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Why Choose Us data not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Why Choose Us data updated successfully",
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


module.exports = {
  getWhyChooseUs,
  createWhyChooseUs,
  updateWhyChooseUs,
};