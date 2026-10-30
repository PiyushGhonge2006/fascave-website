import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    ArrowRight,
    FolderKanban,
    Inbox,
    MailOpen,
} from "lucide-react";

import { api } from "../../lib/apiClient";

import {
    Alert,
    LoadingState,
    PageHeader,
    StatusBadge,
    Toast,
    useToast,
} from "../../components";

import { useAdminAuth } from "../../context/AdminAuthContext";

import "./Dashboard.css";


const CONTENT_LINKS = [
    {
        name: "Home",
        description: "Section visibility and SEO settings",
        path: "/admin/home",
        key: null,
    },
    {
        name: "Our Clients",
        description: "Client logos, order and visibility",
        path: "/admin/clients",
        key: null,
    },
    {
        name: "About Us",
        description: "Story, mission, vision and values",
        path: "/admin/about",
        key: null,
    },
    {
        name: "Portfolio",
        description: "Case studies, images and tech stack",
        path: "/admin/portfolio",
        key: "portfolioItems",
    },
    {
        name: "GTM Partners",
        description: "Partner logos and tiers",
        path: "/admin/gtm-partners",
        key: "partners",
    },
    {
        name: "FAQ",
        description: "Questions and answers",
        path: "/admin/faq",
        key: "faqs",
    },
    {
        name: "Why Choose Us",
        description: "Differentiators and proof points",
        path: "/admin/why-choose-us",
        key: null,
    },
    {
        name: "Blog",
        description: "Articles and publishing",
        path: "/admin/blog",
        key: null,
    },
    {
        name: "Careers",
        description: "Job openings and careers copy",
        path: "/admin/careers",
        key: null,
    },
    {
        name: "Contact",
        description: "Contact details and enquiry copy",
        path: "/admin/contact",
        key: null,
    },
];


const formatDate = (value) => {
    if (!value) {
        return "—";
    }

    return new Date(value).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
    });
};


