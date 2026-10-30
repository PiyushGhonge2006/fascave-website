import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import {
    ChevronDown,
    ExternalLink,
    LogOut,
} from "lucide-react";

import { useAdminAuth } from "../../context/AdminAuthContext";

import "./Topbar.css";


const PAGE_TITLES = {
    "/admin": "Dashboard",
    "/admin/home": "Home",
    "/admin/clients": "Our Clients",
    "/admin/about": "About Us",
    "/admin/services": "Services",
    "/admin/portfolio": "Portfolio",
    "/admin/gtm-partners": "GTM Partners",
    "/admin/faq": "FAQ",
    "/admin/why-choose-us": "Why Choose Us",
    "/admin/blog": "Blog",
    "/admin/careers": "Careers",
    "/admin/contact": "Contact",
    "/admin/messages": "Messages",
};


const Topbar = ({
    onToggleSidebar,
}) => {

    const { admin, logout } = useAdminAuth();

    const location = useLocation();

    const [menuOpen, setMenuOpen] =
        useState(false);

    const [clock, setClock] = useState("");


    // Close the account menu on route change
    useEffect(() => {

        setMenuOpen(false);

    }, [location.pathname]);


    // Live clock in the topbar
    useEffect(() => {

        const update = () => {

            setClock(
                new Date().toLocaleString(
                    "en-GB",
                    {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    }
                )
            );

        };

        update();

        const timer = setInterval(
            update,
            60000
        );

        return () => clearInterval(timer);

    }, []);


    const title =
        PAGE_TITLES[location.pathname] ||
        "Admin";

    return (
        <header className="admin-topbar">

            <div className="admin-topbar-left">

                <button
                    type="button"
                    className="admin-topbar-burger"
                    onClick={onToggleSidebar}
                    aria-label="Toggle navigation menu"
                >
                    <span />
                    <span />
                    <span />
                </button>

                <div className="admin-topbar-title">
                    <h2>{title}</h2>
                    <span>
                        Manage your website
                        content
                    </span>
                </div>

            </div>

            <div className="admin-topbar-right">

                {clock && (
                    <span className="admin-topbar-clock">
                        {clock}
                    </span>
                )}

                <a
                    className="admin-topbar-link"
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <span>View site</span>
                    <ExternalLink
                        size={14}
                        strokeWidth={2}
                    />
                </a>

                <div className="admin-topbar-user">

                    <button
                        type="button"
                        className="admin-topbar-user-btn"
                        onClick={() =>
                            setMenuOpen(!menuOpen)
                        }
                        aria-expanded={menuOpen}
                        aria-haspopup="menu"
                    >
                        <span className="admin-topbar-avatar">
                            {(admin?.name || "A")
                                .charAt(0)
                                .toUpperCase()}
                        </span>

                        <span className="admin-topbar-user-text">

                            <strong>
                                {admin?.name ||
                                    "Admin"}
                            </strong>

                            <small>
                                {admin?.role ||
                                    "admin"}
                            </small>

                        </span>

                        <span
                            className="admin-topbar-caret"
                            aria-hidden="true"
                        >
                            <ChevronDown
                                size={15}
                                strokeWidth={2}
                            />
                        </span>
                    </button>

                    {menuOpen && (
                        <>
                            <div
                                className="admin-topbar-backdrop"
                                onClick={() =>
                                    setMenuOpen(false)
                                }
                            />

                            <div
                                className="admin-topbar-menu"
                                role="menu"
                            >

                                <div className="admin-topbar-menu-head">

                                    <strong>
                                        {admin?.name}
                                    </strong>

                                    <span>
                                        {admin?.email}
                                    </span>

                                </div>

                                <button
                                    type="button"
                                    role="menuitem"
                                    onClick={logout}
                                >
                                    <LogOut
                                        size={15}
                                        strokeWidth={2}
                                    />
                                    Sign out
                                </button>

                            </div>
                        </>
                    )}

                </div>

            </div>

        </header>
    );

};


export default Topbar;
