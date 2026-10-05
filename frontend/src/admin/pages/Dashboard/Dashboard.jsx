import React, { useEffect, useState } from "react";

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
        description:
            "Hero, stats and client logos",
        path: "/admin/home",
        key: null,
    },
    {
        name: "About Us",
        description:
            "Story, mission, vision and values",
        path: "/admin/about",
        key: null,
    },
    {
        name: "Services",
        description:
            "Service list and feature bullets",
        path: "/admin/services",
        key: "services",
    },
    {
        name: "Portfolio",
        description:
            "Case studies, images and tech stack",
        path: "/admin/portfolio",
        key: "portfolioItems",
    },
    {
        name: "GTM Partners",
        description:
            "Partner logos and tiers",
        path: "/admin/gtm-partners",
        key: "partners",
    },
    {
        name: "FAQ",
        description:
            "Questions and answers",
        path: "/admin/faq",
        key: "faqs",
    },
    {
        name: "Testimonials",
        description:
            "Customer quotes and ratings",
        path: "/admin/testimonials",
        key: "testimonials",
    },
    {
        name: "Blog",
        description:
            "Articles and publishing",
        path: "/admin/blog",
        key: null,
    },
];


const formatDate = (value) => {

    if (!value) {
        return "—";
    }

    return new Date(value).toLocaleDateString(
        "en-GB",
        {
            day: "2-digit",
            month: "short",
        }
    );

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

            const data = await api.get(
                "/api/admin/stats"
            );

            setStats(data);

        } catch (loadError) {

            setError(
                loadError.message ||
                    "Could not load dashboard."
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
                  icon: "✉",
              },
              {
                  title: "Unread",
                  value: stats.messages.new,
                  label: "Need a reply",
                  icon: "●",
              },
              {
                  title: "Services",
                  value: stats.content.services,
                  label: "Published services",
                  icon: "▣",
              },
              {
                  title: "Portfolio",
                  value:
                      stats.content.portfolioItems,
                  label: "Case studies",
                  icon: "▤",
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
                  count:
                      stats.content[item.key] ?? 0,
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

                {statCards.map((stat) => (
                    <div
                        className="admin-stat-card"
                        key={stat.title}
                    >

                        <div className="admin-stat-top">
                            <div className="admin-stat-icon">
                                {stat.icon}
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
                ))}

            </div>

            <div className="admin-two-col">

                {/* CONTENT */}
                <div className="admin-card">

                    <div className="admin-card-header">
                        <div>
                            <h2>Website content</h2>
                            <p>
                                Every section you
                                can manage.
                            </p>
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

                                <div
                                    style={{
                                        display:
                                            "flex",
                                        alignItems:
                                            "center",
                                        gap:
                                            "12px",
                                    }}
                                >

                                    {item.count !==
                                        null && (
                                        <span className="admin-badge admin-badge-info">
                                            {
                                                item.count
                                            }
                                        </span>
                                    )}

                                    <a
                                        className="admin-btn admin-btn-secondary admin-btn-sm"
                                        href={item.path}
                                    >
                                        Manage →
                                    </a>

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
                                <p>
                                    Latest enquiries
                                    received.
                                </p>
                            </div>
                        </div>

                        {stats?.recentMessages?.length ? (
                            <div>
                                {stats.recentMessages.map(
                                    (message) => (
                                        <div
                                            className="admin-recent-item"
                                            key={
                                                message._id
                                            }
                                        >

                                            <span
                                                className={`admin-recent-dot ${
                                                    message.status ===
                                                    "replied"
                                                        ? "admin-recent-dot-replied"
                                                        : message.status ===
                                                            "read"
                                                            ? "admin-recent-dot-read"
                                                            : ""
                                                }`}
                                            />

                                            <div
                                                style={{
                                                    minWidth: 0,
                                                    flex: 1,
                                                }}
                                            >

                                                <div className="admin-list-title">
                                                    {[
                                                        message.displayName,
                                                        message.fullName,
                                                        message.firstName,
                                                    ]
                                                        .filter(Boolean)
                                                        .join(" ") ||
                                                        "—"}
                                                </div>

                                                <div className="admin-list-sub">
                                                    {formatDate(
                                                        message.createdAt
                                                    )}
                                                </div>

                                            </div>

                                            <StatusBadge
                                                status={
                                                    message.status
                                                }
                                            />

                                        </div>
                                    )
                                )}
                            </div>
                        ) : (
                            <div
                                style={{
                                    padding:
                                        "26px 20px",
                                    color: "#6b6b74",
                                    fontSize: "13px",
                                    textAlign:
                                        "center",
                                }}
                            >
                                No messages yet.
                            </div>
                        )}

                        <div
                            style={{
                                padding: "14px 20px",
                                borderTop:
                                    "1px solid #f4f3f0",
                            }}
                        >
                            <a
                                className="admin-btn admin-btn-secondary admin-btn-sm admin-btn-block"
                                href="/admin/messages"
                            >
                                View all messages
                            </a>
                        </div>

                    </div>

                    <div className="admin-card dashboard-side-card">

                        <div className="admin-card-header">
                            <div>
                                <h2>Blog activity</h2>
                                <p>
                                    Drafts vs
                                    published.
                                </p>
                            </div>
                        </div>

                        <div className="admin-list-row">
                            <div className="admin-list-main">
                                <div className="admin-stat-value">
                                    {
                                        stats?.blog
                                            ?.published ??
                                        0
                                    }
                                </div>
                                <div className="admin-list-sub">
                                    Published posts
                                </div>
                            </div>

                            <StatusBadge
                                status="published"
                            />
                        </div>

                        <div className="admin-list-row">
                            <div className="admin-list-main">
                                <div className="admin-stat-value">
                                    {
                                        stats?.blog
                                            ?.drafts ?? 0
                                    }
                                </div>
                                <div className="admin-list-sub">
                                    Drafts waiting
                                </div>
                            </div>

                            <StatusBadge
                                status="draft"
                            />
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
