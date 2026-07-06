import React, { Suspense, lazy } from "react";

const Hero = lazy(() => import("../components/Hero"));
const Solution = lazy(() => import("../components/Solution"));
const Feature = lazy(() => import("../components/Feature"));
const Testimonials = lazy(() => import("../components/Testimonials"));
const Faq = lazy(() => import("../components/Faq"));
const Form = lazy(() => import("../components/Form"));

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-background text-text antialiased">
      {/* Hero in constrained container */}
      <section className="px-6 py-10 mx-auto max-w-7xl">
        <Suspense fallback={null}>
          <Hero />
        </Suspense>
      </section>

      {/* Solution - full width */}
      <Suspense fallback={null}>
        <Solution />
      </Suspense>

      {/* Feature in constrained container */}
      <section className="px-6 py-10 mx-auto max-w-7xl">
        <Suspense fallback={null}>
          <Feature />
        </Suspense>
      </section>

      {/* Testimonials - full width */}
      <Suspense fallback={null}>
        <Testimonials />
      </Suspense>

      {/* FAQ and Form in constrained container */}
      <section className="px-6 py-10 mx-auto max-w-7xl">
        <Suspense fallback={null}>
          <Faq />
          <div id="form-section">
            <Form />
          </div>
        </Suspense>
      </section>
    </main>
  );
}