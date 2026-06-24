import React from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Solution from "./components/Solution"; 
import Feature from "./components/Feature";

export default function App() {
  return (
    <main className="min-h-screen w-full bg-background text-text antialiased">
      <Navbar />
      <Hero />
      <Solution />
      <Feature />
      {/* <Testimonials /> */}
      {/* <Footer /> */}
    </main>
  );
}
