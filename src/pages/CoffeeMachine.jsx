import React, { memo, useMemo } from "react";
import { motion } from "motion/react";
import Form from "../components/Form"; // Adjust the import path as needed

// ── Image imports — Vite resolves these at build time for Vercel ──
import coffee1 from "../assets/coffee-img1.png";
import coffee2 from "../assets/coffee-img2.png";

// ─────────────────────────────────────────────
// Machine data — 6 unique coffee machines with realistic pricing
// ─────────────────────────────────────────────
const machines = [
  {
    id: 1,
    name: "Barista Pro Elite",
    category: "Premium",
    originalPrice: "₹ 54,999",
    discountedPrice: "₹ 39,999",
    discount: "27% OFF",
    tag: "Best Seller",
    description: "Professional-grade espresso machine with dual boiler & PID control.",
    image: coffee1,
    features: ["15 Bar", "Auto Froth"],
  },
  {
    id: 2,
    name: "Café Automatic 3000",
    category: "Super-Auto",
    originalPrice: "₹ 89,999",
    discountedPrice: "₹ 64,999",
    discount: "28% OFF",
    tag: "New Launch",
    description: "One-touch bean-to-cup experience with 18+ beverage options.",
    image: coffee2,
    features: ["Bean-to-Cup", "Self-Clean"],
  },
  {
    id: 3,
    name: "OfficeBrew Commercial",
    category: "Commercial",
    originalPrice: "₹ 1,29,999",
    discountedPrice: "₹ 94,999",
    discount: "27% OFF",
    tag: "Heavy Duty",
    description: "High-volume brewing for offices serving 200+ cups daily.",
    image: coffee1,
    features: ["200 Cups", "Dual Hop"],
  },
  {
    id: 4,
    name: "Compacto Espresso",
    category: "Compact",
    originalPrice: "₹ 32,999",
    discountedPrice: "₹ 24,999",
    discount: "24% OFF",
    tag: "Popular",
    description: "Space-saving design without compromising on espresso quality.",
    image: coffee2,
    features: ["Slim", "Quick Heat"],
  },
  {
    id: 5,
    name: "LatteArt Studio",
    category: "Specialty",
    originalPrice: "₹ 74,999",
    discountedPrice: "₹ 54,999",
    discount: "27% OFF",
    tag: "Artisan",
    description: "Create café-quality latte art with precision steam wand control.",
    image: coffee1,
    features: ["Steam Wand", "Pressure"],
  },
  {
    id: 6,
    name: "SmartBrew IoT",
    category: "Smart",
    originalPrice: "₹ 99,999",
    discountedPrice: "₹ 72,999",
    discount: "27% OFF",
    tag: "Connected",
    description: "WiFi-enabled coffee machine with app control & brewing analytics.",
    image: coffee2,
    features: ["App Control", "Analytics"],
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
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ 
        y: -4,
        boxShadow: "0 12px 24px -6px rgba(153, 27, 27, 0.15), 0 0 0 1px rgba(153, 27, 27, 0.08)",
        transition: { duration: 0.25 } 
      }}
      className="relative flex flex-col rounded-2xl sm:rounded-3xl bg-white overflow-hidden group cursor-pointer border border-gray-100"
      style={{
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.06), 0 8px 16px rgba(0, 0, 0, 0.04)",
      }}
    >
      {/* ── Discount Badge ── */}
      <span className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 bg-black text-white text-[8px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-widest px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-lg"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {discount}
      </span>

      {/* ── Tag Badge ── */}
      <span className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10 bg-[#991b1b] text-white text-[8px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-widest px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {tag}
      </span>

      {/* ── Coffee Machine Image ── */}
      <div className="flex items-center justify-center h-28 sm:h-36 md:h-44 pt-4 sm:pt-6 px-3 sm:px-6 relative bg-gradient-to-b from-[#fafafa] to-white">
        <motion.img
          src={image}
          alt={name}
          className="h-20 sm:h-28 md:h-36 w-auto object-contain drop-shadow-lg sm:drop-shadow-xl"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 280, damping: 18 }}
          loading="lazy"
        />
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 px-3 sm:px-5 md:px-6 pb-3 sm:pb-4 md:pb-5 pt-2 sm:pt-3">
        {/* Category pill */}
        <span className="text-[9px] sm:text-[11px] font-semibold uppercase tracking-wider sm:tracking-widest text-[#991b1b] mb-0.5 sm:mb-1"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {category}
        </span>

        {/* Name */}
        <h3 className="text-[#111827] text-sm sm:text-base md:text-lg font-bold leading-tight mb-0.5 sm:mb-1 line-clamp-1"
          style={{
            fontFamily: "'Tiktoksans Variablefont Opsz Slnt Wdth Wght', 'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
          }}>
          {name}
        </h3>

        {/* Description - hidden on mobile */}
        <p className="text-[#6b7280] text-[10px] sm:text-xs leading-relaxed mb-2 sm:mb-3 flex-1 hidden sm:block"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {description}
        </p>

        {/* Features list */}
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
          {features.map((feature, idx) => (
            <span
              key={idx}
              className="text-[8px] sm:text-[10px] font-semibold uppercase tracking-wide bg-[#fef2f2] px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-[#fecaca] text-[#991b1b]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {feature}
            </span>
          ))}
        </div>

        {/* Price & CTA row */}
        <div className="flex items-end justify-between mt-auto gap-1 sm:gap-2">
          {/* Pricing */}
          <div className="flex flex-col min-w-0">
            <span className="text-[#6b7280] text-[10px] sm:text-xs line-through truncate"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {originalPrice}
            </span>
            <span className="text-[#991b1b] text-sm sm:text-lg md:text-xl font-extrabold truncate"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {discountedPrice}
            </span>
          </div>

          {/* Buy Now button - Reduced size for mobile */}
          <motion.button
            whileTap={{ scale: 0.93 }}
            className="flex items-center justify-center bg-[#991b1b] hover:bg-[#7f1d1d] text-white font-semibold rounded-md sm:rounded-lg shadow-sm sm:shadow-md shadow-[#991b1b]/20 transition-colors duration-200 whitespace-nowrap flex-shrink-0
            text-[10px] px-2 py-1
            sm:text-[11px] sm:px-2.5 sm:py-1.5
            md:text-xs md:px-3.5 md:py-2"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            aria-label={`Buy ${name} now`}>
            <svg
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 mr-0.5 sm:mr-1"
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
            Buy
          </motion.button>
        </div>
      </div>

      {/* ── Bottom shimmer line on hover ── */}
      <div className="absolute bottom-0 left-0 h-0.5 sm:h-1 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl sm:rounded-b-3xl bg-gradient-to-r from-[#991b1b] to-[#dc2626]" />
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
    className="text-center mb-10 sm:mb-16 px-4">
    <span className="inline-block border border-[rgb(229,231,235)] text-[#991b1b] text-xs sm:text-sm font-medium px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-4 sm:mb-5"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      Our Coffee Machine Range
    </span>

    <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-[#111827] leading-tight tracking-tight font-semibold"
      style={{
        fontFamily: "'Tiktoksans Variablefont Opsz Slnt Wdth Wght', 'Plus Jakarta Sans', sans-serif",
        fontWeight: 600,
      }}>
      Find the Perfect{" "}
      <span className="text-[#991b1b]">Coffee Machine</span>
    </h2>

    <p className="mt-3 sm:mt-5 text-[#6b7280] text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      From compact home brewers to commercial-grade espresso machines — we
      have the perfect coffee solution for every need.
    </p>
  </motion.div>
));
SectionHeader.displayName = "SectionHeader";

