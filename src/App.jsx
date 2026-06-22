import React from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar"

export default function App() {
  return (
    <main className="min-h-screen w-full bg-white antialiased">
      <Navbar/>
      <Hero />
      {/* <Features /> */}
      {/* <Testimonials /> */}
      {/* <Footer /> */}
    </main>
  );
}