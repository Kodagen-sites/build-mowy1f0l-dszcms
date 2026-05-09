"use client";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-navy-900 border-t border-gold-500/15 overflow-hidden">
      {/* Giant wordmark — FT3-inspired editorial accent */}
      <div className="px-6 lg:px-16 pt-20 lg:pt-32 pb-10 max-w-[1500px] mx-auto">
        <div className="grid grid-cols-12 gap-8 mb-16 lg:mb-24">
          <div className="col-span-12 lg:col-span-5">
            <span className="eyebrow mb-4 block">Nexus Global Consultancy</span>
            <p className="text-ivory/65 leading-relaxed max-w-md">
              {siteConfig.footer.statement}
            </p>
          </div>
          <div className="col-span-6 lg:col-span-2">
            <div className="eyebrow mb-4">Practice</div>
            <ul className="space-y-2 text-ivory/70 text-sm">
              {siteConfig.services.map((s) => (
                <li key={s.slug}>
                  <a
                    href={`#services`}
                    className="hover:text-gold-400 transition-colors"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-6 lg:col-span-2">
            <div className="eyebrow mb-4">Firm</div>
            <ul className="space-y-2 text-ivory/70 text-sm">
              <li>
                <a href="#pillars" className="hover:text-gold-400 transition-colors">
                  How we work
                </a>
              </li>
              <li>
                <a href="#stats" className="hover:text-gold-400 transition-colors">
                  By the numbers
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-gold-400 transition-colors">
                  Voices
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-12 lg:col-span-3">
            <div className="eyebrow mb-4">Reach us</div>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="block text-ivory hover:text-gold-400 transition-colors"
            >
              {siteConfig.contact.email}
            </a>
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
              className="block text-ivory hover:text-gold-400 transition-colors mt-1"
            >
              {siteConfig.contact.phone}
            </a>
            <p className="text-ivory/55 text-sm mt-3">
              {siteConfig.contact.address}
            </p>
          </div>
        </div>

        {/* Giant wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative pt-6 border-t border-gold-500/15"
        >
          <h2
            aria-hidden
            className="font-display text-[18vw] lg:text-[14vw] xl:text-[200px] text-ivory/[0.08] leading-none tracking-[-0.04em] select-none whitespace-nowrap"
          >
            <em className="italic">Nexus Global</em>
          </h2>
        </motion.div>

        <div className="mt-8 pt-6 border-t border-gold-500/15 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-ivory/45 font-mono uppercase tracking-[0.18em]">
          <span>© {year} Nexus Global Consultancy · Dubai · DIFC</span>
          <span>Private advisory · By appointment only</span>
        </div>
      </div>
    </footer>
  );
}
