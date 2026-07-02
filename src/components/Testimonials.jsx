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

// ── Memoized card: only re-renders if props change ──
const TestimonialCard = memo(({ text, image, name, role }) => (
  <div className="p-4 sm:p-8 rounded-2xl bg-red-800 border border-white shadow-lg hover:shadow-xl transition-shadow duration-300 w-[240px] sm:w-[320px] md:w-[340px] flex-shrink-0">
    <svg
      className="w-5 h-5 sm:w-8 sm:h-8 text-white/30 mb-2 sm:mb-4"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>

    <p className="text-white/90 text-[0.7rem] sm:text-sm leading-relaxed mb-3 sm:mb-6 line-clamp-3 sm:line-clamp-none">{text}</p>

    <div className="border-t border-white/20 pt-2.5 sm:pt-4 flex items-center gap-2 sm:gap-3">
      <img
        width={44}
        height={44}
        src={image}
        alt={name}
        className="h-7 w-7 sm:h-11 sm:w-11 rounded-full object-cover ring-2 ring-white/50"
        loading="lazy"
      />
      <div>
        <h4 className="font-semibold text-white text-[0.7rem] sm:text-sm">{name}</h4>
        <p className="text-white/70 text-[0.6rem] sm:text-xs mt-0.5">{role}</p>
      </div>
    </div>
  </div>
));
TestimonialCard.displayName = "TestimonialCard";

// ── Memoized row: receives direction & speed, never re-renders unless those change ──
const TestimonialRow = memo(({ items, direction = "left", duration = 30 }) => {
  // direction="left"  → animate x: 0 → -50%
  // direction="right" → animate x: -50% → 0
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
        {/* Duplicate items for seamless infinite loop */}
        {[...items, ...items].map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </motion.div>
    </div>
  );
});
TestimonialRow.displayName = "TestimonialRow";

// ── Memoized header so it never re-renders when parent updates ──
const SectionHeader = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    viewport={{ once: true }}
    className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-12 px-4"
  >
    <div className="border border-[rgb(229,231,235)] py-1 px-4 rounded-lg text-[#991b1b] text-sm font-medium"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      Testimonials
    </div>

    <h2
      className="text-2xl sm:text-3xl md:text-4xl lg:text-[41.6px] tracking-tighter mt-5 text-[#111827] text-center"
      style={{
        fontFamily:
          "'Tiktoksans Variablefont Opsz Slnt Wdth Wght', 'Plus Jakarta Sans', sans-serif",
        fontWeight: 600,
      }}
    >
      What Our <span className="text-[#991b1b]">Clients Say</span>
    </h2>

    <p
      className="text-center mt-5 text-[#6b7280]"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      Discover why businesses trust our smart vending solutions to
      revolutionize their spaces and delight their customers.
    </p>
  </motion.div>
));
SectionHeader.displayName = "SectionHeader";

// ── Main component ──
const Testimonials = () => {
  // useMemo ensures row slices are not recomputed on every render
  const rowOne = useMemo(() => testimonials.slice(0, 4), []);
  const rowTwo = useMemo(() => testimonials.slice(3, 7), []);

  return (
    <section className="bg-white my-8 sm:my-0 py-8 sm:py-14 lg:py-20 overflow-hidden">
      <div className="container mx-auto">
        <SectionHeader />
      </div>

      {/* Row 1 — scrolls LEFT */}
      <div className="mb-6">
        <TestimonialRow items={rowOne} direction="left" duration={28} />
      </div>

      {/* Row 2 — scrolls RIGHT */}
      <TestimonialRow items={rowTwo} direction="right" duration={32} />
    </section>
  );
};

export default memo(Testimonials);