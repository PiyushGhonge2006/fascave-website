import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./components/AdminLayout/AdminLayout";
import Dashboard from "./pages/Dashboard/Dashboard";

const AdminPlaceholder = ({ title }) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>Admin content will be added here.</p>
        </div>
    );
};

const AdminApp = () => {
    return (
        <AdminLayout>
            <Routes>
                <Route
                    path="/"
                    element={<Dashboard />}
                />

                <Route
                    path="/home"
                    element={<AdminPlaceholder title="Home Management" />}
                />

                <Route
                    path="/about"
                    element={<AdminPlaceholder title="About Us Management" />}
                />

                <Route
                    path="/services"
                    element={<AdminPlaceholder title="Services Management" />}
                />

                <Route
                    path="/portfolio"
                    element={<AdminPlaceholder title="Portfolio Management" />}
                />

                <Route
                    path="/gtm-partners"
                    element={<AdminPlaceholder title="GTM Partners Management" />}
                />

                <Route
                    path="/faq"
                    element={<AdminPlaceholder title="FAQ Management" />}
                />

                <Route
                    path="/testimonials"
                    element={<AdminPlaceholder title="Testimonials Management" />}
                />

                <Route
                    path="/blog"
                    element={<AdminPlaceholder title="Blog Management" />}
                />

                <Route
                    path="*"
                    element={<Navigate to="/admin" replace />}
                />
            </Routes>
        </AdminLayout>
    );
};

export default AdminApp;