import React, { useState, useEffect, useCallback } from "react";
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

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const closeMobileMenu = useCallback(() => {
    setIsOpen(false);
    setMobileDropdown(null);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "mt-0 px-0 sm:mt-4 sm:px-4 md:px-6"
            : "mt-0 px-0 sm:mt-4 sm:px-4 md:px-6"
        }`}
      >
        <div
          className={`mx-auto max-w-7xl transition-all duration-500 border-b border-red-500 ${
            isScrolled
              ? "glass-nav sm:rounded-2xl md:rounded-3xl border-b-0"
              : "bg-transparent border-transparent shadow-none"
          }`}
        >
          <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-3 lg:px-8">
            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center gap-1.5 sm:gap-2.5 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary sm:h-10 sm:w-10 sm:rounded-xl">
                <Sparkles
                  className="h-5 w-5 text-white sm:h-5 sm:w-6"
                  strokeWidth={2}
                />
              </div>
              <span className="text-lg font-black tracking-tight text-gray-900 sm:text-lg">
                Smart<span className="text-primary">Vend</span>
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
                    <button className="group relative flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-black text-gray-900 transition-all duration-300">
                      {link.name}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${
                          activeDropdown === link.name
                            ? "rotate-180 text-primary"
                            : ""
                        }`}
                        strokeWidth={2.5}
                      />
                      {/* Red underline animation */}
                      <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-primary transition-all duration-300 group-hover:w-3/4" />
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      className="group relative rounded-full px-3 py-2 text-sm font-black text-gray-900 transition-all duration-300"
                    >
                      {link.name}
                      {/* Red underline animation */}
                      <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-primary transition-all duration-300 group-hover:w-3/4" />
                    </a>
                  )}

                  {/* Dropdown - Clean white background without glassmorphism */}
                  {link.dropdown && (
                    <AnimatePresence>
                      {activeDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{
                            duration: 0.2,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="absolute top-full left-1/2 mt-2 w-48 -translate-x-1/2 rounded-2xl bg-white border border-gray-200 p-2 shadow-lg shadow-gray-200/50"
                        >
                          {link.dropdown.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-extrabold text-gray-900 transition-all duration-200 hover:bg-red-50 hover:text-primary"
                            >
                              <item.icon
                                className="h-4 w-4 text-primary"
                                strokeWidth={2}
                              />
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
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.035 }}
                whileTap={{ scale: 0.97 }}
                className="hidden items-center gap-2 rounded-full bg-cta px-4 py-2 text-sm font-black text-white transition-all hover:bg-cta-hover sm:flex"
              >
                <Phone className="h-4 w-4" strokeWidth={2.5} />
                <span>Get Started</span>
              </motion.a>

              {/* Mobile Menu Toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="relative flex h-12 w-12 items-center justify-center rounded-xl glass transition-all duration-300 lg:hidden sm:h-10 sm:w-10 sm:rounded-xl"
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
                      <X
                        className="h-6 w-6 text-gray-900 sm:h-5 sm:w-5"
                        strokeWidth={2.5}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu
                        className="h-6 w-6 text-gray-900 sm:h-5 sm:w-5"
                        strokeWidth={2.5}
                      />
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={closeMobileMenu}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-50 h-full w-full max-w-sm overflow-y-auto bg-white border-l border-gray-200 shadow-xl lg:hidden"
            >
              <div className="flex flex-col p-6 pt-20">
                <button
                  onClick={closeMobileMenu}
                  className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 transition-colors hover:bg-gray-200"
                >
                  <X className="h-5 w-5 text-gray-900" strokeWidth={2.5} />
                </button>

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
                                mobileDropdown === link.name ? null : link.name,
                              )
                            }
                            className="flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-base font-black text-gray-900 transition-all hover:bg-red-50 hover:text-primary"
                          >
                            {link.name}
                            <ChevronDown
                              className={`h-5 w-5 transition-transform duration-300 ${
                                mobileDropdown === link.name
                                  ? "rotate-180 text-primary"
                                  : ""
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
                                transition={{
                                  duration: 0.3,
                                  ease: "easeInOut",
                                }}
                                className="overflow-hidden"
                              >
                                <div className="ml-4 border-l-2 border-primary/20 py-2 pl-4">
                                  {link.dropdown.map((item) => (
                                    <a
                                      key={item.name}
                                      href={item.href}
                                      onClick={closeMobileMenu}
                                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-extrabold text-gray-900 transition-all hover:bg-red-50 hover:text-primary"
                                    >
                                      <item.icon
                                        className="h-4 w-4 text-primary"
                                        strokeWidth={2}
                                      />
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
                          onClick={closeMobileMenu}
                          className="block rounded-2xl px-4 py-3.5 text-base font-black text-gray-900 transition-all hover:bg-red-50 hover:text-primary"
                        >
                          {link.name}
                        </a>
                      )}
                    </motion.div>
                  ))}
                </nav>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 space-y-3"
                >
                  <a
                    href="#contact"
                    onClick={closeMobileMenu}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-cta px-6 py-4 text-base font-black text-white transition-all hover:bg-cta-hover"
                  >
                    <Phone className="h-5 w-5" strokeWidth={2.5} />
                    Get Started
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-auto pt-8"
                >
                  <p className="text-center text-sm font-bold text-gray-900">
                    Smart Vending Machine Platform
                  </p>
                  <p className="mt-1 text-center text-xs font-semibold text-gray-500">
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