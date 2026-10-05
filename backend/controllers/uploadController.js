const path = require("path");
const fs = require("fs");

const upload = require("../middleware/uploadMiddleware");


const uploadsDir =
  process.env.UPLOAD_DIR || "uploads";


// Builds an absolute public URL for a stored file
const buildFileUrl = (
  req,
  filename
) => {

  const base = [
    process.env.PUBLIC_URL,
    `${req.protocol}://${req.get("host")}`,
  ].find(Boolean);

  return `${base}/uploads/${filename}`;

};


const uploadImage = async (
  req,
  res
) => {

  try {

    if (!req.file) {

      return res.status(400).json({
        success: false,
        message:
          "No image file received. Use the 'image' field.",
      });

    }


    return res.status(201).json({
      success: true,
      message:
        "Image uploaded successfully.",
      data: {
        filename: req.file.filename,
        originalName:
          req.file.originalname,
        size: req.file.size,
        url: buildFileUrl(
          req,
          req.file.filename
        ),
      },
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while uploading the image.",
    });

  }

};


const deleteImage = async (
  req,
  res
) => {

  try {

    const { filename } = req.params;

    const safeName =
      path.basename(filename);

    const filePath = path.resolve(
      uploadsDir,
      safeName
    );


    if (
      !filePath.startsWith(
        path.resolve(uploadsDir)
      )
    ) {

      return res.status(400).json({
        success: false,
        message: "Invalid filename.",
      });

    }


    if (!fs.existsSync(filePath)) {

      return res.status(404).json({
        success: false,
        message: "Image not found.",
      });

    }


    fs.unlinkSync(filePath);

    return res.status(200).json({
      success: true,
      message:
        "Image deleted successfully.",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while deleting the image.",
    });

  }

};


module.exports = {
  uploadImage,
  deleteImage,
};
