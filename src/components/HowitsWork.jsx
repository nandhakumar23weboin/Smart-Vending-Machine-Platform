import React, { useRef, useState, useEffect } from "react"
import {
  MapPin,
  Settings2,
  Truck,
  Coffee,
  CreditCard,
  Activity,
  ArrowRight
} from "lucide-react"

const PROCESS_STEPS = [
  {
    id: "step-1",
    number: "01",
    title: "Identify the Perfect Spot",
    description:
      "Find the ideal, high-traffic location in your office lobby, breakroom, gym, university, or hospital. We conduct a quick, free site assessment to optimize placement and ensure power and connectivity requirements are met.",
    icon: MapPin,
    badge: "Free Site Survey",
    features: ["Space optimization", "Connectivity check", "Power compatibility"]
  },
  {
    id: "step-2",
    number: "02",
    title: "Select Your Machine",
    description:
      "Choose from our diverse line of smart vending machines. Whether you need a premium bean-to-cup espresso brewer, fresh food combos, or standard snack-and-drink solutions, we customize the hardware to fit your crowd.",
    icon: Settings2,
    badge: "Flexible Hardware",
    features: ["Premium coffee makers", "Smart cold beverage units", "Fresh food combos"]
  },
  {
    id: "step-3",
    number: "03",
    title: "Zero-Cost Installation",
    description:
      "We handle everything. Our experienced team delivers, positions, and installs your machine completely free of charge. No setup fees, no delivery costs, and no hidden contracts. It is entirely risk-free.",
    icon: Truck,
    badge: "100% Free Delivery",
    features: ["Professional setup", "Zero setup fees", "No-stress onboarding"]
  },
  {
    id: "step-4",
    number: "04",
    title: "Tailored Smart Stocking",
    description:
      "We design a curated menu of snacks, drinks, and meals based on your team's feedback. Choose from global brands, local favorites, or healthy, vegan, and organic selections. We customize the product catalog for your venue.",
    icon: Coffee,
    badge: "Curated Menu",
    features: ["Custom product selection", "Healthy snacks & salads", "Fresh daily restocks"]
  },
  {
    id: "step-5",
    number: "05",
    title: "Frictionless Tap & Pay",
    description:
      "Buying snacks is seamless. Customers check out instantly using modern cashless options: credit/debit cards, Apple Pay, Google Pay, smart cards, or department charge accounts. No more jammed coin slots.",
    icon: CreditCard,
    badge: "Cashless Convenience",
    features: ["Apple & Google Pay", "Tap-to-pay credit cards", "Secure transactions"]
  },
  {
    id: "step-6",
    number: "06",
    title: "AI Restocking & Analytics",
    description:
      "Our machines are connected to a cloud-based telemetry network. We receive automated real-time notifications about low inventory, hot-selling items, and machine health, triggering restocking visits before you run dry.",
    icon: Activity,
    badge: "AI Telemetry",
    features: ["Real-time inventory alerts", "Preventive maintenance"]
  },
]

