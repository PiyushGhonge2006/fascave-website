
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const uploadRoot = path.resolve(
    __dirname,
    "..",
    process.env.UPLOAD_DIR || "uploads",
    "resumes"
);

// Create resume directory automatically
if (!fs.existsSync(uploadRoot)) {
    fs.mkdirSync(uploadRoot, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadRoot);
    },

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();

        const uniqueName =
            `resume-${Date.now()}-${crypto.randomUUID()}${ext}`;

        cb(null, uniqueName);
    },
});

const allowedExtensions = [".pdf", ".doc", ".docx"];

const allowedMimeTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    if (
        !allowedExtensions.includes(ext) ||
        !allowedMimeTypes.includes(file.mimetype)
    ) {
        return cb(
            new Error("Only PDF, DOC and DOCX resumes are allowed.")
        );
    }

    cb(null, true);
};

const resumeUpload = multer({
    storage,
    fileFilter,

    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 5,
    },
});

module.exports = resumeUpload;
