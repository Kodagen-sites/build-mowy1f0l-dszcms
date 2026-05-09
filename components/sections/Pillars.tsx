"use client";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Pillars() {
  return (
    <section
      id="pillars"
      className="relative bg-navy-800 py-28 lg:py-40 overflow-hidden border-y border-gold-500/10"
    >
      <div className="px-6 lg:px-16 max-w-[1500px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mb-16 lg:mb-24"
        >
          <span className="eyebrow mb-4 block">How we work</span>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl leading-[1.05] text-ivory max-w-[26ch]">
            <span className="text-ivory/60">Built around</span>{" "}
            <em className="italic gold-gradient-text">three quiet ideas.</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gold-500/15">
          {siteConfig.pillars.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease }}
              className="bg-navy-800 p-8 lg:p-12 group cursor-default"
            >
              <div className="flex items-start gap-5 mb-6">
                <span className="font-mono text-gold-500/80 text-sm pt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-3xl lg:text-4xl text-ivory leading-tight">
                  {p.title}
                </h3>
              </div>
              <p className="text-ivory/65 leading-relaxed">{p.body}</p>
              <div className="mt-8 h-px bg-gold-500/30 w-12 transition-all duration-500 group-hover:w-32" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
