import React, { useEffect, useRef, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  CheckCircle,
  CreditCard,
  BarChart3,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import trustedLogo1 from "../assets/trusted by-1.webp";
import trustedLogo2 from "../assets/trusted by-2.webp";
import trustedLogo3 from "../assets/trusted by-3.png";
import trustedLogo4 from "../assets/trusted by-4.png";
import heroImage from "../assets/hero image.jpg";

// Memoized static data
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
    position: "top-[3%] left-[-2%] sm:left-[5%] md:left-[15%] lg:left-[16%] xl:left-[2%]",
    delay: 0.9,
  },
  {
    icon: BarChart3,
    label: "Real-Time Tracking",
    position: "top-[2%] right-[-1%] sm:right-[5%] md:right-[15%] lg:right-[16%] xl:right-[2%]",
    delay: 1.2,
  },
  {
    icon: ShieldCheck,
    label: "Smart Inventory",
    position: "bottom-[26%] left-[1%] sm:left-[5%] md:left-[14%] lg:left-[16%] xl:left-[2%]",
    delay: 1.5,
  },
  {
    icon: CheckCircle,
    label: "24/7 Availability",
    position: "bottom-[28%] right-[1%] sm:right-[5%] md:right-[14%] lg:right-[16%] xl:right-[2%]",
    delay: 1.8,
  },
];

// Animation variants (defined outside component to prevent recreation)
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// Split text animation variants
const letterContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.2,
    },
  },
};

const letterAnimation = {
  hidden: { 
    opacity: 0, 
    y: 20,
    rotateX: -90,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// SplitText component for heading animation
const SplitText = React.memo(({ text, className }) => {
  const prefersReducedMotion = useReducedMotion();
  
  const words = useMemo(() => text.split(" "), [text]);

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      variants={letterContainer}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              variants={letterAnimation}
              className="inline-block"
              style={{ 
                transformOrigin: "bottom",
                willChange: "transform, opacity"
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </motion.span>
  );
});

SplitText.displayName = "SplitText";

// Memoized FeatureCard component
const FeatureCard = React.memo(({ icon: Icon, label, position, delay }) => {
  return (
    <motion.div
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
        whileHover={{ scale: 1.06, y: -2 }}
        className="glass-card flex items-center gap-1 sm:gap-1.5 lg:gap-2 rounded-md sm:rounded-lg lg:rounded-xl px-1.5 py-1 sm:px-2 sm:py-1.5 lg:px-3 lg:py-2 transition-all duration-300 hover:border-red-500 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
      >
        <span className="flex h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="h-2.5 w-2.5 sm:h-3 sm:w-3 lg:h-3.5 lg:w-3.5" strokeWidth={2.3} />
        </span>
        <span className="whitespace-nowrap text-[0.6rem] sm:text-[0.7rem] lg:text-xs font-semibold text-text">
          {label}
        </span>
      </motion.div>
    </motion.div>
  );
});

FeatureCard.displayName = "FeatureCard";

// Memoized LogoMarquee component
const LogoMarquee = React.memo(() => {
  const duplicated = useMemo(() => [...trustLogos, ...trustLogos, ...trustLogos], []);

  return (
    <div className="relative mt-5 w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent sm:w-20 lg:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent sm:w-20 lg:w-28" />

      <motion.div
        className="flex w-max items-center gap-14 sm:gap-20 lg:gap-24"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {duplicated.map((logo, i) => (
          <img
            key={i}
            src={logo.src}
            alt={logo.alt}
            loading="lazy"
            className="h-9 w-auto shrink-0 opacity-50 grayscale transition-all duration-300 ease-out hover:scale-105 hover:opacity-100 hover:grayscale-0 sm:h-11 md:h-12 lg:h-14"
          />
        ))}
      </motion.div>
    </div>
  );
});

LogoMarquee.displayName = "LogoMarquee";

// Main Hero component
export default function Hero() {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  // Memoized scroll handler
  const scrollToForm = useCallback(() => {
    const formSection = document.getElementById("form-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Memoized navigation handler
  const handleContactClick = useCallback(() => {
    navigate("/contact");
  }, [navigate]);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-white font-sans">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-y-5 px-4 pt-20 pb-12 sm:px-6 md:px-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)] lg:gap-x-10 lg:gap-y-4 lg:pt-32 lg:pb-20 xl:gap-x-14"
      >
        {/* Content - Left Side on Desktop */}
        <div className="order-1 w-full max-w-xl mx-auto text-center lg:order-1 lg:col-start-1 lg:row-start-1 lg:self-end lg:text-left lg:mx-0">
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-[0.72rem] font-medium text-primary sm:px-4 sm:text-[0.8rem]"
          >
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.2} />
            Next-Gen Vending &amp; Coffee Solutions
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-4 font-heading text-[1.45rem] leading-tight font-semibold tracking-tight text-text sm:text-[2.7rem] lg:mt-5 lg:text-[3rem] lg:leading-[1.05]"
          >
            <SplitText 
              text="Transform Empty Spaces Into" 
              className="block"
            />
            <br className="sm:hidden" />
            <motion.span
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="whitespace-nowrap bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent"
            >
              Revenue Opportunity
            </motion.span>
          </motion.h1>
        </div>

        {/* Image - Right Side on Desktop */}
        <div className="relative order-2 mx-auto flex w-full max-w-[24rem] items-center justify-center sm:max-w-lg md:max-w-152 lg:order-2 lg:col-start-2 lg:row-start-1 lg:row-span-3 lg:mt-0 lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[24rem] sm:max-w-lg md:max-w-152 lg:max-w-184"
          >
            <div className="relative z-10 w-full mb-4 flex items-center justify-center" style={{ minHeight: "clamp(350px, 60vh, 250px)", marginTop: "-1.5rem" }}>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
                style={{ willChange: "transform" }}
              >
                <img
                  src={heroImage}
                  alt="Smart Vending Machine"
                  loading="eager"
                  className="w-full max-w-[220px] sm:max-w-[280px] object-contain rounded-3xl"
                  style={{
                    border: "8px solid #ffffff",
                    boxShadow: "none"
                  }}
                />
              </motion.div>
            </div>

            {featureCards.map((card) => (
              <FeatureCard key={card.label} {...card} />
            ))}
          </motion.div>
        </div>

        {/* Description & Buttons - Left Side */}
        <div className="order-3 w-full max-w-xl mx-auto text-center lg:col-start-1 lg:row-start-2 lg:self-start lg:text-left lg:mx-0">
          <motion.p
            variants={fadeUp}
            className="mt-1 text-sm leading-relaxed text-text-secondary sm:text-lg lg:mt-6 lg:max-w-lg"
          >
            AI-powered vending and coffee solutions designed for offices,
            gyms, hospitals, universities, and commercial spaces.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-5 flex flex-row items-center justify-center gap-2 sm:gap-3 lg:mt-7 lg:justify-start"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToForm}
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:from-primary/90 hover:to-accent/90 sm:px-6 sm:py-3 sm:text-base"
            >
              <span className="relative z-10">Request a Machine</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleContactClick}
              className="inline-flex items-center justify-center gap-1.5 rounded-full border-2 border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary sm:px-6 sm:py-3 sm:text-base"
            >
              Call us
            </motion.button>
          </motion.div>
        </div>

        {/* Trusted By Section */}
        <motion.div
          variants={fadeUp}
          className="order-4 mt-20 w-full lg:col-span-2 lg:col-start-1 lg:row-start-4 lg:mt-10"
        >
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">
            Trusted By Leading Brands
          </p>
          <LogoMarquee />
        </motion.div>
      </motion.div>
    </section>
  );
}