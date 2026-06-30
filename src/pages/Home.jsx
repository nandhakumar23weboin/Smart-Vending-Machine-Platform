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
      <section className="px-6 py-10 mx-auto max-w-7xl">
        <Suspense fallback={null}>
          <Hero />
          <Solution />
          <Feature />
          <Testimonials />
          <Faq />
          <Form />
        </Suspense>
      </section>
    </main>
  );
}
