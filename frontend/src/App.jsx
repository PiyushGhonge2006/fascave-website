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

/* GLOBAL PAGE THEME */

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
        isLightPage ? "light-page-theme" : "normal-page-theme"
      }
    >
      {isLightPage && (
        <>
          <div className="water-wave water-wave-1"></div>
          <div className="water-wave water-wave-2"></div>
          <div className="water-wave water-wave-3"></div>
        </>
      )}

      <div className="page-theme-content">{children}</div>
    </div>
  );
}

/* HOME PAGE */

function HomePage() {
  const { data: homeContent, reload } = useSingleton(
    "/api/content/home",
    {}
  );

  const sectionVisible = (key) =>
    homeContent?.[key] !== false;

  useEffect(() => {
    const timer = window.setInterval(reload, 30000);

    return () => window.clearInterval(timer);
  }, [reload]);


  // HOME PAGE COMPLETE SEO METADATA
  useEffect(() => {
    if (!homeContent) return;

    const setMeta = (selector, attribute, key, value) => {
      let element = document.head.querySelector(selector);

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }

      if (value) {
        element.setAttribute("content", value);
      }
    };

    const setLink = (rel, href) => {
      if (!href) return;

      let element = document.head.querySelector(
        `link[rel="${rel}"]`
      );

      if (!element) {
        element = document.createElement("link");
        element.rel = rel;
        document.head.appendChild(element);
      }

      element.href = href;
    };

    const absoluteUrl = (url) => {
      if (!url) return "";

      try {
        return new URL(url, window.location.origin).href;
      } catch {
        return url;
      }
    };

    // BASIC SEO
    document.title =
      homeContent.seoTitle || "FasCave IT Solution";

    setMeta(
      'meta[name="description"]',
      "name",
      "description",
      homeContent.seoDescription
    );

    setMeta(
      'meta[name="keywords"]',
      "name",
      "keywords",
      homeContent.seoKeywords
    );

    setMeta(
      'meta[name="author"]',
      "name",
      "author",
      homeContent.seoAuthor
    );

    setMeta(
      'meta[name="robots"]',
      "name",
      "robots",
      homeContent.seoRobots
    );

    setLink(
      "canonical",
      homeContent.seoCanonicalUrl
    );

    // OPEN GRAPH
    setMeta(
      'meta[property="og:type"]',
      "property",
      "og:type",
      homeContent.ogType || "website"
    );

    setMeta(
      'meta[property="og:site_name"]',
      "property",
      "og:site_name",
      homeContent.ogSiteName
    );

    setMeta(
      'meta[property="og:title"]',
      "property",
      "og:title",
      homeContent.ogTitle || homeContent.seoTitle
    );

    setMeta(
      'meta[property="og:description"]',
      "property",
      "og:description",
      homeContent.ogDescription || homeContent.seoDescription
    );

    setMeta(
      'meta[property="og:url"]',
      "property",
      "og:url",
      homeContent.ogUrl || homeContent.seoCanonicalUrl
    );

    const ogImage = absoluteUrl(homeContent.ogImage);

    setMeta(
      'meta[property="og:image"]',
      "property",
      "og:image",
      ogImage
    );

    setMeta(
      'meta[property="og:image:secure_url"]',
      "property",
      "og:image:secure_url",
      ogImage
    );

    setMeta(
      'meta[property="og:image:alt"]',
      "property",
      "og:image:alt",
      homeContent.ogImageAlt
    );

    // TWITTER / X
    setMeta(
      'meta[name="twitter:card"]',
      "name",
      "twitter:card",
      homeContent.twitterCard || "summary_large_image"
    );

    setMeta(
      'meta[name="twitter:title"]',
      "name",
      "twitter:title",
      homeContent.twitterTitle || homeContent.seoTitle
    );

    setMeta(
      'meta[name="twitter:description"]',
      "name",
      "twitter:description",
      homeContent.twitterDescription || homeContent.seoDescription
    );

    const twitterImage = absoluteUrl(
      homeContent.twitterImage || homeContent.ogImage
    );

    setMeta(
      'meta[name="twitter:image"]',
      "name",
      "twitter:image",
      twitterImage
    );

    setMeta(
      'meta[name="twitter:image:alt"]',
      "name",
      "twitter:image:alt",
      homeContent.twitterImageAlt || homeContent.ogImageAlt
    );

    // WEBSITE APPEARANCE
    setMeta(
      'meta[name="theme-color"]',
      "name",
      "theme-color",
      homeContent.themeColor || "#061b33"
    );

    setLink(
      "icon",
      homeContent.favicon || "/favicon.svg"
    );

  }, [homeContent]);


  return (
    <div className="website-sections">
      <section className="home-hero-section">
        <Hero />
      </section>

      {sectionVisible("servicesSectionVisible") && (
        <section>
          <Features />
        </section>
      )}

      {sectionVisible("whyChooseUsSectionVisible") && (
        <section>
          <Why_chooseus />
        </section>
      )}

      {sectionVisible("clientsSectionVisible") && (
        <section>
          <OurClients />
        </section>
      )}

      <section>
        <Whatwe_do />
      </section>

      {sectionVisible("portfolioSectionVisible") && (
        <section>
          <Portfolio />
        </section>
      )}

      {sectionVisible("gtmPartnersSectionVisible") && (
        <section>
          <GTMPartner />
        </section>
      )}

      {sectionVisible("faqSectionVisible") && (
        <section>
          <FAQ />
        </section>
      )}
    </div>
  );
}

/* PUBLIC WEBSITE FOOTER */

function PublicFooter() {
  const location = useLocation();

  const isAdminPage =
    location.pathname === "/admin" ||
    location.pathname.startsWith("/admin/");

  if (isAdminPage) return null;

  return <Footer />;
}

function PublicNavbar() {
  const location = useLocation();

  const isAdminPage =
    location.pathname === "/admin" ||
    location.pathname.startsWith("/admin/");

  if (isAdminPage) return null;

  return <Navbar />;
}

/* APP */

function App() {
  return (
    <BrowserRouter>
      <PublicNavbar />

      <RouteTransition>
        <PageTheme>
          <Routes>
            <Route path="/" element={<HomePage />} />

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


            <Route path="/about-us" element={<About />} />

            <Route
              path="/portfolio"
              element={
                <div className="page-root">
                  <Portfolio />
                </div>
              }
            />

            <Route path="/blog" element={<Blog />} />

            <Route path="/blog/:id" element={<BlogDetails />} />

            <Route path="/careers" element={<Careers />} />

            <Route
              path="/careers/:slug"
              element={<CareerDetails />}
            />

            <Route path="/contact" element={<Contact />} />

            <Route path="/admin/*" element={<AdminApp />} />
          </Routes>
        </PageTheme>
      </RouteTransition>

      <PublicFooter />
    </BrowserRouter>
  );
}

export default App;