"use client";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative bg-navy-800 py-28 lg:py-40 overflow-hidden border-y border-gold-500/10"
    >
      <div className="px-6 lg:px-16 max-w-[1500px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="grid grid-cols-12 gap-6 lg:gap-12 mb-16 lg:mb-24 items-end"
        >
          <div className="col-span-12 lg:col-span-2">
            <span className="eyebrow">Voices</span>
          </div>
          <div className="col-span-12 lg:col-span-10">
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl leading-[1.05] text-ivory max-w-[24ch]">
              <span className="text-ivory/55">Names withheld;</span>{" "}
              <em className="italic gold-gradient-text">words on record.</em>
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {siteConfig.testimonials.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease }}
              className="relative flex flex-col gap-8"
            >
              <span
                aria-hidden
                className="font-display text-7xl text-gold-500/40 leading-none"
              >
                ""
              </span>
              <blockquote className="font-display text-xl lg:text-2xl text-ivory leading-snug">
                {t.quote}
              </blockquote>
              <figcaption className="mt-auto pt-6 border-t border-gold-500/15">
                <div className="text-ivory/85 text-sm">{t.author}</div>
                <div className="text-ivory/50 text-xs mt-1 font-mono uppercase tracking-[0.18em]">
                  {t.meta}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
