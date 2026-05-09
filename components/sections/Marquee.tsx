import { siteConfig } from "@/lib/site-config";

export default function MarqueeStrip() {
  const words = [...siteConfig.marqueeWords, ...siteConfig.marqueeWords];
  return (
    <div className="relative border-y border-gold-500/15 bg-navy-800 overflow-hidden">
      <div className="flex marquee-track whitespace-nowrap py-5 will-change-transform">
        {words.map((w, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-6 px-6 font-display text-2xl lg:text-3xl text-ivory/60"
          >
            <span>{w}</span>
            <span className="text-gold-500/60 font-mono text-base">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
