import React from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import featured from "./components/featured"

export default function App() {
  return (
    <main className="min-h-screen w-full bg-background text-text antialiased">
      <Navbar />
      <Hero />
      <featured /> 
      {/* <Testimonials /> */}
      {/* <Footer /> */}
    </main>
  );
}
