import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaCheckCircle,
  FaChevronRight,
  FaSpinner,
  FaPaperPlane,
} from "react-icons/fa";

// -------------------------------------------------------------------------
// Lightweight intersection observer for scroll animations
// -------------------------------------------------------------------------
const useSimpleInView = () => {
  const [ref, setIsInView] = React.useState(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);

  return [setIsInView, inView];
};

// -------------------------------------------------------------------------
// FormField Component - Optimized with minimal animations
// -------------------------------------------------------------------------
const FormField = React.memo(({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required,
  as = "input",
  options = [],
  rows = 4,
}) => {
  const baseClasses =
    "w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-[13px] text-white placeholder:text-white/50 shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 hover:border-white/30";

  const errorClasses = error
    ? "border-red-300 focus:ring-red-300 focus:border-red-300 bg-red-500/10"
    : "";

  return (
    <div className="relative flex flex-col gap-0.5">
      <label className="text-[11px] font-semibold text-white/90">
        {label} {required && <span className="text-red-300">*</span>}
      </label>

      {as === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`${baseClasses} ${errorClasses} appearance-none cursor-pointer`}
          style={{
            backgroundImage: `url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')`,
            backgroundPosition: 'right 12px center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '10px'
          }}
        >
          <option value="" className="text-gray-900">
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="text-gray-900">
              {opt.label}
            </option>
          ))}
        </select>
      ) : as === "textarea" ? (
        <textarea
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${baseClasses} ${errorClasses} resize-none`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${baseClasses} ${errorClasses}`}
        />
      )}

      {error && (
        <p className="text-[10px] font-medium text-red-300 mt-0.5">
          {error}
        </p>
      )}
    </div>
  );
});

FormField.displayName = "FormField";

