"use client";

import CanvasSequence from "@/components/CanvasSequence";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const transition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const };

  const variants = {
    up: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition }
    },
    left: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0, transition }
    },
    right: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0, transition }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1, transition }
    }
  };

  return (
    <main className="relative bg-[#050505] min-h-screen">
      <Navbar />

      <div className="relative h-[500vh]">
        <CanvasSequence frameCount={240} />

        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          
          {/* SECTION 1: HERO / INTRO (0-15%) */}
          <section className="h-screen w-full flex flex-col items-center justify-center px-6 text-center">
             <motion.div variants={variants.up} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-10%" }}>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  Sony WH-1000XM6
                </h1>
                <p className="mt-4 text-xl md:text-2xl font-medium tracking-tight text-white/90">
                  Silence, perfected.
                </p>
                <p className="mt-6 max-w-xl mx-auto text-base md:text-lg text-white/60 font-medium">
                  Flagship wireless noise cancelling, re-engineered for a world that never stops.
                </p>
             </motion.div>
          </section>

          {/* SECTION 2: ENGINEERING REVEAL (15-40%) */}
          <section className="h-screen w-full flex flex-col items-start justify-center px-6 md:px-24">
            <motion.div variants={variants.left} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-10%" }} className="max-w-lg">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white shadow-black drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                  Precision-engineered <br/> for silence.
                </h2>
                <div className="mt-6 space-y-4 shadow-black drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                  <p className="text-lg text-white/70 font-medium leading-relaxed">
                    Custom drivers, sealed acoustic chambers, and optimized airflow deliver studio-grade clarity.
                  </p>
                  <p className="text-lg text-white/70 font-medium leading-relaxed">
                    Every component is tuned for balance, power, and comfort—hour after hour.
                  </p>
                </div>
            </motion.div>
          </section>

          {/* SECTION 3: NOISE CANCELLING (40-65%) */}
          <section className="h-screen w-full flex flex-col items-end justify-center px-6 md:px-24 text-right">
             <motion.div variants={variants.right} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-10%" }} className="max-w-lg ml-auto">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                  Adaptive noise cancelling, redefined.
                </h2>
                <ul className="mt-8 space-y-5 text-lg text-white/70 font-medium list-none shadow-black drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                  <li>Multi-microphone array listens in every direction.</li>
                  <li>Real-time noise analysis adjusts to your environment.</li>
                  <li>Your music stays pure—planes, trains, and crowds fade away.</li>
                </ul>
            </motion.div>
          </section>

          {/* SECTION 4: SOUND & UPSCALING (65-85%) */}
          <section className="h-screen w-full flex flex-col items-start justify-center px-6 md:px-24">
            <motion.div variants={variants.up} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-10%" }} className="max-w-xl">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00d6ff] drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                  Immersive, lifelike sound.
                </h2>
                <div className="mt-6 space-y-4 shadow-black drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                  <p className="text-xl text-white/80 font-medium leading-relaxed">
                    High-performance drivers unlock detail, depth, and texture in every track.
                  </p>
                  <p className="text-lg text-white/60 font-medium leading-relaxed">
                    AI-enhanced upscaling restores clarity to compressed audio, so every note feels alive.
                  </p>
                </div>
            </motion.div>
          </section>

          {/* SECTION 5: REASSEMBLY & CTA (85-100%) */}
          <section className="h-[100vh] w-full flex flex-col items-center justify-end pb-32 px-6 text-center pointer-events-none">
             <motion.div variants={variants.scale} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-10%" }} className="pointer-events-auto">
                <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4 drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                  Hear everything. <br className="hidden md:block" /> Feel nothing else.
                </h2>
                <p className="text-xl text-white/60 font-medium mb-10 drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                  WH-1000XM6. Designed for focus, crafted for comfort.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
                  <Link href="/buy" className="group relative overflow-hidden rounded-full shadow-[0_0_20px_rgba(0,80,255,0.3)] transition-all hover:shadow-[0_0_30px_rgba(0,214,255,0.6)]">
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#0050ff] to-[#00d6ff] transition-all group-hover:scale-105" />
                    <span className="relative flex items-center justify-center rounded-full bg-[#050505] px-8 py-3.5 text-base font-semibold text-white transition-all group-hover:bg-transparent">
                      Experience WH-1000XM6
                    </span>
                  </Link>
                  <Link href="/specs" className="text-white/70 font-medium text-sm tracking-wide hover:text-white transition-colors underline-offset-4 hover:underline">
                    See full specs
                  </Link>
                </div>
                <p className="mt-8 text-xs text-white/40 tracking-wider uppercase font-semibold">
                  Engineered for airports, offices, and everything in between.
                </p>
             </motion.div>
          </section>

        </div>
      </div>

      {/* Footer — Made By */}
      <footer className="relative z-10 border-t border-white/5 bg-[#050505] py-12 px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4 text-center">
          <p className="text-white/30 text-sm tracking-wide">
            © {new Date().getFullYear()} Sony Corporation. All rights reserved.
          </p>
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <p className="text-white/50 text-sm font-medium">
            Designed & Developed by{" "}
            <span className="text-white font-semibold">
              Muhammad Bilal Arshad
            </span>
          </p>
          <div className="flex items-center gap-6 mt-2">
            <a
              href="mailto:ba6852980@gmail.com"
              className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              ba6852980@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-bilal-arshad-23a89a386"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/bilal_arshad06"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5M12 7a5 5 0 110 10 5 5 0 010-10m0 2a3 3 0 100 6 3 3 0 000-6z"/></svg>
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
