import React, { memo, useMemo } from "react";
import { motion } from "motion/react";
import Form from "../components/Form"; // Adjust the import path as needed

// ── Image imports — Vite resolves these at build time for Vercel ──
import machine1 from "../assets/vending-machine1.png";
import machine2 from "../assets/vending-machine2.png";
import machine3 from "../assets/vending-machine3.png";

// ─────────────────────────────────────────────
// Machine data — 6 unique vending machines
// ─────────────────────────────────────────────
const machines = [
  {
    id: 1,
    name: "SmartVend Pro X1",
    category: "Premium",
    originalPrice: "₹ 3,49,999",
    discountedPrice: "₹ 2,49,999",
    discount: "29% OFF",
    tag: "Best Seller",
    description: "AI-powered vending with facial recognition & real-time analytics.",
    image: machine1,
    features: ["Touchless Payment", "Remote Monitoring"],
  },
  {
    id: 2,
    name: "EcoVend Sustainable",
    category: "Eco-Friendly",
    originalPrice: "₹ 2,59,999",
    discountedPrice: "₹ 1,89,999",
    discount: "27% OFF",
    tag: "New Launch",
    description: "Solar-powered machine with energy-efficient cooling system.",
    image: machine2,
    features: ["Solar Powered", "Eco Materials"],
  },
  {
    id: 3,
    name: "MediVend HealthHub",
    category: "Healthcare",
    originalPrice: "₹ 4,79,999",
    discountedPrice: "₹ 3,29,999",
    discount: "31% OFF",
    tag: "Premium",
    description: "Medical-grade vending with temperature-controlled storage.",
    image: machine3,
    features: ["Temperature Control", "HIPAA Compliant"],
  },
  {
    id: 4,
    name: "OfficeVend Compact",
    category: "Business",
    originalPrice: "₹ 2,19,999",
    discountedPrice: "₹ 1,49,999",
    discount: "32% OFF",
    tag: "Popular",
    description: "Space-saving design with customizable branding options.",
    image: machine1,
    features: ["Compact Design", "Employee Subsidy"],
  },
  {
    id: 5,
    name: "RetailMax 5000",
    category: "Enterprise",
    originalPrice: "₹ 7,49,999",
    discountedPrice: "₹ 4,99,999",
    discount: "33% OFF",
    tag: "Heavy Duty",
    description: "High-capacity retail solution with dual temperature zones.",
    image: machine2,
    features: ["500+ Capacity", "Loyalty Integration"],
  },
  {
    id: 6,
    name: "FreshVend ColdChain",
    category: "Food Service",
    originalPrice: "₹ 4,29,999",
    discountedPrice: "₹ 2,99,999",
    discount: "30% OFF",
    tag: "Refrigerated",
    description: "IoT-enabled refrigerated vending for fresh meals & beverages.",
    image: machine3,
    features: ["Refrigeration", "Expiry Tracking"],
  },
];

