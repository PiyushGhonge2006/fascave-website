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

import AdminApp from "./admin/AdminApp";

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

      <Routes>
        {/* HOME */}
        <Route path="/" element={<HomePage />} />

        {/* SERVICES */}
        <Route path="/features" element={<Features />} />
        <Route
          path="/features/:featureId"
          element={<FeatureDetails />}
        />

        {/* ABOUT */}
        <Route path="/about-us" element={<About />} />

        {/* BLOG */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />

        {/* ADMIN */}
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;