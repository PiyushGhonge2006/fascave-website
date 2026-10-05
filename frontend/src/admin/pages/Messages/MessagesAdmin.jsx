import { useCallback, useEffect, useState } from "react";

import { api } from "../../lib/apiClient";

import {
    Alert,
    ConfirmDialog,
    EmptyState,
    LoadingState,
    Modal,
    PageHeader,
    StatusBadge,
    Toast,
    useToast,
} from "../../components";

import "./MessagesAdmin.css";


const ENDPOINT = "/api/messages";

/**
 * One name for both record shapes.
 *
 * The Contact wizard posts a single `name` into `fullName`; the older
 * navbar and hero prompts post `firstName` + `lastName`. `displayName`
 * is a server-side virtual that already covers both, with this as the
 * fallback for anything that predates it.
 */
const nameOf = (item) =>
    item?.displayName ||
    [item?.fullName, item?.firstName, item?.lastName]
        .filter(Boolean)
        .join(" ") ||
    "—";


const SOURCE_LABELS = {
    navbar: "Navbar",
    hero: "Hero",
    contact: "Contact page",
    consultation: "Consultation popup",
    other: "Other",
};


const sourceLabel = (source) =>
    SOURCE_LABELS[source] || source || "Other";


const formatDate = (value) => {

    if (!value) {
        return "—";
    }

    return new Date(value).toLocaleString(
        "en-GB",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }
    );

};


