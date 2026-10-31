
import React from "react";
import { NavLink } from "react-router-dom";
import {
    BadgeCheck,
    Briefcase,
    FileText,
    FolderKanban,
    Handshake,
    HelpCircle,
    Home,
    Info,
    LayoutDashboard,
    Mail,
    MessageSquare,
    Users,
    X,
    ClipboardList,
} from "lucide-react";

import "./Sidebar.css";

const MENU_GROUPS = [
    {
        title: "Overview",
        items: [
            {
                label: "Dashboard",
                path: "/admin",
                icon: LayoutDashboard,
                end: true,
            },
            {
                label: "Messages",
                path: "/admin/messages",
                icon: MessageSquare,
            },
        ],
    },
    {
        title: "Website content",
        items: [
            {
                label: "Home",
                path: "/admin/home",
                icon: Home,
            },
            {
                label: "About Us",
                path: "/admin/about",
                icon: Info,
            },
            {
                label: "Portfolio",
                path: "/admin/portfolio",
                icon: FolderKanban,
            },
            {
                label: "Our Clients",
                path: "/admin/clients",
                icon: Users,
            },
            {
                label: "Why Choose Us",
                path: "/admin/why-choose-us",
                icon: BadgeCheck,
            },
        ],
    },
    {
        title: "Marketing",
        items: [
            {
                label: "GTM Partners",
                path: "/admin/gtm-partners",
                icon: Handshake,
            },
            {
                label: "FAQ",
                path: "/admin/faq",
                icon: HelpCircle,
            },
            {
                label: "Blog",
                path: "/admin/blog",
                icon: FileText,
            },
        ],
    },
    {
        title: "Operations",
        items: [
            {
                label: "Careers",
                path: "/admin/careers",
                icon: Briefcase,
                end: true,
            },
            {
                label: "Career Applications",
                path: "/admin/careers/applications",
                icon: ClipboardList,
            },
            {
                label: "Contact",
                path: "/admin/contact",
                icon: Mail,
            },
        ],
    },
];

const Sidebar = ({ isOpen, onClose }) => {
    return (
        <>
            {isOpen && (
                <div
                    className="admin-sidebar-backdrop"
                    onClick={onClose}
                />
            )}

            <aside
                className={`admin-sidebar ${isOpen ? "is-open" : ""
                    }`}
            >
                <div className="admin-sidebar-logo">
                    <div className="admin-logo-box">
                        F
                    </div>

                    <div className="admin-logo-text">
                        <h2>FasCave</h2>
                        <span>IT SOLUTIONS</span>
                    </div>

                    <button
                        type="button"
                        className="admin-sidebar-close"
                        onClick={onClose}
                        aria-label="Close navigation"
                    >
                        <X size={17} strokeWidth={2} />
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

                            {group.items.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        end={item.end}
                                        onClick={onClose}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "admin-menu-item active"
                                                : "admin-menu-item"
                                        }
                                    >
                                        <span className="admin-menu-icon">
                                            <Icon
                                                size={17}
                                                strokeWidth={1.8}
                                            />
                                        </span>

                                        <span className="admin-menu-label">
                                            {item.label}
                                        </span>
                                    </NavLink>
                                );
                            })}
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