// ─────────────────────────────────────────────
// Floating background blobs — purely decorative
// ─────────────────────────────────────────────
const BackgroundDecor = memo(() => (
  <>
    <div className="pointer-events-none absolute -top-20 -left-20 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#fca5a5]/10 blur-3xl" />
    <div className="pointer-events-none absolute top-1/2 -right-24 w-60 sm:w-80 h-60 sm:h-80 rounded-full bg-[#fca5a5]/8 blur-3xl" />
    <div className="pointer-events-none absolute bottom-0 left-1/3 w-72 sm:w-96 h-32 sm:h-40 rounded-full bg-[#fecaca]/10 blur-2xl" />
  </>
));
BackgroundDecor.displayName = "BackgroundDecor";

// ─────────────────────────────────────────────
// Main page component
// ─────────────────────────────────────────────
const CoffeeMachine = () => {
  const machineList = useMemo(() => machines, []);

  return (
    <section className="relative bg-gradient-to-b from-[#fafafa] to-white py-16 sm:py-20 md:py-24 overflow-hidden">
      <BackgroundDecor />

      <div className="container mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader />

        {/* ── 6-card grid with 2 columns on mobile ── */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8 xl:gap-10">
          {machineList.map((machine, index) => (
            <MachineCard key={machine.id} machine={machine} index={index} />
          ))}
        </div>

        {/* ── Form Section ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 sm:mt-20">
          <Form />
        </motion.div>
      </div>
    </section>
  );
};

export default memo(CoffeeMachine);