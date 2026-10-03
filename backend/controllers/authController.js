const AdminUser = require("../model/adminUser");

const generateToken = require("../utils/generateToken");

const {
  handleControllerError,
} = require("../utils/dbErrors");


const loginAdmin = async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;


    // --------------------------------------------
    // CHECK REQUIRED FIELDS
    // --------------------------------------------

    if (!email || !password) {

      return res.status(400).json({
        success: false,
        message:
          "Email and password are required.",
      });

    }


    // --------------------------------------------
    // FIND ADMIN USER
    // --------------------------------------------

    const admin =
      await AdminUser.findOne({
        email: email.toLowerCase().trim(),
      }).select("+password");

    if (!admin) {

      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password.",
      });

    }


    // --------------------------------------------
    // MATCH PASSWORD
    // --------------------------------------------

    const isMatch =
      await admin.matchPassword(
        password
      );

    if (!isMatch) {

      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password.",
      });

    }


    // --------------------------------------------
    // UPDATE LAST LOGIN
    // --------------------------------------------

    admin.lastLoginAt = new Date();

    await admin.save({
      validateBeforeSave: false,
    });


    // --------------------------------------------
    // GENERATE TOKEN AND RESPOND
    // --------------------------------------------

    const token =
      generateToken(admin);

    return res.status(200).json({
      success: true,
      message: "Signed in successfully.",
      data: {
        admin: admin.toPublicJSON(),
        token,
      },
    });

  } catch (error) {

    return handleControllerError(
      res,
      error,
      "Something went wrong while signing in."
    );

  }

};


const getProfile = async (
  req,
  res
) => {

  try {

    const admin =
      await AdminUser.findById(
        req.admin.id
      );

    if (!admin) {

      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });

    }

    return res.status(200).json({
      success: true,
      data: {
        admin: admin.toPublicJSON(),
      },
    });

  } catch (error) {

    return handleControllerError(
      res,
      error,
      "Something went wrong while fetching profile."
    );

  }

};


module.exports = {
  loginAdmin,
  getProfile,
};
