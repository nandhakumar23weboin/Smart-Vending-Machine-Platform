import { motion } from "framer-motion";
import React, { Suspense, lazy } from "react";
import {
  Sparkles,
  ArrowRight,
  Phone,
  Compass,
  Zap,
  SlidersHorizontal,
  LifeBuoy,
} from "lucide-react";
const Form = lazy(() => import("../components/Form")); // adjust path to wherever your existing Form component lives

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerChildren = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ------------------------------------------------------------------ */
/*  Static content                                                     */
/* ------------------------------------------------------------------ */

const reasons = [
  {
    icon: Compass,
    title: "Free Consultation",
    description:
      "Get expert guidance to choose the right vending solution for your space and budget.",
  },
  {
    icon: Zap,
    title: "Quick Response",
    description:
      "Our team responds to enquiries promptly during business hours, every time.",
  },
  {
    icon: SlidersHorizontal,
    title: "Customized Solutions",
    description:
      "Recommendations tailored precisely to your business requirements and footfall.",
  },
  {
    icon: LifeBuoy,
    title: "Reliable Support",
    description:
      "From consultation to installation and after-sales assistance, we've got you covered.",
  },
];

/* ------------------------------------------------------------------ */
/*  Reason card                                                        */
/*  Equal-height "notched ticket" panel — a clipped top-right corner   */
/*  reveals the red section behind it, with a cursor-tracked spotlight  */
/*  and a reveal underline on hover. Colors and icon untouched.        */
/* ------------------------------------------------------------------ */

function ReasonCard({ icon: Icon, title, description, index }) {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      variants={scaleIn}
      onMouseMove={handleMouseMove}
      className="group relative h-full"
    >
      {/* white panel */}
      <div
        className="relative flex h-full flex-col overflow-hidden bg-white p-8 pt-9 shadow-[0_1px_2px_rgba(17,24,39,0.04)] transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_30px_60px_-18px_rgba(0,0,0,0.35)]"
        style={{
          borderRadius: "28px",
        }}
      >
        {/* cursor-tracked spotlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(280px circle at var(--x, 50%) var(--y, 50%), rgba(220,38,38,0.08), transparent 75%)",
          }}
        />

        {/* icon, with a soft halo for extra depth — color untouched */}
        <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#991B1B] to-[#DC2626] shadow-[0_10px_24px_-8px_rgba(220,38,38,0.55),0_0_0_6px_rgba(220,38,38,0.07)] transition-transform duration-500 ease-out group-hover:scale-110">
          <Icon className="h-6 w-6 text-white" strokeWidth={2} />
        </div>

        <h3 className="relative text-lg font-semibold text-[#111827] font-['Tiktoksans_Variablefont_Opsz_Slnt_Wdth_Wght','Plus_Jakarta_Sans',Inter,ui-sans-serif,system-ui,sans-serif] font-[600]">
          {title}
        </h3>
        <p className="relative mt-2.5 text-sm leading-relaxed text-[#6B7280]">
          {description}
        </p>

        {/* reveal underline, pinned to the bottom so every card lines up evenly */}
        <div className="relative mt-auto pt-7">
          <div className="h-px w-full overflow-hidden rounded-full bg-[rgb(229_231_235/1)]">
            <div className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-[#991B1B] to-[#DC2626] transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Contact() {
  return (
    <main className="bg-white">
      {/* ============================================================ */}
      {/*  SECTION 1 — Hero                                              */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden px-6 pt-20 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20">
        {/* Decorative blurred shapes */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -left-24 h-72 w-72 rounded-full opacity-[0.18] blur-3xl sm:h-96 sm:w-96"
          style={{
            background:
              "radial-gradient(circle at center, #DC2626 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/3 -right-24 h-80 w-80 rounded-full opacity-[0.14] blur-3xl sm:h-[28rem] sm:w-[28rem]"
          style={{
            background:
              "radial-gradient(circle at center, #991B1B 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: "linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 60%)",
          }}
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerChildren}
          className="relative mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            className="glass mb-6 inline-flex items-center gap-2 rounded-full border border-[rgb(235,229,229)] px-4 py-1.5 text-sm font-medium text-[#991B1B]"
          >
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2.25} />
            Get In Touch
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-[#111827] sm:text-5xl lg:text-6xl font-['Tiktoksans_Variablefont_Opsz_Slnt_Wdth_Wght','Plus_Jakarta_Sans',Inter,ui-sans-serif,system-ui,sans-serif] font-[600]"
          >
            Let&apos;s Build Your{" "}
            <span className="bg-gradient-to-r from-[#991B1B] to-[#DC2626] bg-clip-text text-transparent">
              Smart Vending
            </span>{" "}
            Solution
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-balance text-base leading-relaxed text-[#6B7280] sm:text-lg"
          >
            Whether you&apos;re planning to install your first vending
            machine or expand your business, our team is here to help you
            choose the right solution for your business.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row"
          >
            <a
              href="#contact-form"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#B91C1C] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_-6px_rgba(185,28,28,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-6px_rgba(185,28,28,0.55)]"
            >
              Get Free Quote
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2.25}
              />
            </a>

            <a
              href="tel:+18001234567"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#DC2626] px-7 py-3.5 text-sm font-semibold text-[#111827] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#DC2626]/5"
            >
              <Phone className="h-4 w-4" strokeWidth={2.25} />
              Call Us
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 2 — Why Contact Us                                    */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-[#991B1B] px-6 py-20 sm:py-24 lg:py-28">
        {/* top S-curve — blends out of the white hero section above */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-14 w-full sm:h-20 lg:h-24"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C240,100 480,0 720,40 C960,80 1200,0 1440,40 L1440,0 L0,0 Z"
            fill="#FFFFFF"
          />
        </svg>

        {/* bottom S-curve — blends into the white form section below */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-14 w-full sm:h-20 lg:h-24"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C240,20 480,120 720,80 C960,40 1200,120 1440,80 L1440,120 L0,120 Z"
            fill="#FFFFFF"
          />
        </svg>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerChildren}
          className="relative z-10 mx-auto max-w-6xl"
        >
          <motion.div
            variants={fadeUp}
            className="mx-auto mb-14 max-w-2xl text-center sm:mb-20"
          >
            <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl font-['Tiktoksans_Variablefont_Opsz_Slnt_Wdth_Wght','Plus_Jakarta_Sans',Inter,ui-sans-serif,system-ui,sans-serif] font-[600]">
              Why Contact Us
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">
              A dedicated team ready to help you find the right fit, fast.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {reasons.map((reason, i) => (
              <ReasonCard
                key={reason.title}
                {...reason}
                index={String(i + 1).padStart(2, "0")}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/*  Existing Contact Form                                         */}
      {/* ============================================================ */}
      <section id="contact-form" className="w-full">
        <Suspense fallback={null}>
          <Form />
        </Suspense>
      </section>
    </main>
  );
}