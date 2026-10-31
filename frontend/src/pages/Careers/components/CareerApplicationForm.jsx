
import React, { useRef, useState } from "react";
import { apiUrl } from "../../../utils/apiBase";
import {
    ArrowLeft,
    ArrowRight,
    UploadCloud,
    FileText,
    CheckCircle2,
    X,
    UserRound,
    GraduationCap,
    BriefcaseBusiness,
} from "lucide-react";

import "./CareerApplicationForm.css";

// ========================================
// FORM OPTIONS
// ========================================

const DESIGNATIONS = [
    "Java Full Stack Developer",
    "Python Full Stack Developer",
    "MERN Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Android Developer",
    "Other",
];

const QUALIFICATIONS = [
    "B.Tech / B.E",
    "BCA",
    "MCA",
    "B.Com",
    "B.A",
    "MBA",
    "Diploma",
    "Other",
];

const BRANCHES = [
    "Computer Science Engineering (CSE)",
    "Information Technology (IT)",
    "Artificial Intelligence (AI)",
    "AI & Machine Learning",
    "Data Science",
    "Computer Applications",
    "Other",
];

const EXPERIENCES = [
    "Fresher",
    "Less than 1 Year",
    "1 Year",
    "2 Year",
    "3 Year",
    "More than 3 Years",
];

const SKILLS = [
    "Python",
    "Java",
    "C#",
    "React / Node.js / JavaScript",
    "HTML/CSS/Bootstrap",
    "Database",
    "Android",
    "AWS",
    "DevOps",
    "Other",
];

const SOURCES = [
    "LinkedIn",
    "Instagram",
    "Facebook",
    "Google Search",
    "College / University",
    "Other",
];

const COUNTRIES = [
    { code: "+91", label: "🇮🇳 India +91" },
    { code: "+1", label: "🇺🇸 USA +1" },
    { code: "+44", label: "🇬🇧 UK +44" },
    { code: "+971", label: "🇦🇪 UAE +971" },
    { code: "+61", label: "🇦🇺 Australia +61" },
    { code: "+1-CA", label: "🇨🇦 Canada +1" },
];

const STEPS = [
    {
        title: "Personal Information",
        icon: UserRound,
    },
    {
        title: "Educational Details",
        icon: GraduationCap,
    },
    {
        title: "Professional Details",
        icon: BriefcaseBusiness,
    },
    {
        title: "Resume Submission",
        icon: FileText,
    },
];

const MAX_FILES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const ALLOWED_EXTENSIONS = /\.(pdf|doc|docx)$/i;

// ========================================
// MAIN COMPONENT
// ========================================

