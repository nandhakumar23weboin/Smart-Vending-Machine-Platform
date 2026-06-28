import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqItems = [
  {
    id: "item-1",
    question: "How does the smart vending machine accept payments?",
    answer:
      "Our machines support contactless cards, UPI, mobile wallets, and app-based QR payments, so customers can check out in seconds without cash.",
  },
  {
    id: "item-2",
    question: "Can I monitor inventory and sales remotely?",
    answer:
      "Yes. The dashboard gives you real-time stock levels, sales analytics, and low-inventory alerts from any device, so you always know what's happening on the floor.",
  },
  {
    id: "item-3",
    question: "What kind of maintenance do the machines need?",
    answer:
      "Machines are built for low maintenance, with self-diagnostics and remote alerts for issues. Routine restocking and a quick wipe-down are typically all that's required.",
  },
  {
    id: "item-4",
    question: "Can the vending machine be customized for my business?",
    answer:
      "Absolutely. You can configure product mix, pricing, branding, and screen content to match your space, from offices and gyms to hotels and campuses.",
  },
  {
    id: "item-5",
    question: "Is installation and support included?",
    answer:
      "Yes, every deployment includes on-site installation, staff training, and ongoing technical support so you're never left managing it alone.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.015 },
  },
};

const letterVariants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  show: { opacity: 1, filter: "blur(0px)" },
};

const BlurredStagger = ({ text }) => {
  if (!text) return null;

  return (
    <motion.p
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="font-sans text-[#991B1B] text-sm sm:text-base leading-relaxed break-words whitespace-normal"
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          transition={{ duration: 0.3 }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.p>
  );
};

const AccordionRow = ({ item, isOpen, onToggle }) => {
  return (
    <div className="border-b border-[#991B1B]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 py-4 text-left font-heading text-sm sm:text-base font-medium text-text transition-all duration-200 hover:text-black hover:underline hover:font-bold"
      >
        <span>{item.question}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[#991B1B] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={item.id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="pb-4 pt-0">
              <BlurredStagger text={item.answer} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Faq = () => {
  const [openId, setOpenId] = useState(null);

  const toggle = useCallback((id) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section className="bg-background pt-8 pb-16 md:pt-12 md:pb-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-5 md:gap-12">
          <div className="md:col-span-2">
            <h2 className="font-heading text-[#991B1B] text-3xl sm:text-4xl font-semibold">
              FAQs
            </h2>
            <p className="font-sans text-text-secondary mt-4 text-balance text-base sm:text-lg">
              Everything you need to know about our smart vending platform
            </p>
            <p className="font-sans text-text-secondary mt-6 hidden md:block">
              Can't find what you're looking for? Reach out to our{" "}
              <a
                href="#contact"
                className="text-[#991B1B] font-medium hover:underline"
              >
                support team
              </a>{" "}
              for assistance.
            </p>
          </div>

          <div className="md:col-span-3">
            {faqItems.map((item) => (
              <AccordionRow
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => toggle(item.id)}
              />
            ))}
          </div>

          <p className="font-sans text-text-secondary mt-6 md:hidden">
            Can't find what you're looking for? Contact our{" "}
            <a
              href="#contact"
              className="text-[#991B1B] font-medium hover:underline"
            >
              support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Faq;