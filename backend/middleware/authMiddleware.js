const jwt = require("jsonwebtoken");

const AdminUser = require("../model/adminUser");


const extractToken = (req) => {

  const header =
    req.headers.authorization || "";

  if (
    header.startsWith("Bearer ")
  ) {

    return header.split(" ")[1];

  }

  return null;

};


// ======================================================
// PROTECT ROUTES
// Verifies JWT and attaches req.admin
// ======================================================

const protect = async (
  req,
  res,
  next
) => {

  try {

    const token = extractToken(req);


    // --------------------------------------------
    // TOKEN MISSING
    // --------------------------------------------

    if (!token) {

      return res.status(401).json({
        success: false,
        message:
          "Not authorised, token missing.",
      });

    }


    // --------------------------------------------
    // TOKEN INVALID OR EXPIRED
    // --------------------------------------------

    let decoded;

    try {

      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    } catch (tokenError) {

      return res.status(401).json({
        success: false,
        message:
          "Not authorised, session expired. Please sign in again.",
      });

    }


    // --------------------------------------------
    // USER LOOKUP
    // --------------------------------------------

    const admin =
      await AdminUser.findById(
        decoded.id
      );

    if (!admin) {

      return res.status(401).json({
        success: false,
        message:
          "Admin user no longer exists.",
      });

    }


    req.admin = {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    };

    next();

  } catch (error) {

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while verifying your session.",
    });

  }

};


// ======================================================
// ROLE BASED ACCESS
// Usage: requireRole("admin")
// ======================================================

const requireRole = (...roles) => {

  return (req, res, next) => {

    if (
      !req.admin ||
      !roles.includes(req.admin.role)
    ) {

      return res.status(403).json({
        success: false,
        message:
          "You do not have permission to perform this action.",
      });

    }

    next();

  };

};


module.exports = {
  protect,
  requireRole,
};
