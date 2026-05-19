"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/about" },
    { name: "DIVISIONS", href: "/divisions" },
    { name: "CONTACT", href: "/contact" },
    { name: "PARTNER WITH US", href: "/distributor-inquiry" },
  ];

  if (pathname.startsWith('/admin')) return null;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 relative flex justify-center md:justify-between items-center">
        {/* Centered Glass Navbar for Links */}
        <div className={`glass rounded-full px-8 py-3 hidden md:flex items-center justify-center gap-8 mx-auto ${
          isScrolled ? "shadow-md" : ""
        }`}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-sm font-medium transition-colors duration-300 py-1 ${
                  isActive ? "text-brand-blue font-semibold" : "text-brand-navy/80 hover:text-brand-orange"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1.5 left-2 right-2 h-0.5 bg-gradient-to-r from-brand-blue to-brand-cyan rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 z-10">
          <button
            className="text-brand-navy bg-white/50 p-2 rounded-full backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-4 right-4 mt-4 glass rounded-2xl p-4 flex flex-col gap-4 shadow-lg"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium text-brand-navy hover:text-brand-orange px-4 py-2 rounded-lg hover:bg-brand-clinical/50 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
