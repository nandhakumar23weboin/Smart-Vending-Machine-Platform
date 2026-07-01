import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const SmartVending = lazy(() => import("./pages/SmartVending"));
const CoffeeMachine = lazy(() => import("./pages/CoffeeMachine"));

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/SmartVending" element={<SmartVending />} />
          <Route path="/CoffeeMachine" element={<CoffeeMachine />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}