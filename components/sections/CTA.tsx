"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { siteConfig } from "@/lib/site-config";

const ease = [0.22, 1, 0.36, 1] as const;

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const cta = siteConfig.cta;
  const contact = siteConfig.contact;

  return (
    <section
      id="contact"
      ref={ref}
      className="relative bg-navy-900 overflow-hidden"
    >
      {/* Parallax bg image (T4) — required by overrides for non-solid CTA bg */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.img
          style={{ y: imgY }}
          src="/section-cta.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-[130%] object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/95 via-navy-900/80 to-navy-900" />
      </div>

      <div className="relative px-6 lg:px-16 max-w-[1500px] mx-auto py-32 lg:py-48 grid grid-cols-12 gap-6 lg:gap-12">
        {/* Headline left */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
          className="col-span-12 lg:col-span-7"
        >
          <span className="eyebrow">{cta.eyebrow}</span>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-[88px] mt-6 text-ivory leading-[1.02] tracking-[-0.02em] whitespace-pre-line">
            {cta.headline.split("\n").map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? (
                  <em className="italic gold-gradient-text">{line}</em>
                ) : (
                  line
                )}
              </span>
            ))}
          </h2>
          <p className="mt-10 text-ivory/70 text-lg max-w-xl leading-relaxed">
            {cta.body}
          </p>
          <div className="mt-10">
            <a
              href={cta.primary.href}
              className="group inline-flex items-center gap-3 px-9 py-5 bg-gold-500 text-navy-900 hover:bg-gold-400 transition-all duration-500 text-xs uppercase tracking-[0.32em] font-mono font-medium"
            >
              <span>{cta.primary.label}</span>
              <span className="transition-transform duration-500 group-hover:translate-x-1.5">
                →
              </span>
            </a>
          </div>
        </motion.div>

        {/* Contact card right */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className="col-span-12 lg:col-span-5 lg:pl-12 lg:border-l lg:border-gold-500/15 flex flex-col gap-8"
        >
          <div>
            <div className="eyebrow mb-3">Direct line</div>
            <a
              href={`mailto:${contact.email}`}
              className="font-display text-2xl lg:text-3xl text-ivory hover:gold-text transition-colors block"
            >
              {contact.email}
            </a>
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className="font-display text-2xl lg:text-3xl text-ivory hover:gold-text transition-colors block mt-1"
            >
              {contact.phone}
            </a>
          </div>
          <div>
            <div className="eyebrow mb-3">Office</div>
            <p className="text-ivory/80 leading-relaxed">{contact.address}</p>
          </div>
          <div>
            <div className="eyebrow mb-3">Hours</div>
            <p className="text-ivory/80">{contact.hours}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
