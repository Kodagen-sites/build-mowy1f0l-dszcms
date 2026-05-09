"use client";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import NumberCounter from "@/components/motion/NumberCounter";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Stats() {
  return (
    <section
      id="stats"
      className="relative bg-navy-900 py-28 lg:py-40 overflow-hidden"
    >
      {/* Aurora-curtain ambient bg */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(201,168,76,0.04) 50%, transparent 100%)",
        }}
      />
      <div className="absolute inset-x-0 top-1/2 h-px bg-gold-500/20" />

      <div className="relative px-6 lg:px-16 max-w-[1500px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-14 lg:mb-20"
        >
          <span className="eyebrow">By the numbers</span>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-ivory mt-4 max-w-[20ch] mx-auto leading-[1.08]">
            <em className="italic gold-gradient-text">Quietly</em> consequential.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gold-500/15 border border-gold-500/15">
          {siteConfig.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease }}
              className="bg-navy-900 p-8 lg:p-12 flex flex-col items-center text-center"
            >
              <div className="font-display text-5xl lg:text-7xl xl:text-8xl gold-gradient-text leading-none tracking-[-0.02em]">
                <NumberCounter
                  to={s.value}
                  suffix={s.suffix}
                  duration={1.6}
                />
              </div>
              <div className="mt-4 lg:mt-6 text-[11px] uppercase tracking-[0.28em] font-mono text-ivory/55">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