// -------------------------------------------------------------------------
// Main Form Component - Performance Optimized
// -------------------------------------------------------------------------
const Form = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    phone: "",
    email: "",
    interestedMachine: "",
    city: "",
    requirement: "",
    agreed: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [leftRef, leftInView] = useSimpleInView();
  const [rightRef, rightInView] = useSimpleInView();

  // Machine options - only 2 options
  const machineOptions = [
    { value: "smart-vending", label: "Smart Vending Machine" },
    { value: "coffee-machine", label: "Coffee Machine" },
  ];

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setErrors((prev) => {
      if (prev[name]) {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      }
      return prev;
    });
  }, []);

  const validate = useCallback(() => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required.";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\+?[\d\s-]{7,15}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number.";
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }
    if (!formData.interestedMachine) newErrors.interestedMachine = "Please select a machine type.";
    if (!formData.requirement.trim()) newErrors.requirement = "Please describe your requirement.";
    if (!formData.agreed) newErrors.agreed = "You must agree before submitting.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form Submitted:", formData);
      setIsSuccess(true);
      setFormData({
        fullName: "",
        companyName: "",
        phone: "",
        email: "",
        interestedMachine: "",
        city: "",
        requirement: "",
        agreed: false,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validate]);

  const contactCards = [
    {
      icon: <FaPhoneAlt className="text-sm" />,
      title: "Phone",
      detail: "+91 98765 43210",
    },
    {
      icon: <FaEnvelope className="text-sm" />,
      title: "Email",
      detail: "sales@smartvend.com",
    },
    {
      icon: <FaClock className="text-sm" />,
      title: "Business Hours",
      detail: "Mon - Sat, 9:00 AM - 6:00 PM",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-white py-4 sm:py-6 lg:py-8">
      {/* Removed background decorative elements */}
      
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[38%_62%] lg:gap-5">
          
          {/* ========== LEFT COLUMN ========== */}
          <div ref={leftRef}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center"
            >
              <span className="mb-2 inline-block w-fit rounded-full border border-primary/20 bg-red-50 px-2.5 py-0.5 text-[11px] font-semibold tracking-wider text-primary">
                Let's Talk
              </span>

              <h2 className="font-heading text-xl font-extrabold leading-tight sm:text-2xl lg:text-3xl">
                <span className="text-gray-900">Get a </span>
                <span className="text-primary">Free Consultation</span>
              </h2>

              <p className="mt-1.5 max-w-md text-xs leading-relaxed text-gray-500 sm:text-[13px]">
                Tell us about your business and we'll recommend the perfect
                vending machine solution for your needs.
              </p>

              {/* Contact cards */}
              <div className="mt-4 space-y-1.5 sm:mt-5 sm:space-y-2">
                {contactCards.map((card) => (
                  <div
                    key={card.title}
                    className="flex items-center gap-2.5 rounded-lg border border-gray-200/80 bg-white p-2.5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-3"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-primary">
                      {card.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                        {card.title}
                      </p>
                      <p className="mt-0.5 text-[12px] font-semibold text-gray-800 sm:text-[13px]">
                        {card.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust badges */}
              <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4">
                {["Free Consultation", "Fast Response", "Expert Guidance"].map(
                  (badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700 shadow-sm"
                    >
                      <FaCheckCircle className="text-[9px]" />
                      {badge}
                    </span>
                  )
                )}
              </div>
            </motion.div>
          </div>

          {/* ========== RIGHT COLUMN – FORM ========== */}
          <div ref={rightRef}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={rightInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="rounded-2xl bg-primary p-4 shadow-[0_8px_32px_rgba(153,27,27,0.25),0_4px_12px_rgba(0,0,0,0.1)] sm:rounded-3xl sm:p-5 lg:p-6">
                {/* Success message */}
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center gap-2 rounded-2xl bg-white/95 p-5 text-center shadow-lg"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 shadow-md">
                      <FaCheckCircle className="text-lg text-green-600" />
                    </div>
                    <h3 className="text-base font-bold text-gray-900">
                      Thank You!
                    </h3>
                    <p className="text-xs text-gray-600">
                      We've received your request and will get back to you within
                      24 business hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSuccess(false)}
                      className="mt-1 text-xs font-semibold text-primary underline underline-offset-4 hover:text-accent"
                    >
                      Submit another request
                    </button>
                  </motion.div>
                ) : (
                  <>
                    {/* Form Header */}
                    <div className="mb-3 sm:mb-4">
                      <h3 className="font-heading text-base font-bold text-white sm:text-lg">
                        Request a Quote
                      </h3>
                      <p className="mt-0.5 text-[11px] text-white/80 sm:text-xs">
                        Fill out the form below and our team will contact you within
                        24 business hours.
                      </p>
                    </div>

                    <form
                      onSubmit={handleSubmit}
                      noValidate
                      className="space-y-2.5 sm:space-y-3"
                    >
                      {/* Row 1: Full Name + Company Name */}
                      <div className="grid gap-2 sm:grid-cols-2 sm:gap-2.5">
                        <FormField
                          label="Full Name"
                          name="fullName"
                          placeholder="John Doe"
                          value={formData.fullName}
                          onChange={handleChange}
                          error={errors.fullName}
                          required
                        />
                        <FormField
                          label="Company / Business Name"
                          name="companyName"
                          placeholder="ABC Pvt Ltd"
                          value={formData.companyName}
                          onChange={handleChange}
                          error={errors.companyName}
                          required
                        />
                      </div>

                      {/* Row 2: Phone + Email */}
                      <div className="grid gap-2 sm:grid-cols-2 sm:gap-2.5">
                        <FormField
                          label="Phone Number"
                          name="phone"
                          type="tel"
                          placeholder="+91 9876543210"
                          value={formData.phone}
                          onChange={handleChange}
                          error={errors.phone}
                          required
                        />
                        <FormField
                          label="Email Address"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          error={errors.email}
                        />
                      </div>

                      {/* Row 3: Interested Machine + City */}
                      <div className="grid gap-2 sm:grid-cols-2 sm:gap-2.5">
                        <FormField
                          label="Interested Machine"
                          name="interestedMachine"
                          as="select"
                          placeholder="Choose machine type"
                          options={machineOptions}
                          value={formData.interestedMachine}
                          onChange={handleChange}
                          error={errors.interestedMachine}
                          required
                        />
                        <FormField
                          label="City / Location"
                          name="city"
                          placeholder="Chennai, Tamil Nadu"
                          value={formData.city}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Requirement Textarea */}
                      <FormField
                        label="Tell Us Your Requirement"
                        name="requirement"
                        as="textarea"
                        rows={2}
                        placeholder="Briefly describe your requirement..."
                        value={formData.requirement}
                        onChange={handleChange}
                        error={errors.requirement}
                        required
                      />

                      {/* Agreement Checkbox */}
                      <div className="flex flex-col">
                        <label className="flex cursor-pointer items-start gap-1.5 text-[11px] text-white/80">
                          <input
                            type="checkbox"
                            name="agreed"
                            checked={formData.agreed}
                            onChange={handleChange}
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-white/30 bg-white/20 accent-white"
                          />
                          <span>
                            I agree to be contacted regarding my enquiry.
                          </span>
                        </label>
                        {errors.agreed && (
                          <p className="mt-1 pl-5 text-[10px] font-medium text-red-300">
                            {errors.agreed}
                          </p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <div className="flex justify-start pt-0.5">
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className="group flex w-auto items-center gap-1.5 rounded-lg px-4 py-2 text-[12px] font-bold text-gray-900 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-70 sm:px-5 sm:py-2.5"
                          style={{ 
                            backgroundColor: '#FFFFFF',
                            transition: 'background-color 0.2s ease'
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#FF8559'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = '#FFFFFF'}
                        >
                          {isSubmitting ? (
                            <>
                              <FaSpinner className="animate-spin text-[10px]" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <FaPaperPlane className="text-[10px]" />
                              Request Free Quote
                              <FaChevronRight className="text-[10px]" />
                            </>
                          )}
                        </motion.button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;