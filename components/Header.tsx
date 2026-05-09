"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Pillars", href: "#pillars" },
  { label: "Results", href: "#stats" },
  { label: "Voices", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "bg-navy-900/85 backdrop-blur-xl border-b border-gold-500/15"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="px-6 lg:px-10 h-16 lg:h-20 flex items-center justify-between gap-6">
          {/* Left edge — wordmark */}
          <Link
            href="/"
            className="flex items-baseline gap-3 group"
            aria-label="Nexus Global Consultancy home"
          >
            <span className="font-display text-xl lg:text-2xl tracking-[0.18em] text-ivory">
              NEXUS
            </span>
            <span className="hidden md:inline text-[10px] uppercase tracking-[0.32em] text-gold-500/80 font-mono pt-1">
              Global · Dubai
            </span>
          </Link>

          {/* Center — nothing (split-edges signature) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm text-ivory/75">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative py-1 transition-colors hover:text-gold-400"
              >
                <span>{link.label}</span>
                <span className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-px bg-gold-500 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          {/* Right edge — CTA */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-navy-900 hover:border-gold-500 transition-all duration-300 text-xs uppercase tracking-[0.24em] font-mono"
            >
              Consult
              <span aria-hidden>→</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span
                className={`block h-px w-6 bg-ivory transition-transform duration-300 ${
                  open ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-6 bg-ivory transition-transform duration-300 ${
                  open ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-gold-500/15 bg-navy-900/95 backdrop-blur-xl"
          >
            <nav className="px-6 py-6 flex flex-col gap-4 text-ivory/80">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm uppercase tracking-[0.24em] font-mono hover:text-gold-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-3 border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-navy-900 transition-all text-xs uppercase tracking-[0.24em] font-mono"
              >
                Book consultation →
              </a>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