const MessagesAdmin = () => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] =
        useState("all");

    const [viewing, setViewing] = useState(null);
    const [statusBusy, setStatusBusy] = useState(false);

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
                    "Could not load messages."
            );

        } finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {

        load();

    }, [load]);


    const filtered = items.filter((item) => {

        if (
            statusFilter !== "all" &&
            item.status !== statusFilter
        ) {

            return false;

        }

        const query =
            search.trim().toLowerCase();

        if (!query) {
            return true;
        }

        return (
            nameOf(item)
                .toLowerCase()
                .includes(query) ||
            item.email
                ?.toLowerCase()
                .includes(query) ||
            item.company
                ?.toLowerCase()
                .includes(query) ||
            item.projectType
                ?.toLowerCase()
                .includes(query) ||
            item.query
                ?.toLowerCase()
                .includes(query)
        );

    });


    const counts = {
        all: items.length,
        new: items.filter(
            (item) => item.status === "new"
        ).length,
        read: items.filter(
            (item) => item.status === "read"
        ).length,
        replied: items.filter(
            (item) => item.status === "replied"
        ).length,
    };


    const changeStatus = async (
        message,
        status
    ) => {

        setStatusBusy(true);

        try {

            const data = await api.patch(
                `${ENDPOINT}/${message._id}/status`,
                { status }
            );

            setItems((prev) =>
                prev.map((item) =>
                    item._id === message._id
                        ? data || item
                        : item
                )
            );

            if (
                viewing?._id === message._id
            ) {

                setViewing(data || message);

            }

            showToast(
                `Marked as ${status}.`
            );

        } catch (statusError) {

            showToast(
                statusError.message ||
                    "Update failed.",
                "error"
            );

        } finally {

            setStatusBusy(false);

        }

    };


    const openMessage = (message) => {

        setViewing(message);

        if (message.status === "new") {

            changeStatus(message, "read");

        }

    };


    const handleDelete = async () => {

        setDeletingBusy(true);

        try {

            await api.del(
                `${ENDPOINT}/${deleting._id}`
            );

            showToast("Message deleted.");
            setDeleting(null);
            setViewing(null);
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
                title="Messages"
                description="Enquiries submitted through the website contact and consultation forms."
            />

            <Alert message={error} />

            <div className="admin-stats-grid">

                <div className="admin-stat-card">
                    <div className="admin-stat-top">
                        <div className="admin-stat-icon">
                            ✉
                        </div>
                    </div>
                    <div className="admin-stat-value">
                        {counts.all}
                    </div>
                    <div className="admin-stat-label">
                        Total messages
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="admin-stat-top">
                        <div className="admin-stat-icon">
                            ●
                        </div>
                    </div>
                    <div className="admin-stat-value">
                        {counts.new}
                    </div>
                    <div className="admin-stat-label">
                        Unread
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="admin-stat-top">
                        <div className="admin-stat-icon">
                            ○
                        </div>
                    </div>
                    <div className="admin-stat-value">
                        {counts.read}
                    </div>
                    <div className="admin-stat-label">
                        Read
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="admin-stat-top">
                        <div className="admin-stat-icon">
                            ✓
                        </div>
                    </div>
                    <div className="admin-stat-value">
                        {counts.replied}
                    </div>
                    <div className="admin-stat-label">
                        Replied
                    </div>
                </div>

            </div>

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
                                placeholder="Search name, email or message"
                                onChange={(event) =>
                                    setSearch(
                                        event.target.value
                                    )
                                }
                            />
                        </div>

                        <select
                            className="admin-select"
                            style={{
                                maxWidth: "180px",
                            }}
                            value={statusFilter}
                            onChange={(event) =>
                                setStatusFilter(
                                    event.target.value
                                )
                            }
                        >
                            <option value="all">
                                All statuses (
                                {counts.all})
                            </option>
                            <option value="new">
                                New ({counts.new})
                            </option>
                            <option value="read">
                                Read ({counts.read})
                            </option>
                            <option value="replied">
                                Replied (
                                {counts.replied})
                            </option>
                        </select>

                    </div>
                )}

                {loading ? (
                    <LoadingState label="Loading messages" />
                ) : items.length === 0 ? (
                    <EmptyState
                        icon="✉"
                        title="No messages yet"
                        description="Enquiries from the website will appear here."
                    />
                ) : filtered.length === 0 ? (
                    <EmptyState
                        icon="⌕"
                        title="No matches"
                        description="Try a different search term or filter."
                    />
                ) : (
                    <div className="admin-table-wrap">

                        <table className="admin-table">

                            <thead>
                                <tr>
                                    <th>From</th>
                                    <th>Message</th>
                                    <th>Source</th>
                                    <th>Status</th>
                                    <th>Received</th>
                                    <th />
                                </tr>
                            </thead>

                            <tbody>

                                {filtered.map((item) => (
                                    <tr key={item._id}>

                                        <td>
                                            <div className="admin-table-title">
                                                {nameOf(item)}
                                            </div>
                                            <div className="admin-table-sub">
                                                {item.email}
                                            </div>
                                            <div className="admin-table-sub">
                                                {[
                                                    item.company,
                                                    item.phone,
                                                ]
                                                    .filter(Boolean)
                                                    .join(" · ")}
                                            </div>
                                        </td>

                                        <td
                                            style={{
                                                maxWidth: "320px",
                                                color: "#66666f",
                                            }}
                                        >
                                            {[item.projectType, item.budget]
                                                .filter(Boolean)
                                                .map((p) => p.trim())
                                                .join(" · ") ||
                                                (item.query?.length > 80
                                                    ? `${item.query.slice(
                                                          0,
                                                          80
                                                      )}…`
                                                    : item.query)}
                                        </td>

                                        <td>
                                            <span className="admin-badge admin-badge-neutral">
                                                {sourceLabel(
                                                    item.source
                                                )}
                                            </span>
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
                                                fontSize: "12px",
                                                whiteSpace:
                                                    "nowrap",
                                            }}
                                        >
                                            {formatDate(
                                                item.createdAt
                                            )}
                                        </td>

                                        <td>
                                            <div className="admin-table-actions">

                                                <button
                                                    type="button"
                                                    className="admin-btn admin-btn-secondary admin-btn-sm"
                                                    onClick={() =>
                                                        openMessage(
                                                            item
                                                        )
                                                    }
                                                >
                                                    View
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

            {/* VIEW MESSAGE */}
            <Modal
                isOpen={Boolean(viewing)}
                onClose={() => setViewing(null)}
                title="Message details"
                description={
                    viewing
                        ? `Received ${formatDate(
                              viewing.createdAt
                          )}`
                        : ""
                }
                footer={
                    <>
                        {viewing &&
                            viewing.status !==
                                "replied" && (
                                <button
                                    type="button"
                                    className="admin-btn admin-btn-primary"
                                    disabled={statusBusy}
                                    onClick={() =>
                                        changeStatus(
                                            viewing,
                                            "replied"
                                        )
                                    }
                                >
                                    Mark as replied
                                </button>
                            )}

                        <button
                            type="button"
                            className="admin-btn admin-btn-secondary"
                            onClick={() =>
                                setViewing(null)
                            }
                        >
                            Close
                        </button>
                    </>
                }
            >

                {viewing && (
                    <div className="admin-detail-grid">

                        <div className="admin-detail-item">
                            <div className="admin-detail-label">
                                Name
                            </div>
                            <div className="admin-detail-value">
                                {nameOf(viewing)}
                            </div>
                        </div>

                        <div className="admin-detail-item">
                            <div className="admin-detail-label">
                                Status
                            </div>
                            <div className="admin-detail-value">
                                <StatusBadge
                                    status={viewing.status}
                                />
                            </div>
                        </div>

                        <div className="admin-detail-item">
                            <div className="admin-detail-label">
                                Email
                            </div>
                            <div className="admin-detail-value">
                                <a
                                    href={`mailto:${viewing.email}`}
                                >
                                    {viewing.email}
                                </a>
                            </div>
                        </div>

                        {viewing.phone && (
                            <div className="admin-detail-item">
                                <div className="admin-detail-label">
                                    Phone
                                </div>
                                <div className="admin-detail-value">
                                    <a
                                        href={`tel:${viewing.phone}`}
                                    >
                                        {viewing.phone}
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* Enquiry-only fields. Absent on the
                            older navbar / hero records. */}
                        {viewing.company && (
                            <div className="admin-detail-item">
                                <div className="admin-detail-label">
                                    Company
                                </div>
                                <div className="admin-detail-value">
                                    {viewing.company}
                                </div>
                            </div>
                        )}

                        {viewing.projectType && (
                            <div className="admin-detail-item">
                                <div className="admin-detail-label">
                                    Project Type
                                </div>
                                <div className="admin-detail-value">
                                    {viewing.projectType}
                                </div>
                            </div>
                        )}

                        {viewing.budget && (
                            <div className="admin-detail-item">
                                <div className="admin-detail-label">
                                    Budget
                                </div>
                                <div className="admin-detail-value">
                                    {viewing.budget}
                                </div>
                            </div>
                        )}

                        <div className="admin-detail-item">
                            <div className="admin-detail-label">
                                Source
                            </div>
                            <div className="admin-detail-value">
                                {sourceLabel(viewing.source)}
                            </div>
                        </div>

                        <div className="admin-detail-item admin-detail-item-full">
                            <div className="admin-detail-label">
                                Message
                            </div>
                            <div className="admin-detail-value">
                                {viewing.query}
                            </div>
                        </div>

                    </div>
                )}

            </Modal>

            <ConfirmDialog
                isOpen={Boolean(deleting)}
                onClose={() => setDeleting(null)}
                onConfirm={handleDelete}
                isBusy={deletingBusy}
                title="Delete message"
                message={`This will permanently delete the message from ${
                    deleting?.email || ""
                }.`}
            />

            <Toast
                toast={toast}
                onClose={closeToast}
            />

        </div>
    );

};

export default MessagesAdmin;
