import { motion } from "motion/react";
import { TestimonialsColumn } from "./ui/testimonials-columns-1";
import { useMemo } from "react";

const testimonials = [
  {
    text: "The smart vending machine has transformed our office break room. Employees love the seamless payment options and the variety of fresh, healthy snacks available 24/7.",
    image: "https://randomuser.me/api/portraits/women/11.jpg",
    name: "Sarah Johnson",
    role: "Office Manager, TechCorp",
  },
  {
    text: "We installed three machines in our hotel lobby and the guest feedback has been phenomenal. The touchless interface and real-time inventory tracking make management effortless.",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    name: "Michael Chen",
    role: "Facility Director, Grand Hotel",
  },
  {
    text: "Finally, a vending solution that understands health-conscious consumers. The nutritional info display and protein-rich options perfectly match our gym's philosophy.",
    image: "https://randomuser.me/api/portraits/women/13.jpg",
    name: "Emily Rodriguez",
    role: "Operations Head, FitLife Gym",
  },
  {
    text: "The AI-powered recommendations are incredibly accurate. Our members appreciate the personalized experience, and the analytics dashboard helps us optimize inventory.",
    image: "https://randomuser.me/api/portraits/men/14.jpg",
    name: "David Park",
    role: "CEO, StartupHub Co-Working",
  },
  {
    text: "In a healthcare setting, hygiene is paramount. The UV sanitization and contactless payment features give our staff and visitors complete peace of mind.",
    image: "https://randomuser.me/api/portraits/women/15.jpg",
    name: "Lisa Thompson",
    role: "HR Director, MedLife Hospital",
  },
  {
    text: "The smart vending machine has increased foot traffic in our mall. Shoppers love the interactive display and the loyalty rewards program keeps them coming back.",
    image: "https://randomuser.me/api/portraits/men/16.jpg",
    name: "James Wilson",
    role: "Retail Manager, MetroMall",
  },
  {
    text: "Students absolutely love the late-night access to snacks and beverages. The student discount integration and mobile app have made this incredibly popular on campus.",
    image: "https://randomuser.me/api/portraits/women/17.jpg",
    name: "Anna Kowalski",
    role: "Dean, BrightFuture University",
  },
];

const Testimonials = () => {
  const columns = useMemo(() => ({
    firstColumn: testimonials.slice(0, 3),
    secondColumn: testimonials.slice(3, 5),
    thirdColumn: testimonials.slice(5, 7),
  }), []);

  const headerAnimation = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
    viewport: { once: true },
  };

  return (
    <section className="bg-white my-12 sm:my-16 md:my-20 relative py-12 sm:py-16">
      <div className="container z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...headerAnimation}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border border-card-border py-1 px-4 rounded-lg text-primary font-sans text-sm font-medium">
              Testimonials
            </div>
          </div>

          <h2 className="font-heading font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-[41.6px] tracking-tighter mt-5 text-text text-center">
            What Our <span className="text-primary">Clients Say</span>
          </h2>
          <p className="font-sans text-center mt-5 text-text-secondary">
            Discover why businesses trust our smart vending solutions to
            revolutionize their spaces and delight their customers.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={columns.firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={columns.secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={columns.thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;