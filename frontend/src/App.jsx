import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./component/Navcomponents/Navbar";
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
import Contact from "./pages/Contact/Contact";

import AdminApp from "./admin/AdminApp";
import RouteTransition from "./component/common/RouteTransition";

import "./App.css";

function HomePage() {
  return (
    <div className="website-sections">
      <section className="home-hero-section">
        <Hero />
      </section>

      <section>
        <Features />
      </section>

      <section>
        <OurClients />
      </section>

      <section>
        <Why_chooseus />
      </section>

      <section>
        <Whatwe_do />
      </section>

      <section>
        <Portfolio />
      </section>

      <section>
        <GTMPartner />
      </section>

      <section>
        <FAQ />
      </section>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <RouteTransition>
        <Routes>
          {/* HOME */}
          <Route path="/" element={<HomePage />} />

          {/* SERVICES */}
          {/* Wrapped so these two pages clear the fixed navbar. The
              same component renders inside the Home stack, where the
              offset already comes from .website-sections. */}
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
          <Route path="/about-us" element={<About />} />

          {/* BLOG */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetails />} />

          {/* CAREERS */}
          <Route path="/careers" element={<Careers />} />

          {/* CONTACT */}
          <Route path="/contact" element={<Contact />} />

          {/* ADMIN */}
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </RouteTransition>
    </BrowserRouter>
  );
}

export default App;