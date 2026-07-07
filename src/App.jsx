import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import vendingSvg from "./assets/vending-bg.svg";

// Optimized SVG Preloader with minimum display time
const VendingPreloader = () => {
  const [minTimeReached, setMinTimeReached] = useState(false);

  useEffect(() => {
    // Ensure preloader shows for at least 2 seconds
    const timer = setTimeout(() => {
      setMinTimeReached(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Invisible spacer pushes the Footer out of the viewport so it doesn't incur CLS when the real content loads */}
      <div className="min-h-[200vh] w-full" aria-hidden="true" />
      <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-red-900 min-h-screen">
      <div className="relative w-40 h-40 mb-8">
        <img 
          src={vendingSvg} 
          alt="Loading" 
          className="w-full h-full object-contain animate-bounce-slow"
          style={{ 
            filter: 'brightness(0) invert(1)',
            animationDuration: '2.5s'
          }}
        />
      </div>
      
      {/* Loading Progress Bar */}
      <div className="w-64 h-1.5 bg-red-800 rounded-full overflow-hidden mb-6">
        <div className="h-full bg-white rounded-full animate-loading-bar"></div>
      </div>
      
      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-2.5">
          <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
          <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
        </div>
        <p className="text-white/80 text-sm font-medium tracking-wider animate-pulse">
          {minTimeReached ? "Almost ready..." : "Loading Premium Vending..."}
        </p>
      </div>
      </div>
    </>
  );
};

// Lazy load pages - NO delays, fast loading
const Home = lazy(() => import(/* webpackPrefetch: true */ "./pages/Home"));
const About = lazy(() => import(/* webpackPrefetch: true */ "./pages/About"));
const Contact = lazy(() => import(/* webpackPrefetch: true */ "./pages/Contact"));
const SmartVending = lazy(() => import(/* webpackPrefetch: true */ "./pages/SmartVending"));
const CoffeeMachine = lazy(() => import(/* webpackPrefetch: true */ "./pages/CoffeeMachine"));

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

// Route wrapper for smooth transition
const RouteWrapper = ({ children }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  
  React.useEffect(() => {
    // Quick transition
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, []);
  
  return (
    <div className={`transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {children}
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<VendingPreloader />}>
            <Routes>
              <Route path="/" element={
                <RouteWrapper>
                  <Home />
                </RouteWrapper>
              } />
              <Route path="/about" element={
                <RouteWrapper>
                  <About />
                </RouteWrapper>
              } />
              <Route path="/contact" element={
                <RouteWrapper>
                  <Contact />
                </RouteWrapper>
              } />
              <Route path="/SmartVending" element={
                <RouteWrapper>
                  <SmartVending />
                </RouteWrapper>
              } />
              <Route path="/CoffeeMachine" element={
                <RouteWrapper>
                  <CoffeeMachine />
                </RouteWrapper>
              } />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}