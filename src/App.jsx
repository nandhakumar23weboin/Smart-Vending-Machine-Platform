import React from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Featured from "./components/Featured"; 

export default function App() {
  return (
    <main className="min-h-screen w-full bg-background text-text antialiased">
      <Navbar />
      <Hero />
      <Featured />
      {/* <Testimonials /> */}
      {/* <Footer /> */}
    </main>
  );
}
