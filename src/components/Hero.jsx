import React from "react";
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
import heroImage from "../assets/hero image.jpg";
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
    position: "top-[4%] -left-2 sm:-left-8 md:-left-12",
    delay: 0.9,
    floatDuration: 3.6,
  },
  {
    icon: BarChart3,
    label: "Real-Time Tracking",
    position: "top-[28%] -right-2 sm:-right-10 md:-right-14",
    delay: 1.2,
    floatDuration: 4.2,
  },
  {
    icon: ShieldCheck,
    label: "Smart Inventory",
    position: "bottom-[22%] -left-3 sm:-left-10 md:-left-16",
    delay: 1.5,
    floatDuration: 3.9,
  },
  {
    icon: CheckCircle,
    label: "24/7 Availability",
    position: "bottom-[2%] -right-1 sm:-right-6 md:-right-10",
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

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center px-4 sm:px-6 pt-24 pb-12 md:px-10 lg:flex-row lg:items-center lg:gap-14 lg:pt-24 lg:pb-20">
        {/* ============ LEFT: VISUAL ============ */}
        <div className="relative mt-4 flex w-full max-w-[280px] items-center justify-center sm:max-w-sm md:max-w-md lg:order-1 lg:mt-0 lg:max-w-none lg:flex-1">
          {/* Radial glow behind machine */}
          <div className="absolute h-64 w-48 rounded-full bg-cherry/15 blur-[60px] sm:h-96 sm:w-[24rem] sm:blur-[90px] lg:h-120 lg:w-120" />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[16rem] sm:max-w-[20rem] md:max-w-[24rem] lg:max-w-104"
          >
            {/* Machine image — gentle continuous float */}
            <motion.img
              src={heroImage}
              alt="Smart vending and coffee machine"
              animate={{ y: [0, -14, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10 w-full rounded-4xl object-contain drop-shadow-2xl mb-5"
            />

            {/* Floating glassmorphism feature cards — visible on all breakpoints now */}
            {featureCards.map(
              ({ icon: Icon, label, position, delay, floatDuration }, i) => (
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
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: floatDuration,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3,
                    }}
                    whileHover={{ scale: 1.06, y: -4 }}
                    className="flex items-center gap-2 rounded-xl border border-white/60 bg-white/70 px-3 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:gap-2.5 sm:rounded-2xl sm:px-4 sm:py-3"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cherry/10 text-cherry sm:h-8 sm:w-8">
                      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.3} />
                    </span>
                    <span className="whitespace-nowrap text-xs font-semibold text-ink sm:text-sm">
                      {label}
                    </span>
                  </motion.div>
                </motion.div>
              )
            )}
          </motion.div>
        </div>

        {/* ============ RIGHT: CONTENT ============ */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="w-full max-w-xl mt-2 lg:order-2 lg:text-left lg:mt-0"
        >
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-cherry/20 bg-cherry/5 px-3 py-1.5 text-xs font-medium text-cherry shadow-sm sm:px-4 sm:text-sm"
          >
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.2} />
            Next-Gen Vending &amp; Coffee Solutions
          </motion.div>

          {/* Headline - Premium font style - EXACTLY 2 LINES ON MOBILE */}
          <motion.h1
            variants={fadeUp}
            className="mt-4 font-heading text-[1.65rem] leading-tight font-extrabold tracking-tight text-ink sm:text-4xl lg:text-[3.3rem] lg:leading-[1.1] lg:mt-6"
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

          {/* Supporting description */}
          <motion.p
            variants={fadeUp}
            className="mt-3 text-sm leading-relaxed text-neutral-600 sm:text-base sm:text-lg lg:max-w-lg lg:mt-6"
          >
            AI-powered vending and coffee solutions designed for offices,
            gyms, hospitals, universities, and commercial spaces.
          </motion.p>

          {/* CTA buttons — minimal width, same row, even on mobile */}
          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-row items-center gap-2 sm:gap-4 lg:justify-start lg:mt-9"
          >
            <motion.button
              whileHover={{ scale: 1.035 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center justify-center gap-1.5 rounded-full bg-cherry px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-cherry/25 transition-colors hover:bg-cherry-dark sm:gap-2 sm:px-7 sm:py-3.5 sm:text-base"
            >
              Request A Machine
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.035 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-neutral-400 bg-white px-3 py-2 text-xs font-semibold text-ink transition-colors hover:border-neutral-400 hover:bg-neutral-50 sm:gap-2 sm:px-7 sm:py-3.5 sm:text-base"
            >
              Explore Solutions
            </motion.button>
          </motion.div>

          {/* Trust section — full width, larger logos, clean on mobile */}
          <motion.div variants={fadeUp} className="mt-8 w-full lg:mt-14">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Trusted By Leading Brands
            </p>
            <div className="mt-4 grid grid-cols-2 items-center gap-y-4 gap-x-4 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-10 lg:justify-start lg:gap-x-20 lg:mt-5">
              {trustLogos.map((logo, i) => (
                <div key={i} className="flex justify-center sm:justify-start">
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
      </div>
    </section>
  );
}