import { BrowserRouter, Routes, Route } from "react-router-dom";
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

import "./App.css";
import Navbar from "./component/Navcomponents/Navbar";


function HomePage() {
  return (
    <div className="website-sections">

      {/* HERO */}
      <section className="home-hero-section">
        <Hero />
      </section>


      {/* OUR SERVICES */}
      <section>
        <Features />
      </section>


      {/* OUR CLIENTS */}
      <section>
        <OurClients />
      </section>


      {/* WHY CHOOSE US */}
      <section>
        <Why_chooseus />
      </section>


      {/* WHAT WE DO */}
      <section>
        <Whatwe_do />
      </section>


      {/* PORTFOLIO */}
      <section>
        <Portfolio />
      </section>


      {/* GTM PARTNER */}
      <section>
        <GTMPartner />
      </section>


      {/* FAQ */}
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

        {/* SERVICES GRID */}
        <Route path="/features" element={<Features />} />

        {/* SERVICE DETAIL */}
        <Route
          path="/features/:featureId"
          element={<FeatureDetails />}
        />

        {/* ABOUT PAGE */}
        <Route path="/about-us" element={<About />} />

      </Routes>

    </BrowserRouter>
  );
}


export default App;