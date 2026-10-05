import { useCallback, useEffect, useState } from "react";

import { api } from "../../lib/apiClient";

import {
    Alert,
    ConfirmDialog,
    EmptyState,
    Field,
    LoadingState,
    Modal,
    PageHeader,
    TextListInput,
    Toast,
    useToast,
} from "../../components";

import "./CareersAdmin.css";


const ENDPOINT = "/api/content/careers";
const JOBS_ENDPOINT = `${ENDPOINT}/jobs`;


const emptyContent = {
    hero: {
        eyebrow: "",
        heading: "",
        highlightText: "",
        description: "",
        ctaLabel: "",
        ctaHref: "",
        image: "",
    },
    intro: {
        eyebrow: "",
        heading: "",
        description: "",
    },
    highlights: [],
    culture: {
        eyebrow: "",
        heading: "",
        description: "",
        items: [],
    },
    cta: {
        eyebrow: "",
        heading: "",
        description: "",
        buttonLabel: "",
        buttonHref: "",
    },
};


const emptyJob = {
    title: "",
    slug: "",
    department: "",
    location: "",
    type: "",
    summary: "",
    description: "",
    requirements: [],
    benefits: [],
    icon: "",
    isActive: true,
};


const isVisible = (job) => job?.isActive !== false;


const CareersAdmin = () => {

    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);
    const [contentError, setContentError] = useState("");

    const [jobs, setJobs] = useState([]);
    const [jobsError, setJobsError] = useState("");

    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(emptyJob);
    const [formError, setFormError] = useState("");
    const [savingJob, setSavingJob] = useState(false);

    const [deleting, setDeleting] = useState(null);
    const [deletingBusy, setDeletingBusy] = useState(false);
    const [togglingId, setTogglingId] = useState(null);

    const { toast, showToast, closeToast } = useToast();


    /* ======================================================
       PAGE CONTENT (single document)
       ====================================================== */

    const loadContent = useCallback(async () => {

        setLoading(true);
        setError("");

        try {

            const data = await api.get(ENDPOINT);

            setContent({ ...emptyContent, ...(data || {}) });

        } catch (loadError) {

            setError(
                loadError.message ||
                    "Could not load careers content."
            );

        } finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {

        loadContent();

    }, [loadContent]);


    const loadJobs = useCallback(async () => {

        try {

            const data = await api.get(JOBS_ENDPOINT);

            setJobs(data || []);

        } catch (loadError) {

            setJobsError(
                loadError.message ||
                    "Could not load job openings."
            );

        }

    }, []);

    useEffect(() => {

        loadJobs();

    }, [loadJobs]);


    const patch = (section, key, value) => {

        setContent((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value,
            },
        }));

    };

    const patchItem = (index, key, value) => {

        setContent((prev) => {
            const items = [...prev.culture.items];

            items[index] = { ...items[index], [key]: value };

            return {
                ...prev,
                culture: { ...prev.culture, items },
            };
        });

    };

    const addCultureItem = () => {

        setContent((prev) => ({
            ...prev,
            culture: {
                ...prev.culture,
                items: [
                    ...prev.culture.items,
                    { title: "", description: "", icon: "" },
                ],
            },
        }));

    };

    const removeCultureItem = (index) => {

        setContent((prev) => ({
            ...prev,
            culture: {
                ...prev.culture,
                items: prev.culture.items.filter(
                    (_, i) => i !== index
                ),
            },
        }));

    };

    const addHighlight = () => {

        setContent((prev) => ({
            ...prev,
            highlights: [...prev.highlights, { value: "", label: "" }],
        }));

    };

    const patchHighlight = (index, key, value) => {

        setContent((prev) => {
            const highlights = [...prev.highlights];

            highlights[index] = { ...highlights[index], [key]: value };

            return { ...prev, highlights };
        });

    };

    const removeHighlight = (index) => {

        setContent((prev) => ({
            ...prev,
            highlights: prev.highlights.filter((_, i) => i !== index),
        }));

    };


    const handleSaveContent = async (event) => {

        event.preventDefault();

        setSaving(true);
        setContentError("");

        try {

            await api.put(ENDPOINT, content);

            showToast("Careers page content saved.");

        } catch (saveError) {

            const message =
                saveError.message || "Save failed.";

            setContentError(message);
            showToast(message, "error");

        } finally {

            setSaving(false);

        }

    };


    /* ======================================================
       JOB OPENINGS
       ====================================================== */

    const openCreate = () => {

        setForm(emptyJob);
        setFormError("");
        setEditing("new");

    };

    const openEdit = (job) => {

        setForm({
            ...emptyJob,
            ...job,
            isActive: isVisible(job),
            requirements: job.requirements || [],
            benefits: job.benefits || [],
        });

        setFormError("");
        setEditing(job);

    };

    const closeModal = () => {

        setEditing(null);
        setFormError("");

    };

    const set = (key, value) => {

        setForm((prev) => ({ ...prev, [key]: value }));

    };

    const handleSaveJob = async (event) => {

        event.preventDefault();

        if (!form.title.trim()) {

            setFormError("Title is required.");

            return;

        }

        setSavingJob(true);
        setFormError("");

        try {

            if (editing === "new") {

                await api.post(JOBS_ENDPOINT, form);
                showToast("Job opening created.");

            } else {

                await api.put(
                    `${JOBS_ENDPOINT}/${editing._id}`,
                    form
                );

                showToast("Job opening updated.");

            }

            closeModal();
            loadJobs();

        } catch (saveError) {

            const message = saveError.message || "Save failed.";

            setFormError(message);
            showToast(message, "error");

        } finally {

            setSavingJob(false);

        }

    };

    const handleToggleJob = async (job, nextVisible) => {

        setTogglingId(job._id);

        try {

            await api.put(`${JOBS_ENDPOINT}/${job._id}`, {
                isActive: nextVisible,
            });

            setJobs((prev) =>
                prev.map((entry) =>
                    entry._id === job._id
                        ? { ...entry, isActive: nextVisible }
                        : entry
                )
            );

            showToast(
                nextVisible
                    ? `"${job.title}" is now visible.`
                    : `"${job.title}" is hidden.`
            );

        } catch (toggleError) {

            showToast(
                toggleError.message ||
                    "Could not change visibility.",
                "error"
            );

        } finally {

            setTogglingId(null);

        }

    };

    const handleDeleteJob = async () => {

        setDeletingBusy(true);

        try {

            await api.del(`${JOBS_ENDPOINT}/${deleting._id}`);

            showToast("Job opening deleted.");
            setDeleting(null);
            loadJobs();

        } catch (deleteError) {

            showToast(
                deleteError.message || "Delete failed.",
                "error"
            );

        } finally {

            setDeletingBusy(false);

        }

    };


    return (
        <div className="admin-page">

            <PageHeader
                title="Careers"
                description="Edit the Careers page copy and manage the open roles."
                actions={
                    <button
                        type="button"
                        className="admin-btn admin-btn-primary"
                        onClick={openCreate}
                    >
                        + New opening
                    </button>
                }
            />

            <Alert message={error} />

            {/* ==================================================
                PAGE CONTENT
            ================================================== */}

            <div className="admin-card">

                {loading ? (
                    <LoadingState label="Loading careers content" />
                ) : content ? (
                    <form onSubmit={handleSaveContent}>

                        <Alert message={contentError} />

                        <h3 className="admin-subset-title">Hero</h3>

                        <div className="admin-field-row">
                            <Field label="Eyebrow">
                                <input
                                    type="text"
                                    className="admin-input"
                                    value={content.hero.eyebrow}
                                    onChange={(e) =>
                                        patch("hero", "eyebrow", e.target.value)
                                    }
                                />
                            </Field>

                            <Field label="Highlight word">
                                <input
                                    type="text"
                                    className="admin-input"
                                    value={content.hero.highlightText}
                                    onChange={(e) =>
                                        patch("hero", "highlightText", e.target.value)
                                    }
                                />
                            </Field>
                        </div>

                        <Field label="Heading">
                            <input
                                type="text"
                                className="admin-input"
                                value={content.hero.heading}
                                onChange={(e) =>
                                    patch("hero", "heading", e.target.value)
                                }
                            />
                        </Field>

                        <Field label="Description">
                            <textarea
                                className="admin-textarea"
                                value={content.hero.description}
                                onChange={(e) =>
                                    patch("hero", "description", e.target.value)
                                }
                            />
                        </Field>

                        <div className="admin-field-row">
                            <Field label="CTA label">
                                <input
                                    type="text"
                                    className="admin-input"
                                    value={content.hero.ctaLabel}
                                    onChange={(e) =>
                                        patch("hero", "ctaLabel", e.target.value)
                                    }
                                />
                            </Field>

                            <Field label="CTA link">
                                <input
                                    type="text"
                                    className="admin-input"
                                    value={content.hero.ctaHref}
                                    onChange={(e) =>
                                        patch("hero", "ctaHref", e.target.value)
                                    }
                                />
                            </Field>
                        </div>

                        <h3 className="admin-subset-title">Intro</h3>

                        <div className="admin-field-row">
                            <Field label="Eyebrow">
                                <input
                                    type="text"
                                    className="admin-input"
                                    value={content.intro.eyebrow}
                                    onChange={(e) =>
                                        patch("intro", "eyebrow", e.target.value)
                                    }
                                />
                            </Field>

                            <Field label="Heading">
                                <input
                                    type="text"
                                    className="admin-input"
                                    value={content.intro.heading}
                                    onChange={(e) =>
                                        patch("intro", "heading", e.target.value)
                                    }
                                />
                            </Field>
                        </div>

                        <Field label="Description">
                            <textarea
                                className="admin-textarea"
                                value={content.intro.description}
                                onChange={(e) =>
                                    patch("intro", "description", e.target.value)
                                }
                            />
                        </Field>

                        {/* ---------- Highlights ---------- */}

                        <div className="admin-subset">
                            <div className="admin-subset-header">
                                <h3>Highlight stats</h3>
                                <button
                                    type="button"
                                    className="admin-btn admin-btn-secondary admin-btn-sm"
                                    onClick={addHighlight}
                                >
                                    + Add stat
                                </button>
                            </div>

                            {content.highlights.length === 0 && (
                                <p className="admin-field-hint">
                                    No highlight stats yet.
                                </p>
                            )}

                            {content.highlights.map((stat, index) => (
                                <div
                                    className="admin-subset-item"
                                    key={index}
                                >
                                    <div className="admin-subset-item-header">
                                        <strong>Stat {index + 1}</strong>
                                        <button
                                            type="button"
                                            className="admin-btn admin-btn-ghost admin-btn-sm"
                                            onClick={() => removeHighlight(index)}
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    <div className="admin-field-row">
                                        <Field label="Value">
                                            <input
                                                type="text"
                                                className="admin-input"
                                                value={stat.value || ""}
                                                onChange={(e) =>
                                                    patchHighlight(index, "value", e.target.value)
                                                }
                                            />
                                        </Field>

                                        <Field label="Label">
                                            <input
                                                type="text"
                                                className="admin-input"
                                                value={stat.label || ""}
                                                onChange={(e) =>
                                                    patchHighlight(index, "label", e.target.value)
                                                }
                                            />
                                        </Field>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ---------- Culture ---------- */}

                        <div className="admin-subset">
                            <div className="admin-subset-header">
                                <h3>Culture &amp; benefits</h3>
                                <button
                                    type="button"
                                    className="admin-btn admin-btn-secondary admin-btn-sm"
                                    onClick={addCultureItem}
                                >
                                    + Add item
                                </button>
                            </div>

                            <div className="admin-field-row">
                                <Field label="Eyebrow">
                                    <input
                                        type="text"
                                        className="admin-input"
                                        value={content.culture.eyebrow}
                                        onChange={(e) =>
                                            patch("culture", "eyebrow", e.target.value)
                                        }
                                    />
                                </Field>

                                <Field label="Heading">
                                    <input
                                        type="text"
                                        className="admin-input"
                                        value={content.culture.heading}
                                        onChange={(e) =>
                                            patch("culture", "heading", e.target.value)
                                        }
                                    />
                                </Field>
                            </div>

                            <Field label="Description">
                                <textarea
                                    className="admin-textarea"
                                    value={content.culture.description}
                                    onChange={(e) =>
                                        patch("culture", "description", e.target.value)
                                    }
                                />
                            </Field>

                            {content.culture.items.map((item, index) => (
                                <div
                                    className="admin-subset-item"
                                    key={index}
                                >
                                    <div className="admin-subset-item-header">
                                        <strong>Item {index + 1}</strong>
                                        <button
                                            type="button"
                                            className="admin-btn admin-btn-ghost admin-btn-sm"
                                            onClick={() => removeCultureItem(index)}
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    <div className="admin-field-row">
                                        <Field label="Title">
                                            <input
                                                type="text"
                                                className="admin-input"
                                                value={item.title || ""}
                                                onChange={(e) =>
                                                    patchItem(index, "title", e.target.value)
                                                }
                                            />
                                        </Field>

                                        <Field
                                            label="Icon"
                                            hint="Lucide name, e.g. HeartHandshake"
                                        >
                                            <input
                                                type="text"
                                                className="admin-input"
                                                value={item.icon || ""}
                                                onChange={(e) =>
                                                    patchItem(index, "icon", e.target.value)
                                                }
                                            />
                                        </Field>
                                    </div>

                                    <Field label="Description">
                                        <textarea
                                            className="admin-textarea"
                                            value={item.description || ""}
                                            onChange={(e) =>
                                                patchItem(
                                                    index,
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Field>
                                </div>
                            ))}
                        </div>

                        {/* ---------- CTA ---------- */}

                        <div className="admin-subset">
                            <h3>Closing CTA</h3>

                            <Field label="Eyebrow">
                                <input
                                    type="text"
                                    className="admin-input"
                                    value={content.cta.eyebrow}
                                    onChange={(e) =>
                                        patch("cta", "eyebrow", e.target.value)
                                    }
                                />
                            </Field>

                            <Field label="Heading">
                                <input
                                    type="text"
                                    className="admin-input"
                                    value={content.cta.heading}
                                    onChange={(e) =>
                                        patch("cta", "heading", e.target.value)
                                    }
                                />
                            </Field>

                            <Field label="Description">
                                <textarea
                                    className="admin-textarea"
                                    value={content.cta.description}
                                    onChange={(e) =>
                                        patch("cta", "description", e.target.value)
                                    }
                                />
                            </Field>

                            <div className="admin-field-row">
                                <Field label="Button label">
                                    <input
                                        type="text"
                                        className="admin-input"
                                        value={content.cta.buttonLabel}
                                        onChange={(e) =>
                                            patch("cta", "buttonLabel", e.target.value)
                                        }
                                    />
                                </Field>

                                <Field label="Button link">
                                    <input
                                        type="text"
                                        className="admin-input"
                                        value={content.cta.buttonHref}
                                        onChange={(e) =>
                                            patch("cta", "buttonHref", e.target.value)
                                        }
                                    />
                                </Field>
                            </div>
                        </div>

                        <div className="admin-form-actions">
                            <button
                                type="submit"
                                className="admin-btn admin-btn-primary"
                                disabled={saving}
                            >
                                {saving ? "Saving…" : "Save careers content"}
                            </button>
                        </div>

                    </form>
                ) : null}

            </div>

            {/* ==================================================
                JOB OPENINGS
            ================================================== */}

            <div className="admin-card">

                <div className="admin-subset-header">
                    <h3>Open roles</h3>
                </div>

                <Alert message={jobsError} />

                {jobs.length === 0 ? (
                    <EmptyState
                        icon="◈"
                        title="No job openings yet"
                        description="Add the first role to fill the openings section on the Careers page."
                        action={
                            <button
                                type="button"
                                className="admin-btn admin-btn-primary"
                                onClick={openCreate}
                            >
                                + New opening
                            </button>
                        }
                    />
                ) : (
                    <div className="admin-table-wrap">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Role</th>
                                    <th>Department</th>
                                    <th>Location</th>
                                    <th>Status</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map((job) => (
                                    <tr key={job._id}>
                                        <td>
                                            <div className="admin-table-title">
                                                {job.title}
                                            </div>
                                            <div className="admin-table-sub">
                                                {job.type || "—"}
                                            </div>
                                        </td>

                                        <td>
                                            {job.department || "—"}
                                        </td>

                                        <td>
                                            {job.location || "—"}
                                        </td>

                                        <td>
                                            <span
                                                className={`admin-badge ${
                                                    isVisible(job)
                                                        ? "admin-badge-success"
                                                        : "admin-badge-neutral"
                                                }`}
                                            >
                                                {isVisible(job)
                                                    ? "Visible"
                                                    : "Hidden"}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="admin-table-actions">
                                                <button
                                                    type="button"
                                                    className="admin-btn admin-btn-secondary admin-btn-sm"
                                                    onClick={() => openEdit(job)}
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    className="admin-btn admin-btn-secondary admin-btn-sm"
                                                    disabled={togglingId === job._id}
                                                    onClick={() =>
                                                        handleToggleJob(
                                                            job,
                                                            !isVisible(job)
                                                        )
                                                    }
                                                >
                                                    {isVisible(job) ? "Hide" : "Show"}
                                                </button>

                                                <button
                                                    type="button"
                                                    className="admin-btn admin-btn-danger admin-btn-sm"
                                                    onClick={() => setDeleting(job)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

            </div>

            {/* ==================================================
                ROLE MODAL
            ================================================== */}

            <Modal
                isOpen={Boolean(editing)}
                onClose={closeModal}
                size="wide"
                title={editing === "new" ? "New opening" : "Edit opening"}
                description="Role details shown on the Careers page."
                footer={
                    <>
                        <button
                            type="button"
                            className="admin-btn admin-btn-secondary"
                            onClick={closeModal}
                            disabled={savingJob}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            form="career-job-form"
                            className="admin-btn admin-btn-primary"
                            disabled={savingJob}
                        >
                            {savingJob ? "Saving…" : "Save opening"}
                        </button>
                    </>
                }
            >

                <Alert message={formError} />

                <form id="career-job-form" onSubmit={handleSaveJob}>

                    <div className="admin-field-row">
                        <Field label="Job title" required>
                            <input
                                type="text"
                                className="admin-input"
                                value={form.title}
                                onChange={(e) => set("title", e.target.value)}
                            />
                        </Field>

                        <Field
                            label="Slug"
                            hint="Leave blank to generate from the title."
                        >
                            <input
                                type="text"
                                className="admin-input"
                                value={form.slug}
                                placeholder="auto-generated"
                                onChange={(e) => set("slug", e.target.value)}
                            />
                        </Field>
                    </div>

                    <div className="admin-field-row">
                        <Field label="Department">
                            <input
                                type="text"
                                className="admin-input"
                                value={form.department}
                                onChange={(e) => set("department", e.target.value)}
                            />
                        </Field>

                        <Field label="Location">
                            <input
                                type="text"
                                className="admin-input"
                                value={form.location}
                                onChange={(e) => set("location", e.target.value)}
                            />
                        </Field>

                        <Field label="Employment type">
                            <input
                                type="text"
                                className="admin-input"
                                value={form.type}
                                placeholder="Full Time"
                                onChange={(e) => set("type", e.target.value)}
                            />
                        </Field>
                    </div>

                    <Field label="Icon" hint="Lucide name, e.g. Code2">
                        <input
                            type="text"
                            className="admin-input"
                            value={form.icon}
                            onChange={(e) => set("icon", e.target.value)}
                        />
                    </Field>

                    <Field label="Summary">
                        <textarea
                            className="admin-textarea"
                            style={{ minHeight: "90px" }}
                            value={form.summary}
                            onChange={(e) => set("summary", e.target.value)}
                        />
                    </Field>

                    <Field label="Description">
                        <textarea
                            className="admin-textarea"
                            style={{ minHeight: "160px" }}
                            value={form.description}
                            onChange={(e) => set("description", e.target.value)}
                        />
                    </Field>

                    <TextListInput
                        label="Requirements"
                        values={form.requirements}
                        placeholder="Add a requirement"
                        onChange={(values) => set("requirements", values)}
                    />

                    <TextListInput
                        label="Benefits"
                        values={form.benefits}
                        placeholder="Add a benefit"
                        onChange={(values) => set("benefits", values)}
                    />

                    <label className="admin-checkbox">
                        <input
                            type="checkbox"
                            checked={form.isActive}
                            onChange={(e) => set("isActive", e.target.checked)}
                        />
                        <span>Visible on the website</span>
                    </label>

                </form>

            </Modal>

            <ConfirmDialog
                isOpen={Boolean(deleting)}
                onClose={() => setDeleting(null)}
                onConfirm={handleDeleteJob}
                isBusy={deletingBusy}
                title="Delete opening"
                message={`This will permanently delete "${
                    deleting?.title || ""
                }". Use Hide instead to take it off the website for now.`}
            />

            <Toast toast={toast} onClose={closeToast} />

        </div>
    );

};


export default CareersAdmin;
