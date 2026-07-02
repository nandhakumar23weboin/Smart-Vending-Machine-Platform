import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import featureImage from "../assets/feature.png";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Features() {
  return (
    <section className="relative w-full overflow-hidden bg-background font-sans">
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-10 sm:px-6 sm:pt-14 sm:pb-14 lg:px-8 lg:pt-20 lg:pb-20">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            variants={fadeUp}
            className="mb-3 sm:mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[0.72rem] font-medium text-primary sm:px-5 sm:text-[0.8rem]"
          >
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.2} />
            Benefits of Vending
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 sm:mt-4 font-heading text-[1.8rem] leading-tight font-semibold tracking-tight text-text sm:text-[2.5rem] lg:text-[2.6rem]"
          >
            Smart Vending,{" "}
            <span className="bg-linear-to-br from-primary to-accent bg-clip-text text-transparent">
               Benefits
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 sm:mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base lg:text-lg"
          >
            From AI-powered inventory management to premium coffee experiences,
            our machines are designed to maximize revenue while delivering
            exceptional convenience to your customers.
          </motion.p>
        </motion.div>
      </div>

      {/* Full Width Image - Reduced gap from description */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="w-full px-0 sm:px-6 lg:px-8 mt-6 sm:mt-8 lg:mt-10"
      >
        <div className="mx-auto max-w-3xl lg:max-w-4xl">
         <img
            src={featureImage}
            alt="Features"
            className="w-full h-auto object-contain sm:object-cover"
            style={{ 
              minHeight: "clamp(200px, 40vh, 350px)", // Reduced max height from 400px to 350px
              maxWidth: "100%"
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}