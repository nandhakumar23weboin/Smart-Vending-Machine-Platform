import React, { memo, useMemo } from "react";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "The smart vending machine has transformed our office break room. Employees love the seamless payment options and the variety of fresh, healthy snacks available 24/7.",
    image: "https://randomuser.me/api/portraits/women/11.jpg",
    name: "Sarah Johnson",
    role: "Office Manager, TechCorp",
  },
  {
    text: "We installed three machines in our hotel lobby and the guest feedback has been phenomenal. The touchless interface and real-time inventory tracking make management effortless.",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    name: "Michael Chen",
    role: "Facility Director, Grand Hotel",
  },
  {
    text: "Finally, a vending solution that understands health-conscious consumers. The nutritional info display and protein-rich options perfectly match our gym's philosophy.",
    image: "https://randomuser.me/api/portraits/women/13.jpg",
    name: "Emily Rodriguez",
    role: "Operations Head, FitLife Gym",
  },
  {
    text: "The AI-powered recommendations are incredibly accurate. Our members appreciate the personalized experience, and the analytics dashboard helps us optimize inventory.",
    image: "https://randomuser.me/api/portraits/men/14.jpg",
    name: "David Park",
    role: "CEO, StartupHub Co-Working",
  },
  {
    text: "In a healthcare setting, hygiene is paramount. The UV sanitization and contactless payment features give our staff and visitors complete peace of mind.",
    image: "https://randomuser.me/api/portraits/women/15.jpg",
    name: "Lisa Thompson",
    role: "HR Director, MedLife Hospital",
  },
  {
    text: "The smart vending machine has increased foot traffic in our mall. Shoppers love the interactive display and the loyalty rewards program keeps them coming back.",
    image: "https://randomuser.me/api/portraits/men/16.jpg",
    name: "James Wilson",
    role: "Retail Manager, MetroMall",
  },
  {
    text: "Students absolutely love the late-night access to snacks and beverages. The student discount integration and mobile app have made this incredibly popular on campus.",
    image: "https://randomuser.me/api/portraits/women/17.jpg",
    name: "Anna Kowalski",
    role: "Dean, BrightFuture University",
  },
];

// ── Memoized card: white background, red accent quote icon ──
const TestimonialCard = memo(({ text, image, name, role }) => (
  <div
    className="p-4 sm:p-8 rounded-2xl w-[240px] sm:w-[320px] md:w-[340px] flex-shrink-0 hover:shadow-xl transition-shadow duration-300"
    style={{
      background: "#ffffff",
      border: "1px solid #e5e7eb",
      boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
    }}
  >
    {/* Quote icon — red */}
    <svg
      className="w-5 h-5 sm:w-8 sm:h-8 mb-2 sm:mb-4"
      style={{ color: "#9F0712" }}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>

    <p className="text-[#374151] text-[0.7rem] sm:text-sm leading-relaxed mb-3 sm:mb-6 line-clamp-3 sm:line-clamp-none">
      {text}
    </p>

    <div
      className="pt-2.5 sm:pt-4 flex items-center gap-2 sm:gap-3"
      style={{ borderTop: "1px solid #e5e7eb" }}
    >
      <img
        width={44}
        height={44}
        src={image}
        alt={name}
        className="h-7 w-7 sm:h-11 sm:w-11 rounded-full object-cover"
        style={{ ring: "2px", outline: "2px solid #9F071233" }}
        loading="lazy"
      />
      <div>
        <h4 className="font-semibold text-[0.7rem] sm:text-sm" style={{ color: "#111827" }}>
          {name}
        </h4>
        <p className="text-[0.6rem] sm:text-xs mt-0.5" style={{ color: "#6b7280" }}>
          {role}
        </p>
      </div>
    </div>
  </div>
));
TestimonialCard.displayName = "TestimonialCard";

// ── Memoized row ──
const TestimonialRow = memo(({ items, direction = "left", duration = 30 }) => {
  const animation =
    direction === "left"
      ? { x: ["0%", "-50%"] }
      : { x: ["-50%", "0%"] };

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex gap-6"
        animate={animation}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        style={{ width: "max-content" }}
      >
        {[...items, ...items].map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </motion.div>
    </div>
  );
});
TestimonialRow.displayName = "TestimonialRow";

// ── Memoized header — colours adapted for dark red bg ──
const SectionHeader = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    viewport={{ once: true }}
    className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-12 px-4"
  >
    {/* Pill badge — white outline on dark red bg */}
    <div
      className="py-1 px-4 rounded-lg text-sm font-medium"
      style={{
        border: "1px solid rgba(255,255,255,0.35)",
        background: "rgba(255,255,255,0.12)",
        color: "#ffffff",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      Testimonials
    </div>

    <h2
      className="text-2xl sm:text-3xl md:text-4xl lg:text-[41.6px] tracking-tighter mt-5 text-center"
      style={{
        fontFamily:
          "'Tiktoksans Variablefont Opsz Slnt Wdth Wght', 'Plus Jakarta Sans', sans-serif",
        fontWeight: 600,
        color: "#ffffff",
      }}
    >
      What Our{" "}
      <span style={{ color: "rgba(255,255,255,0.65)" }}>Clients Say</span>
    </h2>

    <p
      className="text-center mt-5"
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: "rgba(255,255,255,0.75)",
      }}
    >
      Discover why businesses trust our smart vending solutions to
      revolutionize their spaces and delight their customers.
    </p>
  </motion.div>
));
SectionHeader.displayName = "SectionHeader";

// ── Main component ──
const Testimonials = () => {
  const rowOne = useMemo(() => testimonials.slice(0, 4), []);
  const rowTwo = useMemo(() => testimonials.slice(3, 7), []);

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#9F0712" }}
    >
      {/* ── TOP WAVE: white above curving down into red ── */}
      <div className="relative w-full pointer-events-none" style={{ lineHeight: 0, marginBottom: "-1px" }}>
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: "clamp(40px, 6vw, 80px)" }}
        >
          {/* Start from bottom-left of white area */}
          <path
            d="M0,80 L0,0 L1440,0 L1440,40 C1200,80 960,20 720,50 C480,80 240,20 0,50 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      {/* ── CONTENT ── */}
      <div className="my-8 sm:my-0 py-8 sm:py-14 lg:py-20 overflow-hidden">
        <div className="container mx-auto">
          <SectionHeader />
        </div>

        {/* Row 1 — scrolls LEFT */}
        <div className="mb-6">
          <TestimonialRow items={rowOne} direction="left" duration={28} />
        </div>

        {/* Row 2 — scrolls RIGHT */}
        <TestimonialRow items={rowTwo} direction="right" duration={32} />
      </div>

      {/* ── BOTTOM WAVE: red curving back up to white ── */}
      <div className="relative w-full pointer-events-none" style={{ lineHeight: 0, marginTop: "-1px" }}>
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: "clamp(40px, 6vw, 80px)" }}
        >
          {/* End at top-left of white area */}
          <path
            d="M0,80 L1440,80 L1440,0 L1440,30 C1200,0 960,60 720,30 C480,0 240,60 0,30 L0,0 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
};

export default memo(Testimonials);