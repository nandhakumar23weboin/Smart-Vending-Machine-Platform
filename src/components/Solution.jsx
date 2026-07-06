// src/components/Solution.jsx
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
  memo,
} from "react";
import { 
  Sparkles, 
  Zap, 
  Pointer, 
  Layout, 
  ArrowRight,
  Coffee,
  Users,
  ShoppingBag,
  Clock,
  Shield,
  TrendingUp,
  Wifi,
  CreditCard,
  Settings,
  Palette,
  BarChart3
} from "lucide-react";
import { motion } from "framer-motion";
import eventImage from "../assets/event.jpeg";
import yourBrandImage from "../assets/yourbrand.jpeg";
import automaticImage from "../assets/automatic.jpeg";

// ── Solutions data with features ──
const solutions = [
  {
    id: "solution-1",
    icon: <Zap className="h-4 w-4" strokeWidth={2.2} />,
    badge: "Event Ready",
    title: 'Perfect for <span style="color: #9F0712;">Events & Venues</span>',
    description:
      "Our smart vending machines are ideal for events, providing quick and efficient service. Boost revenue with automated retail that works 24/7.",
    buttonText: "Call now",
    imageSrc: eventImage,
    imageAlt: "Event vending machine",
    features: [
      { icon: <Users size={14} />, text: "High Traffic Ready" },
      { icon: <Clock size={14} />, text: "24/7 Operation" },
      { icon: <TrendingUp size={14} />, text: "Revenue Boost" },
    ],
  },
  {
    id: "solution-2",
    icon: <Pointer className="h-4 w-4" strokeWidth={2.2} />,
    badge: "Custom Branding",
    title: 'Elevate <span style="color: #9F0712;">Your Brand</span> Experience',
    description:
      "Customize your vending machines with your brand identity. Create a seamless brand experience that resonates with your customers.",
    buttonText: "Call now",
    imageSrc: yourBrandImage,
    imageAlt: "Branded vending machine",
    features: [
      { icon: <Palette size={14} />, text: "Full Customization" },
      { icon: <Shield size={14} />, text: "Brand Protection" },
      { icon: <ShoppingBag size={14} />, text: "Premium Experience" },
    ],
  },
  {
    id: "solution-3",
    icon: <Layout className="h-4 w-4" strokeWidth={2.2} />,
    badge: "Fully Automated",
    title: 'Complete <span style="color: #9F0712;">Automation</span> Solutions',
    description:
      "Deploy fully automatic vending machines that handle everything from inventory management to payment processing. Maximum efficiency, minimum effort.",
    buttonText: "Call now",
    imageSrc: automaticImage,
    imageAlt: "Fully automatic vending machine",
    features: [
      { icon: <Settings size={14} />, text: "Auto Management" },
      { icon: <CreditCard size={14} />, text: "Smart Payments" },
      { icon: <Wifi size={14} />, text: "Remote Monitoring" },
    ],
  },
];

