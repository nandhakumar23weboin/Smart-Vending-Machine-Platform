import React from "react";
import { motion } from "motion/react";

export const TestimonialsColumn = ({ className, testimonials, duration = 10 }) => {
  return (
    <div className={className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="p-8 rounded-2xl bg-red-800 border border-white shadow-lg hover:shadow-xl transition-all duration-300 max-w-xs w-full"
                  key={i}
                >
                  {/* Quote icon */}
                  <svg 
                    className="w-8 h-8 text-white/30 mb-4" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  
                  {/* Testimonial text */}
                  <p className="text-white/90 text-sm leading-relaxed mb-6">
                    {text}
                  </p>
                  
                  {/* Divider */}
                  <div className="border-t border-white/20 pt-4">
                    <div className="flex items-center gap-3">
                      <img
                        width={44}
                        height={44}
                        src={image}
                        alt={name}
                        className="h-11 w-11 rounded-full object-cover ring-2 ring-white/50"
                      />
                      <div>
                        <h4 className="font-semibold text-white text-sm">
                          {name}
                        </h4>
                        <p className="text-white/70 text-xs mt-0.5">
                          {role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};