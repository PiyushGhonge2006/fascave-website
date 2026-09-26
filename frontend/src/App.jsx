import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./component/Navbar/Navbar";
import Hero from "./component/Home/Hero/Hero";
import OurClients from "./component/Home/OurClient/OurClient";
import About from "./pages/About/About";

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
            </>
          }
        />

        <Route path="/about-us" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;