// Process Card Component - Clean stack without blur/shadow
const ProcessCard = React.memo(({ step, stackPosition, totalCards }) => {
  const IconComponent = step.icon
  
  const getCardStyle = () => {
    if (stackPosition === 0) {
      // Front card - active and centered
      return {
        transform: 'translateY(0px) scale(1)',
        opacity: 1,
        zIndex: totalCards + 10,
        top: '50%',
        marginTop: '-200px', // Half of card height to center
      }
    }
    
    if (stackPosition < 0) {
      // Cards that have passed - hidden above
      return {
        transform: 'translateY(-100%) scale(0.85)',
        opacity: 0,
        zIndex: 0,
        pointerEvents: 'none',
        top: '0',
      }
    }
    
    // Cards behind the front card - stacked neatly
    const verticalOffset = stackPosition * 20 // Clean spacing between cards
    const scale = 1 - (stackPosition * 0.03) // Slightly smaller
    const opacity = 1 - (stackPosition * 0.15) // Gradually fade
    const zIndex = totalCards - stackPosition
    
    return {
      transform: `translateY(${verticalOffset}px) scale(${scale})`,
      opacity: Math.max(0.1, opacity),
      zIndex: zIndex,
      pointerEvents: 'none',
      top: '50%',
      marginTop: '-200px',
    }
  }

  return (
    <div
      className="absolute left-0 right-0 mx-auto bg-white rounded-2xl border border-gray-200"
      style={{
        ...getCardStyle(),
        maxWidth: '450px',
        width: '100%',
        transformOrigin: 'center center',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div className="p-6">
        {/* Top bar with Icon and Step Number */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <IconComponent className="h-5 w-5" strokeWidth={2.2} />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-gray-200">
            {step.number}
          </span>
        </div>

        {/* Header details */}
        <div className="mb-3">
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-accent px-2.5 py-1 rounded bg-accent/5 border border-accent/10">
            {step.badge}
          </span>
          <h3 className="mt-2 text-lg sm:text-xl font-bold tracking-tight text-gray-900">
            {step.title}
          </h3>
        </div>

        <p className="text-sm leading-relaxed text-gray-600">
          {step.description}
        </p>

        {/* Features checklist */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {step.features.map((feature, fIdx) => (
              <span
                key={fIdx}
                className="inline-flex items-center text-[11px] font-medium text-gray-600 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-md"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary mr-1.5" />
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})

ProcessCard.displayName = 'ProcessCard'

export default function HowitsWork() {
  const cardsSectionRef = useRef(null)
  const stackContainerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  
  // Calculate stack position for each card
  const getStackPosition = (cardIndex) => {
    return cardIndex - activeIndex
  }

  useEffect(() => {
    const handleScroll = () => {
      if (!cardsSectionRef.current || !stackContainerRef.current) return
      
      const sectionRect = cardsSectionRef.current.getBoundingClientRect()
      const containerHeight = 500 // Height of our stack container
      
      // Calculate scroll progress through the section
      const sectionTop = sectionRect.top
      const sectionHeight = sectionRect.height
      const viewportHeight = window.innerHeight
      
      // How much of the section has been scrolled
      const scrollProgress = Math.max(0, Math.min(
        (-sectionTop + viewportHeight * 0.5) / (sectionHeight - containerHeight),
        1
      ))
      
      const newIndex = Math.min(
        Math.floor(scrollProgress * PROCESS_STEPS.length),
        PROCESS_STEPS.length - 1
      )
      
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeIndex])

  return (
    <section id="how-it-works" className="w-full bg-white py-20 px-4 sm:px-6 md:px-10 lg:py-28 font-sans">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Side: Sticky Intro */}
          <div className="lg:sticky lg:top-24 flex flex-col justify-center lg:min-h-[600px]">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary w-fit">
              How it works
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:leading-[1.1]">
              Launch Your Smart Vending Solution in{" "}
              <span className="bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                6 Simple Steps
              </span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-gray-600">
              From site evaluation to automated restocking, we manage the entire vending lifecycle. You provide the space; we handle the technology, logistics, maintenance, and refreshments.
            </p>
            
            {/* Step progress dots */}
            <div className="mt-8 space-y-3">
              <div className="flex gap-2">
                {PROCESS_STEPS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveIndex(index)
                      if (cardsSectionRef.current) {
                        const sectionHeight = cardsSectionRef.current.offsetHeight
                        const scrollTo = cardsSectionRef.current.offsetTop + (index / (PROCESS_STEPS.length - 1)) * (sectionHeight - 500)
                        window.scrollTo({ top: scrollTo, behavior: 'smooth' })
                      }
                    }}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      index === activeIndex 
                        ? 'w-8 bg-primary' 
                        : index < activeIndex
                        ? 'w-4 bg-primary/40'
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-primary">
                Step {activeIndex + 1} of {PROCESS_STEPS.length}
              </span>
            </div>
            
            <div className="mt-8 hidden lg:flex items-center gap-3 text-sm font-semibold text-primary">
              <span>Scroll down to reveal steps</span>
              <ArrowRight className="h-4 w-4 animate-bounce" />
            </div>
          </div>

          {/* Right Side: Clean Card Stack */}
          <div 
            ref={cardsSectionRef}
            className="relative"
            style={{ 
              minHeight: `${PROCESS_STEPS.length * 300 + 500}px`,
            }}
          >
            <div 
              ref={stackContainerRef}
              className="sticky top-24 w-full flex items-center"
              style={{ height: '500px' }}
            >
              <div className="relative w-full" style={{ height: '450px' }}>
                {PROCESS_STEPS.map((step, index) => (
                  <ProcessCard
                    key={step.id}
                    step={step}
                    stackPosition={getStackPosition(index)}
                    totalCards={PROCESS_STEPS.length}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}