const CareerApplicationForm = ({ onSubmit }) => {
    const [step, setStep] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [countryCode, setCountryCode] = useState("+91");
    const [resumeError, setResumeError] = useState("");
    const [submitError, setSubmitError] = useState("");

    const formRef = useRef(null);
    const fileInputRef = useRef(null);

    // ========================================
    // FORM DATA
    // ========================================

    const [formData, setFormData] = useState({
        designation: "",
        fullName: "",
        gender: "",
        email: "",
        mobile: "",
        dob: "",
        city: "",

        qualification: "",
        branch: "",
        college: "",
        passoutYear: "",

        experience: "",
        company: "",
        skills: [],
        otherSkill: "",
        source: "",
        otherSource: "",

        message: "",
        resume: [],
    });

    // ========================================
    // UPDATE FIELD
    // ========================================

    const updateField = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ========================================
    // SKILL SELECTION
    // ========================================

    const toggleSkill = (skill) => {
        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.includes(skill)
                ? prev.skills.filter((item) => item !== skill)
                : [...prev.skills, skill],
        }));
    };

    // ========================================
    // STEP VALIDATION
    // ========================================

    const validateStep = () => {
        if (!formRef.current) return false;

        const isValid = formRef.current.reportValidity();

        if (!isValid) return false;

        if (step === 2 && formData.skills.length === 0) {
            alert("Please select at least one skill.");
            return false;
        }

        return true;
    };

    // ========================================
    // STEP NAVIGATION
    // ========================================

    // ========================================
    // STEP NAVIGATION
    // ========================================

    const nextStep = () => {
        if (!validateStep()) return;

        setSubmitError("");
        setStep((prev) => Math.min(prev + 1, 3));
    };

    const previousStep = () => {
        setSubmitError("");
        setStep((prev) => Math.max(prev - 1, 0));
    };

    // ========================================
    // RESUME VALIDATION
    // ========================================

    const handleResumeChange = (e) => {
        const selectedFiles = Array.from(e.target.files || []);

        setResumeError("");

        if (selectedFiles.length === 0) return;

        if (formData.resume.length + selectedFiles.length > MAX_FILES) {
            setResumeError(`Maximum ${MAX_FILES} files can be uploaded.`);
            e.target.value = "";
            return;
        }

        const validFiles = [];

        for (const file of selectedFiles) {
            const validType =
                ALLOWED_TYPES.includes(file.type) ||
                ALLOWED_EXTENSIONS.test(file.name);

            if (!validType) {
                setResumeError(
                    `${file.name}: Only PDF, DOC and DOCX files are allowed.`
                );
                e.target.value = "";
                return;
            }

            if (file.size > MAX_FILE_SIZE) {
                setResumeError(
                    `${file.name}: File size must be below 5 MB.`
                );
                e.target.value = "";
                return;
            }

            const duplicate = formData.resume.some(
                (existing) =>
                    existing.name === file.name &&
                    existing.size === file.size
            );

            if (!duplicate) {
                validFiles.push(file);
            }
        }

        updateField("resume", [...formData.resume, ...validFiles]);

        // Allow selecting the same file again after removing it.
        e.target.value = "";
    };

    const removeResume = (index) => {
        updateField(
            "resume",
            formData.resume.filter((_, i) => i !== index)
        );

        setResumeError("");
    };

    const formatFileSize = (bytes) => {
        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(1)} KB`;
        }

        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    };

    // ========================================
    // FINAL FORM SUBMISSION
    // ========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateStep()) return;

        if (formData.resume.length === 0) {
            setResumeError("Please upload at least one resume.");
            return;
        }

        if (typeof onSubmit !== "function") {
            setSubmitError(
                "Application submission is not connected to the server yet."
            );
            return;
        }

        setIsSubmitting(true);
        setSubmitError("");

        try {
            const applicationData = {
                ...formData,
                countryCode,
                mobile: `${countryCode} ${formData.mobile}`,
            };

            await onSubmit(applicationData);

            setSubmitted(true);

            requestAnimationFrame(() => {
                window.scrollTo({
                    top: document.getElementById("careers-apply")?.offsetTop || 0,
                    behavior: "smooth",
                });
            });
        } catch (error) {
            console.error("Career application error:", error);

            setSubmitError(
                error.message ||
                "Unable to submit your application. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    // ========================================
    // SUCCESS SCREEN
    // ========================================

    if (submitted) {
        return (
            <div className="career-form-success">
                <CheckCircle2 size={65} />

                <h2>Application Submitted!</h2>

                <p>
                    Thank you for your interest in joining FasCave.
                    Our recruitment team will review your application.
                </p>
            </div>
        );
    }

    // ========================================
    // RENDER
    // ========================================

    return (
        <div className="career-application-card">

            {/* FORM HEADER */}

            <div className="career-form-header">

                <div className="career-form-icon">
                    <FileText size={27} />
                </div>

                <div>
                    <h2>Apply Now</h2>

                    <p>
                        Fill in your details and upload your resume.
                        We'll get back to you soon.
                    </p>
                </div>

            </div>

            {/* PROGRESS INDICATOR */}

            <div className="career-form-progress">

                {STEPS.map((item, index) => (
                    <div
                        key={item.title}
                        className={`career-progress-step ${index === step ? "active" : ""
                            } ${index < step ? "completed" : ""}`}
                    >
                        <span className="career-progress-number">

                            {index < step ? (
                                <CheckCircle2 size={17} />
                            ) : (
                                index + 1
                            )}

                        </span>

                        <span className="career-progress-label">
                            {item.title}
                        </span>

                    </div>
                ))}

            </div>

            {/* FORM */}

            <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate={false}
            >

                {/* ==================================
                    STEP 1: PERSONAL INFORMATION
                ================================== */}

                {step === 0 && (
                    <section className="career-form-section">

                        <h3>Personal Information</h3>

                        <div className="career-form-grid">

                            {/* DESIGNATION */}

                            <div className="career-field full-width">

                                <label>
                                    Which Designation are you applying for?
                                    <span className="required-star"> *</span>
                                </label>

                                <select
                                    required
                                    value={formData.designation}
                                    onChange={(e) =>
                                        updateField("designation", e.target.value)
                                    }
                                >
                                    <option value="">Choose Designation</option>

                                    {DESIGNATIONS.map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}

                                </select>

                            </div>

                            {/* FULL NAME */}

                            <div className="career-field full-width">

                                <label>
                                    Full Name
                                    <span className="required-star"> *</span>
                                </label>

                                <input
                                    required
                                    type="text"
                                    autoComplete="name"
                                    placeholder="Enter your full name"
                                    value={formData.fullName}
                                    onChange={(e) =>
                                        updateField("fullName", e.target.value)
                                    }
                                />

                            </div>

                            {/* GENDER */}

                            <div className="career-field">

                                <label>
                                    Gender
                                    <span className="required-star"> *</span>
                                </label>

                                <div className="career-radio-group">

                                    {["Male", "Female"].map((item) => (
                                        <label key={item}>

                                            <input
                                                type="radio"
                                                name="gender"
                                                value={item}
                                                required
                                                checked={formData.gender === item}
                                                onChange={(e) =>
                                                    updateField("gender", e.target.value)
                                                }
                                            />

                                            {item}

                                        </label>
                                    ))}

                                </div>

                            </div>

                            {/* EMAIL */}

                            <div className="career-field">

                                <label>
                                    Email Address
                                    <span className="required-star"> *</span>
                                </label>

                                <input
                                    required
                                    type="email"
                                    autoComplete="email"
                                    placeholder="Enter your email address"
                                    value={formData.email}
                                    onChange={(e) =>
                                        updateField("email", e.target.value)
                                    }
                                />

                            </div>

                            {/* MOBILE */}

                            <div className="career-field">

                                <label>
                                    Mobile Number
                                    <span className="required-star"> *</span>
                                </label>

                                <div className="career-phone-input">

                                    <select
                                        value={countryCode}
                                        onChange={(e) =>
                                            setCountryCode(e.target.value)
                                        }
                                        aria-label="Country calling code"
                                    >
                                        {COUNTRIES.map((country) => (
                                            <option
                                                key={country.code}
                                                value={country.code}
                                            >
                                                {country.label}
                                            </option>
                                        ))}
                                    </select>

                                    <input
                                        required
                                        type="tel"
                                        inputMode="numeric"
                                        autoComplete="tel-national"
                                        pattern="[0-9]{10}"
                                        minLength={10}
                                        maxLength={10}
                                        placeholder="Enter 10 digit mobile number"
                                        value={formData.mobile}
                                        onChange={(e) =>
                                            updateField(
                                                "mobile",
                                                e.target.value.replace(/\D/g, "").slice(0, 10)
                                            )
                                        }
                                        title="Please enter exactly 10 digits."
                                    />

                                </div>

                            </div>

                            {/* DOB */}

                            <div className="career-field">

                                <label>
                                    Date of Birth
                                    <span className="required-star"> *</span>
                                </label>

                                <input
                                    required
                                    type="date"
                                    autoComplete="bday"
                                    max={new Date().toISOString().split("T")[0]}
                                    value={formData.dob}
                                    onChange={(e) =>
                                        updateField("dob", e.target.value)
                                    }
                                />

                            </div>

                            {/* CITY */}

                            <div className="career-field full-width">

                                <label>
                                    City
                                    <span className="required-star"> *</span>
                                </label>

                                <input
                                    required
                                    type="text"
                                    autoComplete="address-level2"
                                    placeholder="Enter your city"
                                    value={formData.city}
                                    onChange={(e) =>
                                        updateField("city", e.target.value)
                                    }
                                />

                            </div>

                        </div>

                    </section>
                )}

                {/* ==================================
                    STEP 2: EDUCATIONAL DETAILS
                ================================== */}

                {step === 1 && (
                    <section className="career-form-section">

                        <h3>Educational Details</h3>

                        <div className="career-form-grid">

                            {/* QUALIFICATION */}

                            <div className="career-field full-width">

                                <label>
                                    Highest Qualification
                                    <span className="required-star"> *</span>
                                </label>

                                <select
                                    required
                                    value={formData.qualification}
                                    onChange={(e) =>
                                        updateField("qualification", e.target.value)
                                    }
                                >
                                    <option value="">Choose Qualification</option>

                                    {QUALIFICATIONS.map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}

                                </select>

                            </div>

                            {/* BRANCH */}

                            <div className="career-field full-width">

                                <label>
                                    Branch / Specialization
                                    <span className="required-star"> *</span>
                                </label>

                                <div className="career-option-list">

                                    {BRANCHES.map((item) => (
                                        <label key={item}>

                                            <input
                                                type="radio"
                                                name="branch"
                                                value={item}
                                                required
                                                checked={formData.branch === item}
                                                onChange={(e) =>
                                                    updateField("branch", e.target.value)
                                                }
                                            />

                                            {item}

                                        </label>
                                    ))}

                                </div>

                            </div>

                            {/* COLLEGE */}

                            <div className="career-field full-width">

                                <label>
                                    College Name
                                    <span className="required-star"> *</span>
                                </label>

                                <input
                                    required
                                    type="text"
                                    placeholder="Enter your college name"
                                    value={formData.college}
                                    onChange={(e) =>
                                        updateField("college", e.target.value)
                                    }
                                />

                            </div>

                            {/* PASSOUT YEAR */}

                            <div className="career-field full-width">

                                <label>
                                    Passout Year
                                    <span className="required-star"> *</span>
                                </label>

                                <input
                                    required
                                    type="number"
                                    min="1980"
                                    max="2100"
                                    placeholder="e.g. 2026"
                                    value={formData.passoutYear}
                                    onChange={(e) =>
                                        updateField("passoutYear", e.target.value)
                                    }
                                />

                            </div>

                        </div>

                    </section>
                )}

                {/* ==================================
                    STEP 3: PROFESSIONAL DETAILS
                ================================== */}

                {step === 2 && (
                    <section className="career-form-section">

                        <h3>Professional Details</h3>

                        <div className="career-form-grid">

                            {/* EXPERIENCE */}

                            <div className="career-field full-width">

                                <label>
                                    Professional Experience
                                    <span className="required-star"> *</span>
                                </label>

                                <div className="career-option-list">

                                    {EXPERIENCES.map((item) => (
                                        <label key={item}>

                                            <input
                                                type="radio"
                                                name="experience"
                                                value={item}
                                                required
                                                checked={formData.experience === item}
                                                onChange={(e) =>
                                                    updateField("experience", e.target.value)
                                                }
                                            />

                                            {item}

                                        </label>
                                    ))}

                                </div>

                            </div>

                            {/* COMPANY */}

                            {formData.experience &&
                                formData.experience !== "Fresher" && (

                                    <div className="career-field full-width">

                                        <label>
                                            Current / Previous Company Name
                                            <span className="career-optional-label">
                                                {" "}(Optional)
                                            </span>
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="Enter company name"
                                            value={formData.company}
                                            onChange={(e) =>
                                                updateField("company", e.target.value)
                                            }
                                        />

                                    </div>
                                )}

                            {/* SKILLS */}

                            <div className="career-field full-width">

                                <label>
                                    Which skills do you have strong practical knowledge in?
                                    <span className="required-star"> *</span>
                                </label>

                                <p className="career-field-hint">
                                    Select all skills that apply to you.
                                </p>

                                <div className="career-option-list career-skill-list">

                                    {SKILLS.map((item) => (
                                        <label key={item}>

                                            <input
                                                type="checkbox"
                                                checked={formData.skills.includes(item)}
                                                onChange={() => toggleSkill(item)}
                                            />

                                            {item}

                                        </label>
                                    ))}

                                </div>

                                {formData.skills.includes("Other") && (

                                    <input
                                        type="text"
                                        placeholder="Enter your other skills (Optional)"
                                        value={formData.otherSkill}
                                        onChange={(e) =>
                                            updateField("otherSkill", e.target.value)
                                        }
                                    />

                                )}

                            </div>

                            {/* SOURCE */}

                            {/* SOURCE */}

                            <div className="career-field full-width">

                                <label>
                                    How did you hear about us?
                                    <span className="career-optional-label">
                                        {" "}(Optional)
                                    </span>
                                </label>

                                <div className="career-option-list career-source-list">

                                    {SOURCES.map((item) => (
                                        <label key={item}>

                                            <input
                                                type="radio"
                                                name="source"
                                                value={item}
                                                checked={formData.source === item}
                                                onChange={(e) =>
                                                    updateField("source", e.target.value)
                                                }
                                            />

                                            {item}

                                        </label>
                                    ))}

                                </div>

                                {formData.source === "Other" && (
                                    <input
                                        type="text"
                                        placeholder="Please specify (Optional)"
                                        value={formData.otherSource}
                                        onChange={(e) =>
                                            updateField("otherSource", e.target.value)
                                        }
                                    />
                                )}

                            </div>

                        </div>

                    </section>
                )}

                {/* ==================================
                    STEP 4: RESUME SUBMISSION
                ================================== */}

                {step === 3 && (
                    <section className="career-form-section">

                        <h3>Resume Submission</h3>

                        {/* RESUME UPLOAD */}

                        <div className="career-field full-width">

                            <label>
                                Upload Updated Resume
                                <span className="required-star"> *</span>
                            </label>

                            <p className="career-field-hint">
                                Upload your latest resume so our recruitment
                                team can review your application.
                            </p>

                            <div
                                className="career-upload-box"
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                    e.preventDefault();

                                    const files = Array.from(
                                        e.dataTransfer.files || []
                                    );

                                    const dataTransfer = new DataTransfer();

                                    files.forEach((file) => {
                                        dataTransfer.items.add(file);
                                    });

                                    if (fileInputRef.current) {
                                        fileInputRef.current.files =
                                            dataTransfer.files;

                                        handleResumeChange({
                                            target: {
                                                files,
                                                value: "",
                                            },
                                        });
                                    }
                                }}
                                onClick={() => fileInputRef.current?.click()}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        fileInputRef.current?.click();
                                    }
                                }}
                            >

                                <UploadCloud size={42} />

                                <strong>
                                    Drag & drop your resume here
                                </strong>

                                <span>
                                    Or click to browse files
                                </span>

                                <span>
                                    PDF, DOC, DOCX · Max 5 MB per file · Up to 5 files
                                </span>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    multiple
                                    onChange={handleResumeChange}
                                />

                            </div>

                            {/* UPLOAD ERROR */}

                            {resumeError && (
                                <p className="career-upload-error">
                                    {resumeError}
                                </p>
                            )}

                            {/* UPLOADED FILES */}

                            {formData.resume.length > 0 && (

                                <div className="career-selected-files">

                                    <div className="career-upload-success-heading">
                                        <CheckCircle2 size={18} />
                                        <strong>
                                            {formData.resume.length} file(s) selected
                                        </strong>
                                    </div>

                                    {formData.resume.map((file, index) => (

                                        <div
                                            key={`${file.name}-${file.size}-${index}`}
                                            className="career-file-item"
                                        >

                                            <FileText size={23} />

                                            <div>
                                                <strong>{file.name}</strong>

                                                <span>
                                                    {formatFileSize(file.size)}
                                                    {" · "}Ready for submission
                                                </span>
                                            </div>

                                            <CheckCircle2
                                                size={21}
                                                color="#65D69A"
                                            />

                                            <button
                                                type="button"
                                                className="career-remove-file"
                                                aria-label={`Remove ${file.name}`}
                                                onClick={() => removeResume(index)}
                                            >
                                                <X size={17} />
                                            </button>

                                        </div>

                                    ))}

                                </div>
                            )}

                        </div>

                        {/* ADDITIONAL MESSAGE */}

                        <div className="career-field full-width">

                            <label>
                                Additional Message
                                <span className="career-optional-label">
                                    {" "}(Optional)
                                </span>
                            </label>

                            <textarea
                                rows={4}
                                maxLength={500}
                                placeholder="Tell us more about yourself, your interests or your experience..."
                                value={formData.message}
                                onChange={(e) =>
                                    updateField("message", e.target.value)
                                }
                            />

                            <small>
                                {formData.message.length}/500 characters
                            </small>

                        </div>

                        <p className="career-form-privacy">
                            Your information will only be used for recruitment purposes.
                        </p>

                    </section>
                )}

                {/* ==================================
                    SUBMISSION ERROR
                ================================== */}

                {submitError && (

                    <div className="career-submit-error" role="alert">
                        {submitError}
                    </div>

                )}

                {/* ==================================
                    NAVIGATION BUTTONS
                ================================== */}

                <div className="career-form-navigation">

                    {step > 0 && (

                        <button
                            type="button"
                            className="career-form-back"
                            onClick={previousStep}
                            disabled={isSubmitting}
                        >
                            <ArrowLeft size={18} />
                            Previous
                        </button>

                    )}

                    {step < 3 ? (

                        <button
                            type="button"
                            className="career-form-next"
                            onClick={nextStep}
                        >
                            Next
                            <ArrowRight size={18} />
                        </button>

                    ) : (

                        <button
                            type="submit"
                            className="career-form-next"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? "Submitting..."
                                : "Submit Application"
                            }

                            {!isSubmitting && (
                                <ArrowRight size={18} />
                            )}

                        </button>

                    )}

                </div>

            </form>

        </div>
    );
};

export default CareerApplicationForm;
