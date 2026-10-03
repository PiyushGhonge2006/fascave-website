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

import "./TestimonialsAdmin.css";


const ENDPOINT = "/api/content/testimonials";

const emptyItem = {
    name: "",
    role: "",
    company: "",
    avatar: "",
    quote: "",
    rating: 5,
    isPublished: true,
};


const TestimonialsAdmin = () => {

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
                    "Could not load testimonials."
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


    const handleSubmit = async (event) => {

        event.preventDefault();

        if (
            !form.name.trim() ||
            !form.quote.trim()
        ) {

            setFormError(
                "Name and quote are both required."
            );

            return;

        }

        setSaving(true);
        setFormError("");

        try {

            if (editing === "new") {

                await api.post(ENDPOINT, form);
                showToast("Testimonial added.");

            } else {

                await api.put(
                    `${ENDPOINT}/${editing._id}`,
                    form
                );

                showToast("Testimonial updated.");

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

            showToast("Testimonial deleted.");
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
                title="Testimonials"
                description="Manage the customer quotes and reviews shown on your website."
                actions={
                    <button
                        type="button"
                        className="admin-btn admin-btn-primary"
                        onClick={openCreate}
                    >
                        + New testimonial
                    </button>
                }
            />

            <Alert message={error} />

            <div className="admin-card">

                {loading ? (
                    <LoadingState label="Loading testimonials" />
                ) : items.length === 0 ? (
                    <EmptyState
                        icon="★"
                        title="No testimonials yet"
                        description="Add your first customer quote to build trust with visitors."
                        action={
                            <button
                                type="button"
                                className="admin-btn admin-btn-primary"
                                onClick={openCreate}
                            >
                                + New testimonial
                            </button>
                        }
                    />
                ) : (
                    <div className="admin-table-wrap">

                        <table className="admin-table">

                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Quote</th>
                                    <th>Rating</th>
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

                                                {item.avatar ? (
                                                    <img
                                                        className="admin-table-thumb"
                                                        src={
                                                            item.avatar
                                                        }
                                                        alt=""
                                                        style={{
                                                            borderRadius:
                                                                "50%",
                                                        }}
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
                                                            borderRadius:
                                                                "50%",
                                                            fontWeight:
                                                                "700",
                                                        }}
                                                    >
                                                        {item.name.charAt(
                                                            0
                                                        )}
                                                    </span>
                                                )}

                                                <div
                                                    style={{
                                                        minWidth: 0,
                                                    }}
                                                >
                                                    <div className="admin-table-title">
                                                        {item.name}
                                                    </div>
                                                    <div className="admin-table-sub">
                                                        {
                                                            [
                                                                item.role,
                                                                item.company,
                                                            ]
                                                                .filter(
                                                                    Boolean
                                                                )
                                                                .join(
                                                                    " · "
                                                                ) || "—"
                                                        }
                                                    </div>
                                                </div>

                                            </div>
                                        </td>

                                        <td
                                            style={{
                                                maxWidth: "380px",
                                                color: "#66666f",
                                            }}
                                        >
                                            {
                                                item.quote.length >
                                                90
                                                    ? `${item.quote.slice(
                                                          0,
                                                          90
                                                      )}…`
                                                    : item.quote
                                            }
                                        </td>

                                        <td
                                            style={{
                                                color: "#f59e0b",
                                                whiteSpace:
                                                    "nowrap",
                                            }}
                                        >
                                            {"★".repeat(
                                                item.rating || 0
                                            )}
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

            <Modal
                isOpen={Boolean(editing)}
                onClose={closeModal}
                title={
                    editing === "new"
                        ? "New testimonial"
                        : "Edit testimonial"
                }
                description="Customer quote shown in the testimonials section."
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
                            form="testimonial-form"
                            className="admin-btn admin-btn-primary"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving…"
                                : "Save testimonial"}
                        </button>
                    </>
                }
            >

                <Alert message={formError} />

                <form
                    id="testimonial-form"
                    onSubmit={handleSubmit}
                >

                    <div className="admin-field-row">

                        <Field label="Name" required>
                            <input
                                type="text"
                                className="admin-input"
                                value={form.name}
                                onChange={(e) =>
                                    set(
                                        "name",
                                        e.target.value
                                    )
                                }
                            />
                        </Field>

                        <Field label="Company">
                            <input
                                type="text"
                                className="admin-input"
                                value={form.company}
                                onChange={(e) =>
                                    set(
                                        "company",
                                        e.target.value
                                    )
                                }
                            />
                        </Field>

                    </div>

                    <div className="admin-field-row">

                        <Field label="Role">
                            <input
                                type="text"
                                className="admin-input"
                                value={form.role}
                                placeholder="Marketing Director"
                                onChange={(e) =>
                                    set(
                                        "role",
                                        e.target.value
                                    )
                                }
                            />
                        </Field>

                        <Field label="Rating">
                            <select
                                className="admin-select"
                                value={form.rating}
                                onChange={(e) =>
                                    set(
                                        "rating",
                                        Number(e.target.value)
                                    )
                                }
                            >
                                {[5, 4, 3, 2, 1].map(
                                    (value) => (
                                        <option
                                            key={value}
                                            value={value}
                                        >
                                            {"★".repeat(
                                                value
                                            )}{" "}
                                            ({value})
                                        </option>
                                    )
                                )}
                            </select>
                        </Field>

                    </div>

                    <Field label="Quote" required>
                        <textarea
                            className="admin-textarea"
                            style={{ minHeight: "140px" }}
                            value={form.quote}
                            onChange={(e) =>
                                set(
                                    "quote",
                                    e.target.value
                                )
                            }
                        />
                    </Field>

                    <ImageInput
                        label="Avatar"
                        value={form.avatar}
                        onChange={(value) =>
                            set("avatar", value)
                        }
                    />

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

            <ConfirmDialog
                isOpen={Boolean(deleting)}
                onClose={() => setDeleting(null)}
                onConfirm={handleDelete}
                isBusy={deletingBusy}
                title="Delete testimonial"
                message={`This will permanently delete the testimonial from "${
                    deleting?.name || ""
                }".`}
            />

            <Toast
                toast={toast}
                onClose={closeToast}
            />

        </div>
    );

};

export default TestimonialsAdmin;
