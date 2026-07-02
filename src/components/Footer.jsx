import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  HiPhone,
  HiMail,
  HiLocationMarker,
  HiClock,
  HiShieldCheck,
  HiLightningBolt,
  HiStar,
  HiChevronRight
} from 'react-icons/hi';
import { SiMinutemailer } from 'react-icons/si';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-50px" });

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: custom * 0.08,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const solutions = [
    { name: 'Snack Vending Machine', href: '/SmartVending' },
    { name: 'Beverage Vending Machine', href: '/CoffeeMachine' },
  ];

  const contactInfo = [
    {
      icon: HiPhone,
      label: 'Phone',
      value: '+91 XXXXX XXXXX',
      href: 'tel:+91XXXXXXXXXX'
    },
    {
      icon: HiMail,
      label: 'Email',
      value: 'sales@company.com',
      href: 'mailto:sales@company.com'
    },
    {
      icon: HiLocationMarker,
      label: 'Location',
      value: 'Chennai, Tamil Nadu',
      href: '#'
    },
    {
      icon: HiClock,
      label: 'Business Hours',
      value: 'Mon – Sat | 9:00 AM – 6:00 PM',
      href: '#'
    },
  ];

  const trustBadges = [
    { icon: HiShieldCheck, text: 'Smart Solutions' },
    { icon: HiLightningBolt, text: 'Reliable Support' },
    { icon: HiStar, text: 'Premium Quality' },
  ];

  const socialLinks = [
    { icon: FaWhatsapp, href: '#', label: 'WhatsApp' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: HiMail, href: '#', label: 'Email' },
  ];

  return (
    <footer ref={footerRef} className="relative">
      {/* Wave Divider at Top */}
      <div className="relative w-full overflow-hidden leading-none bg-white">
        <svg
          viewBox="0 0 1440 120"
          className="relative block w-full h-[40px] sm:h-[50px] lg:h-[70px]"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 60 
               C320 100, 480 20, 720 45 
               C960 70, 1120 15, 1440 50 
               L1440 120 
               L0 120 
               Z"
            fill="url(#footerGradient)"
          />
          <defs>
            <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7f1d1d" />
              <stop offset="50%" stopColor="#8b1d1d" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Footer Content */}
      <div className="bg-gradient-to-br from-[#7f1d1d] via-[#8b1d1d] to-[#991b1b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14">
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">

            {/* COLUMN 1: Company */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0}
              className="col-span-2 lg:col-span-4"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/30">
                  <SiMinutemailer className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-white tracking-tight">
                  Smart<span className="text-red-300">Vend</span>
                </span>
              </div>

              <p className="text-red-100/70 text-sm leading-relaxed mb-5 max-w-xs">
                We provide modern smart vending machine solutions that help businesses automate sales and enhance customer convenience.
              </p>

              <div className="space-y-2.5 mb-6">
                {trustBadges.map((badge, index) => (
                  <motion.div
                    key={index}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    custom={index + 2}
                    className="flex items-center gap-2.5 text-red-100/80"
                  >
                    <badge.icon className="w-4 h-4 text-red-300 flex-shrink-0" />
                    <span className="text-sm font-medium">{badge.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-9 h-9 rounded-full bg-red-900/40 border border-red-700/30 flex items-center justify-center text-red-200/70 hover:bg-red-800 hover:text-white hover:border-red-500/50 transition-all duration-300 shadow-sm"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* COLUMN 2: Quick Links */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={1}
              className="col-span-1 lg:col-span-2"
            >
              <h3 className="text-white font-semibold text-xs uppercase tracking-[0.15em] mb-5 opacity-90">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <motion.div whileHover={{ x: 4 }}>
                      <Link
                        to={link.href}
                        onClick={() => window.scrollTo(0, 0)}
                        className="inline-flex items-center gap-2 text-red-100/70 hover:text-white transition-colors duration-200 text-sm group"
                      >
                        <HiChevronRight className="w-3.5 h-3.5 text-red-300/50 group-hover:text-red-300 transition-all duration-200 flex-shrink-0" />
                        <span>{link.name}</span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* COLUMN 3: Solutions */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={2}
              className="col-span-1 lg:col-span-3"
            >
              <h3 className="text-white font-semibold text-xs uppercase tracking-[0.15em] mb-5 opacity-90">
                Category
              </h3>
              <ul className="space-y-3">
                {solutions.map((solution, index) => (
                  <li key={index}>
                    <motion.div whileHover={{ x: 4 }}>
                      <Link
                        to={solution.href}
                        onClick={() => window.scrollTo(0, 0)}
                        className="inline-flex items-center gap-2 text-red-100/70 hover:text-white transition-colors duration-200 text-sm group"
                      >
                        <HiChevronRight className="w-3.5 h-3.5 text-red-300/50 group-hover:text-red-300 transition-all duration-200 flex-shrink-0" />
                        <span>{solution.name}</span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* COLUMN 4: Contact */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={3}
              className="col-span-2 lg:col-span-3"
            >
              <h3 className="text-white font-semibold text-xs uppercase tracking-[0.15em] mb-5 opacity-90">
                Contact
              </h3>
              <ul className="space-y-3.5">
                {contactInfo.map((item, index) => (
                  <li key={index}>
                    <motion.a
                      href={item.href}
                      whileHover={{ x: 2 }}
                      className="flex items-start gap-3 text-red-100/70 hover:text-white transition-colors duration-200 group"
                    >
                      <motion.span
                        whileHover={{ scale: 1.15, color: '#fca5a5' }}
                        className="mt-0.5 flex-shrink-0 transition-colors duration-200"
                      >
                        <item.icon className="w-4 h-4 text-red-300" />
                      </motion.span>
                      <div className="min-w-0">
                        <p className="text-[11px] text-red-300/60 font-medium uppercase tracking-wider mb-0.5">
                          {item.label}
                        </p>
                        <p className="text-sm font-medium leading-tight">{item.value}</p>
                      </div>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-red-700/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-red-200/50 text-xs font-medium"
              >
                © 2026 Smart Vending Machine. All rights reserved.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex items-center gap-6"
              >
                {['Privacy Policy', 'Terms & Conditions'].map((item, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ y: -1 }}
                    className="text-red-200/50 hover:text-red-200 text-xs font-medium transition-colors duration-200 relative after:absolute after:-bottom-0.5 after:left-0 after:w-full after:h-px after:bg-red-300/30 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                  >
                    {item}
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;