const uploadsDir = process.env.UPLOAD_DIR || "uploads";
const multer = require("multer");
const path = require("path");
const fs = require("fs");


if (!fs.existsSync(uploadsDir)) {

  fs.mkdirSync(uploadsDir, {
    recursive: true,
  });

}


const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadsDir);
  },
  filename(req, file, cb) {
    const ext =
      path.extname(file.originalname);
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(
        Math.random() * 1e9
      );
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${ext}`
    );
  },
});


const allowedMimes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "image/gif",
];


const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter(
    req,
    file,
    cb
  ) {

    if (
      allowedMimes.includes(
        file.mimetype
      )
    ) {

      cb(null, true);

    } else {

      cb(
        new Error(
          "Invalid file type. Allowed: JPG, JPEG, PNG, WebP, SVG, GIF"
        )
      );

    }

  },
});


module.exports = upload;
