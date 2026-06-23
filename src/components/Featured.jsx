// src/components/featured.jsx
import { useState } from "react";
import { Zap, Pointer, Layout, ArrowRight } from "lucide-react";
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
    default: "bg-[#991b1b] text-white hover:bg-[#b91c1c] shadow-lg hover:shadow-xl hover:shadow-[#991b1b]/20",
    outline: "border-2 border-[#991b1b] text-[#991b1b] hover:bg-[#991b1b] hover:text-white",
    ghost: "text-[#6b7280] hover:bg-gray-100 hover:text-[#111827]"
  };
  const sizeStyles = {
    default: "h-10 px-4 py-2 text-sm",
    lg: "h-12 px-8 py-3 text-base"
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

const Featured = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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
      setIsAnimating(true);
      setTimeout(() => {
        setActiveTab(index);
        setTimeout(() => {
          setIsAnimating(false);
        }, 50);
      }, 300);
    }
  };

  const currentTab = tabs[activeTab];

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fafafa] via-white to-[#fafafa]" />
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-[#991b1b]/5 to-transparent rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-[#dc2626]/5 to-transparent rounded-tr-full" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-4 text-center mb-12">
          <Badge variant="outline" className="animate-fade-in-up">
            Smart Vending Solutions
          </Badge>
          <h1 className="max-w-2xl text-3xl md:text-4xl lg:text-4xl font-bold text-[#111827] leading-tight animate-fade-in-up" style={{animationDelay: "0.1s"}}>
            Next-Generation Automated Retail Experience
          </h1>
          <p className="text-[#6b7280] text-lg max-w-xl animate-fade-in-up" style={{animationDelay: "0.2s"}}>
            Transform your business with intelligent vending technology.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 animate-fade-in-up" style={{animationDelay: "0.3s"}}>
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(index)}
              className={`
                group relative flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold
                transition-all duration-300
                ${activeTab === index 
                  ? 'bg-[#991b1b]/10 text-[#991b1b] shadow-md shadow-[#991b1b]/10' 
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
              {activeTab === index && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#991b1b] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="relative mx-auto max-w-screen-xl rounded-3xl bg-white border border-[#e5e7eb] overflow-hidden shadow-xl shadow-black/5">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left - Text Content */}
            <div className="p-8 lg:p-16 flex flex-col justify-center order-2 lg:order-1"> 
              <div 
                className="transition-all duration-300"
                style={{
                  opacity: isAnimating ? 0 : 1,
                  transform: isAnimating ? 'translateY(10px)' : 'translateY(0)',
                }}
              >
                <Badge variant="outline" className="mb-6 bg-white shadow-sm">
                  {currentTab.content.badge}
                </Badge>
                
                <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#111827] mb-6 leading-tight">
                  {currentTab.content.title}
                </h3>
                
                <p className="text-[#6b7280] text-lg mb-8 leading-relaxed">
                  {currentTab.content.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="default" size="lg" className="group">
                    {currentTab.content.buttonText}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Right - Image Content */}
            <div className="relative order-1 lg:order-2 bg-gradient-to-br from-[#991b1b]/5 to-[#dc2626]/5 p-8 lg:p-12 flex items-center justify-center min-h-[300px] lg:min-h-[500px]">
              <div className="relative group w-full">
                {/* Glow effect on hover */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#991b1b]/20 to-[#dc2626]/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                <div 
                  className="relative transition-all duration-300"
                  style={{
                    opacity: isAnimating ? 0 : 1,
                    transform: isAnimating ? 'scale(0.95)' : 'scale(1)',
                  }}
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/20 transform transition-transform duration-500 group-hover:scale-[1.02]">
                    <img
                      src={currentTab.content.imageSrc}
                      alt={currentTab.content.imageAlt}
                      className="w-full h-auto object-cover aspect-[4/3]"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop";
                      }}
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#991b1b]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(index)}
                className={`
                  w-2.5 h-2.5 rounded-full transition-all duration-300
                  ${activeTab === index 
                    ? 'bg-[#991b1b] scale-125' 
                    : 'bg-[#d1d5db] hover:bg-[#9ca3af]'
                  }
                `}
                aria-label={`Go to ${tab.label}`}
              />
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
        
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(153, 27, 27, 0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default Featured;