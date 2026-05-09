"use client";

/**
 * ScrollCanvas
 * Scroll-scrubbed frame sequence renderer.
 *
 * Uses CSS sticky (not GSAP pin) so the canvas stays absolute inside the
 * sticky container — z-index works correctly and there are no fixed-element
 * stacking-context escapes that hide overlay text.
 */

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  frameCount: number;
  pattern?: string;
  padLength?: number;
  scrollDistance?: number;
  snapPoints?: number[];
  children?: React.ReactNode;
  onProgress?: (progress: number) => void;
};

export default function ScrollCanvas({
  frameCount,
  pattern = "/frames/frame_{n}.jpg",
  padLength = 4,
  scrollDistance = 6,
  snapPoints,
  children,
  onProgress,
}: Props) {
  const outerRef = useRef<HTMLDivElement>(null);   // tall scroll space
  const stickyRef = useRef<HTMLDivElement>(null);  // sticky viewport-height container
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameStateRef = useRef({ current: 0 });

  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);

  // ── Frame loading ────────────────────────────────────────────
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(frameCount);
    let loadedCount = 0;
    let cancelled = false;

    const buildUrl = (i: number) => {
      const n = String(i + 1).padStart(padLength, "0");
      return pattern.replace("{n}", n);
    };

    const loadOne = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = img.onerror = () => {
          if (cancelled) return;
          images[i] = img;
          loadedCount++;
          setLoaded(loadedCount);
          resolve();
        };
        img.src = buildUrl(i);
      });

    (async () => {
      const firstBatch = Math.min(30, frameCount);
      await Promise.all(Array.from({ length: firstBatch }, (_, i) => loadOne(i)));
      if (cancelled) return;
      imagesRef.current = images;
      setReady(true);

      const queue = Array.from({ length: frameCount - firstBatch }, (_, i) => i + firstBatch);
      const workers = Array.from({ length: 8 }, async () => {
        while (queue.length && !cancelled) {
          const idx = queue.shift()!;
          await loadOne(idx);
        }
      });
      await Promise.all(workers);
    })();

    return () => { cancelled = true; };
  }, [frameCount, pattern, padLength]);

  // ── Canvas draw + scroll scrub ────────────────────────────────
  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    const outer = outerRef.current;
    if (!canvas || !outer) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const w = canvas.offsetWidth || window.innerWidth;
      const h = canvas.offsetHeight || window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(frameStateRef.current.current);
    };

    const draw = (index: number) => {
      const img = imagesRef.current[index];
      if (!img || !img.width) return;
      const cw = canvas.offsetWidth || window.innerWidth;
      const ch = canvas.offsetHeight || window.innerHeight;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    resize();
    window.addEventListener("resize", resize);

    const state = frameStateRef.current;
    const isMobile = window.innerWidth < 768;

    // Scrub against the tall outer div — no pin needed since sticky handles it
    const trigger = ScrollTrigger.create({
      trigger: outer,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      snap: isMobile || !snapPoints
        ? false
        : {
            snapTo: snapPoints,
            duration: { min: 0.2, max: 0.6 },
            delay: 0.1,
            ease: "power2.inOut",
          },
      onUpdate: (self) => {
        const target = Math.min(frameCount - 1, Math.floor(self.progress * (frameCount - 1)));
        if (target !== state.current) {
          state.current = target;
          draw(target);
        }
        onProgress?.(self.progress);
      },
    });

    return () => {
      window.removeEventListener("resize", resize);
      trigger.kill();
    };
  }, [ready, frameCount, scrollDistance, snapPoints, onProgress]);

  return (
    // Tall outer div creates the scroll space
    <div ref={outerRef} style={{ height: `${scrollDistance * 100}vh` }}>
      {/* Sticky container — stays in view while user scrolls through outer div */}
      <div
        ref={stickyRef}
        className="sticky top-0 overflow-hidden"
        style={{ height: "100vh" }}
      >
        {/* Canvas is absolute, same stacking context as children — no z-index escapes */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ background: "var(--bg-color, #0a0c0f)" }}
        />

        {/* Loading overlay */}
        {!ready && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-bg text-white">
            <div className="flex flex-col items-center gap-4">
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-white/60">
                Loading cinematic
              </div>
              <div className="h-px w-48 overflow-hidden bg-white/10">
                <div
                  className="h-full bg-white transition-[width] duration-150"
                  style={{ width: `${Math.round((loaded / frameCount) * 100)}%` }}
                />
              </div>
              <div className="font-mono text-[10px] text-white/40">
                {loaded} / {frameCount}
              </div>
            </div>
          </div>
        )}

        {/* Children overlay — z-index 10 above canvas z-index 0, same context */}
        <div className="absolute inset-0" style={{ zIndex: 10 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
