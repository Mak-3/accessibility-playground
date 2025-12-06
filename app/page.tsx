"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import logo from "../public/resources/logo.png";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [showSkipLink, setShowSkipLink] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (mobileMenuOpen && !target.closest("nav")) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-6 focus:py-3 focus:bg-blue-600 focus:text-white focus:rounded-xl focus:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-200"
        onFocus={() => setShowSkipLink(true)}
        onBlur={() => setShowSkipLink(false)}
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <nav
        className="fixed top-0 w-full bg-white/95 backdrop-blur-lg z-50 border-b border-gray-100 shadow-sm transition-all duration-300"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/"
                className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2 hover:opacity-80 transition-opacity"
                aria-label="Accessibility Playground Home"
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 relative flex-shrink-0">
                  <Image
                    src={logo}
                    alt="Accessibility logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="hidden sm:inline truncate">
                  Accessibility Playground
                </span>
                <span className="sm:hidden">A11y Tools</span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex gap-2 lg:gap-4" role="menubar">
              <li role="none">
                <button
                  onClick={() => scrollToSection("hero")}
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-3 py-2"
                  role="menuitem"
                  aria-label="Navigate to home section"
                >
                  Home
                </button>
              </li>
              <li role="none">
                <button
                  onClick={() => scrollToSection("tools")}
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-3 py-2"
                  role="menuitem"
                  aria-label="Navigate to tools section"
                >
                  Tools
                </button>
              </li>
              <li role="none">
                <button
                  onClick={() => scrollToSection("resources")}
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-3 py-2"
                  role="menuitem"
                  aria-label="Navigate to resources section"
                >
                  Resources
                </button>
              </li>
              <li role="none">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-3 py-2"
                  role="menuitem"
                  aria-label="Navigate to contact section"
                >
                  Contact
                </button>
              </li>
            </ul>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg transition-all duration-200"
              aria-label={
                mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"
              }
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4"
            >
              <ul className="flex flex-col gap-1" role="menubar">
                <li role="none">
                  <button
                    onClick={() => scrollToSection("hero")}
                    className="w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    role="menuitem"
                    tabIndex={0}
                  >
                    Home
                  </button>
                </li>
                <li role="none">
                  <button
                    onClick={() => scrollToSection("tools")}
                    className="w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    role="menuitem"
                    tabIndex={0}
                  >
                    Tools
                  </button>
                </li>
                <li role="none">
                  <button
                    onClick={() => scrollToSection("resources")}
                    className="w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    role="menuitem"
                    tabIndex={0}
                  >
                    Resources
                  </button>
                </li>
                <li role="none">
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    role="menuitem"
                    tabIndex={0}
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main id="main-content">
        <section
          id="hero"
          className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 sm:pt-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
          aria-labelledby="hero-heading"
        >
          {/* Animated Background Elements - More subtle */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-20 left-10 w-64 h-64 sm:w-96 sm:h-96 bg-blue-400/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.1, 1, 1.1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-20 right-10 w-72 h-72 sm:w-[450px] sm:h-[450px] bg-purple-400/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-80 sm:h-80 bg-indigo-400/20 rounded-full blur-3xl"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1
                id="hero-heading"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 leading-normal"
              >
                <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent pb-2">
                  Design for
                </span>
                <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 bg-clip-text text-transparent pb-2">
                  Everyone
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-10 sm:mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Create beautiful, accessible websites that work for everyone. Test
              colors, contrast, typography, and more with our powerful tools.
              <span className="block mt-2 font-semibold text-gray-900">
                Making the web accessible is not optional—it's essential.
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto"
            >
              <button
                onClick={() => scrollToSection("tools")}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-base sm:text-lg font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2"
                aria-label="Explore accessibility tools"
              >
                <span>Explore Tools</span>
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>

              <button
                onClick={() => scrollToSection("resources")}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-800 rounded-xl text-base sm:text-lg font-semibold shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-gray-200 hover:border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 focus:ring-offset-2"
                aria-label="Learn more about accessibility"
              >
                Learn More
              </button>
            </motion.div>
          </div>
        </section>

        {/* Tools Section */}
        <section
          id="tools"
          className="min-h-screen flex items-center py-16 sm:py-24 lg:py-32 relative bg-white"
          aria-labelledby="tools-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-12 sm:mb-16 lg:mb-20"
            >
              <h2
                id="tools-heading"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
              >
                Powerful Tools
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                Everything you need to build accessible experiences
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Contrast Checker Tool */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -8 }}
                className="group h-full"
              >
                <Link
                  href="/contrast-checker"
                  className="block h-full focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 rounded-2xl transition-all"
                  aria-label="Go to Contrast Checker tool"
                >
                  <article className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-blue-300 h-full flex flex-col">
                    <div
                      className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
                      aria-hidden="true"
                    >
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        role="img"
                        aria-label="Paint palette icon"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                      Contrast Checker
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed flex-grow">
                      Test color combinations for WCAG compliance. Ensure your
                      text is readable for everyone.
                    </p>
                    <div
                      className="flex items-center text-blue-600 font-semibold group-hover:gap-3 gap-2 transition-all text-sm sm:text-base"
                      aria-hidden="true"
                    >
                      <span>Try it now</span>
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </article>
                </Link>
              </motion.div>

              {/* Font Readability Tool */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -8 }}
                className="group h-full"
              >
                <Link
                  href="/font-readability"
                  className="block h-full focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-offset-2 rounded-2xl transition-all"
                  aria-label="Go to Font Readability tool"
                >
                  <article className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-purple-300 h-full flex flex-col">
                    <div
                      className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
                      aria-hidden="true"
                    >
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        role="img"
                        aria-label="Document icon"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                      Font Readability
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed flex-grow">
                      Analyze typography choices. Test fonts, sizes, and line
                      heights for optimal readability.
                    </p>
                    <div
                      className="flex items-center text-purple-600 font-semibold group-hover:gap-3 gap-2 transition-all text-sm sm:text-base"
                      aria-hidden="true"
                    >
                      <span>Try it now</span>
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </article>
                </Link>
              </motion.div>

              {/* Color Blindness Visualizer */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -8 }}
                className="group h-full"
              >
                <Link
                  href="/color-blindness"
                  className="block h-full focus:outline-none focus:ring-4 focus:ring-pink-400 focus:ring-offset-2 rounded-2xl transition-all"
                  aria-label="Go to Color Blindness Visualizer tool"
                >
                  <article className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-pink-300 h-full flex flex-col">
                    <div
                      className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
                      aria-hidden="true"
                    >
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        role="img"
                        aria-label="Eye icon"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                      Color Blindness Visualizer
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed flex-grow">
                      Simulate different types of color blindness. See your
                      design through different eyes.
                    </p>
                    <div
                      className="flex items-center text-pink-600 font-semibold group-hover:gap-3 gap-2 transition-all text-sm sm:text-base"
                      aria-hidden="true"
                    >
                      <span>Try it now</span>
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </article>
                </Link>
              </motion.div>

              {/* Screen Reader Preview Tool */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -8 }}
                className="group h-full"
              >
                <Link
                  href="/screen-reader-preview"
                  className="block h-full focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-offset-2 rounded-2xl transition-all"
                  aria-label="Go to Screen Reader Preview tool"
                >
                  <article className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-green-300 h-full flex flex-col">
                    <div
                      className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
                      aria-hidden="true"
                    >
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        role="img"
                        aria-label="Microphone icon"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                      Screen Reader Preview
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed flex-grow">
                      See how screen readers interpret your HTML. Check
                      headings, landmarks, and ARIA attributes.
                    </p>
                    <div
                      className="flex items-center text-green-600 font-semibold group-hover:gap-3 gap-2 transition-all text-sm sm:text-base"
                      aria-hidden="true"
                    >
                      <span>Try it now</span>
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </article>
                </Link>
              </motion.div>

              {/* Touch Target Size Checker */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -8 }}
                className="group h-full"
              >
                <Link
                  href="/touch-target-checker"
                  className="block h-full focus:outline-none focus:ring-4 focus:ring-orange-400 focus:ring-offset-2 rounded-2xl transition-all"
                  aria-label="Go to Touch Target Size Checker tool"
                >
                  <article className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-orange-300 h-full flex flex-col">
                    <div
                      className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
                      aria-hidden="true"
                    >
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        role="img"
                        aria-label="Hand icon"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                      Touch Target Checker
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed flex-grow">
                      Validate interactive element sizes for mobile. Ensure
                      buttons and links are easy to tap.
                    </p>
                    <div
                      className="flex items-center text-orange-600 font-semibold group-hover:gap-3 gap-2 transition-all text-sm sm:text-base"
                      aria-hidden="true"
                    >
                      <span>Try it now</span>
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </article>
                </Link>
              </motion.div>

              {/* HTML Semantic Analyzer */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -8 }}
                className="group h-full"
              >
                <Link
                  href="/html-semantic-analyzer"
                  className="block h-full focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-offset-2 rounded-2xl transition-all"
                  aria-label="Go to HTML Semantic Analyzer tool"
                >
                  <article className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-indigo-300 h-full flex flex-col">
                    <div
                      className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
                      aria-hidden="true"
                    >
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        role="img"
                        aria-label="Code icon"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                      HTML Semantic Analyzer
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed flex-grow">
                      Detect "div soup" and improve HTML structure. Get
                      suggestions for semantic elements.
                    </p>
                    <div
                      className="flex items-center text-indigo-600 font-semibold group-hover:gap-3 gap-2 transition-all text-sm sm:text-base"
                      aria-hidden="true"
                    >
                      <span>Try it now</span>
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </article>
                </Link>
              </motion.div>
            </div>

            {/* Feature Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
            >
              <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl sm:rounded-2xl text-center hover:scale-105 transition-transform duration-300">
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">
                  Visualize
                </div>
                <div className="text-sm sm:text-base text-gray-700 font-medium">
                  Understand accessibility
                </div>
              </div>
              <div className="p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl sm:rounded-2xl text-center hover:scale-105 transition-transform duration-300">
                <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">
                  WCAG
                </div>
                <div className="text-sm sm:text-base text-gray-700 font-medium">
                  2.1 Compliant
                </div>
              </div>
              <div className="p-4 sm:p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl sm:rounded-2xl text-center hover:scale-105 transition-transform duration-300">
                <div className="text-3xl sm:text-4xl font-bold text-pink-600 mb-2">
                  6
                </div>
                <div className="text-sm sm:text-base text-gray-700 font-medium">
                  Powerful Tools
                </div>
              </div>
              <div className="p-4 sm:p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl sm:rounded-2xl text-center hover:scale-105 transition-transform duration-300">
                <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">
                  Easy
                </div>
                <div className="text-sm sm:text-base text-gray-700 font-medium">
                  No Signup
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Resources Section */}
        <section
          id="resources"
          className="min-h-screen flex items-center py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
          aria-labelledby="resources-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-12 sm:mb-16 lg:mb-20"
            >
              <h2
                id="resources-heading"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
              >
                Learning Resources
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                Guides, documentation, and best practices for accessible design
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex justify-center"
            >
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-200 max-w-2xl w-full">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                      Accessibility Handbook
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                      Comprehensive guide covering WCAG guidelines, best
                      practices, and implementation strategies.
                    </p>
                    {/* Meta Info */}
                    <div className="flex items-center flex-wrap gap-3 sm:gap-4 text-xs text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        📄 52 pages
                      </span>
                      <span className="flex items-center gap-1">💾 5.5 MB</span>
                    </div>
                    <a
                      href="/resources/AccessibilityHandbook.pdf"
                      download="AccessibilityHandbook.pdf"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 text-sm sm:text-base"
                      aria-label="Download Accessibility Handbook PDF"
                    >
                      <span>Download PDF</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center hidden"
            >
              <Link
                href="/resources"
                className="inline-block focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-full"
              >
                <button
                  className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  aria-label="Browse all accessibility resources"
                >
                  Browse All Resources
                </button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="min-h-screen flex items-center justify-center py-16 sm:py-24 lg:py-32"
          aria-labelledby="contact-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-20"
            >
              <h2
                id="contact-heading"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                Get in Touch
              </h2>
            </motion.div>

            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-gray-100">
                {/* Intro */}
                <div className="flex flex-col justify-center text-center sm:text-left mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Let's Connect!
                  </h3>
                  <p className="text-gray-600 text-base sm:text-lg">
                    Feel free to reach out via email or connect with me on
                    LinkedIn. I'd love to hear from you!
                  </p>
                </div>

                {/* Contact Info */}
                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm text-gray-500 mb-1">Email</div>
                      <a
                        href="mailto:mohammedabdullahkhan26523@gmail.com"
                        className="font-semibold text-gray-900 hover:text-blue-600 transition-colors break-all text-sm sm:text-base"
                      >
                        mohammedabdullahkhan26523@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Portfolio */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm text-gray-500 mb-1">
                        Portfolio
                      </div>
                      <a
                        href="https://www.mohammedabdullahkhan.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-gray-900 hover:text-blue-600 transition-colors break-all text-sm sm:text-base"
                      >
                        mohammedabdullahkhan.com
                      </a>
                    </div>
                  </div>
                  {/* linkedin */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-pink-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm text-gray-500 mb-1">LinkedIn</div>
                      <a
                        href="https://www.linkedin.com/in/mohammed-abdullah-khan-7b82a31a5/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-gray-900 hover:text-blue-600 transition-colors break-all text-sm sm:text-base"
                      >
                        linkedin.com/in/mohammed-abdullah-khan...
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 sm:py-16"
        role="contentinfo"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                ♿ Accessibility Playground
              </h3>
              <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 leading-relaxed">
                Building a more accessible web, one tool at a time. Free
                resources for designers and developers.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://github.com/Mak-3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-600 hover:scale-110 rounded-lg flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  aria-label="Visit GitHub profile (opens in new tab)"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/mohammed-abdullah-khan-7b82a31a5/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-600 hover:scale-110 rounded-lg flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  aria-label="Visit LinkedIn profile (opens in new tab)"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="https://www.mohammedabdullahkhan.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-indigo-600 hover:scale-110 rounded-lg flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  aria-label="Visit portfolio website (opens in new tab)"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg">
                Quick Links
              </h4>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                <li>
                  <button
                    onClick={() => scrollToSection("hero")}
                    className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:rounded px-1"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("tools")}
                    className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:rounded px-1"
                  >
                    Tools
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("resources")}
                    className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:rounded px-1"
                  >
                    Resources
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:rounded px-1"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Tools */}
            <div className="sm:col-span-2 lg:col-span-1">
              <h4 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg">
                Tools
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm sm:text-base">
                <li>
                  <Link
                    href="/contrast-checker"
                    className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:rounded px-1"
                  >
                    Contrast Checker
                  </Link>
                </li>
                <li>
                  <Link
                    href="/font-readability"
                    className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:rounded px-1"
                  >
                    Font Readability
                  </Link>
                </li>
                <li>
                  <Link
                    href="/color-blindness"
                    className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:rounded px-1"
                  >
                    Color Blindness
                  </Link>
                </li>
                <li>
                  <Link
                    href="/screen-reader-preview"
                    className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:rounded px-1"
                  >
                    Screen Reader Preview
                  </Link>
                </li>
                <li>
                  <Link
                    href="/touch-target-checker"
                    className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:rounded px-1"
                  >
                    Touch Target Checker
                  </Link>
                </li>
                <li>
                  <Link
                    href="/html-semantic-analyzer"
                    className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:rounded px-1"
                  >
                    HTML Semantic Analyzer
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center">
            <p className="text-sm sm:text-base text-gray-400">
              &copy; {new Date().getFullYear()} Accessibility Playground. Built
              with{" "}
              <span className="text-red-500" aria-label="love">
                ❤️
              </span>{" "}
              for everyone.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
