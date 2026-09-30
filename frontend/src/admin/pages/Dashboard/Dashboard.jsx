import React from "react";
import "./Dashboard.css";

const stats = [
    {
        title: "Website Pages",
        value: "8",
        label: "Manageable pages",
        icon: "▦",
    },
    {
        title: "Services",
        value: "12",
        label: "Active services",
        icon: "▣",
    },
    {
        title: "Portfolio",
        value: "4",
        label: "Featured projects",
        icon: "▤",
    },
    {
        title: "Blog Posts",
        value: "6",
        label: "Published articles",
        icon: "✎",
    },
];

const contentItems = [
    {
        name: "Home",
        description: "Hero, clients, portfolio, partners and other sections",
        status: "Ready",
    },
    {
        name: "About Us",
        description: "Company information, mission, vision and office details",
        status: "Ready",
    },
    {
        name: "Services",
        description: "Manage website services and service details",
        status: "Manage",
    },
    {
        name: "Portfolio",
        description: "Manage projects, images, technologies and case studies",
        status: "Manage",
    },
    {
        name: "GTM Partners",
        description: "Manage strategic partner logos and information",
        status: "Manage",
    },
    {
        name: "FAQ",
        description: "Manage frequently asked questions and answers",
        status: "Manage",
    },
    {
        name: "Testimonials",
        description: "Manage customer testimonials and reviews",
        status: "Manage",
    },
    {
        name: "Blog",
        description: "Create, edit and manage blog articles",
        status: "Manage",
    },
];

const Dashboard = () => {
    return (
        <div className="dashboard-page">

            {/* Header */}
            <div className="dashboard-header">
                <div>
                    <h1>Dashboard</h1>
                    <p>
                        Manage and update your FasCave website content from one place.
                    </p>
                </div>

                <div className="dashboard-welcome">
                    Welcome back, Admin 👋
                </div>
            </div>

            {/* Stats */}
            <div className="dashboard-stats">
                {stats.map((stat) => (
                    <div className="dashboard-stat-card" key={stat.title}>

                        <div className="stat-top">
                            <div className="stat-icon">
                                {stat.icon}
                            </div>

                            <span className="stat-arrow">↗</span>
                        </div>

                        <div className="stat-value">
                            {stat.value}
                        </div>

                        <h3>{stat.title}</h3>

                        <p>{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Content Management */}
            <div className="content-management">

                <div className="section-heading">
                    <div>
                        <h2>Website Content</h2>
                        <p>
                            Manage the content displayed across the FasCave website.
                        </p>
                    </div>
                </div>

                <div className="content-list">

                    {contentItems.map((item) => (
                        <div className="content-row" key={item.name}>

                            <div className="content-info">
                                <div className="content-icon">
                                    {item.name.charAt(0)}
                                </div>

                                <div>
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                </div>
                            </div>

                            <div className="content-action">
                                <span
                                    className={
                                        item.status === "Ready"
                                            ? "content-status ready"
                                            : "content-status"
                                    }
                                >
                                    {item.status}
                                </span>

                                <button>
                                    Manage
                                    <span>→</span>
                                </button>
                            </div>

                        </div>
                    ))}

                </div>
            </div>

        </div>
    );
};

export default Dashboard;