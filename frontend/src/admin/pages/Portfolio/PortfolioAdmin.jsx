import { useCallback, useEffect, useState } from "react";

import { api } from "../../lib/apiClient";

import {
    Alert,
    ConfirmDialog,
    EmptyState,
    Field,
    ImageInput,
    LoadingState,
    Modal,
    PageHeader,
    TextListInput,
    Toast,
    useToast,
} from "../../components";

import "./PortfolioAdmin.css";

const ENDPOINT = "/api/content/portfolio";
const HOME_ENDPOINT = "/api/content/home";

const emptyItem = {
    title: "",
    slug: "",
    clientName: "",
    category: "",
    description: "",
    coverImage: "",
    gallery: [],
    projectUrl: "",
    techStack: [],
    isActive: true,
};

/*
 * Records created before the isActive field existed carry no
 * value at all. The backend treats a missing value as visible,
 * so the admin list has to do the same.
 */
const isVisible = (item) => item?.isActive !== false;

const PortfolioAdmin = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(emptyItem);
    const [formError, setFormError] = useState("");
    const [saving, setSaving] = useState(false);

    const [deleting, setDeleting] = useState(null);
    const [deletingBusy, setDeletingBusy] = useState(false);

    // Existing individual project visibility
    const [togglingId, setTogglingId] = useState(null);

    // Overall Portfolio section visibility
    const [portfolioSectionVisible, setPortfolioSectionVisible] =
        useState(true);

    const [portfolioSectionSaving, setPortfolioSectionSaving] =
        useState(false);

    const { toast, showToast, closeToast } = useToast();

    const load = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const data = await api.get(ENDPOINT);
            setItems(data || []);
        } catch (loadError) {
            setError(
                loadError.message ||
                "Could not load projects."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    /*
     * Load the overall Portfolio section visibility
     * from Home Content.
     */
    const loadPortfolioSectionVisibility = useCallback(
        async () => {
            try {
                const data = await api.get(HOME_ENDPOINT);
                const visible =
                    data?.portfolioSectionVisible ??
                    data?.data?.portfolioSectionVisible ??
                    true;
                setPortfolioSectionVisible(visible !== false);
            } catch (loadError) {
                console.error(
                    "Could not load Portfolio section visibility:",
                    loadError
                );
                setPortfolioSectionVisible(true);
            }
        },
        []
    );

    useEffect(() => {
        load();
        loadPortfolioSectionVisibility();
    }, [load, loadPortfolioSectionVisibility]);

    const openCreate = () => {
        setForm(emptyItem);
        setFormError("");
        setEditing("new");
    };

    const openEdit = (item) => {
        setForm({
            ...emptyItem,
            ...item,
            isActive: isVisible(item),
            gallery: item.gallery || [],
            techStack: item.techStack || [],
        });

        setFormError("");
        setEditing(item);
    };

    const closeModal = () => {
        setEditing(null);
        setFormError("");
    };

    const set = (key, value) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    // ---------------- GALLERY ----------------

    const addGalleryItem = () => {
        setForm((prev) => ({
            ...prev,
            gallery: [
                ...prev.gallery,
                { url: "", caption: "" },
            ],
        }));
    };

    const updateGallery = (
        index,
        key,
        value
    ) => {
        setForm((prev) => {
            const gallery = [...prev.gallery];

            gallery[index] = {
                ...gallery[index],
                [key]: value,
            };

            return {
                ...prev,
                gallery,
            };
        });
    };

    const removeGallery = (index) => {
        setForm((prev) => ({
            ...prev,
            gallery: prev.gallery.filter(
                (_, i) => i !== index
            ),
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!form.title.trim()) {
            setFormError("Title is required.");
            return;
        }

        setSaving(true);
        setFormError("");

        try {
            if (editing === "new") {
                await api.post(ENDPOINT, form);
                showToast("Project created.");
            } else {
                await api.put(
                    `${ENDPOINT}/${editing._id}`,
                    form
                );

                showToast("Project updated.");
            }

            closeModal();
            load();
        } catch (saveError) {
            const message =
                saveError.message ||
                "Save failed.";

            setFormError(message);
            showToast(message, "error");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        setDeletingBusy(true);

        try {
            await api.del(
                `${ENDPOINT}/${deleting._id}`
            );

            showToast("Project deleted.");
            setDeleting(null);
            load();
        } catch (deleteError) {
            showToast(
                deleteError.message ||
                "Delete failed.",
                "error"
            );
        } finally {
            setDeletingBusy(false);
        }
    };

    /*
     * ======================================================
     * INDIVIDUAL PROJECT HIDE / SHOW
     * ======================================================
     *
     * This functionality is intentionally preserved.
     * It only changes the selected project's isActive value.
     */

    const handleToggleVisibility = async (
        item,
        nextVisible
    ) => {
        setTogglingId(item._id);

        try {
            await api.put(
                `${ENDPOINT}/${item._id}`,
                {
                    isActive: nextVisible,
                    isPublished: nextVisible,
                }
            );

            setItems((prev) =>
                prev.map((entry) =>
                    entry._id === item._id
                        ? {
                            ...entry,
                            isActive: nextVisible,
                            isPublished: nextVisible,
                        }
                        : entry
                )
            );

            showToast(
                nextVisible
                    ? `"${item.title}" is now visible on the website.`
                    : `"${item.title}" is hidden from the website.`
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

    /*
     * ======================================================
     * OVERALL PORTFOLIO SECTION HIDE / SHOW
     * ======================================================
     *
     * This does NOT modify individual projects.
     * It only controls whether the complete Portfolio
     * section is rendered on the Home page.
     */

    const handleTogglePortfolioSection = async () => {
        const prevVisible = portfolioSectionVisible;
        const nextVisible = !portfolioSectionVisible;

        setPortfolioSectionSaving(true);

        try {
            await api.put(HOME_ENDPOINT, {
                portfolioSectionVisible: nextVisible,
            });
            setPortfolioSectionVisible(nextVisible);
            showToast(
                nextVisible
                    ? "Portfolio section is now visible on the website."
                    : "Portfolio section is now hidden from the website."
            );
        } catch (toggleError) {
            setPortfolioSectionVisible(prevVisible);
            showToast(
                toggleError.message ||
                "Could not change Portfolio section visibility.",
                "error"
            );
        } finally {
            setPortfolioSectionSaving(false);
        }
    };

    return (
        <div className="admin-page">

            <PageHeader
                title="Portfolio"
                description="Showcase your best work. Hide a project to take it off the website without deleting it."
                actions={
                    <button
                        type="button"
                        className="admin-btn admin-btn-primary"
                        onClick={openCreate}
                    >
                        + New project
                    </button>
                }
            />

            <Alert message={error} />

            {/* =================================================
                OVERALL PORTFOLIO SECTION CONTROL
                ================================================= */}

            <div className="portfolio-section-control admin-card">
                <div className="portfolio-section-control-content">

                    <div className="portfolio-section-control-copy">

                        <div className="portfolio-section-control-heading">

                            <h3>
                                Overall Portfolio Section
                            </h3>

                        </div>

                        <p>
                            {portfolioSectionVisible
                                ? "Visible on website"
                                : "Hidden from website"}
                        </p>

                    </div>

                    <div className="portfolio-section-toggle">
                        <button
                            type="button"
                            role="switch"
                            aria-checked={portfolioSectionVisible}
                            aria-label="Toggle portfolio section visibility"
                            className={`portfolio-toggle-switch ${portfolioSectionVisible ? "is-on" : "is-off"}`}
                            onClick={handleTogglePortfolioSection}
                            disabled={portfolioSectionSaving}
                        >
                            <span className="portfolio-toggle-knob" />
                        </button>
                        <span className="portfolio-toggle-label">
                            {portfolioSectionSaving
                                ? "Saving..."
                                : portfolioSectionVisible
                                    ? "ON"
                                    : "OFF"}
                        </span>
                    </div>

                </div>
            </div>

            {/* =================================================
                EXISTING PORTFOLIO PROJECTS
                ================================================= */}

            <div className="admin-card">

                {loading ? (
                    <LoadingState label="Loading projects" />
                ) : items.length === 0 ? (
                    <EmptyState
                        icon="▤"
                        title="No projects yet"
                        description="Add your first case study to fill the portfolio section."
                        action={
                            <button
                                type="button"
                                className="admin-btn admin-btn-primary"
                                onClick={openCreate}
                            >
                                + New project
                            </button>
                        }
                    />
                ) : (
                    <div className="admin-table-wrap">

                        <table className="admin-table">

                            <thead>
                                <tr>
                                    <th>Project</th>
                                    <th>Client</th>
                                    <th>Category</th>
                                    <th>Stack</th>
                                    <th>Status</th>
                                    <th />
                                </tr>
                            </thead>

                            <tbody>

                                {items.map((item) => (

                                    <tr key={item._id}>

                                        <td>

                                            <div className="portfolio-project-cell">

                                                {item.coverImage ? (
                                                    <img
                                                        className="admin-table-thumb"
                                                        src={
                                                            item.coverImage
                                                        }
                                                        alt=""
                                                    />
                                                ) : (
                                                    <span className="admin-table-thumb portfolio-thumb-placeholder">
                                                        ▤
                                                    </span>
                                                )}

                                                <div className="portfolio-project-info">

                                                    <div className="admin-table-title">
                                                        {item.title}
                                                    </div>

                                                    <div className="admin-table-sub">
                                                        {item.slug}
                                                    </div>

                                                </div>

                                            </div>

                                        </td>

                                        <td>
                                            {item.clientName ||
                                                "—"}
                                        </td>

                                        <td>
                                            {item.category ||
                                                "—"}
                                        </td>

                                        <td>
                                            {(item.techStack ||
                                                []).length}
                                        </td>

                                        <td>

                                            <span
                                                className={`admin-badge ${isVisible(item)
                                                        ? "admin-badge-success"
                                                        : "admin-badge-neutral"
                                                    }`}
                                            >
                                                {isVisible(item)
                                                    ? "Visible"
                                                    : "Hidden"}
                                            </span>

                                        </td>

                                        <td>

                                            <div className="admin-table-actions">

                                                <button
                                                    type="button"
                                                    className="admin-btn admin-btn-secondary admin-btn-sm"
                                                    onClick={() =>
                                                        openEdit(
                                                            item
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    className="admin-btn admin-btn-secondary admin-btn-sm"
                                                    disabled={
                                                        togglingId ===
                                                        item._id
                                                    }
                                                    onClick={() =>
                                                        handleToggleVisibility(
                                                            item,
                                                            !isVisible(
                                                                item
                                                            )
                                                        )
                                                    }
                                                >
                                                    {isVisible(item)
                                                        ? "Hide"
                                                        : "Show"}
                                                </button>

                                                <button
                                                    type="button"
                                                    className="admin-btn admin-btn-danger admin-btn-sm"
                                                    onClick={() =>
                                                        setDeleting(
                                                            item
                                                        )
                                                    }
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

            {/* =================================================
                CREATE / EDIT MODAL
                ================================================= */}

            <Modal
                isOpen={Boolean(editing)}
                onClose={closeModal}
                size="wide"
                title={
                    editing === "new"
                        ? "New project"
                        : "Edit project"
                }
                description="Portfolio details and imagery."
                footer={
                    <>
                        <button
                            type="button"
                            className="admin-btn admin-btn-secondary"
                            onClick={closeModal}
                            disabled={saving}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            form="portfolio-form"
                            className="admin-btn admin-btn-primary"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving…"
                                : "Save project"}
                        </button>
                    </>
                }
            >

                <Alert message={formError} />

                <form
                    id="portfolio-form"
                    onSubmit={handleSubmit}
                >

                    <div className="admin-field-row">

                        <Field label="Title" required>

                            <input
                                type="text"
                                className="admin-input"
                                value={form.title}
                                onChange={(e) =>
                                    set(
                                        "title",
                                        e.target.value
                                    )
                                }
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
                                onChange={(e) =>
                                    set(
                                        "slug",
                                        e.target.value
                                    )
                                }
                            />

                        </Field>

                    </div>

                    <div className="admin-field-row">

                        <Field label="Client">

                            <input
                                type="text"
                                className="admin-input"
                                value={form.clientName}
                                onChange={(e) =>
                                    set(
                                        "clientName",
                                        e.target.value
                                    )
                                }
                            />

                        </Field>

                        <Field label="Category">

                            <input
                                type="text"
                                className="admin-input"
                                value={form.category}
                                placeholder="Web development"
                                onChange={(e) =>
                                    set(
                                        "category",
                                        e.target.value
                                    )
                                }
                            />

                        </Field>

                    </div>

                    <Field label="Description">

                        <textarea
                            className="admin-textarea"
                            value={form.description}
                            onChange={(e) =>
                                set(
                                    "description",
                                    e.target.value
                                )
                            }
                        />

                    </Field>

                    <Field label="Project URL">

                        <input
                            type="text"
                            className="admin-input"
                            value={form.projectUrl}
                            placeholder="https://"
                            onChange={(e) =>
                                set(
                                    "projectUrl",
                                    e.target.value
                                )
                            }
                        />

                    </Field>

                    <ImageInput
                        label="Cover image"
                        value={form.coverImage}
                        onChange={(value) =>
                            set(
                                "coverImage",
                                value
                            )
                        }
                    />

                    <TextListInput
                        label="Tech stack"
                        hint="Technologies used, for example React, Node.js"
                        values={form.techStack}
                        placeholder="Add a technology"
                        onChange={(values) =>
                            set(
                                "techStack",
                                values
                            )
                        }
                    />

                    <div className="admin-subset">

                        <div className="admin-subset-header">

                            <h3>Gallery</h3>

                            <button
                                type="button"
                                className="admin-btn admin-btn-secondary admin-btn-sm"
                                onClick={
                                    addGalleryItem
                                }
                            >
                                + Add image
                            </button>

                        </div>

                        <p>
                            Extra images for
                            this project.
                        </p>

                        {form.gallery.length === 0 && (
                            <p className="admin-field-hint">
                                No gallery images yet.
                            </p>
                        )}

                        {form.gallery.map(
                            (image, index) => (

                                <div
                                    className="admin-subset-item"
                                    key={index}
                                >

                                    <div className="admin-subset-item-header">

                                        <strong>
                                            Image{" "}
                                            {index + 1}
                                        </strong>

                                        <div className="admin-subset-item-actions">

                                            <button
                                                type="button"
                                                className="admin-btn admin-btn-ghost admin-btn-sm"
                                                onClick={() =>
                                                    removeGallery(
                                                        index
                                                    )
                                                }
                                            >
                                                Remove
                                            </button>

                                        </div>

                                    </div>

                                    <Field label="Image URL">

                                        <input
                                            type="text"
                                            className="admin-input"
                                            value={
                                                image.url ||
                                                ""
                                            }
                                            onChange={(e) =>
                                                updateGallery(
                                                    index,
                                                    "url",
                                                    e.target.value
                                                )
                                            }
                                        />

                                    </Field>

                                    <Field label="Caption">

                                        <input
                                            type="text"
                                            className="admin-input"
                                            value={
                                                image.caption ||
                                                ""
                                            }
                                            onChange={(e) =>
                                                updateGallery(
                                                    index,
                                                    "caption",
                                                    e.target.value
                                                )
                                            }
                                        />

                                    </Field>

                                </div>

                            )
                        )}

                    </div>

                    <label className="admin-checkbox">

                        <input
                            type="checkbox"
                            checked={form.isActive}
                            onChange={(e) =>
                                set(
                                    "isActive",
                                    e.target.checked
                                )
                            }
                        />

                        <span>
                            Visible on the
                            website
                        </span>

                    </label>

                </form>

            </Modal>

            <ConfirmDialog
                isOpen={Boolean(deleting)}
                onClose={() => setDeleting(null)}
                onConfirm={handleDelete}
                isBusy={deletingBusy}
                title="Delete project"
                message={`This will permanently delete "${deleting?.title || ""
                    }". This cannot be undone.`}
            />

            <Toast
                toast={toast}
                onClose={closeToast}
            />

        </div>
    );
};

export default PortfolioAdmin;