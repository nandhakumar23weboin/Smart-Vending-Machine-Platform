import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function Faq() {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="bg-[#fafafa] py-20 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2
  className="text-4xl md:text-5xl leading-tight tracking-tight"
  style={{
    fontFamily:
      "'Tiktoksans Variablefont Opsz Slnt Wdth Wght', 'Plus Jakarta Sans', sans-serif",
    fontWeight: 600,
  }}
>
  <span style={{ color: "#000000" }}>Frequently</span>{" "}
  <span style={{ color: "#991b1b" }}>Asked Questions</span>
</h2>
          <p
            className="mt-4 text-[#6b7280] text-base md:text-lg max-w-xl mx-auto"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Everything you need to know about our Smart Vending Machine Platform.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqData.map((item, index) => {
            const isOpen = openId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.06,
                  duration: 0.38,
                  ease: "easeOut",
                }}
                className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
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
                  onClick={() => handleToggle(item.id)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`font-semibold text-base md:text-[17px] leading-snug transition-colors duration-300 ${
                      isOpen ? "text-[#991b1b]" : "text-[#111827]"
                    }`}
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {item.question}
                  </span>

                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-[#dc2626] shadow-md shadow-[#991b1b]/30 transition-colors duration-300 group-hover:bg-[#991b1b]"
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-white" />
                    ) : (
                      <Plus className="w-4 h-4 text-white" />
                    )}
                  </span>
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
                      <div className="px-6 pb-6 pt-0">
                        <div className="h-px bg-[#f3e8e8] mb-4" />
                        <div className="flex justify-start">
                          <motion.div
                            initial={{ opacity: 0, y: 6, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.28, ease: "easeOut" }}
                            className="max-w-[90%] rounded-2xl rounded-tl-sm px-5 py-4"
                            style={{
                              background:
                                "linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)",
                              boxShadow: "0 4px 18px rgba(153,27,27,0.25)",
                            }}
                          >
                            <p
                              className="text-white text-sm md:text-base leading-relaxed"
                              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                              {item.answer}
                            </p>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}