import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { AdminAuthProvider, useAdminAuth } from "./context/AdminAuthContext";

import AdminLayout from "./components/AdminLayout/AdminLayout";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import HomeAdmin from "./pages/Home/HomeAdmin";
import AboutAdmin from "./pages/About/AboutAdmin";
import ServicesAdmin from "./pages/Services/ServicesAdmin";
import PortfolioAdmin from "./pages/Portfolio/PortfolioAdmin";
import GTMPartnersAdmin from "./pages/GTMPartners/GTMPartnersAdmin";
import FAQAdmin from "./pages/FAQ/FAQAdmin";
import TestimonialsAdmin from "./pages/Testimonials/TestimonialsAdmin";
import WhyChooseUsAdmin from "./pages/WhyChooseUs/WhyChooseUsAdmin";
import BlogAdmin from "./pages/Blog/BlogAdmin";
import CareersAdmin from "./pages/Careers/CareersAdmin";
import ContactAdmin from "./pages/Contact/ContactAdmin";
import MessagesAdmin from "./pages/Messages/MessagesAdmin";


const AdminGate = () => {

    const { isAuthenticated, checking } =
        useAdminAuth();

    if (checking) {

        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#f5f7fb",
                }}
            >

                <div className="admin-loading">
                    <span className="admin-spinner" />
                    <span>Checking session</span>
                </div>

            </div>
        );

    }

    if (!isAuthenticated) {

        return <Login />;

    }

    return (
        <AdminLayout>

            <Routes>

                <Route
                    path="/"
                    element={<Dashboard />}
                />

                <Route
                    path="/home"
                    element={<HomeAdmin />}
                />

                <Route
                    path="/about"
                    element={<AboutAdmin />}
                />

                <Route
                    path="/services"
                    element={<ServicesAdmin />}
                />

                <Route
                    path="/portfolio"
                    element={<PortfolioAdmin />}
                />

                <Route
                    path="/gtm-partners"
                    element={<GTMPartnersAdmin />}
                />

                <Route
                    path="/faq"
                    element={<FAQAdmin />}
                />

                <Route
                    path="/testimonials"
                    element={<TestimonialsAdmin />}
                />

                <Route
                    path="/why-choose-us"
                    element={<WhyChooseUsAdmin />}
                />

                <Route
                    path="/blog"
                    element={<BlogAdmin />}
                />

                <Route
                    path="/careers"
                    element={<CareersAdmin />}
                />

                <Route
                    path="/contact"
                    element={<ContactAdmin />}
                />

                <Route
                    path="/messages"
                    element={<MessagesAdmin />}
                />

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/admin"
                            replace
                        />
                    }
                />

            </Routes>

        </AdminLayout>
    );

};


const AdminApp = () => {

    return (
        <AdminAuthProvider>
            <AdminGate />
        </AdminAuthProvider>
    );

};

export default AdminApp;
