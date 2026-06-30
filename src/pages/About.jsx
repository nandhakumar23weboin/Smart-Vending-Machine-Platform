import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Phone,
  ShieldCheck,
  CreditCard,
  Wrench,
  Headphones,
  SlidersHorizontal,
  PackageCheck,
  ClipboardList,
  PackageSearch,
  Truck,
  BookOpen,
  HeartHandshake,
  Building2,
  HeartPulse,
  GraduationCap,
  Hotel,
  Factory,
  Store,
  ShoppingBag,
  Dumbbell,
  Quote,
  Star,
  Users,
} from "lucide-react";

// Lazy load Form component
const Form = lazy(() => import("../components/Form"));

/* ================================================================== */
/*  ANIMATION VARIANTS                                                 */
/* ================================================================== */

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -36 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 36 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const VIEWPORT = { once: true, amount: 0.2 };

/* ================================================================== */
/*  STATIC CONTENT                                                     */
/* ================================================================== */

const whoWeArePoints = [
  {
    label: "Who we are",
    text: "A B2B vending solutions company built for businesses that expect more from a vending partner than a machine and a handshake.",
  },
  {
    label: "What we do",
    text: "We supply, install, and maintain smart vending machines — handling product selection, cashless payments, and day-to-day servicing.",
  },
  {
    label: "Who we serve",
    text: "Offices, hospitals, schools, hotels, factories, and retail spaces that need dependable self-service convenience around the clock.",
  },
  {
    label: "Why we exist",
    text: "Because businesses deserve a vending partner who stays involved long after installation, not one who disappears once the machine is plugged in.",
  },
];

const whyChooseUs = [
  {
    icon: PackageCheck,
    title: "Premium Machines",
    description: "Durable builds and refined finishes designed to fit naturally into modern interiors.",
  },
  {
    icon: CreditCard,
    title: "Cashless Technology",
    description: "UPI, card, and wallet support built in, so every transaction is fast and frictionless.",
  },
  {
    icon: Wrench,
    title: "Easy Installation",
    description: "Our technicians handle placement and setup with minimal disruption to your space.",
  },
  {
    icon: Headphones,
    title: "Reliable Support",
    description: "A dedicated support line keeps machines stocked, serviced, and running smoothly.",
  },
  {
    icon: SlidersHorizontal,
    title: "Business Customization",
    description: "Product range, branding, and machine type tailored to how your business actually runs.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description: "Every unit is tested and inspected before deployment for consistent performance.",
  },
];

const processSteps = [
  { icon: Users, step: "01", title: "Consultation", description: "We learn about your space, footfall, and goals." },
  { icon: ClipboardList, step: "02", title: "Requirement Analysis", description: "We map out machine type, placement, and product mix." },
  { icon: PackageSearch, step: "03", title: "Machine Recommendation", description: "We propose the right model for your business." },
  { icon: Truck, step: "04", title: "Installation", description: "Our technicians install and configure on-site." },
  { icon: BookOpen, step: "05", title: "Training", description: "Your team learns operation and basic upkeep." },
  { icon: HeartHandshake, step: "06", title: "Ongoing Support", description: "We stay on for servicing, restocking, and upgrades." },
];

const industries = [
  { icon: Building2, title: "Corporate Offices", description: "Keep teams refreshed throughout the workday." },
  { icon: HeartPulse, title: "Hospitals", description: "Round-the-clock access for staff and visitors." },
  { icon: GraduationCap, title: "Schools", description: "Safe, supervised options across campuses." },
  { icon: Hotel, title: "Hotels", description: "Elevated guest convenience, day and night." },
  { icon: Factory, title: "Factories", description: "Dependable breaktime access on the floor." },
  { icon: Store, title: "Retail Stores", description: "An easy added touchpoint for shoppers." },
  { icon: ShoppingBag, title: "Shopping Malls", description: "Built for high foot-traffic common areas." },
  { icon: Dumbbell, title: "Gyms", description: "Hydration and nutrition for members on the go." },
];

/* ================================================================== */
/*  REUSABLE COMPONENTS                                                */
/* ================================================================== */

