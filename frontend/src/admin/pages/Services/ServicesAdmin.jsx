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
    Toast,
    useToast,
} from "../../components";

import "./ServicesAdmin.css";


const ENDPOINT = "/api/content/services";

const emptyItem = {
    title: "",
    slug: "",
    shortDescription: "",
    description: "",
    icon: "",
    image: "",
    features: [],
    isPublished: true,
};


const ServicesAdmin = () => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(emptyItem);
    const [formError, setFormError] = useState("");
    const [saving, setSaving] = useState(false);

    const [deleting, setDeleting] = useState(null);
    const [deletingBusy, setDeletingBusy] = useState(false);

    const { toast, showToast, closeToast } =
        useToast();


    const load = useCallback(async () => {

        setLoading(true);
        setError("");

        try {

            const data = await api.get(ENDPOINT);

            setItems(data || []);

        } catch (loadError) {

            setError(
                loadError.message ||
                    "Could not load services."
            );

        } finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {

        load();

    }, [load]);


    const openCreate = () => {

        setForm(emptyItem);
        setFormError("");
        setEditing("new");

    };

    const openEdit = (item) => {

        setForm({
            ...emptyItem,
            ...item,
            features: item.features || [],
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


    // ---------------- FEATURES ----------------

    const addFeature = () => {

        setForm((prev) => ({
            ...prev,
            features: [
                ...prev.features,
                { title: "", description: "" },
            ],
        }));

    };

    const updateFeature = (
        index,
        key,
        value
    ) => {

        setForm((prev) => {

            const features =
                [...prev.features];

            features[index] = {
                ...features[index],
                [key]: value,
            };

            return { ...prev, features };

        });

    };

    const removeFeature = (index) => {

        setForm((prev) => ({
            ...prev,
            features: prev.features.filter(
                (_, i) => i !== index
            ),
        }));

    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!form.title.trim()) {

            setFormError(
                "Title is required."
            );

            return;

        }

        setSaving(true);
        setFormError("");

        try {

            if (editing === "new") {

                await api.post(ENDPOINT, form);
                showToast("Service created.");

            } else {

                await api.put(
                    `${ENDPOINT}/${editing._id}`,
                    form
                );

                showToast("Service updated.");

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

            showToast("Service deleted.");
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


    return (
        <div className="admin-page">

            <PageHeader
                title="Services"
                description="Create and organise the services listed on your website."
                actions={
                    <button
                        type="button"
                        className="admin-btn admin-btn-primary"
                        onClick={openCreate}
                    >
                        + New service
                    </button>
                }
            />

            <Alert message={error} />

            <div className="admin-card">

                {loading ? (
                    <LoadingState label="Loading services" />
                ) : items.length === 0 ? (
                    <EmptyState
                        icon="▣"
                        title="No services yet"
                        description="Add your first service so it can appear on the website."
                        action={
                            <button
                                type="button"
                                className="admin-btn admin-btn-primary"
                                onClick={openCreate}
                            >
                                + New service
                            </button>
                        }
                    />
                ) : (
                    <div className="admin-table-wrap">

                        <table className="admin-table">

                            <thead>
                                <tr>
                                    <th>Service</th>
                                    <th>Slug</th>
                                    <th>Features</th>
                                    <th>Status</th>
                                    <th />
                                </tr>
                            </thead>

                            <tbody>

                                {items.map((item) => (
                                    <tr key={item._id}>

                                        <td>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems:
                                                        "center",
                                                    gap: "12px",
                                                }}
                                            >

                                                {item.image ? (
                                                    <img
                                                        className="admin-table-thumb"
                                                        src={
                                                            item.image
                                                        }
                                                        alt=""
                                                    />
                                                ) : (
                                                    <span
                                                        className="admin-table-thumb"
                                                        style={{
                                                            display:
                                                                "flex",
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                        }}
                                                    >
                                                        {item.icon ||
                                                            "▣"}
                                                    </span>
                                                )}

                                                <div
                                                    style={{
                                                        minWidth: 0,
                                                    }}
                                                >
                                                    <div className="admin-table-title">
                                                        {item.title}
                                                    </div>

                                                    <div className="admin-table-sub">
                                                        {
                                                            item.shortDescription ||
                                                            "—"
                                                        }
                                                    </div>
                                                </div>

                                            </div>
                                        </td>

                                        <td
                                            style={{
                                                color: "#6b6b74",
                                                fontSize:
                                                    "12px",
                                            }}
                                        >
                                            {item.slug}
                                        </td>

                                        <td>
                                            {(item.features ||
                                                []).length}
                                        </td>

                                        <td>
                                            <span
                                                className={`admin-badge ${
                                                    item.isPublished
                                                        ? "admin-badge-success"
                                                        : "admin-badge-neutral"
                                                }`}
                                            >
                                                {item.isPublished
                                                    ? "Published"
                                                    : "Draft"}
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

            {/* CREATE / EDIT */}
            <Modal
                isOpen={Boolean(editing)}
                onClose={closeModal}
                size="wide"
                title={
                    editing === "new"
                        ? "New service"
                        : "Edit service"
                }
                description="This content appears in the services section."
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
                            form="service-form"
                            className="admin-btn admin-btn-primary"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving…"
                                : "Save service"}
                        </button>
                    </>
                }
            >

                <Alert message={formError} />

                <form
                    id="service-form"
                    onSubmit={handleSubmit}
                >

                    <div className="admin-field-row">

                        <Field
                            label="Title"
                            required
                        >
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

                    <Field label="Short description">
                        <input
                            type="text"
                            className="admin-input"
                            value={form.shortDescription}
                            onChange={(e) =>
                                set(
                                    "shortDescription",
                                    e.target.value
                                )
                            }
                        />
                    </Field>

                    <Field label="Full description">
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

                    <div className="admin-field-row">

                        <Field label="Icon name">
                            <input
                                type="text"
                                className="admin-input"
                                value={form.icon}
                                placeholder="Rocket"
                                onChange={(e) =>
                                    set(
                                        "icon",
                                        e.target.value
                                    )
                                }
                            />
                        </Field>

                        <div />

                    </div>

                    <ImageInput
                        label="Service image"
                        value={form.image}
                        onChange={(value) =>
                            set("image", value)
                        }
                    />

                    <div className="admin-subset">

                        <div className="admin-subset-header">
                            <h3>
                                Feature list
                            </h3>

                            <button
                                type="button"
                                className="admin-btn admin-btn-secondary admin-btn-sm"
                                onClick={addFeature}
                            >
                                + Add
                            </button>
                        </div>

                        <p>
                            Bullet points shown
                            under the service.
                        </p>

                        {form.features.length === 0 && (
                            <p className="admin-field-hint">
                                No features yet.
                            </p>
                        )}

                        {form.features.map((feature, index) => (
                            <div
                                className="admin-subset-item"
                                key={index}
                            >

                                <div className="admin-subset-item-header">
                                    <strong>
                                        Feature{" "}
                                        {index + 1}
                                    </strong>

                                    <div className="admin-subset-item-actions">
                                        <button
                                            type="button"
                                            className="admin-btn admin-btn-ghost admin-btn-sm"
                                            onClick={() =>
                                                removeFeature(
                                                    index
                                                )
                                            }
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>

                                <Field label="Title">
                                    <input
                                        type="text"
                                        className="admin-input"
                                        value={feature.title || ""}
                                        onChange={(e) =>
                                            updateFeature(
                                                index,
                                                "title",
                                                e.target
                                                    .value
                                            )
                                        }
                                    />
                                </Field>

                                <Field label="Description">
                                    <textarea
                                        className="admin-textarea"
                                        style={{
                                            minHeight: "70px",
                                        }}
                                        value={feature.description || ""}
                                        onChange={(e) =>
                                            updateFeature(
                                                index,
                                                "description",
                                                e.target
                                                    .value
                                            )
                                        }
                                    />
                                </Field>

                            </div>
                        ))}

                    </div>

                    <label className="admin-checkbox">
                        <input
                            type="checkbox"
                            checked={form.isPublished}
                            onChange={(e) =>
                                set(
                                    "isPublished",
                                    e.target.checked
                                )
                            }
                        />
                        <span>
                            Published on the
                            website
                        </span>
                    </label>

                </form>

            </Modal>

            {/* DELETE */}
            <ConfirmDialog
                isOpen={Boolean(deleting)}
                onClose={() => setDeleting(null)}
                onConfirm={handleDelete}
                isBusy={deletingBusy}
                title="Delete service"
                message={`This will permanently delete "${
                    deleting?.title || ""
                }". This cannot be undone.`}
            />

            <Toast
                toast={toast}
                onClose={closeToast}
            />

        </div>
    );

};

export default ServicesAdmin;
