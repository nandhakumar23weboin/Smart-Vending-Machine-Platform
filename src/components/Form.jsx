import React, { useState, useEffect, useRef } from "react";
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
// Custom hook to detect when element is in viewport
// -------------------------------------------------------------------------
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return [ref, isInView];
};

// -------------------------------------------------------------------------
// Reusable animated section wrapper
// -------------------------------------------------------------------------
const AnimatedSection = ({ children, className = "" }) => {
  const [ref, isInView] = useInView(0.15);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
            }
          : { opacity: 0, y: 40 }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
};

// -------------------------------------------------------------------------
// Reusable input component with subtle 3D shadow
// -------------------------------------------------------------------------
const FormField = ({
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
    "w-full rounded-lg border border-gray-200 bg-white px-3.5 py-3 text-[14px] text-gray-900 placeholder:text-gray-400 shadow-[0_2px_8px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-300/50 focus:border-red-400/50 focus:shadow-[0_4px_12px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.04)] hover:border-red-400/50 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.06)]";

  const errorClasses = error
    ? "border-red-400 focus:ring-red-300 focus:border-red-400 bg-red-50/30"
    : "";

  return (
    <motion.div
      className="relative flex flex-col gap-1"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label className="text-[13px] font-semibold text-white/90">
        {label} {required && <span className="text-red-300">*</span>}
      </label>

      {as === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`${baseClasses} ${errorClasses} appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%236B7280%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
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
        <motion.p
          className="text-xs font-medium text-red-300 mt-0.5"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};

// -------------------------------------------------------------------------
// Main Form Component
// -------------------------------------------------------------------------
const Form = () => {
  // ---------- form state ----------
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

  // ---------- options data ----------
  const machineOptions = [
    { value: "", label: "Select machine type" },
    { value: "snack", label: "Snack Vending Machine" },
    { value: "beverage", label: "Beverage Vending Machine" },
    { value: "combo", label: "Combo Vending Machine" },
    { value: "consultation", label: "Not Sure (Need Consultation)" },
  ];

  // ---------- handlers ----------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // ---------- validation ----------
  const validate = () => {
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
  };

  // ---------- submit ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1800));
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
  };

  // ---------- contact card data ----------
  const contactCards = [
    {
      icon: <FaPhoneAlt className="text-base" />,
      title: "Phone",
      detail: "+91 98765 43210",
    },
    {
      icon: <FaEnvelope className="text-base" />,
      title: "Email",
      detail: "sales@smartvend.com",
    },
    {
      icon: <FaClock className="text-base" />,
      title: "Business Hours",
      detail: "Mon - Sat, 9:00 AM - 6:00 PM",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
      {/* Subtle background blurs */}
      <div className="pointer-events-none absolute -top-40 left-0 h-[600px] w-[600px] rounded-full bg-red-50/60 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-red-50/60 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Two-column grid - reduced gap */}
        <div className="grid gap-6 lg:grid-cols-[42%_58%] lg:gap-8">
          {/* ========== LEFT COLUMN ========== */}
          <AnimatedSection>
            <div className="flex flex-col justify-center">
              {/* Badge */}
              <span className="mb-4 inline-block w-fit rounded-full border border-primary/20 bg-red-50 px-3.5 py-1 text-xs font-semibold tracking-wider text-primary">
                Let's Talk
              </span>

              <h2 className="font-heading text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">
                <span className="text-gray-900">Get a </span>
                <span className="text-primary">Free Consultation</span>
              </h2>

              <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-500 sm:text-[15px]">
                Tell us about your business and we'll recommend the perfect
                vending machine solution for your needs.
              </p>

              {/* Contact cards */}
              <div className="mt-6 space-y-2.5 sm:mt-8 sm:space-y-3">
                {contactCards.map((card) => (
                  <motion.div
                    key={card.title}
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-3 rounded-xl border border-gray-200/80 bg-white p-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.03)] transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.06),0_2px_4px_rgba(0,0,0,0.04)] sm:p-4"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-primary sm:h-10 sm:w-10">
                      {card.icon}
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                        {card.title}
                      </p>
                      <p className="mt-0.5 text-[13px] font-semibold text-gray-800 sm:text-sm">
                        {card.detail}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Trust badges */}
              <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
                {["Free Consultation", "Fast Response", "Expert Guidance"].map(
                  (badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-[11px] font-semibold text-green-700 shadow-sm"
                    >
                      <FaCheckCircle className="text-[10px]" />
                      {badge}
                    </span>
                  )
                )}
              </div>
            </div>
          </AnimatedSection>

          {/* ========== RIGHT COLUMN – FORM ========== */}
          <AnimatedSection>
            {/* Dark Red Container */}
            <div className="rounded-2xl bg-primary p-5 shadow-[0_8px_32px_rgba(153,27,27,0.25),0_4px_12px_rgba(0,0,0,0.1)] sm:rounded-3xl sm:p-6 lg:p-8">
              {/* Success message */}
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-3 rounded-2xl bg-white/95 p-6 text-center shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 shadow-md">
                    <FaCheckCircle className="text-xl text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Thank You!
                  </h3>
                  <p className="text-sm text-gray-600">
                    We've received your request and will get back to you within
                    24 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="mt-2 text-sm font-semibold text-primary underline underline-offset-4 hover:text-accent"
                  >
                    Submit another request
                  </button>
                </motion.div>
              ) : (
                <>
                  {/* Form Header */}
                  <div className="mb-5 sm:mb-6">
                    <h3 className="font-heading text-lg font-bold text-white sm:text-xl">
                      Request a Quote
                    </h3>
                    <p className="mt-1 text-[13px] text-white/80 sm:text-sm">
                      Fill out the form below and our team will contact you within
                      24 business hours.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-4 sm:space-y-4"
                  >
                    {/* Row 1: Full Name + Company Name */}
                    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
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
                    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
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
                    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                      <FormField
                        label="Interested Machine"
                        name="interestedMachine"
                        as="select"
                        placeholder="Select machine type"
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
                      rows={3}
                      placeholder="Briefly describe your requirement..."
                      value={formData.requirement}
                      onChange={handleChange}
                      error={errors.requirement}
                      required
                    />

                    {/* Agreement Checkbox */}
                    <div className="flex flex-col">
                      <label className="flex cursor-pointer items-start gap-2 text-[13px] text-white/80">
                        <input
                          type="checkbox"
                          name="agreed"
                          checked={formData.agreed}
                          onChange={handleChange}
                          className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/30 bg-white/20 accent-white"
                        />
                        <span>
                          I agree to be contacted regarding my enquiry.
                        </span>
                      </label>
                      {errors.agreed && (
                        <motion.p
                          className="mt-1.5 pl-6 text-xs font-medium text-red-300"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {errors.agreed}
                        </motion.p>
                      )}
                    </div>

                    {/* Submit Button - #FF9673 No Shadow */}
                    <div className="flex justify-start pt-1">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group flex w-auto items-center gap-2 rounded-lg px-5 py-2.5 text-[14px] font-bold text-gray-900 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-70 sm:px-6 sm:py-3"
                        style={{ backgroundColor: '#FFFFFF' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#FF8559'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#FFFFFF'}
                      >
                        {isSubmitting ? (
                          <>
                            <FaSpinner className="animate-spin text-xs" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <FaPaperPlane className="text-[11px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            Request Free Quote
                            <FaChevronRight className="text-[11px] transition-transform duration-300 group-hover:translate-x-0.5" />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Form;