function Eyebrow({ children, variant = "light" }) {
  const styles =
    variant === "dark"
      ? "border-white/25 bg-white/10 text-white"
      : "border-[#991B1B]/20 bg-[#991B1B]/10 text-[#991B1B]";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] ${styles}`}
    >
      {children}
    </span>
  );
}

function SectionHeading({ eyebrow, title, description, center = true, highlightWords = [], theme = "light" }) {
  const isDark = theme === "dark";
  const highlightColor = isDark ? "#FCA5A5" : "#991B1B";

  const formatTitle = (text) => {
    let formatted = text;
    highlightWords.forEach(word => {
      const regex = new RegExp(`(${word})`, 'g');
      formatted = formatted.replace(regex, `<span style="color: ${highlightColor};">$1</span>`);
    });
    return formatted;
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className={`flex flex-col gap-4 ${center ? "items-center text-center" : "items-start text-left"} max-w-2xl ${center ? "mx-auto" : ""}`}
    >
      <Eyebrow variant={isDark ? "dark" : "light"}>{eyebrow}</Eyebrow>
      <h2
        className={`text-3xl sm:text-4xl font-bold tracking-tight ${isDark ? "text-white" : "text-[#111827]"}`}
        dangerouslySetInnerHTML={{ __html: formatTitle(title) }}
      />
      {description && (
        <p className={`text-base sm:text-lg leading-relaxed ${isDark ? "text-white/75" : "text-[#6B7280]"}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}

