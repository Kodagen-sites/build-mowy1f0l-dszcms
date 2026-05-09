"use client";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

export default function ValueProp() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section
      ref={ref}
      className="relative bg-navy-900 py-32 lg:py-48 overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 pointer-events-none opacity-30"
      >
        <div
          className="absolute -left-1/4 top-1/4 w-[800px] h-[800px] rounded-full blur-[160px]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(201,168,76,0.18), transparent 70%)",
          }}
        />
      </motion.div>

      <div className="relative px-6 lg:px-16 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-12 gap-6 lg:gap-12 items-end">
          <div className="col-span-12 lg:col-span-2">
            <div className="eyebrow">A note on principle</div>
          </div>
          <div className="col-span-12 lg:col-span-10">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-3xl sm:text-5xl lg:text-7xl xl:text-[88px] leading-[1.05] text-ivory tracking-[-0.015em] max-w-[22ch]"
            >
              <span className="text-ivory">A small number of clients,</span>{" "}
              <em className="font-display italic gold-gradient-text">
                advised in full.
              </em>{" "}
              <span className="text-ivory/60">
                Forty country relationships, one desk, one decision.
              </span>
            </motion.h2>
          </div>
        </div>

        <div className="gold-line mt-20 lg:mt-32 max-w-[200px]" />
      </div>
    </section>
  );
}
