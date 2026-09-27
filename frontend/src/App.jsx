import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbarr from "./component/Navcomponents/Navbarr";
import Hero from "./component/Home/Hero/Hero";
import Ourclients from "./component/Home/Ourclient";
import Features from "./component/Our_Services/Features";
import FeatureDetails from "./component/Our_Services/FeatureDetails";

import Why_chooseus from "./component/Home/Hero/Why_choose_us/Why_chooseus";
import Whatwe_do from "./component/Home/Hero/What_we_do/Whatwe_do";
import FAQ from "./component/Home/Hero/FAQ/FAQ";

import "./App.css";

function HomePage() {
  return (
    <div className="website-sections">
      <Hero />
      <Features />
      <Ourclients />
      <Why_chooseus />
      <Whatwe_do />
      <FAQ />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>

      {/* Navbar common on every page */}
      <Navbarr />

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<HomePage />}
        />

        {/* SERVICES GRID */}
        <Route
          path="/features"
          element={<Features />}
        />

        {/* SERVICE DETAIL */}
        <Route
          path="/features/:featureId"
          element={<FeatureDetails />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;