function WhyChooseUsCard({ icon: Icon, title, description }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="group relative"
    >
      {/* Decorative quote marks in background */}
      <div className="absolute -top-6 -right-4 text-9xl text-[#991B1B]/5 select-none pointer-events-none" aria-hidden="true">
        <Quote className="w-24 h-24" />
      </div>
      
      {/* Main card */}
      <div className="relative bg-white rounded-3xl border-2 border-[#991B1B]/20 p-8 shadow-lg hover:shadow-2xl hover:border-[#991B1B]/40 transition-all duration-300">
        {/* Top accent bar */}
        <div className="absolute top-0 left-4 right-4 h-1.5 bg-[#991B1B] rounded-full transform -translate-y-1/2" />
        
        {/* Star decoration */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Star className="w-5 h-5 text-[#991B1B]/30 fill-current" />
        </div>
        
        {/* Content */}
        <div className="flex items-start gap-5">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#991B1B] text-white shadow-lg group-hover:rotate-12 transition-transform duration-300">
              <Icon className="h-7 w-7" strokeWidth={1.8} aria-hidden="true" />
            </div>
          </div>
          
          {/* Text content */}
          <div className="flex-1 pt-1">
            <h3 className="text-xl font-bold text-[#111827] mb-3 group-hover:text-[#991B1B] transition-colors">
              {title}
            </h3>
            <div className="relative">
              <span className="absolute -top-1 -left-1 text-3xl text-[#991B1B]/20 select-none">"</span>
              <p className="text-sm leading-relaxed text-[#6B7280] pl-3">
                {description}
              </p>
              <span className="absolute -bottom-3 right-0 text-3xl text-[#991B1B]/20 select-none">"</span>
            </div>
          </div>
        </div>
        
        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-[#991B1B]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );
}

function IndustryCard({ icon: Icon, title, description }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="group relative"
    >
      <div className="absolute -top-6 -right-4 text-9xl text-[#991B1B]/5 select-none pointer-events-none" aria-hidden="true">
        <Quote className="w-24 h-24" />
      </div>
      
      <div className="relative bg-white rounded-3xl border-2 border-[#991B1B]/20 p-8 shadow-lg hover:shadow-2xl hover:border-[#991B1B]/40 transition-all duration-300">
        <div className="absolute top-0 left-4 right-4 h-1.5 bg-[#991B1B] rounded-full transform -translate-y-1/2" />
        
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Star className="w-5 h-5 text-[#991B1B]/30 fill-current" />
        </div>
        
        <div className="flex items-start gap-5">
          <div className="flex-shrink-0">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#991B1B] text-white shadow-lg group-hover:rotate-12 transition-transform duration-300">
              <Icon className="h-7 w-7" strokeWidth={1.8} aria-hidden="true" />
            </div>
          </div>
          <div className="flex-1 pt-1">
            <h3 className="text-xl font-bold text-[#111827] mb-3 group-hover:text-[#991B1B] transition-colors">{title}</h3>
            <div className="relative">
              <span className="absolute -top-1 -left-1 text-3xl text-[#991B1B]/20 select-none">"</span>
              <p className="text-sm leading-relaxed text-[#6B7280] pl-3">{description}</p>
              <span className="absolute -bottom-3 right-0 text-3xl text-[#991B1B]/20 select-none">"</span>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-[#991B1B]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );
}

/* ================================================================== */
/*  MAIN COMPONENT                                                     */
/* ================================================================== */

export default function About() {
  return (
    <main className="min-h-screen bg-white text-[#111827]">
      {/* ============================================================ */}
      {/* 1. HERO WITH BACKGROUND IMAGE - BLACK TO WHITE FILTER          */}
      {/* ============================================================ */}
      <section className="relative isolate overflow-hidden px-6 pt-32 pb-28 sm:pt-40 sm:pb-36 min-h-[90vh] flex items-center" aria-label="About us introduction">
        {/* Background Image with Black to White Filter */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `url('/src/assets/about-background.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'grayscale(100%) brightness(1.1) contrast(1.2)',
          }}
          aria-hidden="true"
        />
        
        {/* Light overlay for readability */}
        <div
          className="absolute inset-0 -z-5 bg-gradient-to-b from-white/80 via-white/60 to-white/90"
          aria-hidden="true"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          <motion.div variants={fadeUp}>
            <Eyebrow>
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
              About Us
            </Eyebrow>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-[#111827] sm:text-5xl lg:text-6xl"
          >
            Smart Vending Solutions{" "}
            <span className="text-[#991B1B]">
              Built for Modern Businesses
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-relaxed text-[#374151] sm:text-xl">
            We design, install, and support intelligent vending machines for offices, hospitals,
            schools, hotels, and commercial spaces — built for cashless convenience and dependable
            everyday performance.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#991B1B] px-8 py-4 text-sm font-semibold text-white shadow-[0_8px_32px_-6px_rgba(153,27,27,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-6px_rgba(153,27,27,0.8)] hover:bg-[#7f1717]"
            >
              Get Free Quote
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#991B1B]/30 px-8 py-4 text-sm font-semibold text-[#111827] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#991B1B]/60 hover:bg-[#991B1B]/5"
            >
              <Phone className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              Contact Us
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/* 2. WHO WE ARE WITH IMAGE - FIXED HEIGHT & CENTERED           */}
      {/* ============================================================ */}
      <section className="px-6 py-12 sm:py-16 bg-gradient-to-b from-white to-gray-50" aria-labelledby="who-we-are-heading">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left Column - Image with fixed height */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-sm lg:max-w-md h-[350px] sm:h-[400px] lg:h-[450px] overflow-hidden rounded-3xl shadow-2xl group">
                <img
                  src="/src/assets/whoweare.png"
                  alt="Smart vending machine in modern business space"
                  className="w-full h-full object-fit object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Trust badge - repositioned */}
              <motion.div
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                className="absolute -bottom-4 -right-2 sm:right-0 max-w-[200px] sm:max-w-[220px] rounded-2xl border-2 border-[#991B1B]/20 bg-white/95 backdrop-blur-sm p-3 sm:p-4 shadow-xl"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-[#991B1B] text-white">
                    <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold leading-snug text-[#111827]">
                      Trusted by businesses
                    </p>
                    <p className="text-[10px] sm:text-xs text-[#6B7280] mt-0.5">Across multiple industries</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Properly centered content */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="flex flex-col justify-center max-w-lg mx-auto lg:mx-0 w-full"
            >
              <motion.div variants={fadeUp}>
                <Eyebrow>Our Story</Eyebrow>
              </motion.div>
              <motion.h2
                id="who-we-are-heading"
                variants={fadeUp}
                className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111827]"
              >
                Who We Are
              </motion.h2>

              <motion.p variants={fadeUp} className="mt-2 text-sm sm:text-base leading-relaxed text-[#6B7280]">
                We help businesses bring modern, self-service convenience into their everyday
                spaces — without the operational headache that usually comes with it.
              </motion.p>

              <div className="mt-5 space-y-3">
                {whoWeArePoints.map((point) => (
                  <motion.div key={point.label} variants={fadeUp} className="flex gap-3 group cursor-default">
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#991B1B] group-hover:scale-125 transition-transform" aria-hidden="true" />
                    <p className="text-sm leading-relaxed text-[#374151]">
                      <span className="font-semibold text-[#111827] group-hover:text-[#991B1B] transition-colors">{point.label}.</span>{" "}
                      <span className="text-[#6B7280]">{point.text}</span>
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. WHY CHOOSE US - RED SECTION BACKGROUND                     */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden px-6 py-16 sm:py-20 bg-[#831D1D]" aria-label="Why choose our vending solutions">
        {/* top S-curve — blends out of the section above */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-14 w-full sm:h-20 lg:h-24"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C240,100 480,0 720,40 C960,80 1200,0 1440,40 L1440,0 L0,0 Z"
            fill="#F9FAFB"
          />
        </svg>

        {/* bottom S-curve — blends into the section below */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-14 w-full sm:h-20 lg:h-24"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C240,20 480,120 720,80 C960,40 1200,120 1440,80 L1440,120 L0,120 Z"
            fill="#F9FAFB"
          />
        </svg>

        <div className="relative z-10 mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Built for Businesses That Expect More"
            highlightWords={["Businesses", "That Expect More"]}
            description="Every part of our service is designed around dependability — not just on day one, but every day after."
            theme="dark"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {whyChooseUs.map((item) => (
              <WhyChooseUsCard key={item.title} {...item} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. OUR PROCESS                                                */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-b from-gray-50 to-white px-6 py-16 sm:py-20" aria-label="Our process">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="How It Works"
            title="Our Process"
            highlightWords={["Process"]}
            description="A clear, guided path from first conversation to long-term support."
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="relative mt-14"
          >
            <div
              className="absolute top-8 left-0 right-0 hidden h-0.5 bg-gradient-to-r from-transparent via-[#991B1B]/30 to-transparent lg:block"
              aria-hidden="true"
            />

            <ol className="grid gap-8 lg:grid-cols-6 lg:gap-4">
              {processSteps.map(({ icon: Icon, step, title, description }, index) => (
                <motion.li
                  key={step}
                  variants={fadeUp}
                  whileHover={{ y: -5 }}
                  className="relative flex gap-4 lg:flex-col lg:items-center lg:gap-0 lg:text-center group cursor-default"
                >
                  {index !== processSteps.length - 1 && (
                    <span
                      className="absolute top-14 left-7 h-[calc(100%+0.5rem)] w-0.5 bg-gradient-to-b from-[#991B1B]/40 to-[#991B1B]/10 lg:hidden"
                      aria-hidden="true"
                    />
                  )}

                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#991B1B] text-white shadow-[0_4px_18px_-4px_rgba(153,27,27,0.5)] ring-2 ring-[#991B1B]/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
                  </div>

                  <div className="lg:mt-3">
                    <span className="text-xs font-bold tracking-widest text-[#991B1B] bg-[#991B1B]/10 px-2 py-1 rounded-full">
                      {step}
                    </span>
                    <h3 className="mt-2 text-sm font-bold text-[#111827] group-hover:text-[#991B1B] transition-colors">{title}</h3>
                    <p className="mt-1 max-w-[10rem] text-xs leading-relaxed text-[#6B7280] lg:mx-auto">
                      {description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. INDUSTRIES WE SERVE - RED SECTION BACKGROUND               */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden px-6 py-16 sm:py-20 bg-[#831D1D]" aria-label="Industries we serve">
        {/* top S-curve — blends out of the section above */}
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

        {/* bottom S-curve — blends into the form section below */}
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

        <div className="relative z-10 mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Industries We Serve"
            title="One Solution, Many Environments"
            highlightWords={["Many Environments"]}
            description="Wherever people gather, our machines are built to fit in and keep running."
            theme="dark"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {industries.map((item) => (
              <IndustryCard key={item.title} {...item} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. FORM                                                       */}
      {/* ============================================================ */}
      <Suspense
        fallback={
          <div className="px-6 py-16" aria-hidden="true">
            <div className="mx-auto h-64 max-w-6xl animate-pulse rounded-3xl bg-gray-100" />
          </div>
        }
      >
        <Form />
      </Suspense>
    </main>
  );
}