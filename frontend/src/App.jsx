import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./component/Navcomponents/Navbar";
import Hero from "./component/Home/Hero/Hero";
import OurClients from "./component/Home/Ourclient";

import About from "./pages/About/About";
import Portfolio from "./component/Portfolio/Portfolio";
import GTMPartner from "./component/GTMPartner/GTMPartner";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* HOME PAGE */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <OurClients />
              <Portfolio />
              <GTMPartner />
            </>
          }
        />

        {/* ABOUT PAGE */}
        <Route
          path="/about-us"
          element={<About />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;