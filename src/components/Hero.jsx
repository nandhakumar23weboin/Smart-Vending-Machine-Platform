import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  CheckCircle,
  CreditCard,
  BarChart3,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

// === Your existing assets ===
import trustedLogo1 from "../assets/trusted by-1.webp";
import trustedLogo2 from "../assets/trusted by-2.webp";
import trustedLogo3 from "../assets/trusted by-3.png";
import trustedLogo4 from "../assets/trusted by-4.png";

const trustLogos = [
  { src: trustedLogo1, alt: "Trusted partner" },
  { src: trustedLogo2, alt: "Trusted partner" },
  { src: trustedLogo3, alt: "Trusted partner" },
  { src: trustedLogo4, alt: "Trusted partner" },
];

const featureCards = [
  {
    icon: CreditCard,
    label: "Cashless Payments",
    position: "top-[3%] left-[-2%] sm:left-[5%] md:left-[15%] lg:left-[16%] xl:left-[5%]",
    delay: 0.9,
    floatDuration: 3.6,
  },
  {
    icon: BarChart3,
    label: "Real-Time Tracking",
    position: "top-[2%] right-[-1%] sm:right-[5%] md:right-[15%] lg:right-[16%] xl:right-[5%]",
    delay: 1.2,
    floatDuration: 4.2,
  },
  {
    icon: ShieldCheck,
    label: "Smart Inventory",
    position: "bottom-[26%] left-[1%] sm:left-[5%] md:left-[14%] lg:left-[16%] xl:left-[13%]",
    delay: 1.5,
    floatDuration: 3.9,
  },
  {
    icon: CheckCircle,
    label: "24/7 Availability",
    position: "bottom-[28%] right-[1%] sm:right-[5%] md:right-[14%] lg:right-[16%] xl:right-[13%]",
    delay: 1.8,
    floatDuration: 4.5,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export default function Hero() {
  const modelViewerRef = useRef(null);

  useEffect(() => {
    const modelViewer = modelViewerRef.current;
    if (!modelViewer) return;

    const handleLoad = () => {
      modelViewer.setAttribute("scale", "18 18 18");
    };

    if (modelViewer.loaded) {
      handleLoad();
    } else {
      modelViewer.addEventListener("load", handleLoad);
      return () => modelViewer.removeEventListener("load", handleLoad);
    }
  }, []);
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-oat font-sans">
      {/* === Ambient background === */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-120 w-120 rounded-full bg-cherry/10 blur-[100px]" />
        <div className="absolute top-1/3 -right-32 h-104 w-104 rounded-full bg-cherry/6 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #2B211820 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-y-5 px-4 pt-24 pb-12 sm:px-6 md:px-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.9fr)] lg:gap-x-10 lg:gap-y-4 lg:pt-24 lg:pb-20 xl:gap-x-14"
      >
        {/* Mobile first: badge and heading */}
        <div className="order-1 w-full max-w-xl text-center lg:order-2 lg:col-start-2 lg:row-start-1 lg:self-end lg:text-left">
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-cherry/20 bg-cherry/5 px-3 py-1.5 text-[0.72rem] font-medium text-cherry shadow-sm sm:px-4 sm:text-[0.8rem]"
          >
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.2} />
            Next-Gen Vending &amp; Coffee Solutions
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-4 font-heading text-[1.45rem] leading-tight font-extrabold tracking-tight text-ink sm:text-[2.7rem] lg:mt-5 lg:text-[3rem] lg:leading-[1.05]"
            style={{
              fontFamily: "'Playfair Display', 'Cormorant Garamond', 'Georgia', serif",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              textShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            Transform Empty Spaces{" "}
            <br className="sm:hidden" />
            Into{" "}
            <span
              className="text-cherry whitespace-nowrap"
              style={{
                background: "linear-gradient(135deg, #B91C1C 0%, #DC2626 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Revenue Opportunity
            </span>
          </motion.h1>
        </div>

        {/* Desktop left, mobile below heading */}
        <div className="relative order-2 mx-auto flex w-full max-w-[24rem] items-center justify-center sm:max-w-lg md:max-w-152 lg:order-1 lg:col-start-1 lg:row-start-1 lg:row-span-3 lg:mt-0 lg:max-w-none">
          <div className="absolute h-80 w-56 rounded-full bg-cherry/15 blur-[60px] sm:h-96 sm:w-md sm:blur-[90px] lg:h-120 lg:w-120" />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[24rem] sm:max-w-lg md:max-w-152 lg:max-w-184"
          >
            <div className="relative z-10 w-full mb-4" style={{ minHeight: "clamp(430px, 68vh, 760px)", marginTop: "-1.5rem" }}>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="h-full w-full"
              >
                <model-viewer
                  ref={modelViewerRef}
                  src="/models/vendingmachine.glb"
                  alt="Interactive 3D Vending Machine"
                  camera-controls
                  touch-action="pan-y"
                  shadow-intensity="1.5"
                  shadow-softness="0.8"
                  interaction-prompt="none"
                  reveal="auto"
                  camera-orbit="140deg 73deg 0.58m"
                  camera-target="0m 0.95m 0m"
                  field-of-view="18deg"
                  scale="18 18 18"
                  style={{
                    width: "100%",
                    height: "100%",
                    minHeight: "clamp(430px, 68vh, 760px)",
                    backgroundColor: "transparent",
                    outline: "none",
                  }}
                />
              </motion.div>
            </div>

            {featureCards.map(({ icon: Icon, label, position, delay }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`absolute ${position} z-20`}
              >
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  className="flex items-center gap-2 rounded-xl border border-white/60 bg-white/70 px-2.5 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:gap-2.5 sm:rounded-2xl sm:px-4 sm:py-3"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cherry/10 text-cherry sm:h-8 sm:w-8">
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.3} />
                  </span>
                  <span className="whitespace-nowrap text-xs font-semibold text-ink sm:text-sm">
                    {label}
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile after model, desktop right */}
        <div className="order-3 w-full max-w-xl text-center lg:col-start-2 lg:row-start-2 lg:self-start lg:text-left">
          <motion.p
            variants={fadeUp}
            className="mt-1 text-sm leading-relaxed text-neutral-600  sm:text-lg lg:mt-6 lg:max-w-lg"
          >
            AI-powered vending and coffee solutions designed for offices,
            gyms, hospitals, universities, and commercial spaces.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-5 flex flex-row items-center justify-center gap-2 sm:gap-3 lg:mt-7 lg:justify-start"
          >
            <motion.button
              whileHover={{ scale: 1.035 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center justify-center gap-1 rounded-full bg-cherry px-2.5 py-1.5 text-[0.72rem] font-semibold text-white shadow-lg shadow-cherry/25 transition-colors hover:bg-cherry-dark sm:gap-1.5 sm:px-6 sm:py-2.5 sm:text-sm"
            >
              Request A Machine
              <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1 sm:h-3.5 sm:w-3.5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.035 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-1 rounded-full border border-neutral-400 bg-white px-2.5 py-1.5 text-[0.72rem] font-semibold text-ink transition-colors hover:border-neutral-400 hover:bg-neutral-50 sm:gap-1.5 sm:px-6 sm:py-2.5 sm:text-sm"
            >
              Explore Solutions
            </motion.button>
          </motion.div>
        </div>

        {/* Keep trust section on the left side on desktop */}
        <motion.div
          variants={fadeUp}
          className="order-4 mt-8 w-full max-w-xl lg:col-start-1 lg:row-start-4 lg:mt-0 lg:text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Trusted By Leading Brands
          </p>
          <div className="mt-4 grid grid-cols-2 items-center gap-y-4 gap-x-4 sm:flex sm:flex-wrap sm:items-center sm:justify-start sm:gap-x-10 lg:justify-center lg:gap-x-12 lg:mt-5">
            {trustLogos.map((logo, i) => (
              <div key={i} className="flex justify-start lg:justify-center">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-8 w-auto grayscale opacity-60 transition-all duration-300 ease-out hover:scale-105 hover:opacity-100 hover:grayscale-0 sm:h-10 md:h-11"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}