// ── Stacked image carousel with smooth transitions ──
const ImageStack = memo(({ solutions, activeIndex }) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(400);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    function handleResize() {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
      checkMobile();
    }
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const length = solutions.length;

  function getImageStyle(index) {
    const gap = isMobile ? 20 : 48;
    const maxStickUp = isMobile ? 15 : 36;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + length) % length === index;
    const isRight = (activeIndex + 1) % length === index;

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: "translateX(0px) translateY(0px) scale(1) rotateY(0deg)",
        transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        filter: "brightness(1) blur(0px)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 0.85,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.9) rotateY(8deg)`,
        transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        filter: "brightness(0.85) blur(1px)",
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 0.85,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.9) rotateY(-8deg)`,
        transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        filter: "brightness(0.85) blur(1px)",
      };
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transform: "scale(0.7)",
      transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
      filter: "brightness(0.5) blur(2px)",
    };
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: isMobile ? "320px" : "450px",
        height: isMobile ? "200px" : "280px",
        margin: "0 auto",
        perspective: "1000px",
        overflow: "hidden",
      }}
    >
      {solutions.map((solution, i) => (
        <img
          key={solution.id}
          src={solution.imageSrc}
          alt={solution.imageAlt}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "1rem",
            boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
            border: "2px solid rgba(255,255,255,0.8)",
            ...getImageStyle(i),
            maxWidth: "100%",
            willChange: "transform, opacity, filter",
          }}
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop";
          }}
        />
      ))}
    </div>
  );
});
ImageStack.displayName = "ImageStack";

// ── Feature tag component ──
const FeatureTag = memo(({ icon, text }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "0.3rem",
      padding: "0.3rem 0.5rem",
      borderRadius: "0.5rem",
      background: "rgba(159, 7, 18, 0.06)",
      border: "1px solid rgba(159, 7, 18, 0.12)",
      fontSize: "clamp(0.62rem, 1vw, 0.75rem)",
      color: "#9F0712",
      fontWeight: 500,
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      whiteSpace: "nowrap",
    }}
  >
    {icon}
    {text}
  </div>
));
FeatureTag.displayName = "FeatureTag";

// ── Solution content ──
const SolutionContent = memo(({ solution, activeIndex, onScrollToForm, onInteractionStart, onInteractionEnd }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      key={activeIndex}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{ 
        display: "flex", 
        flexDirection: "column",
        height: "100%",
        minHeight: 0,
        width: "100%",
        overflow: "hidden",
      }}
      onMouseEnter={onInteractionStart}
      onMouseLeave={onInteractionEnd}
      onTouchStart={onInteractionStart}
      onTouchEnd={onInteractionEnd}
    >
      {/* Badge and Icon Row */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: "0.75rem", 
        marginBottom: "clamp(0.75rem, 1.5vw, 1rem)", 
        flexShrink: 0,
        justifyContent: isMobile ? "center" : "flex-start",
        flexWrap: "wrap",
      }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "0.75rem",
            background: "linear-gradient(135deg, rgba(159, 7, 18, 0.1) 0%, rgba(159, 7, 18, 0.05) 100%)",
            border: "1px solid rgba(159, 7, 18, 0.15)",
            color: "#9F0712",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {React.cloneElement(solution.icon, { size: 20 })}
        </div>
        <span
          style={{
            padding: "0.25rem 0.75rem",
            borderRadius: "9999px",
            background: "rgba(159, 7, 18, 0.08)",
            color: "#9F0712",
            fontSize: "clamp(0.7rem, 1vw, 0.8rem)",
            fontWeight: 600,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            border: "1px solid rgba(159, 7, 18, 0.15)",
            whiteSpace: "nowrap",
          }}
        >
          {solution.badge}
        </span>
      </div>

      {/* Main content area */}
      <div style={{ 
        display: "flex", 
        flexDirection: isMobile ? "column" : "row",
        flexWrap: "nowrap", 
        gap: "clamp(0.5rem, 1vw, 1rem)", 
        flex: 1, 
        minHeight: 0,
        width: "100%",
      }}>
        {/* Title and Description Column */}
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          flex: 1, 
          minWidth: 0,
          alignItems: isMobile ? "center" : "flex-start",
          textAlign: isMobile ? "center" : "left",
          width: "100%",
          overflow: "hidden",
        }}>
          {/* Solution title */}
          <motion.h3
            style={{
              color: "#111827",
              fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
              lineHeight: 1.3,
              marginBottom: "clamp(0.5rem, 0.8vw, 0.75rem)",
              fontWeight: 700,
              fontFamily: "'Tiktoksans Variablefont Opsz Slnt Wdth Wght', 'Plus Jakarta Sans', sans-serif",
              flexShrink: 0,
              letterSpacing: "-0.01em",
              textAlign: isMobile ? "center" : "left",
              width: "100%",
              wordWrap: "break-word",
              overflowWrap: "break-word",
            }}
            dangerouslySetInnerHTML={{ __html: solution.title }}
          />

          {/* Solution description */}
          <motion.p
            style={{
              color: "#6B7280",
              fontSize: "clamp(0.85rem, 1.2vw, 0.95rem)",
              lineHeight: 1.55,
              marginBottom: "clamp(0.75rem, 1.2vw, 1rem)",
              fontFamily: "'Plus Jakarta Sans', Inter, ui-sans-serif, system-ui, sans-serif",
              flexShrink: 0,
              textAlign: isMobile ? "center" : "left",
              width: "100%",
              wordWrap: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {solution.description}
          </motion.p>
        </div>
      </div>

      {/* Features tags */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "0.5rem",
          justifyContent: isMobile ? "center" : "flex-start",
          flexWrap: "wrap",
          marginBottom: "clamp(0.75rem, 1.2vw, 1rem)",
          flexShrink: 0,
          width: "100%",
        }}
      >
        {solution.features.map((feature, idx) => (
          <FeatureTag key={idx} icon={feature.icon} text={feature.text} />
        ))}
      </div>

      {/* CTA Button */}
      <div
        style={{
          borderTop: "1px solid #f3f4f6",
          paddingTop: "clamp(0.75rem, 1vw, 0.75rem)",
          flexShrink: 0,
          display: "flex",
          justifyContent: isMobile ? "center" : "flex-start",
          width: "100%",
        }}
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.stopPropagation();
            onScrollToForm();
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "linear-gradient(135deg, #9F0712 0%, #7f1d1d 100%)",
            color: "#ffffff",
            fontWeight: 600,
            fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)",
            padding: "clamp(0.65rem, 1vw, 0.8rem) clamp(1.5rem, 2vw, 2rem)",
            borderRadius: "0.75rem",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(159, 7, 18, 0.25), 0 1px 3px rgba(0,0,0,0.1)",
            fontFamily: "'Tiktoksans Variablefont Opsz Slnt Wdth Wght', 'Plus Jakarta Sans', sans-serif",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            whiteSpace: "nowrap",
            maxWidth: "100%",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)";
            e.currentTarget.style.boxShadow = "0 6px 24px rgba(159, 7, 18, 0.35), 0 2px 6px rgba(0,0,0,0.15)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, #9F0712 0%, #7f1d1d 100%)";
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(159, 7, 18, 0.25), 0 1px 3px rgba(0,0,0,0.1)";
            e.currentTarget.style.transform = "translateY(0px)";
          }}
        >
          {solution.buttonText}
          <motion.div
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight size={16} />
          </motion.div>
        </motion.button>
      </div>
    </motion.div>
  );
});
SolutionContent.displayName = "SolutionContent";

// ── Section header ──
const SectionHeader = memo(() => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        maxWidth: 600,
        margin: "0 auto clamp(1.5rem, 3vw, 2rem) auto",
        padding: "0 1rem",
        width: "100%",
      }}
    >
      {/* Pill badge */}
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          borderRadius: 9999,
          padding: "0.375rem 1rem",
          fontSize: "clamp(0.75rem, 1vw, 0.85rem)",
          fontWeight: 500,
          color: "#ffffff",
          border: "1px solid rgba(255,255,255,0.3)",
          background: "rgba(255,255,255,0.1)",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          marginBottom: "clamp(0.75rem, 1.2vw, 1rem)",
          backdropFilter: "blur(8px)",
          letterSpacing: "0.02em",
          whiteSpace: "nowrap",
        }}
      >
        <Coffee size={14} />
        Smart Vending Solutions
      </span>

      <h2
        style={{
          fontFamily: '"Tiktoksans Variablefont Opsz Slnt Wdth Wght", "Plus Jakarta Sans", Inter, ui-sans-serif, system-ui, sans-serif',
          fontStyle: "normal",
          fontWeight: 600,
          fontSize: isMobile ? "20px" : "41.6px",
          lineHeight: isMobile ? "28px" : "52px",
          color: "#ffffff",
          letterSpacing: "-0.02em",
          marginBottom: "clamp(0.5rem, 1vw, 0.75rem)",
          wordWrap: "break-word",
          overflowWrap: "break-word",
        }}
      >
        Find the Right Machine for{" "}
        <span style={{ color: "rgba(255,255,255,0.7)" }}>Your Needs</span>
      </h2>

      <p
        style={{
          fontSize: "clamp(0.85rem, 1.2vw, 1.05rem)",
          color: "rgba(255,255,255,0.75)",
          lineHeight: 1.6,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          maxWidth: 480,
          fontWeight: 400,
          wordWrap: "break-word",
          overflowWrap: "break-word",
        }}
      >
        Transform your business with intelligent vending technology. Discover smart solutions designed for every space.
      </p>
    </motion.div>
  );
});
SectionHeader.displayName = "SectionHeader";

// ── Main component ──
const Solution = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const autoplayRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const mouseDownX = useRef(0);
  const mouseUpX = useRef(0);
  const length = solutions.length;

  const scrollToForm = useCallback(() => {
    const formSection = document.getElementById("form-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % length);
  }, [length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + length) % length);
  }, [length]);

  const handleSelect = useCallback((i) => {
    setActiveIndex(i);
    setHasUserInteracted(true);
    setIsPaused(true);
  }, []);

  const handleInteractionStart = useCallback(() => {
    setHasUserInteracted(true);
    setIsPaused(true);
  }, []);

  const handleInteractionEnd = useCallback(() => {
    if (!hasUserInteracted) {
      setIsPaused(false);
    }
  }, [hasUserInteracted]);

  // Autoplay
  useEffect(() => {
    if (!isPaused && !hasUserInteracted) {
      autoplayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % length);
      }, 3000);
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [length, isPaused, hasUserInteracted]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
        handleInteractionStart();
      }
      if (e.key === "ArrowRight") {
        handleNext();
        handleInteractionStart();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handlePrev, handleNext, handleInteractionStart]);

  // Touch swipe handlers
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      handleInteractionStart();
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  }, [handleNext, handlePrev, handleInteractionStart]);

  // Mouse drag handlers
  const handleMouseDown = useCallback((e) => {
    mouseDownX.current = e.clientX;
  }, []);

  const handleMouseUp = useCallback((e) => {
    mouseUpX.current = e.clientX;
    const diff = mouseDownX.current - mouseUpX.current;
    if (Math.abs(diff) > 50) {
      handleInteractionStart();
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  }, [handleNext, handlePrev, handleInteractionStart]);

  const activeSolution = useMemo(() => solutions[activeIndex], [activeIndex]);

  return (
    <section
      style={{ 
        background: "linear-gradient(135deg, #9F0712 0%, #7f1d1d 100%)", 
        position: "relative",
        overflow: "hidden",
        width: "100%",
        maxWidth: "100vw",
      }}
    >
      {/* ── TOP WAVE ── */}
      <div 
        style={{ 
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          overflow: "hidden",
          lineHeight: 0,
          zIndex: 2
        }}
      >
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ 
            display: "block", 
            width: "100%", 
            height: "clamp(30px, 5vw, 60px)",
            position: "relative"
          }}
        >
          <path
            d="M0,80 L0,0 L1440,0 L1440,40 C1200,80 960,20 720,50 C480,80 240,20 0,50 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      {/* Subtle pattern overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.04,
          backgroundImage: `
            radial-gradient(circle, #ffffff 1px, transparent 1px),
            radial-gradient(circle at 20% 50%, rgba(255,255,255,0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)
          `,
          backgroundSize: "30px 30px, 100% 100%, 100% 100%",
          pointerEvents: "none",
        }}
      />

      {/* ── CONTENT ── */}
      <div style={{ 
        padding: "clamp(2rem, 5vw, 5rem) 0", 
        position: "relative", 
        zIndex: 1,
        width: "100%",
        overflow: "hidden",
      }}>
        <div style={{ 
          maxWidth: 1200, 
          margin: "0 auto", 
          padding: "0 clamp(1rem, 3vw, 1.5rem)",
          width: "100%",
          boxSizing: "border-box",
        }}>
          <SectionHeader />

          {/* Main grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
              gap: "clamp(1.5rem, 3vw, 3rem)",
              alignItems: "center",
              width: "100%",
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Left — image stack */}
            <div style={{ 
              cursor: "grab",
              padding: "clamp(0.5rem, 1vw, 1rem)",
              width: "100%",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <ImageStack solutions={solutions} activeIndex={activeIndex} />
            </div>

            {/* Right — premium white card */}
            <div
              style={{
                background: "#ffffff",
                borderRadius: "1.5rem",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)",
                padding: "clamp(1rem, 2vw, 2rem)",
                display: "flex",
                flexDirection: "column",
                height: "fit-content",
                position: "relative",
                overflow: "hidden",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              {/* Card subtle gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: "linear-gradient(90deg, #9F0712 0%, #dc2626 50%, #9F0712 100%)",
                  opacity: 0.8,
                  borderTopLeftRadius: "1.5rem",
                  borderTopRightRadius: "1.5rem",
                  zIndex: 1,
                }}
              />
              
              <SolutionContent
                solution={activeSolution}
                activeIndex={activeIndex}
                onScrollToForm={scrollToForm}
                onInteractionStart={handleInteractionStart}
                onInteractionEnd={handleInteractionEnd}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── BOTTOM WAVE ── */}
      <div 
        style={{ 
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          overflow: "hidden",
          lineHeight: 0,
          zIndex: 2
        }}
      >
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ 
            display: "block", 
            width: "100%", 
            height: "clamp(30px, 5vw, 60px)",
            position: "relative"
          }}
        >
          <path
            d="M0,80 L1440,80 L1440,0 L1440,30 C1200,0 960,60 720,30 C480,0 240,60 0,30 L0,0 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
};

export default Solution;