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

import trustedLogo1 from "../assets/trusted by-1.webp";
import trustedLogo2 from "../assets/trusted by-2.webp";
import trustedLogo3 from "../assets/trusted by-3.png";
import trustedLogo4 from "../assets/trusted by-4.png";
import heroImage from "../assets/hero image.jpg";

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
    floatDuration: 3.6,
  },
  {
    icon: BarChart3,
    label: "Real-Time Tracking",
    position: "top-[2%] right-[-1%] sm:right-[5%] md:right-[15%] lg:right-[16%] xl:right-[2%]",
    delay: 1.2,
    floatDuration: 4.2,
  },
  {
    icon: ShieldCheck,
    label: "Smart Inventory",
    position: "bottom-[26%] left-[1%] sm:left-[5%] md:left-[14%] lg:left-[16%] xl:left-[2%]",
    delay: 1.5,
    floatDuration: 3.9,
  },
  {
    icon: CheckCircle,
    label: "24/7 Availability",
    position: "bottom-[28%] right-[1%] sm:right-[5%] md:right-[14%] lg:right-[16%] xl:right-[2%]",
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

function LogoMarquee() {
  const duplicated = [...trustLogos, ...trustLogos, ...trustLogos];

  return (
    <div className="relative mt-5 w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-red-50 to-transparent sm:w-20 lg:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-red-50 to-transparent sm:w-20 lg:w-28" />

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
            className="h-9 w-auto shrink-0 opacity-50 grayscale transition-all duration-300 ease-out hover:scale-105 hover:opacity-100 hover:grayscale-0 sm:h-11 md:h-12 lg:h-14"
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-background font-sans">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-y-5 px-4 pt-24 pb-12 sm:px-6 md:px-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.9fr)] lg:gap-x-10 lg:gap-y-4 lg:pt-24 lg:pb-20 xl:gap-x-14"
      >
        <div className="order-1 w-full max-w-xl text-center lg:order-2 lg:col-start-2 lg:row-start-1 lg:self-end lg:text-left">
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
            Transform Empty Spaces{" "}
            <br className="sm:hidden" />
            Into{" "}
            <span className="whitespace-nowrap bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
              Revenue Opportunity
            </span>
          </motion.h1>
        </div>

        <div className="relative order-2 mx-auto flex w-full max-w-[24rem] items-center justify-center sm:max-w-lg md:max-w-152 lg:order-1 lg:col-start-1 lg:row-start-1 lg:row-span-3 lg:mt-0 lg:max-w-none">
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
              >
                <img
                  src={heroImage}
                  alt="Smart Vending Machine"
                  className="w-full max-w-[220px] sm:max-w-[280px] object-contain rounded-3xl"
                  style={{
                    border: "8px solid #ffffff",
                    boxShadow: "none"
                  }}
                />
              </motion.div>
            </div>

            {featureCards.map(({ icon: Icon, label, position, delay, floatDuration }) => (
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
                  whileHover={{ scale: 1.06, y: -2 }}
                  className="glass-card flex items-center gap-2 rounded-xl px-2.5 py-2 transition-all duration-300 hover:border-red-500 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] sm:gap-2.5 sm:rounded-2xl sm:px-4 sm:py-3"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary sm:h-8 sm:w-8">
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.3} />
                  </span>
                  <span className="whitespace-nowrap text-xs font-semibold text-text sm:text-sm">
                    {label}
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="order-3 w-full max-w-xl text-center lg:col-start-2 lg:row-start-2 lg:self-start lg:text-left">
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
              whileHover={{ scale: 1.035, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center justify-center gap-1 rounded-full bg-cta px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-cta-hover sm:px-4 sm:py-2 sm:text-sm lg:ml-15"
            >
              Request a Machine
              <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1 sm:h-3.5 sm:w-3.5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.035, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-text transition-all bg-[#FAF3F3] hover:bg-primary/5 hover:text-primary sm:px-4 sm:py-2 sm:text-sm"
            >
              Call us
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          className="order-4 mt-16 w-full lg:col-span-2 lg:col-start-1 lg:row-start-4 lg:mt-10 lg:text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">
            Trusted By Leading Brands
          </p>
          <LogoMarquee />
        </motion.div>
      </motion.div>
    </section>
  );
}
