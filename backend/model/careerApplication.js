
const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
    {
        originalName: {
            type: String,
            required: true,
            trim: true,
        },

        filename: {
            type: String,
            required: true,
        },

        url: {
            type: String,
            required: true,
        },

        mimeType: {
            type: String,
            required: true,
        },

        size: {
            type: Number,
            required: true,
        },
    },
    {
        _id: false,
    }
);

const careerApplicationSchema = new mongoose.Schema(
    {
        // Personal Information

        designation: {
            type: String,
            required: true,
            trim: true,
        },

        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        gender: {
            type: String,
            enum: ["Male", "Female"],
            required: true,
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },

        countryCode: {
            type: String,
            default: "+91",
        },

        mobile: {
            type: String,
            required: true,
            trim: true,
        },

        dob: {
            type: Date,
            required: true,
        },

        city: {
            type: String,
            required: true,
            trim: true,
        },

        // Educational Details

        qualification: {
            type: String,
            required: true,
        },

        branch: {
            type: String,
            required: true,
        },

        college: {
            type: String,
            required: true,
            trim: true,
        },

        passoutYear: {
            type: Number,
            required: true,
        },

        // Professional Details

        experience: {
            type: String,
            required: true,
        },

        company: {
            type: String,
            default: "",
            trim: true,
        },

        skills: {
            type: [String],
            required: true,
            validate: {
                validator: (value) => value.length > 0,
                message: "At least one skill is required.",
            },
        },

        otherSkill: {
            type: String,
            default: "",
        },

        source: {
            type: String,
            default: "",
        },

        otherSource: {
            type: String,
            default: "",
        },

        // Resume Details

        resume: {
            type: [resumeSchema],
            required: true,
            validate: {
                validator: (value) =>
                    value.length >= 1 && value.length <= 5,
                message: "Upload between 1 and 5 resume files.",
            },
        },

        message: {
            type: String,
            default: "",
            maxlength: 500,
        },

        // Admin Management

        status: {
            type: String,
            enum: [
                "New",
                "Reviewing",
                "Shortlisted",
                "Rejected",
            ],
            default: "New",
        },

        adminNotes: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

careerApplicationSchema.index({
    createdAt: -1,
});

careerApplicationSchema.index({
    status: 1,
});

module.exports = mongoose.model(
    "CareerApplication",
    careerApplicationSchema
);
