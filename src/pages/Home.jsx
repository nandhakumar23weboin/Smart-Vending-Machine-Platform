import React, { Suspense, lazy } from "react";

// Lazy load components
const Hero = lazy(() => import("../components/Hero"));
const Solution = lazy(() => import("../components/Solution"));
const Feature = lazy(() => import("../components/Feature"));
const Testimonials = lazy(() => import("../components/Testimonials"));
const Faq = lazy(() => import("../components/Faq"));
const Form = lazy(() => import("../components/Form"));

// Dark Red Section Loader
const SectionLoader = ({ height = "h-64" }) => (
  <div className={`${height} bg-red-900 animate-pulse rounded-lg w-full flex items-center justify-center`}>
    <div className="text-center">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white mx-auto mb-2"></div>
      <p className="text-white text-sm">Loading section...</p>
    </div>
  </div>
);

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-background text-text antialiased">
      {/* Hero Section */}
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