const Dashboard = () => {
    const { admin } = useAdminAuth();

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { toast, closeToast } = useToast();


    const load = async () => {
        setLoading(true);
        setError("");

        try {
            const data = await api.get("/api/admin/stats");
            setStats(data);
        } catch (loadError) {
            setError(
                loadError.message || "Could not load dashboard."
            );
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        load();
    }, []);


    const statCards = stats
        ? [
            {
                title: "Total Messages",
                value: stats.messages.total,
                label: "All enquiries",
                icon: Inbox,
                tone: "violet",
            },
            {
                title: "Unread",
                value: stats.messages.new,
                label: "Need a reply",
                icon: MailOpen,
                tone: "cyan",
            },
            {
                title: "Portfolio",
                value: stats.content.portfolioItems,
                label: "Case studies",
                icon: FolderKanban,
                tone: "default",
            },
        ]
        : [];


    const contentRows = stats
        ? CONTENT_LINKS.map((item) => {
            if (!item.key) {
                return {
                    ...item,
                    count: null,
                    path: item.path,
                };
            }

            return {
                ...item,
                count: stats.content[item.key] ?? 0,
            };
        })
        : [];


    if (loading) {
        return (
            <div className="admin-page">
                <LoadingState label="Loading dashboard" />
            </div>
        );
    }


    return (
        <div className="admin-page">

            <PageHeader
                title="Dashboard"
                description="Manage and update your FasCave website content from one place."
                actions={
                    <div className="dashboard-welcome">
                        Welcome back,{" "}
                        {admin?.name || "Admin"}
                    </div>
                }
            />

            <Alert message={error} />


            {/* STATS */}
            <div className="admin-stats-grid">
                {statCards.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            className={`admin-stat-card tone-${stat.tone}`}
                            key={stat.title}
                        >
                            <div className="admin-stat-top">
                                <div className="admin-stat-icon">
                                    <Icon
                                        size={18}
                                        strokeWidth={1.9}
                                    />
                                </div>
                            </div>

                            <div className="admin-stat-value">
                                {stat.value}
                            </div>

                            <div className="admin-stat-label">
                                {stat.title}
                            </div>

                            <div className="admin-stat-sub">
                                {stat.label}
                            </div>
                        </div>
                    );
                })}
            </div>


            <div className="admin-two-col">

                {/* CONTENT */}
                <div className="admin-card">
                    <div className="admin-card-header">
                        <div>
                            <h2>Website content</h2>
                            <p>Every section you can manage.</p>
                        </div>
                    </div>

                    <div>
                        {contentRows.map((item) => (
                            <div
                                className="admin-list-row"
                                key={item.name}
                            >
                                <div className="admin-list-main">
                                    <div className="admin-list-title">
                                        {item.name}
                                    </div>

                                    <div className="admin-list-sub">
                                        {item.description}
                                    </div>
                                </div>

                                <div className="dashboard-list-actions">
                                    {item.count !== null && (
                                        <span className="admin-badge admin-badge-info">
                                            {item.count}
                                        </span>
                                    )}

                                    <Link
                                        className="admin-btn admin-btn-secondary admin-btn-sm"
                                        to={item.path}
                                    >
                                        Manage
                                        <ArrowRight
                                            size={14}
                                            strokeWidth={2}
                                        />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                {/* RECENT */}
                <div>

                    <div className="admin-card dashboard-side-card">
                        <div className="admin-card-header">
                            <div>
                                <h2>Recent messages</h2>
                                <p>Latest enquiries received.</p>
                            </div>
                        </div>

                        {stats?.recentMessages?.length ? (
                            <div>
                                {stats.recentMessages.map((message) => (
                                    <div
                                        className="admin-recent-item"
                                        key={message._id}
                                    >
                                        <span
                                            className={`admin-recent-dot ${message.status === "replied"
                                                    ? "admin-recent-dot-replied"
                                                    : message.status === "read"
                                                        ? "admin-recent-dot-read"
                                                        : ""
                                                }`}
                                        />

                                        <div className="dashboard-recent-main">
                                            <div className="admin-list-title">
                                                {[
                                                    message.displayName,
                                                    message.fullName,
                                                    message.firstName,
                                                ]
                                                    .filter(Boolean)
                                                    .join(" ") || "—"}
                                            </div>

                                            <div className="admin-list-sub">
                                                {formatDate(message.createdAt)}
                                            </div>
                                        </div>

                                        <StatusBadge status={message.status} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="dashboard-empty">
                                No messages yet.
                            </div>
                        )}

                        <div className="dashboard-card-footer">
                            <Link
                                className="admin-btn admin-btn-secondary admin-btn-sm admin-btn-block"
                                to="/admin/messages"
                            >
                                View all messages
                            </Link>
                        </div>
                    </div>


                    {/* BLOG ACTIVITY */}
                    <div className="admin-card dashboard-side-card">
                        <div className="admin-card-header">
                            <div>
                                <h2>Blog activity</h2>
                                <p>Drafts vs published.</p>
                            </div>
                        </div>

                        <div className="admin-list-row">
                            <div className="admin-list-main">
                                <div className="admin-stat-value">
                                    {stats?.blog?.published ?? 0}
                                </div>

                                <div className="admin-list-sub">
                                    Published posts
                                </div>
                            </div>

                            <StatusBadge status="published" />
                        </div>

                        <div className="admin-list-row">
                            <div className="admin-list-main">
                                <div className="admin-stat-value">
                                    {stats?.blog?.drafts ?? 0}
                                </div>

                                <div className="admin-list-sub">
                                    Drafts waiting
                                </div>
                            </div>

                            <StatusBadge status="draft" />
                        </div>
                    </div>

                </div>
            </div>


            <Toast
                toast={toast}
                onClose={closeToast}
            />

        </div>
    );
};


export default Dashboard;