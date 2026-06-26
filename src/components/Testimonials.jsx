import { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Office Manager, TechCorp",
    content:
      "The smart vending machine has transformed our office break room. Employees love the seamless payment options and the variety of fresh, healthy snacks available 24/7.",
    rating: 5,
    avatar: "SJ",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Facility Director, Grand Hotel",
    content:
      "We installed three machines in our hotel lobby and the guest feedback has been phenomenal. The touchless interface and real-time inventory tracking make management effortless.",
    rating: 5,
    avatar: "MC",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Operations Head, FitLife Gym",
    content:
      "Finally, a vending solution that understands health-conscious consumers. The nutritional information display and protein-rich options perfectly match our gym's philosophy.",
    rating: 5,
    avatar: "ER",
  },
  {
    id: 4,
    name: "David Park",
    role: "CEO, StartupHub Co-Working",
    content:
      "The AI-powered recommendations are incredibly accurate. Our members appreciate the personalized experience, and the analytics dashboard helps us optimize inventory.",
    rating: 5,
    avatar: "DP",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "HR Director, MedLife Hospital",
    content:
      "In a healthcare setting, hygiene is paramount. The UV sanitization and contactless payment features give our staff and visitors complete peace of mind.",
    rating: 5,
    avatar: "LT",
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Retail Manager, MetroMall",
    content:
      "The smart vending machine has increased foot traffic in our mall. Shoppers love the interactive display and the loyalty rewards program keeps them coming back.",
    rating: 5,
    avatar: "JW",
  },
  {
    id: 7,
    name: "Anna Kowalski",
    role: "Dean, BrightFuture University",
    content:
      "Students absolutely love the late-night access to snacks and beverages. The student discount integration and mobile app have made this incredibly popular on campus.",
    rating: 5,
    avatar: "AK",
  },
];

const Testimonials = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const scrollPosition = useRef(0);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition.current += 0.5;

        if (scrollPosition.current >= scrollContainer.scrollWidth / 2) {
          scrollPosition.current = 0;
        }

        scrollContainer.scrollLeft = scrollPosition.current;
      }
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  const renderStars = (count) => {
    return Array.from({ length: count }, (_, i) => (
      <svg
        key={i}
        className="w-3.5 h-3.5 sm:w-4 sm:h-4"
        style={{ color: "#AC1E1E" }}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="relative w-full overflow-hidden bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 md:mb-12">
        <div className="text-center">
          <h2
            className="font-heading font-semibold text-[28px] leading-[36px] sm:text-[32px] sm:leading-[40px] md:text-[36px] md:leading-[44px] lg:text-[41.6px] lg:leading-[52px]"
          >
            What Our{" "}
            <span className="text-primary">Client Say</span>
          </h2>
          <p className="font-sans font-normal text-sm leading-[22px] sm:text-base sm:leading-[26px] md:text-lg md:leading-[29.25px] text-text-secondary mt-3 sm:mt-4 max-w-[90%] sm:max-w-xl md:max-w-2xl mx-auto">
            Discover why businesses trust our smart vending solutions to
            revolutionize their spaces and delight their customers.
          </p>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Gradient Overlays - Mobile responsive */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 lg:w-32 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-24 lg:w-32 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />

        {/* Scrolling Testimonials */}
        <div
          ref={scrollRef}
          className="flex overflow-x-hidden cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className="flex gap-4 sm:gap-5 md:gap-6 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 md:py-4" style={{ minWidth: "max-content" }}>
            {/* First set of cards */}
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="relative flex-shrink-0 w-[300px] sm:w-[340px] md:w-[380px] lg:w-[420px] rounded-xl sm:rounded-2xl p-[2px] transition-all duration-300 hover:shadow-xl group"
              >
                {/* Premium Gradient Border - Using #AC1E1E */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#AC1E1E] via-[#AC1E1E] to-white/30 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Card Content */}
                <div className="relative h-full bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6">
                  {/* Quote Icon */}
                  <div className="mb-2 sm:mb-3">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                      style={{ color: "#AC1E1E", opacity: 0.8 }}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-0.5 sm:gap-1 mb-2 sm:mb-3">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Testimonial Content */}
                  <p className="font-sans font-normal text-xs leading-[18px] sm:text-sm sm:leading-[20px] md:text-sm md:leading-[22px] lg:text-[15px] lg:leading-[24px] text-text-secondary mb-3 sm:mb-4">
                    "{testimonial.content}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-[#AC1E1E] to-[#8B1A1A] text-white font-sans font-semibold text-xs sm:text-sm md:text-[15px]">
                      {testimonial.avatar}
                    </div>
                    <div className="min-w-0">
                      <p className="font-sans font-semibold text-xs sm:text-sm md:text-[15px] leading-[16px] sm:leading-[18px] md:leading-[20px] text-text truncate">
                        {testimonial.name}
                      </p>
                      <p className="font-sans font-normal text-[10px] sm:text-xs md:text-[13px] leading-[14px] sm:leading-[16px] md:leading-[18px] text-text-secondary truncate">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Duplicate set for seamless infinite scroll */}
            {testimonials.map((testimonial) => (
              <div
                key={`duplicate-${testimonial.id}`}
                className="relative flex-shrink-0 w-[300px] sm:w-[340px] md:w-[380px] lg:w-[420px] rounded-xl sm:rounded-2xl p-[2px] transition-all duration-300 hover:shadow-xl group"
              >
                {/* Premium Gradient Border - Using #AC1E1E */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#AC1E1E] via-[#AC1E1E] to-white/30 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Card Content */}
                <div className="relative h-full bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6">
                  {/* Quote Icon */}
                  <div className="mb-2 sm:mb-3">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                      style={{ color: "#AC1E1E", opacity: 0.8 }}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-0.5 sm:gap-1 mb-2 sm:mb-3">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Testimonial Content */}
                  <p className="font-sans font-normal text-xs leading-[18px] sm:text-sm sm:leading-[20px] md:text-sm md:leading-[22px] lg:text-[15px] lg:leading-[24px] text-text-secondary mb-3 sm:mb-4">
                    "{testimonial.content}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-[#AC1E1E] to-[#8B1A1A] text-white font-sans font-semibold text-xs sm:text-sm md:text-[15px]">
                      {testimonial.avatar}
                    </div>
                    <div className="min-w-0">
                      <p className="font-sans font-semibold text-xs sm:text-sm md:text-[15px] leading-[16px] sm:leading-[18px] md:leading-[20px] text-text truncate">
                        {testimonial.name}
                      </p>
                      <p className="font-sans font-normal text-[10px] sm:text-xs md:text-[13px] leading-[14px] sm:leading-[16px] md:leading-[18px] text-text-secondary truncate">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;