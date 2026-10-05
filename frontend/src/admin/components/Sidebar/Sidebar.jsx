import React from "react";
import { NavLink } from "react-router-dom";

import "./Sidebar.css";

const MENU_GROUPS = [
    {
        title: "Overview",
        items: [
            {
                label: "Dashboard",
                path: "/admin",
                icon: "▦",
                end: true,
            },
            {
                label: "Messages",
                path: "/admin/messages",
                icon: "✉",
            },
        ],
    },
    {
        title: "Management",
        items: [
            {
                label: "Home",
                path: "/admin/home",
                icon: "⌂",
            },
            {
                label: "About Us",
                path: "/admin/about",
                icon: "ⓘ",
            },
            {
                label: "Services",
                path: "/admin/services",
                icon: "▣",
            },
            {
                label: "Portfolio",
                path: "/admin/portfolio",
                icon: "▤",
            },
            {
                label: "GTM Partners",
                path: "/admin/gtm-partners",
                icon: "◇",
            },
            {
                label: "FAQ",
                path: "/admin/faq",
                icon: "?",
            },
            {
                label: "Testimonials",
                path: "/admin/testimonials",
                icon: "★",
            },
            {
                label: "Why Choose Us",
                path: "/admin/why-choose-us",
                icon: "◐",
            },
            {
                label: "Blog",
                path: "/admin/blog",
                icon: "✎",
            },
            {
                label: "Careers",
                path: "/admin/careers",
                icon: "◈",
            },
            {
                label: "Contact",
                path: "/admin/contact",
                icon: "☎",
            },
        ],
    },
];

const Sidebar = ({
    isOpen,
    onClose,
}) => {

    return (
        <>
            {isOpen && (
                <div
                    className="admin-sidebar-backdrop"
                    onClick={onClose}
                />
            )}

            <aside
                className={`admin-sidebar ${
                    isOpen ? "is-open" : ""
                }`}
            >

                <div className="admin-sidebar-logo">
                    <div className="admin-logo-box">
                        F
                    </div>

                    <div className="admin-logo-text">
                        <h2>FasCave</h2>
                        <span>
                            IT SOLUTIONS
                        </span>
                    </div>

                    <button
                        type="button"
                        className="admin-sidebar-close"
                        onClick={onClose}
                        aria-label="Close navigation"
                    >
                        ×
                    </button>
                </div>

                <nav className="admin-sidebar-menu">

                    {MENU_GROUPS.map((group) => (
                        <div
                            className="admin-menu-group"
                            key={group.title}
                        >

                            <div className="admin-menu-title">
                                {group.title}
                            </div>

                            {group.items.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.end}
                                    onClick={onClose}
                                    className={({
                                        isActive,
                                    }) =>
                                        isActive
                                            ? "admin-menu-item active"
                                            : "admin-menu-item"
                                    }
                                >
                                    <span
                                        className="admin-menu-icon"
                                    >
                                        {item.icon}
                                    </span>

                                    <span className="admin-menu-label">
                                        {item.label}
                                    </span>
                                </NavLink>
                            ))}

                        </div>
                    ))}

                </nav>

                <div className="admin-sidebar-bottom">
                    <div className="admin-sidebar-version">
                        Admin Panel v1.0
                    </div>
                </div>

            </aside>
        </>
    );

};

export default Sidebar;
