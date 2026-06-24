// src/components/featured.jsx
import { useState, useRef } from "react";
import { Zap, Pointer, Layout, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import eventImage from "../assets/event.jpeg";
import yourBrandImage from "../assets/yourbrand.jpeg";
import automaticImage from "../assets/automatic.jpeg";

// Custom Badge Component
const Badge = ({ children, variant = "default", className = "" }) => {
  const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors";
  const variantStyles = {
    default: "border-transparent bg-[#991b1b] text-white",
    outline: "border border-[#991b1b]/20 bg-[#991b1b]/5 text-[#991b1b]"
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};

// Custom Button Component
const Button = ({ children, variant = "default", size = "default", className = "", onClick }) => {
  const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md font-semibold transition-all duration-300";
  const variantStyles = {
    default: "bg-[#991b1b] text-white hover:bg-[#b91c1c] shadow-lg hover:shadow-xl",
    outline: "border-2 border-[#991b1b] text-[#991b1b] hover:bg-[#991b1b] hover:text-white",
    ghost: "text-[#6b7280] hover:bg-gray-100 hover:text-[#111827]"
  };
  const sizeStyles = {
    default: "h-10 px-4 py-2 text-sm",
    lg: "h-10 px-5 py-2 text-sm md:text-base"
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Solution = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const tabs = [
    {
      id: "tab-1",
      icon: <Zap className="h-4 w-4" />,
      label: "Smart Events",
      content: {
        badge: "Event Ready",
        title: "Perfect for Events & Venues",
        description: "Our smart vending machines are ideal for events, providing quick and efficient service. Boost revenue with automated retail that works 24/7.",
        buttonText: "Call now",
        imageSrc: eventImage,
        imageAlt: "Event vending machine"
      }
    },
    {
      id: "tab-2",
      icon: <Pointer className="h-4 w-4" />,
      label: "Your Brand",
      content: {
        badge: "Custom Branding",
        title: "Elevate Your Brand Experience",
        description: "Customize your vending machines with your brand identity. Create a seamless brand experience that resonates with your customers.",
        buttonText: "Call now",
        imageSrc: yourBrandImage,
        imageAlt: "Branded vending machine"
      }
    },
    {
      id: "tab-3",
      icon: <Layout className="h-4 w-4" />,
      label: "Full Auto",
      content: {
        badge: "Fully Automated",
        title: "Complete Automation Solutions",
        description: "Deploy fully automatic vending machines that handle everything from inventory management to payment processing. Maximum efficiency, minimum effort.",
        buttonText: "Call now",
        imageSrc: automaticImage,
        imageAlt: "Fully automatic vending machine"
      }
    }
  ];

  const handleTabChange = (index) => {
    if (!isAnimating && index !== activeTab) {
      setDirection(index > activeTab ? 1 : -1);
      setIsAnimating(true);
      setTimeout(() => {
        setActiveTab(index);
        setTimeout(() => {
          setIsAnimating(false);
        }, 50);
      }, 300);
    }
  };

  const handlePrev = () => {
    const newIndex = activeTab === 0 ? tabs.length - 1 : activeTab - 1;
    handleTabChange(newIndex);
  };

  const handleNext = () => {
    const newIndex = activeTab === tabs.length - 1 ? 0 : activeTab + 1;
    handleTabChange(newIndex);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const currentTab = tabs[activeTab];

  return (
    <section className="relative py-10 md:py-14 lg:py-16 bg-white">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-3 text-center mb-6 md:mb-8">
          <Badge variant="outline" className="animate-fade-in-up">
            Smart Vending Solutions
          </Badge>
          <h1 className="max-w-2xl text-2xl md:text-3xl lg:text-4xl font-bold text-[#111827] leading-tight animate-fade-in-up px-4" style={{animationDelay: "0.1s"}}>
            Find the Right Machine for Your Needs
          </h1>
          <p className="text-[#6b7280] text-sm md:text-base max-w-xl animate-fade-in-up px-4" style={{animationDelay: "0.2s"}}>
            Transform your business with intelligent vending technology.
          </p>
        </div>

        {/* Tab Navigation - Desktop */}
        <div className="hidden md:flex items-center justify-center gap-2 mb-6 animate-fade-in-up" style={{animationDelay: "0.3s"}}>
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(index)}
              className={`
                group relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold
                transition-all duration-300
                ${activeTab === index 
                  ? 'bg-[#991b1b]/10 text-[#991b1b] shadow-md' 
                  : 'text-[#6b7280] hover:text-[#111827] hover:bg-gray-100'
                }
              `}
            >
              <span className={`transition-colors duration-300 ${
                activeTab === index ? 'text-[#991b1b]' : 'text-[#6b7280] group-hover:text-[#111827]'
              }`}>
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div 
          className="relative mx-auto max-w-4xl lg:max-w-5xl rounded-2xl md:rounded-2xl bg-white border border-[#e5e7eb] overflow-hidden shadow-lg shadow-black/5"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Desktop Navigation - Top Right */}
          <div className="hidden md:flex absolute top-3 right-3 z-20 gap-1.5">
            <button
              onClick={handlePrev}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#991b1b] shadow-md hover:bg-[#b91c1c] transition-all duration-300 hover:scale-105"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={handleNext}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#991b1b] shadow-md hover:bg-[#b91c1c] transition-all duration-300 hover:scale-105"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Mobile Navigation - Right Side Compact */}
          <div className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-1.5">
            <button
              onClick={handlePrev}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-[#991b1b] shadow-md hover:bg-[#b91c1c] transition-all duration-300 active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-3.5 h-3.5 text-white" />
            </button>
            <button
              onClick={handleNext}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-[#991b1b] shadow-md hover:bg-[#b91c1c] transition-all duration-300 active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left - Text Content */}
            <div className="p-5 md:p-6 lg:p-8 flex flex-col justify-center order-2 lg:order-1">
              <div 
                className="transition-all duration-300"
                style={{
                  opacity: isAnimating ? 0 : 1,
                  transform: isAnimating ? `translateX(${direction * -20}px)` : 'translateX(0)',
                }}
              >
                <Badge variant="outline" className="mb-3 bg-white shadow-sm text-xs">
                  {currentTab.content.badge}
                </Badge>
                
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#111827] mb-2 md:mb-3 leading-tight">
                  {currentTab.content.title}
                </h3>
                
                <p className="text-[#6b7280] text-sm md:text-sm lg:text-base mb-4 md:mb-5 leading-relaxed">
                  {currentTab.content.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                  <Button variant="default" size="lg" className="group w-full sm:w-auto text-sm">
                    {currentTab.content.buttonText}
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Right - Image Content */}
            <div className="relative order-1 lg:order-2 p-4 md:p-5 lg:p-6 flex items-center justify-center min-h-[180px] md:min-h-[240px] lg:min-h-[280px]">
              <div className="relative group w-full max-w-[280px] md:max-w-[350px] lg:max-w-[380px] mx-auto">
                <div 
                  className="relative transition-all duration-300 w-full"
                  style={{
                    opacity: isAnimating ? 0 : 1,
                    transform: isAnimating ? `translateX(${direction * 20}px)` : 'translateX(0)',
                  }}
                >
                  <div className="relative rounded-lg md:rounded-xl overflow-hidden shadow-lg shadow-black/10 w-full">
                    <img
                      src={currentTab.content.imageSrc}
                      alt={currentTab.content.imageAlt}
                      className="w-full h-full object-cover max-h-[160px] md:max-h-[220px] lg:max-h-[260px]"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop";
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Tab Labels */}
        <div className="md:hidden mt-3 text-center">
          <div className="flex items-center justify-center gap-2">
            {tabs.map((tab, index) => (
              <span
                key={tab.id}
                className={`text-xs font-medium transition-colors duration-300 ${
                  activeTab === index ? 'text-[#991b1b]' : 'text-[#6b7280]'
                }`}
              >
                {tab.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Solution;