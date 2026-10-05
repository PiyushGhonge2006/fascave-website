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
    StatusBadge,
    TextListInput,
    Toast,
    useToast,
} from "../../components";

import "./BlogAdmin.css";


const ENDPOINT = "/api/content/blog";

const emptyItem = {
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    category: "",
    author: "",
    tags: [],
    readMinutes: 3,
    status: "draft",
};


const formatDate = (value) => {

    if (!value) {
        return "—";
    }

    return new Date(value).toLocaleDateString(
        "en-GB",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );

};


const BlogAdmin = () => {

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
                    "Could not load posts."
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
            item.title
                ?.toLowerCase()
                .includes(query) ||
            item.category
                ?.toLowerCase()
                .includes(query) ||
            item.author
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
            tags: item.tags || [],
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
                showToast("Post created.");

            } else {

                await api.put(
                    `${ENDPOINT}/${editing._id}`,
                    form
                );

                showToast("Post updated.");

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

            showToast("Post deleted.");
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
                title="Blog"
                description="Write, publish and organise articles for your blog."
                actions={
                    <button
                        type="button"
                        className="admin-btn admin-btn-primary"
                        onClick={openCreate}
                    >
                        + New post
                    </button>
                }
            />

            <Alert message={error} />

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
                                placeholder="Search posts"
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
                    <LoadingState label="Loading posts" />
                ) : items.length === 0 ? (
                    <EmptyState
                        icon="✎"
                        title="No posts yet"
                        description="Write your first article to start building your blog."
                        action={
                            <button
                                type="button"
                                className="admin-btn admin-btn-primary"
                                onClick={openCreate}
                            >
                                + New post
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
                                    <th>Post</th>
                                    <th>Category</th>
                                    <th>Author</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th />
                                </tr>
                            </thead>

                            <tbody>

                                {filtered.map((item) => (
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

                                                {item.coverImage ? (
                                                    <img
                                                        className="admin-table-thumb"
                                                        src={
                                                            item.coverImage
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
                                                        ✎
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
                                                        /blog/{item.slug}
                                                    </div>
                                                </div>

                                            </div>
                                        </td>

                                        <td>
                                            {item.category ||
                                                "—"}
                                        </td>

                                        <td>
                                            {item.author ||
                                                "—"}
                                        </td>

                                        <td>
                                            <StatusBadge
                                                status={
                                                    item.status
                                                }
                                            />
                                        </td>

                                        <td
                                            style={{
                                                color: "#6b6b74",
                                                fontSize:
                                                    "12px",
                                                whiteSpace:
                                                    "nowrap",
                                            }}
                                        >
                                            {formatDate(
                                                item.publishedAt ||
                                                    item.createdAt
                                            )}
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
                size="wide"
                title={
                    editing === "new"
                        ? "New post"
                        : "Edit post"
                }
                description="Article content and publishing settings."
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
                            form="blog-form"
                            className="admin-btn admin-btn-primary"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving…"
                                : "Save post"}
                        </button>
                    </>
                }
            >

                <Alert message={formError} />

                <form
                    id="blog-form"
                    onSubmit={handleSubmit}
                >

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

                    <div className="admin-field-row">

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

                        <Field label="Status">
                            <select
                                className="admin-select"
                                value={form.status}
                                onChange={(e) =>
                                    set(
                                        "status",
                                        e.target.value
                                    )
                                }
                            >
                                <option value="draft">
                                    Draft
                                </option>
                                <option value="published">
                                    Published
                                </option>
                            </select>
                        </Field>

                    </div>

                    <div className="admin-field-row-3">

                        <Field label="Category">
                            <input
                                type="text"
                                className="admin-input"
                                value={form.category}
                                placeholder="Growth"
                                onChange={(e) =>
                                    set(
                                        "category",
                                        e.target.value
                                    )
                                }
                            />
                        </Field>

                        <Field label="Author">
                            <input
                                type="text"
                                className="admin-input"
                                value={form.author}
                                onChange={(e) =>
                                    set(
                                        "author",
                                        e.target.value
                                    )
                                }
                            />
                        </Field>

                        <Field label="Read time (min)">
                            <input
                                type="number"
                                className="admin-input"
                                min="1"
                                value={form.readMinutes}
                                onChange={(e) =>
                                    set(
                                        "readMinutes",
                                        Number(
                                            e.target.value
                                        ) || 1
                                    )
                                }
                            />
                        </Field>

                    </div>

                    <Field label="Excerpt">
                        <textarea
                            className="admin-textarea"
                            style={{ minHeight: "80px" }}
                            value={form.excerpt}
                            placeholder="Short summary shown on the blog listing."
                            onChange={(e) =>
                                set(
                                    "excerpt",
                                    e.target.value
                                )
                            }
                        />
                    </Field>

                    <Field label="Content">
                        <textarea
                            className="admin-textarea"
                            style={{ minHeight: "260px" }}
                            value={form.content}
                            onChange={(e) =>
                                set(
                                    "content",
                                    e.target.value
                                )
                            }
                        />
                    </Field>

                    <ImageInput
                        label="Cover image"
                        value={form.coverImage}
                        onChange={(value) =>
                            set("coverImage", value)
                        }
                    />

                    <TextListInput
                        label="Tags"
                        values={form.tags}
                        placeholder="Add a tag"
                        onChange={(values) =>
                            set("tags", values)
                        }
                    />

                </form>

            </Modal>

            <ConfirmDialog
                isOpen={Boolean(deleting)}
                onClose={() => setDeleting(null)}
                onConfirm={handleDelete}
                isBusy={deletingBusy}
                title="Delete post"
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

export default BlogAdmin;
