import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./component/Navcomponents/Navbar";
import Footer from "./component/Footer/Footer";

import Hero from "./component/Home/Hero/Hero";
import OurClients from "./component/Home/Ourclient";

import Features from "./component/Our_Services/Features";
import FeatureDetails from "./component/Our_Services/FeatureDetails";

import Why_chooseus from "./component/Home/Hero/Why_choose_us/Why_chooseus";
import Whatwe_do from "./component/Home/Hero/What_we_do/Whatwe_do";
import FAQ from "./component/Home/Hero/FAQ/FAQ";

import About from "./pages/About/About";
import Portfolio from "./component/Portfolio/Portfolio";
import GTMPartner from "./component/GTMPartner/GTMPartner";

import Blog from "./pages/Blog/Blog";
import BlogDetails from "./pages/BlogDetails/BlogDetails";
import Careers from "./pages/Careers/Careers";
import CareerDetails from "./pages/Careers/CareerDetails";
import Contact from "./pages/Contact/Contact";

import AdminApp from "./admin/AdminApp";
import RouteTransition from "./component/common/RouteTransition";
import { useSingleton } from "./hooks/useContent";

import "./App.css";

/* =========================================================
   GLOBAL PAGE THEME
   Wave animation is applied only to light/white pages.
   ========================================================= */

function PageTheme({ children }) {
  const location = useLocation();

  const lightPages = [
    "/about-us",
    "/blog",
    "/careers",
    "/contact",
    "/features",
  ];

  const isLightPage =
    lightPages.includes(location.pathname) ||
    location.pathname.startsWith("/blog/") ||
    location.pathname.startsWith("/features/") ||
    location.pathname.startsWith("/careers/");

  return (
    <div
      className={
        isLightPage
          ? "light-page-theme"
          : "normal-page-theme"
      }
    >
      {isLightPage && (
        <>
          <div className="water-wave water-wave-1"></div>
          <div className="water-wave water-wave-2"></div>
          <div className="water-wave water-wave-3"></div>
        </>
      )}

      <div className="page-theme-content">
        {children}
      </div>
    </div>
  );
}

/* =========================================================
   HOME PAGE
   ========================================================= */

function HomePage() {
  const { data: homeContent, reload } = useSingleton(
    "/api/content/home",
    {}
  );

  /*
   * Section visibility lives in the same Home Content document
   * the admin panel edits. A periodic re-read keeps an already
   * open public tab in sync when the toggle is changed in
   * another browser session.
   */
  const portfolioSectionVisible =
    homeContent?.portfolioSectionVisible !== false;

  useEffect(() => {
    const timer = window.setInterval(reload, 30000);

    return () => window.clearInterval(timer);
  }, [reload]);

  return (
    <div className="website-sections">
      <section className="home-hero-section">
        <Hero />
      </section>

      <section>
        <Features />
      </section>

      <section>
        <Why_chooseus />
      </section>

      <section>
        <OurClients />
      </section>

      <section>
        <Whatwe_do />
      </section>
      {portfolioSectionVisible && (
        <section>
          <Portfolio />
        </section>
      )}

      <section>
        <GTMPartner />
      </section>

      <section>
        <FAQ />
      </section>
    </div>
  );
}

/* =========================================================
   PUBLIC WEBSITE FOOTER
   Hide footer on admin routes.
   ========================================================= */

function PublicFooter() {
  const location = useLocation();

  const isAdminPage =
    location.pathname === "/admin" ||
    location.pathname.startsWith("/admin/");

  if (isAdminPage) {
    return null;
  }

  return <Footer />;
}
function PublicNavbar() {
  const location = useLocation();

  const isAdminPage =
    location.pathname === "/admin" ||
    location.pathname.startsWith("/admin/");

  if (isAdminPage) {
    return null;
  }

  return <Navbar />;
}
/* =========================================================
   APP
   ========================================================= */

function App() {
  return (
    <BrowserRouter>
      <PublicNavbar />

      <RouteTransition>
        <PageTheme>
          <Routes>
            {/* HOME */}
            <Route
              path="/"
              element={<HomePage />}
            />

            {/* SERVICES */}
            <Route
              path="/features"
              element={
                <div className="page-root">
                  <Features />
                </div>
              }
            />

            <Route
              path="/features/:featureId"
              element={
                <div className="page-root">
                  <FeatureDetails />
                </div>
              }
            />

            {/* ABOUT */}
            <Route
              path="/about-us"
              element={<About />}
            />

            {/* BLOG */}
            <Route
              path="/blog"
              element={<Blog />}
            />

            <Route
              path="/blog/:id"
              element={<BlogDetails />}
            />

            {/* CAREERS */}
            <Route
              path="/careers"
              element={<Careers />}
            />

            <Route
              path="/careers/:slug"
              element={<CareerDetails />}
            />

            {/* CONTACT */}
            <Route
              path="/contact"
              element={<Contact />}
            />

            {/* ADMIN */}
            <Route
              path="/admin/*"
              element={<AdminApp />}
            />
          </Routes>
        </PageTheme>
      </RouteTransition>

      <PublicFooter />
    </BrowserRouter>
  );
}

export default App;
