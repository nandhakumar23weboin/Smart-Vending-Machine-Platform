import React from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Solution from "./components/Solution"; 
import Feature from "./components/Feature";
import HowitsWork from "./components/HowitsWork";

export default function App() {
  return (
    <main className="min-h-screen w-full bg-background text-text antialiased">
      <Navbar />
      <Hero />
      <Solution />
      <Feature />
      <HowitsWork />
      {/* <Testimonials /> */}
      {/* <Footer /> */}
    </main>
  );
}
