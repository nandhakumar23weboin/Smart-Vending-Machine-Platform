import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PhoneCall, Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import howItWorksImage from "../assets/how its work.png"; // Adjust path if needed

const HowitsWork = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  const imageVariant = {
    hidden: { opacity: 0, x: 60, rotateY: 5 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  const buttonHover = {
    rest: { scale: 1, boxShadow: "0 1px 4px rgba(153, 27, 27, 0.15)" },
    hover: {
      scale: 1.03,
      boxShadow: "0 2px 12px rgba(153, 27, 27, 0.25)",
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.97 },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-white py-12 sm:py-16 lg:py-24"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* Main Visible Container */}
        <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg shadow-gray-200/50 sm:rounded-[2rem]">
          {/* Subtle top accent line */}
          <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-80" />
          
          {/* Content Grid */}
          <div className="flex flex-col items-center gap-8 p-6 sm:p-8 lg:flex-row lg:gap-10 lg:p-10 xl:gap-12 xl:p-12">
            {/* --- LEFT CONTENT SIDE --- */}
            <motion.div
              variants={containerVariants}
              className="w-full max-w-xl text-center lg:w-1/2 lg:max-w-none lg:text-left lg:pr-4 xl:pr-8"
            >
              {/* Small Badge */}
              <motion.div
                variants={fadeUp}
                className="mb-3 sm:mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[0.72rem] font-medium text-primary sm:px-5 sm:text-[0.8rem]"
              >
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.2} />
                How It Works
              </motion.div>

              {/* Main Heading */}
              <motion.h2
                variants={fadeUp}
                className="mt-3 sm:mt-4 font-heading text-[1.8rem] leading-tight font-semibold tracking-tight text-text sm:text-[2.5rem] lg:text-[2.6rem]"
              >
                Smart Vending,{" "}
                <span className="bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                  Simplified
                </span>
              </motion.h2>

              {/* Description Paragraph */}
              <motion.p
                variants={fadeUp}
                className="mx-auto mt-3 sm:mt-4 max-w-xl text-sm leading-relaxed text-text-secondary sm:text-base lg:text-lg lg:mx-0 lg:max-w-md"
              >
                From AI-powered inventory management to premium coffee experiences,
                our machines are designed to maximize revenue while delivering
                exceptional convenience to your customers.
              </motion.p>

              {/* Quick Feature List */}
              <motion.ul
                variants={containerVariants}
                className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 lg:justify-start"
              >
                {["Real-time tracking", "99.9% uptime", "Seamless setup"].map(
                  (feature, idx) => (
                    <motion.li
                      key={idx}
                      variants={fadeUp}
                      className="flex items-center gap-1.5 text-xs font-medium text-text-secondary sm:text-sm"
                    >
                      <CheckCircle className="h-3.5 w-3.5 text-primary sm:h-4 sm:w-4" strokeWidth={2} />
                      {feature}
                    </motion.li>
                  ),
                )}
              </motion.ul>

              {/* CTA Button */}
              <motion.div variants={fadeUp} className="mt-6 sm:mt-8">
                <motion.button
                  variants={buttonHover}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  className="group inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-primary/15 transition-colors duration-300 hover:from-cta-hover hover:to-primary sm:px-5 sm:py-2.5 sm:text-sm"
                >
                  <PhoneCall className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Call Now
                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 sm:h-3.5 sm:w-3.5" />
                </motion.button>
              </motion.div>
            </motion.div>

            {/* --- RIGHT IMAGE SIDE --- */}
            <motion.div 
              variants={imageVariant} 
              className="w-full max-w-md lg:w-1/2 lg:max-w-none lg:pl-4 xl:pl-8"
            >
              <div className="relative mx-auto overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/50 p-1.5 shadow-inner sm:rounded-3xl sm:p-2 lg:p-3">
                {/* Inner image wrapper for rounded corners */}
                <div className="overflow-hidden rounded-xl sm:rounded-2xl">
                  <img
                    src={howItWorksImage}
                    alt="How our smart vending machine works"
                    className="h-auto w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                    loading="lazy"
                  />
                </div>
                {/* Subtle glow effect behind image */}
                <div className="absolute -inset-2 -z-10 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 blur-xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HowitsWork;