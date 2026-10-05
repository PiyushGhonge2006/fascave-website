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

import "./GTMPartnersAdmin.css";


const ENDPOINT = "/api/content/gtm-partners";

const TIERS = [
    { value: "preferred", label: "Preferred" },
    { value: "partner", label: "Partner" },
    { value: "reseller", label: "Reseller" },
];

const emptyItem = {
    name: "",
    logo: "",
    website: "",
    category: "",
    description: "",
    tier: "partner",
    isPublished: true,
};


const GTMPartnersAdmin = () => {

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
                    "Could not load partners."
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

        if (!form.name.trim()) {

            setFormError(
                "Partner name is required."
            );

            return;

        }

        setSaving(true);
        setFormError("");

        try {

            if (editing === "new") {

                await api.post(ENDPOINT, form);
                showToast("Partner added.");

            } else {

                await api.put(
                    `${ENDPOINT}/${editing._id}`,
                    form
                );

                showToast("Partner updated.");

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

            showToast("Partner removed.");
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
                title="GTM Partners"
                description="Manage the strategic partners and technology logos shown on your site."
                actions={
                    <button
                        type="button"
                        className="admin-btn admin-btn-primary"
                        onClick={openCreate}
                    >
                        + Add partner
                    </button>
                }
            />

            <Alert message={error} />

            <div className="admin-card">

                {loading ? (
                    <LoadingState label="Loading partners" />
                ) : items.length === 0 ? (
                    <EmptyState
                        icon="◇"
                        title="No partners yet"
                        description="Add your first GTM partner or technology partner."
                        action={
                            <button
                                type="button"
                                className="admin-btn admin-btn-primary"
                                onClick={openCreate}
                            >
                                + Add partner
                            </button>
                        }
                    />
                ) : (
                    <div className="admin-table-wrap">

                        <table className="admin-table">

                            <thead>
                                <tr>
                                    <th>Partner</th>
                                    <th>Category</th>
                                    <th>Tier</th>
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

                                                {item.logo ? (
                                                    <img
                                                        className="admin-table-thumb"
                                                        src={item.logo}
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
                                                        ◇
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
                                                        {item.website ||
                                                            "—"}
                                                    </div>
                                                </div>

                                            </div>
                                        </td>

                                        <td>
                                            {item.category ||
                                                "—"}
                                        </td>

                                        <td>
                                            <span
                                                className={`admin-badge admin-badge-${
                                                    item.tier ===
                                                    "preferred"
                                                        ? "info"
                                                        : item.tier ===
                                                            "reseller"
                                                            ? "warning"
                                                            : "neutral"
                                                }`}
                                            >
                                                {item.tier}
                                            </span>
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
                        ? "Add partner"
                        : "Edit partner"
                }
                description="Partner details shown in the GTM section."
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
                            form="gtm-form"
                            className="admin-btn admin-btn-primary"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving…"
                                : "Save partner"}
                        </button>
                    </>
                }
            >

                <Alert message={formError} />

                <form
                    id="gtm-form"
                    onSubmit={handleSubmit}
                >

                    <Field label="Partner name" required>
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

                    <div className="admin-field-row">

                        <Field label="Category">
                            <input
                                type="text"
                                className="admin-input"
                                value={form.category}
                                placeholder="Cloud infrastructure"
                                onChange={(e) =>
                                    set(
                                        "category",
                                        e.target.value
                                    )
                                }
                            />
                        </Field>

                        <Field label="Tier">
                            <select
                                className="admin-select"
                                value={form.tier}
                                onChange={(e) =>
                                    set(
                                        "tier",
                                        e.target.value
                                    )
                                }
                            >
                                {TIERS.map((tier) => (
                                    <option
                                        key={tier.value}
                                        value={tier.value}
                                    >
                                        {tier.label}
                                    </option>
                                ))}
                            </select>
                        </Field>

                    </div>

                    <Field label="Website">
                        <input
                            type="text"
                            className="admin-input"
                            value={form.website}
                            placeholder="https://"
                            onChange={(e) =>
                                set(
                                    "website",
                                    e.target.value
                                )
                            }
                        />
                    </Field>

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

                    <ImageInput
                        label="Partner logo"
                        value={form.logo}
                        onChange={(value) =>
                            set("logo", value)
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
                title="Remove partner"
                message={`This will permanently remove "${
                    deleting?.name || ""
                }" from your partners list.`}
            />

            <Toast
                toast={toast}
                onClose={closeToast}
            />

        </div>
    );

};

export default GTMPartnersAdmin;
