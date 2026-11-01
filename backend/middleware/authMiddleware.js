
const jwt = require("jsonwebtoken");
const AdminUser = require("../model/adminUser");

const extractToken = (req) => {
  const header = req.headers.authorization || "";

  if (header.startsWith("Bearer ")) {
    return header.split(" ")[1];
  }

  return null;
};

// ======================================================
// PROTECT ROUTES
// Verifies JWT and attaches req.admin
// ======================================================

const protect = async (req, res, next) => {
  try {
    console.log(`[AUTH] ${req.method} ${req.originalUrl}`);

    const token = extractToken(req);

    // TOKEN MISSING
    if (!token) {
      console.log("[AUTH] Token missing");

      return res.status(401).json({
        success: false,
        message: "Not authorised, token missing.",
      });
    }

    console.log("[AUTH] Token received:", Boolean(token));

    // TOKEN VERIFICATION
    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("[AUTH] JWT verified:", decoded.id);
    } catch (tokenError) {
      console.error("[AUTH] JWT verification failed:", tokenError.message);

      return res.status(401).json({
        success: false,
        message:
          "Not authorised, session expired. Please sign in again.",
      });
    }

    // USER LOOKUP
    const admin = await AdminUser.findById(decoded.id);

    console.log(
      "[AUTH] Admin lookup completed:",
      Boolean(admin)
    );

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin user no longer exists.",
      });
    }

    req.admin = {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    };

    console.log("[AUTH] Passing request to controller");

    next();
  } catch (error) {
    console.error("[AUTH] Middleware error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while verifying your session.",
    });
  }
};

// ======================================================
// ROLE BASED ACCESS
// ======================================================

const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.admin || !roles.includes(req.admin.role)) {
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
