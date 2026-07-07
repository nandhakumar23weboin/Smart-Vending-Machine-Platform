import React, { Suspense, lazy } from "react";
import vendingSvg from "../assets/vending-bg.svg";

// Light section loader
const SectionLoader = ({ height = "h-64" }) => (
  <div className={`${height} bg-red-900/5 rounded-lg w-full flex items-center justify-center border border-red-900/10`}>
    <div className="text-center">
      <div className="relative w-12 h-12 mx-auto">
        <img 
          src={vendingSvg} 
          alt="Loading" 
          className="w-full h-full object-contain animate-pulse"
          style={{ 
            filter: 'brightness(0) saturate(100%) invert(12%) sepia(63%) saturate(7412%) hue-rotate(356deg) brightness(89%) contrast(120%)',
            animationDuration: '1s'
          }}
        />
      </div>
    </div>
  </div>
);

// Lazy load components - FAST, no artificial delays
const Hero = lazy(() => import(/* webpackPreload: true */ "../components/Hero"));
const Solution = lazy(() => import("../components/Solution"));
const Feature = lazy(() => import("../components/Feature"));
const Testimonials = lazy(() => import("../components/Testimonials"));
const Faq = lazy(() => import("../components/Faq"));
const Form = lazy(() => import("../components/Form"));

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-background text-text antialiased">
      {/* Hero Section - Immediate load */}
      <section className="px-6 py-10 mx-auto max-w-7xl">
        <Suspense fallback={<SectionLoader height="h-96" />}>
          <Hero />
        </Suspense>
      </section>

      {/* Solution Section */}
      <Suspense fallback={<SectionLoader height="h-80" />}>
        <Solution />
      </Suspense>

      {/* Feature Section */}
      <section className="px-6 py-10 mx-auto max-w-7xl">
        <Suspense fallback={<SectionLoader height="h-80" />}>
          <Feature />
        </Suspense>
      </section>

      {/* Testimonials Section */}
      <Suspense fallback={<SectionLoader height="h-64" />}>
        <Testimonials />
      </Suspense>

      {/* FAQ Section */}
      <section className="px-6 py-10 mx-auto max-w-7xl">
        <Suspense fallback={<SectionLoader height="h-64" />}>
          <Faq />
        </Suspense>
      </section>

      {/* Form Section */}
      <section className="px-6 py-10 mx-auto max-w-7xl">
        <Suspense fallback={<SectionLoader height="h-96" />}>
          <div id="form-section">
            <Form />
          </div>
        </Suspense>
      </section>
    </main>
  );
}