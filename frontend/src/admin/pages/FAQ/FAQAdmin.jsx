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
    SectionVisibilityCard,
    Toast,
    useToast,
} from "../../components";

import "./FAQAdmin.css";


const ENDPOINT = "/api/admin/faq";

const emptyItem = {
    question: "",
    answer: "",
    category: "general",
    isPublished: true,
    isActive: true,
};


const FAQAdmin = () => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(emptyItem);
    const [formError, setFormError] = useState("");
    const [saving, setSaving] = useState(false);

    const [deleting, setDeleting] = useState(null);
    const [deletingBusy, setDeletingBusy] = useState(false);
    const [togglingId, setTogglingId] = useState(null);

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
                "Could not load FAQs."
            );

        } finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {

        load();

    }, [load]);


    const filtered = items.filter((item) => {

        const query = search.trim().toLowerCase();

        if (!query) {
            return true;
        }

        return (
            item.question
                ?.toLowerCase()
                .includes(query) ||
            item.answer
                ?.toLowerCase()
                .includes(query) ||
            item.category
                ?.toLowerCase()
                .includes(query)
        );

    });


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
            !form.question.trim() ||
            !form.answer.trim()
        ) {

            setFormError(
                "Question and answer are both required."
            );

            return;

        }

        setSaving(true);
        setFormError("");

        try {

            if (editing === "new") {

                await api.post(ENDPOINT, form);
                showToast("FAQ added.");

            } else {

                await api.put(
                    `${ENDPOINT}/${editing._id}`,
                    form
                );

                showToast("FAQ updated.");

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


    const toggleVisibility = async (item) => {

        const visible = item.isActive !== false;

        setTogglingId(item._id);

        try {

            await api.put(
                `${ENDPOINT}/${item._id}`,
                {
                    isActive: !visible,
                    isPublished: !visible,
                }
            );

            showToast(
                visible
                    ? "Question hidden from the website."
                    : "Question is visible on the website."
            );

            load();

        } catch (toggleError) {

            showToast(
                toggleError.message ||
                "Could not update visibility.",
                "error"
            );

        } finally {

            setTogglingId(null);

        }

    };


    const handleDelete = async () => {

        setDeletingBusy(true);

        try {

            await api.del(
                `${ENDPOINT}/${deleting._id}`
            );

            showToast("FAQ deleted.");
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
                title="FAQ"
                description="Add and edit the questions and answers shown in your FAQ section."
                actions={
                    <button
                        type="button"
                        className="admin-btn admin-btn-primary"
                        onClick={openCreate}
                    >
                        + New question
                    </button>
                }
            />

            <Alert message={error} />

            <SectionVisibilityCard
                field="faqSectionVisible"
                title="FAQ section"
                description="Show or hide the FAQ block on the home page. Your questions and answers stay saved either way."
            />

            <div className="admin-card">

                {items.length > 0 && (
                    <div className="admin-toolbar">

                        <div className="admin-search">
                            <span className="admin-search-icon">
                                ⌕
                            </span>

                            <input
                                type="text"
                                className="admin-input"
                                value={search}
                                placeholder="Search questions"
                                onChange={(event) =>
                                    setSearch(
                                        event.target.value
                                    )
                                }
                            />
                        </div>

                        <span
                            style={{
                                color: "#6b6b74",
                                fontSize: "13px",
                            }}
                        >
                            {filtered.length} of{" "}
                            {items.length}
                        </span>

                    </div>
                )}

                {loading ? (
                    <LoadingState label="Loading FAQs" />
                ) : items.length === 0 ? (
                    <EmptyState
                        icon="?"
                        title="No questions yet"
                        description="Add frequently asked questions to help your visitors."
                        action={
                            <button
                                type="button"
                                className="admin-btn admin-btn-primary"
                                onClick={openCreate}
                            >
                                + New question
                            </button>
                        }
                    />
                ) : filtered.length === 0 ? (
                    <EmptyState
                        icon="⌕"
                        title="No matches"
                        description="Try a different search term."
                    />
                ) : (
                    <div className="admin-table-wrap">

                        <table className="admin-table">

                            <thead>
                                <tr>
                                    <th>Question</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                    <th />
                                </tr>
                            </thead>

                            <tbody>

                                {filtered.map((item) => (
                                    <tr key={item._id}>

                                        <td
                                            style={{
                                                maxWidth: "520px",
                                            }}
                                        >
                                            <div className="admin-table-title">
                                                {
                                                    item.question
                                                }
                                            </div>

                                            <div
                                                className="admin-table-sub"
                                                style={{
                                                    whiteSpace:
                                                        "nowrap",
                                                    overflow:
                                                        "hidden",
                                                    textOverflow:
                                                        "ellipsis",
                                                }}
                                            >
                                                {
                                                    item.answer
                                                }
                                            </div>
                                        </td>

                                        <td>
                                            <span className="admin-badge admin-badge-neutral">
                                                {item.category ||
                                                    "general"}
                                            </span>
                                        </td>

                                        <td>
                                            <span
                                                className={`admin-badge ${item.isActive !==
                                                    false
                                                    ? "admin-badge-success"
                                                    : "admin-badge-neutral"
                                                    }`}
                                            >
                                                {item.isActive !==
                                                    false
                                                    ? "Visible"
                                                    : "Hidden"}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="admin-table-actions">

                                                <button
                                                    type="button"
                                                    className="admin-btn admin-btn-ghost admin-btn-sm"
                                                    onClick={() =>
                                                        toggleVisibility(
                                                            item
                                                        )
                                                    }
                                                    disabled={
                                                        togglingId ===
                                                        item._id
                                                    }
                                                >
                                                    {togglingId ===
                                                        item._id
                                                        ? "Saving"
                                                        : item.isActive !==
                                                            false
                                                            ? "Hide"
                                                            : "Show"}
                                                </button>

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
                        ? "New question"
                        : "Edit question"
                }
                description="Questions appear in an accordion on the FAQ page."
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
                            form="faq-form"
                            className="admin-btn admin-btn-primary"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving…"
                                : "Save question"}
                        </button>
                    </>
                }
            >

                <Alert message={formError} />

                <form
                    id="faq-form"
                    onSubmit={handleSubmit}
                >

                    <Field label="Question" required>
                        <input
                            type="text"
                            className="admin-input"
                            value={form.question}
                            onChange={(e) =>
                                set(
                                    "question",
                                    e.target.value
                                )
                            }
                        />
                    </Field>

                    <Field label="Answer" required>
                        <textarea
                            className="admin-textarea"
                            style={{ minHeight: "160px" }}
                            value={form.answer}
                            onChange={(e) =>
                                set(
                                    "answer",
                                    e.target.value
                                )
                            }
                        />
                    </Field>

                    <Field
                        label="Category"
                        hint="Used for grouping on the public page."
                    >
                        <input
                            type="text"
                            className="admin-input"
                            value={form.category}
                            placeholder="general"
                            onChange={(e) =>
                                set(
                                    "category",
                                    e.target.value
                                )
                            }
                        />
                    </Field>

                    <label className="admin-checkbox">
                        <input
                            type="checkbox"
                            checked={
                                form.isActive !== false
                            }
                            onChange={(e) => {
                                set(
                                    "isActive",
                                    e.target.checked
                                );
                                set(
                                    "isPublished",
                                    e.target.checked
                                );
                            }}
                        />
                        <span>
                            Visible on the website
                        </span>
                    </label>

                </form>

            </Modal>

            <ConfirmDialog
                isOpen={Boolean(deleting)}
                onClose={() => setDeleting(null)}
                onConfirm={handleDelete}
                isBusy={deletingBusy}
                title="Delete question"
                message="This will permanently remove this question and its answer."
            />

            <Toast
                toast={toast}
                onClose={closeToast}
            />

        </div>
    );

};

export default FAQAdmin;
