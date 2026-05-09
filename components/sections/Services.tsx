"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { siteConfig } from "@/lib/site-config";

const ease = [0.22, 1, 0.36, 1] as const;

function ServiceCard({
  service,
  index,
}: {
  service: (typeof siteConfig.services)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "12%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: index * 0.12, ease }}
      className="group relative h-full"
    >
      {/* CV4 Liquid Glass card */}
      <div className="relative h-full flex flex-col overflow-hidden border border-gold-500/15 bg-navy-800/60 backdrop-blur-xl transition-all duration-700 hover:border-gold-500/40 hover:bg-navy-800/80 hover:-translate-y-2">
        {/* Gold accent corner */}
        <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute top-3 right-3 w-px h-6 bg-gold-500" />
          <div className="absolute top-3 right-3 w-6 h-px bg-gold-500" />
        </div>

        {/* Image with parallax */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.img
            style={{ y: imgY }}
            src={service.imageUrl}
            alt={service.name}
            className="absolute inset-0 w-full h-[120%] object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-800 via-navy-800/40 to-navy-800/10" />
          <div className="absolute top-5 left-5">
            <span className="eyebrow">{service.eyebrow}</span>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-7 lg:p-8 flex-1 flex flex-col gap-5">
          <h3 className="font-display text-3xl lg:text-4xl text-ivory leading-[1.1] tracking-[-0.01em]">
            {service.name}
          </h3>
          <p className="font-display italic text-gold-400/90 text-lg leading-snug">
            {service.tagline}
          </p>
          <p className="text-ivory/65 text-sm leading-relaxed">
            {service.description}
          </p>
          <ul className="mt-auto pt-4 space-y-2 border-t border-gold-500/15">
            {service.bullets.map((b, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-ivory/70 text-sm"
              >
                <span className="text-gold-500 mt-[6px] block w-3 h-px bg-gold-500 shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="relative bg-navy-900 py-28 lg:py-40 overflow-hidden"
    >
      <div className="px-6 lg:px-16 max-w-[1500px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="grid grid-cols-12 gap-6 lg:gap-12 mb-14 lg:mb-20 items-end"
        >
          <div className="col-span-12 lg:col-span-2">
            <span className="eyebrow">Practice areas</span>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl leading-[1.05] text-ivory max-w-[20ch]">
              Three mandates, <em className="italic gold-gradient-text">one desk.</em>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-3 lg:text-right">
            <p className="text-ivory/55 text-sm max-w-md lg:ml-auto">
              Capital, citizenship, and movement — coordinated by a single committee, never referred out.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {siteConfig.services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