// ─────────────────────────────────────────────
// Memoized individual machine card
// ─────────────────────────────────────────────
const MachineCard = memo(({ machine, index }) => {
  const {
    name,
    category,
    originalPrice,
    discountedPrice,
    discount,
    tag,
    description,
    image,
    features,
  } = machine;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ 
        y: -8,
        boxShadow: "0 20px 40px -8px rgba(153, 27, 27, 0.2), 0 0 0 1px rgba(153, 27, 27, 0.1)",
        transition: { duration: 0.3 } 
      }}
      className="relative flex flex-col rounded-3xl bg-white overflow-hidden group cursor-pointer"
      style={{
        boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.05), 0 8px 16px rgba(0, 0, 0, 0.08), 0 16px 32px rgba(0, 0, 0, 0.06)",
      }}
    >
      {/* ── Discount Badge ── */}
      <span className="absolute top-4 right-4 z-10 bg-black text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {discount}
      </span>

      {/* ── Tag Badge ── */}
      <span className="absolute top-4 left-4 z-10 bg-[#991b1b] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {tag}
      </span>

      {/* ── Machine Image ── */}
      <div className="flex items-center justify-center h-44 pt-6 px-6 relative bg-gradient-to-b from-[#fafafa] to-white">
        <motion.img
          src={image}
          alt={name}
          className="h-36 w-auto object-contain drop-shadow-xl"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 280, damping: 18 }}
          loading="lazy"
        />
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 px-6 pb-5 pt-3">
        {/* Category pill */}
        <span className="text-[11px] font-semibold uppercase tracking-widest text-[#991b1b] mb-1"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {category}
        </span>

        {/* Name */}
        <h3 className="text-[#111827] text-lg font-bold leading-tight mb-1.5"
          style={{
            fontFamily: "'Tiktoksans Variablefont Opsz Slnt Wdth Wght', 'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
          }}>
          {name}
        </h3>

        {/* Description */}
        <p className="text-[#6b7280] text-xs leading-relaxed mb-3 flex-1"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {description}
        </p>

        {/* Features list */}
        <div className="flex flex-wrap gap-2 mb-4">
          {features.map((feature, idx) => (
            <span
              key={idx}
              className="text-[10px] font-semibold uppercase tracking-wide bg-[#fef2f2] px-2.5 py-1 rounded-full border border-[#fecaca] text-[#991b1b]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {feature}
            </span>
          ))}
        </div>

        {/* Price & CTA row */}
        <div className="flex items-end justify-between mt-auto">
          {/* Pricing */}
          <div className="flex flex-col">
            <span className="text-[#6b7280] text-xs line-through"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {originalPrice}
            </span>
            <span className="text-[#991b1b] text-xl font-extrabold"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {discountedPrice}
            </span>
          </div>

          {/* Buy Now button - Reduced size */}
          <motion.button
            onClick={() => {
              document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
            }}
            whileTap={{ scale: 0.93 }}
            className="flex items-center gap-1.5 bg-[#991b1b] hover:bg-[#7f1d1d] text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-md shadow-[#991b1b]/20 transition-colors duration-200"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            aria-label={`Buy ${name} now`}>
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
              />
            </svg>
            Buy Now
          </motion.button>
        </div>
      </div>

      {/* ── Bottom shimmer line on hover ── */}
      <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 rounded-b-3xl bg-gradient-to-r from-[#991b1b] to-[#dc2626]" />
    </motion.div>
  );
});
MachineCard.displayName = "MachineCard";

// ─────────────────────────────────────────────
// Memoised section header
// ─────────────────────────────────────────────
const SectionHeader = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    className="text-center mb-16 px-4">
    <span className="inline-block border border-[rgb(229,231,235)] text-[#991b1b] text-sm font-medium px-4 py-1.5 rounded-full mb-5"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      Our Machine Range
    </span>

    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#111827] leading-tight tracking-tight font-semibold"
      style={{
        fontFamily: "'Tiktoksans Variablefont Opsz Slnt Wdth Wght', 'Plus Jakarta Sans', sans-serif",
        fontWeight: 600,
      }}>
      Find the Perfect{" "}
      <span className="text-[#991b1b]">Vending Machine</span>
    </h2>

    <p className="mt-5 text-[#6b7280] text-base md:text-lg max-w-2xl mx-auto"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      From compact office solutions to enterprise-grade retail systems — we
      have the right machine for every business need.
    </p>
  </motion.div>
));
SectionHeader.displayName = "SectionHeader";

// ─────────────────────────────────────────────
// Floating background blobs — purely decorative
// ─────────────────────────────────────────────
const BackgroundDecor = memo(() => (
  <>
    <div className="pointer-events-none absolute -top-20 -left-20 w-96 h-96 rounded-full bg-[#fca5a5]/10 blur-3xl" />
    <div className="pointer-events-none absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-[#fca5a5]/8 blur-3xl" />
    <div className="pointer-events-none absolute bottom-0 left-1/3 w-96 h-40 rounded-full bg-[#fecaca]/10 blur-2xl" />
  </>
));
BackgroundDecor.displayName = "BackgroundDecor";

// ─────────────────────────────────────────────
// Main page component
// ─────────────────────────────────────────────
const SmartVending = () => {
  const machineList = useMemo(() => machines, []);

  return (
    <section className="relative bg-gradient-to-b from-[#fafafa] to-white py-24 overflow-hidden">
      <BackgroundDecor />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader />

        {/* ── 6-card grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {machineList.map((machine, index) => (
            <MachineCard key={machine.id} machine={machine} index={index} />
          ))}
        </div>

        {/* ── Form Section ── */}
        <motion.div
          id="contact-form"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20">
          <Form />
        </motion.div>
      </div>
    </section>
  );
};

export default memo(SmartVending);