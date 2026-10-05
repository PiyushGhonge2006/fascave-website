import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

import "./AdminLayout.css";

const AdminLayout = ({ children }) => {

    const [sidebarOpen, setSidebarOpen] =
        useState(false);

    const location = useLocation();


    // Close the drawer whenever the route changes
    useEffect(() => {

        setSidebarOpen(false);

    }, [location.pathname]);


    // Lock body scroll while the drawer is open
    useEffect(() => {

        if (!sidebarOpen) {
            return;
        }

        const previous =
            document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {

            document.body.style.overflow =
                previous;

        };

    }, [sidebarOpen]);

    return (
        <div className="admin-layout">

            <Sidebar
                isOpen={sidebarOpen}
                onClose={() =>
                    setSidebarOpen(false)
                }
            />

            <div className="admin-shell">

                <Topbar
                    onToggleSidebar={() =>
                        setSidebarOpen(
                            !sidebarOpen
                        )
                    }
                />

                <main className="admin-main-content">
                    {children}
                </main>

            </div>

        </div>
    );

};

export default AdminLayout;
