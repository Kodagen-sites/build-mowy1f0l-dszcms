"use client";
import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { siteConfig } from "@/lib/site-config";

const ScrollCanvas = dynamic(() => import("@/components/ScrollCanvas"), { ssr: false });

interface FrameManifest {
  frameCount: number;
  frameDir: string;
  pattern?: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

// ─── Shared overlay layers ──────────────────────────────────────────────────

function DarkVeil() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_40%,rgba(10,12,15,0.45)_0%,rgba(10,12,15,0.15)_60%,transparent_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-navy-900/30 pointer-events-none" />
    </>
  );
}

function ScrollHint() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.8 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] font-mono text-ivory/45"
    >
      <span>Scroll</span>
      <span className="w-12 h-px bg-gold-500/50 relative overflow-hidden">
        <motion.span
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gold-500"
        />
      </span>
    </motion.div>
  );
}

// ─── Chapter components ──────────────────────────────────────────────────────

function ChapterHero({ opacity, y }: { opacity: any; y: any }) {
  const hero = siteConfig.hero;
  const headline = hero.headlineLines.map((l) => l.text).join(" ");
  return (
    <motion.div style={{ opacity }} className="absolute inset-0 z-10 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto px-6 flex flex-col items-center text-center pt-16">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="text-[11px] tracking-[0.28em] uppercase font-mono text-ivory/70 [text-shadow:0_1px_8px_rgba(0,0,0,0.8)] mb-7"
        >
          {hero.eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.5, ease }}
          className="font-display font-light leading-[1.0] tracking-[-0.03em] text-[clamp(48px,7vw,96px)]"
          style={{
            backgroundImage: "linear-gradient(90deg, #f4f1eb 0%, #f4f1eb 52%, rgba(244,241,235,0.42) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {headline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease }}
          className="mt-7 font-display text-ivory/75 text-lg lg:text-xl max-w-xl leading-relaxed [text-shadow:0_1px_12px_rgba(0,0,0,0.6)]"
        >
          {hero.subhead}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease }}
          className="mt-9 flex flex-col sm:flex-row gap-4"
        >
          <a href={hero.primaryCta.href} className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gold-500 text-navy-900 hover:bg-gold-400 transition-all duration-500 text-xs uppercase tracking-[0.28em] font-mono font-medium">
            <span>{hero.primaryCta.label}</span>
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </a>
          <a href={hero.secondaryCta.href} className="group inline-flex items-center justify-center gap-3 px-8 py-4 border border-ivory/30 text-ivory/75 hover:border-gold-500 hover:text-gold-400 transition-all duration-500 text-xs uppercase tracking-[0.28em] font-mono">
            <span>{hero.secondaryCta.label}</span>
            <span aria-hidden>↓</span>
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ChapterService({ opacity, service }: { opacity: any; service: (typeof siteConfig.services)[number] }) {
  return (
    <motion.div style={{ opacity }} className="absolute inset-0 z-10 flex items-end justify-start pb-20 px-10 lg:px-20 pointer-events-none">
      <div className="max-w-lg">
        <p className="text-[11px] tracking-[0.3em] uppercase font-mono text-gold-500/90 mb-4 [text-shadow:0_1px_8px_rgba(0,0,0,0.8)]">
          {service.eyebrow}
        </p>
        <h2
          className="font-display font-light leading-[1.05] tracking-[-0.025em] text-[clamp(32px,4.5vw,64px)] mb-5"
          style={{
            backgroundImage: "linear-gradient(90deg, #f4f1eb 0%, #f4f1eb 60%, rgba(244,241,235,0.5) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {service.tagline}
        </h2>
        <p className="text-ivory/70 text-base leading-relaxed [text-shadow:0_1px_10px_rgba(0,0,0,0.7)] max-w-md">
          {service.description}
        </p>
        <ul className="mt-5 space-y-2">
          {service.bullets.map((b) => (
            <li key={b} className="flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase font-mono text-ivory/60">
              <span className="w-4 h-px bg-gold-500/60 shrink-0" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function ChapterWhyUs({ opacity }: { opacity: any }) {
  const pillars = siteConfig.pillars;
  return (
    <motion.div style={{ opacity }} className="absolute inset-0 z-10 flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        <p className="text-[11px] tracking-[0.3em] uppercase font-mono text-gold-500/80 mb-6">
          Why Nexus
        </p>
        <h2
          className="font-display font-light leading-[1.0] tracking-[-0.03em] text-[clamp(36px,5vw,72px)] mb-12"
          style={{
            backgroundImage: "linear-gradient(90deg, #f4f1eb 0%, #f4f1eb 55%, rgba(244,241,235,0.45) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          One desk. Every border.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {pillars.map((p) => (
            <div key={p.title} className="flex flex-col items-center gap-3 px-4">
              <div className="w-8 h-px bg-gold-500/50" />
              <h3 className="font-mono text-[11px] tracking-[0.25em] uppercase text-ivory/90">{p.title}</h3>
              <p className="text-ivory/60 text-sm leading-relaxed [text-shadow:0_1px_10px_rgba(0,0,0,0.6)]">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ChapterStats({ opacity }: { opacity: any }) {
  const stats = siteConfig.stats;
  return (
    <motion.div style={{ opacity }} className="absolute inset-0 z-10 flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        <p className="text-[11px] tracking-[0.3em] uppercase font-mono text-gold-500/80 mb-8">
          The numbers
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 w-full">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-2">
              <span
                className="font-display font-light text-[clamp(40px,5vw,72px)] leading-none tracking-[-0.03em]"
                style={{
                  backgroundImage: "linear-gradient(135deg, #f4f1eb 0%, rgba(201,168,76,0.9) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.value}{s.suffix}
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-ivory/55">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ChapterCTA({ opacity }: { opacity: any }) {
  const cta = siteConfig.cta;
  return (
    <motion.div style={{ opacity }} className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
      <div className="w-full max-w-3xl mx-auto px-6 flex flex-col items-center text-center">
        <p className="text-[11px] tracking-[0.3em] uppercase font-mono text-gold-500/80 mb-6">
          {cta.eyebrow}
        </p>
        <h2
          className="font-display font-light leading-[1.05] tracking-[-0.03em] text-[clamp(36px,5vw,72px)] mb-6 whitespace-pre-line"
          style={{
            backgroundImage: "linear-gradient(90deg, #f4f1eb 0%, #f4f1eb 50%, rgba(244,241,235,0.45) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {cta.headline}
        </h2>
        <p className="text-ivory/65 text-base leading-relaxed max-w-lg [text-shadow:0_1px_10px_rgba(0,0,0,0.6)] mb-9">
          {cta.body}
        </p>
        <a
          href={cta.primary.href}
          className="pointer-events-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-gold-500 text-navy-900 hover:bg-gold-400 transition-all duration-500 text-xs uppercase tracking-[0.28em] font-mono font-medium"
        >
          <span>{cta.primary.label}</span>
          <span>→</span>
        </a>
      </div>
    </motion.div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

export default function Hero({ frames }: { frames: FrameManifest | null }) {
  const ref = useRef<HTMLElement>(null);
  const progress = useMotionValue(0);

  // Keep scroll progress updated from window scroll (for static fallback)
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const { top, height } = ref.current.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, -top / (height - window.innerHeight)));
      progress.set(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [progress]);

  // ── 6 chapter opacities — each chapter fades in and out at its window ─────
  //  ch0 Hero:     0.00 → 0.16
  //  ch1 Service1: 0.14 → 0.33
  //  ch2 Service2: 0.31 → 0.52
  //  ch3 Why Us:   0.50 → 0.68
  //  ch4 Stats:    0.66 → 0.84
  //  ch5 CTA:      0.82 → 1.00
  const FADE = 0.03;
  const ch0 = useTransform(progress, [0.00, 0.00, 0.13, 0.16], [1, 1, 1, 0]);
  const ch1 = useTransform(progress, [0.14, 0.17, 0.30, 0.33], [0, 1, 1, 0]);
  const ch2 = useTransform(progress, [0.31, 0.34, 0.49, 0.52], [0, 1, 1, 0]);
  const ch3 = useTransform(progress, [0.50, 0.53, 0.65, 0.68], [0, 1, 1, 0]);
  const ch4 = useTransform(progress, [0.66, 0.69, 0.81, 0.84], [0, 1, 1, 0]);
  const ch5 = useTransform(progress, [0.82, 0.85, 0.97, 1.00], [0, 1, 1, 0]);

  // Scroll-hint fades out after ch0
  const hintOpacity = useTransform(progress, [0.00, 0.12], [1, 0]);

  const overlayContent = (
    <>
      <DarkVeil />
      <ChapterHero opacity={ch0} y={0} />
      <ChapterService opacity={ch1} service={siteConfig.services[0]} />
      <ChapterService opacity={ch2} service={siteConfig.services[1]} />
      <ChapterWhyUs opacity={ch3} />
      <ChapterStats opacity={ch4} />
      <ChapterCTA opacity={ch5} />
      <motion.div style={{ opacity: hintOpacity }} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] font-mono text-ivory/45 pointer-events-none">
        <span>Scroll</span>
        <span className="w-12 h-px bg-gold-500/50 relative overflow-hidden">
          <motion.span
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-gold-500"
          />
        </span>
      </motion.div>
    </>
  );

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative w-full">
      {frames && frames.frameCount > 0 ? (
        <ScrollCanvas
          frameCount={frames.frameCount}
          pattern={`${frames.frameDir}/${frames.pattern ?? "frame-{n}.jpg"}`}
          padLength={4}
          scrollDistance={5}
          onProgress={(p) => progress.set(p)}
        >
          {overlayContent}
        </ScrollCanvas>
      ) : (
        <div className="relative w-full h-[100svh] overflow-hidden bg-navy-900">
          <div className="absolute inset-0">
            <img src="/scene-1-start.jpg" alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-90" />
          </div>
          {overlayContent}
        </div>
      )}
    </section>
  );
}
