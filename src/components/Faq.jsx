import React, { useState, useCallback } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";

const faqData = [
  {
    id: 1,
    question: "What is the Smart Vending Machine Platform?",
    answer:
      "Our Smart Vending Machine Platform is an AI-powered, IoT-connected ecosystem that enables real-time inventory management, cashless payments, and remote monitoring — all through a single unified dashboard.",
  },
  {
    id: 2,
    question: "How does remote monitoring work?",
    answer:
      "Each vending machine is equipped with embedded sensors and a cellular or Wi-Fi module that streams live data — stock levels, temperature, sales, and machine health — directly to your cloud dashboard 24/7.",
  },
  {
    id: 3,
    question: "What payment methods are supported?",
    answer:
      "Our platform supports all major cashless payment options including credit and debit cards, UPI, QR code scan-and-pay, NFC tap-to-pay, and integrated loyalty wallets — ensuring a frictionless experience for every customer.",
  },
  {
    id: 4,
    question: "Can I manage multiple machines from one place?",
    answer:
      "Yes. The operator dashboard gives you a centralized view of your entire fleet — whether it's 5 machines or 5,000. You can track sales, trigger restocking alerts, push price updates, and analyse performance all from one screen.",
  },
  {
    id: 5,
    question: "How secure is the platform?",
    answer:
      "Security is built in at every layer. Data is encrypted in transit and at rest using AES-256. The platform is PCI-DSS compliant for payment processing, and all machine firmware updates are digitally signed and verified before deployment.",
  },
];

// Memoized Accordion Item component
const AccordionItem = React.memo(({ item, index, isOpen, onToggle }) => {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { 
    once: true, 
    amount: 0.3,
    margin: "0px 0px -50px 0px"
  });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`rounded-xl border overflow-hidden transition-all duration-300 ${
        isOpen
          ? "border-[#dc2626]/25 shadow-lg shadow-[#991b1b]/10"
          : "border-[#e5e7eb] hover:border-[#dc2626]/20 hover:shadow-sm"
      }`}
      style={{
        background: isOpen
          ? "linear-gradient(135deg, #ffffff 0%, #fff5f5 100%)"
          : "linear-gradient(135deg, #ffffff 0%, #fdf2f2 100%)",
      }}
    >
      {/* Trigger */}
      <button
        onClick={() => onToggle(item.id)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left group"
        aria-expanded={isOpen}
      >
        <span
          className={`font-semibold text-sm md:text-base leading-snug transition-colors duration-300 ${
            isOpen ? "text-[#991b1b]" : "text-[#111827]"
          }`}
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {item.question}
        </span>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center bg-[#dc2626] shadow-md shadow-[#991b1b]/30 transition-colors duration-300 group-hover:bg-[#991b1b]"
        >
          {isOpen ? (
            <Minus className="w-3.5 h-3.5 text-white" />
          ) : (
            <Plus className="w-3.5 h-3.5 text-white" />
          )}
        </motion.span>
      </button>

      {/* Answer Panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-5 pb-5 pt-0">
              <motion.div 
                className="h-px bg-[#f3e8e8] mb-4"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                style={{ transformOrigin: "left" }}
              />
              <div className="flex justify-start">
                <motion.div
                  initial={{ opacity: 0, x: -15, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -15, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-[92%] rounded-xl rounded-tl-sm px-4 py-3"
                  style={{
                    background:
                      "linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)",
                    boxShadow: "0 4px 18px rgba(153,27,27,0.25)",
                  }}
                >
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="text-white text-sm leading-relaxed"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {item.answer}
                  </motion.p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

AccordionItem.displayName = "AccordionItem";

// Heading component with scroll animation
const AnimatedHeading = React.memo(() => {
  const headingRef = useRef(null);
  const isInView = useInView(headingRef, { once: true, amount: 0.5 });

  const headingParts = [
    { text: "Frequently", color: "#000000", delay: 0 },
    { text: "Asked Questions", color: "#991b1b", delay: 0.15 },
  ];

  return (
    <div ref={headingRef} className="text-center mb-10 md:mb-12">
      <h2
        className="text-2xl sm:text-3xl md:text-4xl leading-tight tracking-tight"
        style={{
          fontFamily:
            "'Tiktoksans Variablefont Opsz Slnt Wdth Wght', 'Plus Jakarta Sans', sans-serif",
          fontWeight: 600,
        }}
      >
        {headingParts.map((part, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={
              isInView
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 20, filter: "blur(4px)" }
            }
            transition={{
              delay: part.delay,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ color: part.color, display: "inline-block" }}
          >
            {part.text}
            {index === 0 && "\u00A0"}
          </motion.span>
        ))}
      </h2>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={
          isInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 15 }
        }
        transition={{
          delay: 0.4,
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mt-3 text-[#6b7280] text-sm md:text-base max-w-xl mx-auto"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        Everything you need to know about our Smart Vending Machine Platform.
      </motion.p>
    </div>
  );
});

AnimatedHeading.displayName = "AnimatedHeading";

export default function Faq() {
  const [openId, setOpenId] = useState(null);

  const handleToggle = useCallback((id) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section className="py-10 sm:py-14 lg:py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <AnimatedHeading />

        {/* Accordion List */}
        <div className="space-y-3">
          {faqData.map((item, index) => (
            <AccordionItem
              key={item.id}
              item={item}
              index={index}
              isOpen={openId === item.id}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}