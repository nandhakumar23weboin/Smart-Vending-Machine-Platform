import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Coffee,
  Zap,
  Phone,
} from "lucide-react";

const navLinks = [
  { name: "Home", href: "#" },
  {
    name: "Solutions",
    href: "#",
    dropdown: [
      { name: "Smart Vending", href: "#", icon: Zap },
      { name: "Coffee Machines", href: "#", icon: Coffee },
      { name: "Micro Markets", href: "#", icon: Sparkles },
    ],
  },
  { name: "Features", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "About", href: "#" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "mt-0 sm:mt-3 px-0 sm:px-3 md:px-4"
            : "mt-0 px-0"
        }`}
      >
        <div
          className={`mx-auto max-w-7xl transition-all duration-500 ${
            isScrolled
              ? "border border-cherry/20 bg-white/10 shadow-lg shadow-black/5 backdrop-blur-xl supports-backdrop-filter:bg-white/10 sm:rounded-2xl md:rounded-3xl"
              : "border-b border-red-500 bg-white/5 backdrop-blur-md supports-backdrop-filter:bg-white/5 sm:border-white/10"
          }`}
        >
          <div className="flex items-center justify-between px-3 py-2.5 sm:px-6 sm:py-3 lg:px-8">
            {/* Logo - Always visible on all screens */}
            <motion.a
              href="#"
              className="flex items-center gap-1.5 sm:gap-2.5 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Logo Icon */}
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-cherry shadow-md shadow-cherry/25 sm:h-10 sm:w-10 sm:rounded-xl sm:shadow-lg">
                <Sparkles className="h-4 w-4 text-white sm:h-5 sm:w-6" strokeWidth={2} />
                
              </div>
              {/* Text Logo - Always visible */}
              <span className="text-base font-bold tracking-tight text-ink sm:text-lg">
                Smart<span className="text-cherry">Vend</span>
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {link.dropdown ? (
                    <button
                      className={`group flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-cherry ${
                        isScrolled ? "text-ink" : "text-ink/80"
                      }`}
                    >
                      {link.name}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${
                          activeDropdown === link.name ? "rotate-180 text-cherry" : ""
                        }`}
                        strokeWidth={2.5}
                      />
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      className={`rounded-full px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-cherry ${
                        isScrolled ? "text-ink" : "text-ink/80"
                      }`}
                    >
                      {link.name}
                    </a>
                  )}

                  {/* Dropdown */}
                  {link.dropdown && (
                    <AnimatePresence>
                      {activeDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute top-full left-1/2 mt-2 w-48 -translate-x-1/2 rounded-2xl border border-white/20 bg-white/80 p-2 shadow-lg shadow-black/5 backdrop-blur-xl"
                        >
                          {link.dropdown.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-ink transition-all duration-200 hover:bg-cherry/10 hover:text-cherry"
                            >
                              <item.icon className="h-4 w-4" strokeWidth={2} />
                              {item.name}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              {/* CTA Button - Desktop */}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.035 }}
                whileTap={{ scale: 0.97 }}
                className="hidden items-center gap-2 rounded-full bg-cherry px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cherry/25 transition-all hover:bg-cherry-dark sm:flex"
              >
                <Phone className="h-4 w-4" strokeWidth={2.5} />
                <span>Get Started</span>
              </motion.a>

              {/* Mobile Menu Toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`relative flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300 lg:hidden sm:h-10 sm:w-10 sm:rounded-xl ${
                  isScrolled
                    ? "bg-white/10 backdrop-blur-md"
                    : "bg-white/5 backdrop-blur-sm"
                }`}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-4 w-4 text-ink sm:h-5 sm:w-5" strokeWidth={2.5} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-4 w-4 text-ink sm:h-5 sm:w-5" strokeWidth={2.5} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-50 h-full w-full max-w-sm overflow-y-auto bg-white/90 backdrop-blur-2xl shadow-2xl lg:hidden"
            >
              <div className="flex flex-col p-6 pt-20">
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-xl bg-black/5 transition-colors hover:bg-black/10"
                >
                  <X className="h-5 w-5 text-ink" strokeWidth={2.5} />
                </button>

                {/* Mobile Nav Links */}
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link, idx) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      {link.dropdown ? (
                        <div>
                          <button
                            onClick={() =>
                              setMobileDropdown(
                                mobileDropdown === link.name ? null : link.name
                              )
                            }
                            className="flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold text-ink transition-all hover:bg-cherry/5 hover:text-cherry"
                          >
                            {link.name}
                            <ChevronDown
                              className={`h-5 w-5 transition-transform duration-300 ${
                                mobileDropdown === link.name ? "rotate-180 text-cherry" : ""
                              }`}
                              strokeWidth={2.5}
                            />
                          </button>
                          <AnimatePresence>
                            {mobileDropdown === link.name && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <div className="ml-4 border-l-2 border-cherry/20 py-2 pl-4">
                                  {link.dropdown.map((item) => (
                                    <a
                                      key={item.name}
                                      href={item.href}
                                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink/80 transition-all hover:bg-cherry/5 hover:text-cherry"
                                    >
                                      <item.icon className="h-4 w-4" strokeWidth={2} />
                                      {item.name}
                                    </a>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <a
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="block rounded-2xl px-4 py-3.5 text-base font-semibold text-ink transition-all hover:bg-cherry/5 hover:text-cherry"
                        >
                          {link.name}
                        </a>
                      )}
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 space-y-3"
                >
                  <a
                    href="#contact"
                    onClick={() => setIsOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-cherry px-6 py-4 text-base font-semibold text-white shadow-lg shadow-cherry/25 transition-all hover:bg-cherry-dark"
                  >
                    <Phone className="h-5 w-5" strokeWidth={2.5} />
                    Get Started
                  </a>
                </motion.div>

                {/* Mobile Footer Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-auto pt-8"
                >
                  <p className="text-center text-sm text-neutral-500">
                    Smart Vending Machine Platform
                  </p>
                  <p className="mt-1 text-center text-xs text-neutral-400">
                    © 2026 SmartVend. All rights reserved.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}