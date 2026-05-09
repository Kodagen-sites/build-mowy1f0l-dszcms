import { promises as fs } from "fs";
import path from "path";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import MarqueeStrip from "@/components/sections/Marquee";
import ValueProp from "@/components/sections/ValueProp";
import Services from "@/components/sections/Services";
import Pillars from "@/components/sections/Pillars";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";

interface FrameManifest {
  frameCount: number;
  frameDir: string;
  pattern?: string;
}

async function loadFrameManifest(): Promise<FrameManifest | null> {
  try {
    const file = path.join(process.cwd(), "content", "frames-manifest.json");
    const raw = await fs.readFile(file, "utf8");
    const parsed = JSON.parse(raw) as FrameManifest;
    if (parsed.frameCount && parsed.frameCount > 0) return parsed;
    return null;
  } catch {
    return null;
  }
}

export const dynamic = "force-static";

export default async function HomePage() {
  const frames = await loadFrameManifest();
  return (
    <>
      <Header />
      <main className="relative">
        <Hero frames={frames} />
        <MarqueeStrip />
        <ValueProp />
        <Services />
        <Pillars />
        <Stats />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
