import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbarr from './component/Navcomponents/Navbarr';
import Hero from './component/Home/Hero/Hero';
import Ourclients from "./component/Home/Ourclient";
function App() {
  return (
     <>
        <Navbarr/>
        <Hero/>
        <Ourclients/>
     </>
  );
}

export default App;