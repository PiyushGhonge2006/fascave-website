import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./component/Navcomponents/Navbar";
import Hero from "./component/Home/Hero/Hero";
import OurClients from "./component/Home/Ourclient/Ourclient";

import About from "./pages/About/About";
import Portfolio from "./components/Portfolio/Portfolio";
import GTMPartner from "./components/GTMPartner/GTMPartner";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <OurClients />
              <About />
              <Portfolio />
              <GTMPartner />
            </>
          }
        />

        <Route path="/about-us" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;