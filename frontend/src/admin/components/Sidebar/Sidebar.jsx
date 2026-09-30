import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const menuItems = [
    {
        label: "Dashboard",
        path: "/admin",
        icon: "▦",
    },
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
        label: "Blog",
        path: "/admin/blog",
        icon: "▤",
    },
];

const Sidebar = () => {
    return (
        <aside className="admin-sidebar">

            <div className="admin-sidebar-logo">
                <div className="admin-logo-box">F</div>

                <div className="admin-logo-text">
                    <h2>FasCave</h2>
                    <span>IT SOLUTIONS</span>
                </div>
            </div>

            <div className="admin-menu-title">
                MANAGEMENT
            </div>

            <nav className="admin-sidebar-menu">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === "/admin"}
                        className={({ isActive }) =>
                            isActive
                                ? "admin-menu-item active"
                                : "admin-menu-item"
                        }
                    >
                        <span className="admin-menu-icon">
                            {item.icon}
                        </span>

                        <span className="admin-menu-label">
                            {item.label}
                        </span>
                    </NavLink>
                ))}
            </nav>

            <div className="admin-sidebar-bottom">
                <div className="admin-sidebar-version">
                    Admin Panel v1.0
                </div>
            </div>

        </aside>
    );
};

export default Sidebar;