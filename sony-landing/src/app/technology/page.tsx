"use client";

import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import { useEffect, useRef, useState } from "react";

function AnimatedCounter({ from, to, delay = 0, suffix = "" }: { from: number; to: number; delay?: number, suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (isInView) {
      const controls = setTimeout(() => {
        let startTime: number | null = null;
        const duration = 2000;

        const animate = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          // Easing easeOutExpo
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          setValue(Math.floor(easeProgress * (to - from) + from));

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        requestAnimationFrame(animate);
      }, delay * 1000);
      return () => clearTimeout(controls);
    }
  }, [isInView, from, to, delay]);

  return <span ref={ref}>{value}{suffix}</span>;
}

export default function TechnologyPage() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  return (
    <main className="relative bg-[#050505] min-h-screen font-sans selection:bg-[#0050ff]/30 text-white overflow-hidden">
      <Navbar />

      {/* 1. HERO SECTION */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="sticky top-0 h-screen flex flex-col justify-center items-center px-6"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#050815_0%,_#050505_70%)] pointer-events-none" />
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
           className="relative z-10 text-center flex flex-col items-center"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0050ff] to-[#00d6ff] text-sm md:text-base font-semibold tracking-[0.2em] uppercase mb-6">
            Under the hood
          </span>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white/90 drop-shadow-2xl">
            The Technology Inside
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-white/60 font-medium max-w-2xl tracking-tight">
            Engineering silence from the inside out.
          </p>
        </motion.div>
      </motion.section>

      <div className="relative z-10 bg-[#050505]">
        {/* 2. PROCESSOR SECTION */}
        <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 relative overflow-hidden">
          {/* Animated Circuit Background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
              className="w-[800px] h-[800px] border border-[#0050ff] rounded-full border-dashed"
            />
            <motion.div 
              animate={{ rotate: -360 }} 
              transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
              className="absolute w-[600px] h-[600px] border border-[#00d6ff] rounded-full border-dotted"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">QN3 Noise Cancelling Processor</h2>
              <p className="text-lg text-white/60 mb-8 leading-relaxed">
                Our bespoke processor executes real-time noise cancellation adjustments 100,000 times per second. By analyzing ambient sound alongside the music, it generates a precise anti-phase signal to eliminate external noise entirely.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
              whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, type: "spring" }}
              className="relative aspect-square max-w-[400px] mx-auto w-full group"
              style={{ perspective: "1000px" }}
            >
              <div className="w-full h-full bg-gradient-to-br from-[#111] to-[#000] border border-white/10 rounded-3xl p-8 flex items-center justify-center relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-gpu transition-transform duration-700 group-hover:rotate-y-12 group-hover:rotate-x-12">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0050ff]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />
                
                {/* Chip Visualization */}
                <div className="w-32 h-32 bg-black border border-white/20 rounded-xl relative flex items-center justify-center shadow-[inset_0_0_20px_rgba(255,255,255,0.05),_0_0_30px_rgba(0,214,255,0.4)]">
                  <div className="absolute -inset-[1px] bg-gradient-to-br from-[#0050ff] to-[#00d6ff] opacity-50 rounded-xl blur-[2px]" />
                  <div className="absolute inset-0 bg-[#0a0a0c] rounded-xl z-10" />
                  <span className="relative z-20 font-mono text-white/80 font-bold uppercase tracking-widest text-xl">QN3</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. DRIVER TECHNOLOGY (STICKY SPLIT) */}
        <section className="relative w-full h-[200vh]">
          <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row items-center border-t border-white/5 bg-[#050505]">
            <div className="w-full md:w-1/2 p-8 md:p-24 flex flex-col justify-center h-full z-10 relative">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">30mm Precision Driver</h2>
                <div className="h-1 w-16 bg-gradient-to-r from-[#0050ff] to-[#00d6ff] mb-8" />
                <p className="text-lg text-white/60 mb-6 leading-relaxed">
                  A newly developed 30mm driver unit with a lightweight, high-rigidity carbon-fiber dome improves high-frequency sensitivity and reduces unnatural sound coloration.
                </p>
                <p className="text-lg text-white/60 leading-relaxed">
                  The acoustic architecture pairs custom neodymium magnets with refined airflow grids to deliver powerful bass and crystal-clear vocals, faithfully reproducing the most subtle studio nuances.
                </p>
              </motion.div>
            </div>
            
            <div className="w-full md:w-1/2 h-full bg-[#0a0a0c] relative overflow-hidden flex items-center justify-center shadow-[inset_20px_0_100px_rgba(0,0,0,0.8)] border-l border-white/5">
              {/* Technical Diagram Placeholder */}
              <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] opacity-80">
                <motion.div 
                  className="absolute inset-0 border border-white/20 rounded-full"
                  style={{ rotateX: "60deg", rotateY: "0deg", rotateZ: "0deg" }}
                  animate={{ rotateZ: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  className="absolute inset-4 border-[2px] border-[#0050ff]/50 rounded-full"
                  style={{ rotateX: "60deg", rotateY: "0deg", rotateZ: "45deg" }}
                  animate={{ rotateZ: 405 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  className="absolute inset-12 bg-gradient-to-t from-white/5 to-transparent rounded-full shadow-[0_0_50px_rgba(0,214,255,0.2)]"
                  style={{ rotateX: "60deg" }}
                />
                {/* Center Core */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white border-2 border-[#00d6ff] rounded-full shadow-[0_0_30px_#00d6ff] z-10" />
                
                {/* Callout Lines */}
                <div className="hidden md:block absolute top-[20%] left-[60%] w-[150px] h-[1px] bg-white/30 truncate text-xs text-white/50 pl-2 -translate-y-1/2 border-l-2 border-[#00d6ff]">Carbon Fiber Dome</div>
                <div className="hidden md:block absolute top-[50%] right-[70%] w-[150px] h-[1px] bg-white/30 text-right truncate text-xs text-white/50 pr-2 -translate-y-1/2 border-r-2 border-[#0050ff]">Neodymium Magnet</div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. BLUETOOTH & CODEC SECTION */}
        <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Uncompromised Quality</h2>
            <p className="text-lg text-white/60">Advanced codec support ensures high-fidelity listening over Bluetooth 5.3.</p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="overflow-x-auto"
          >
            <table className="w-full text-left bg-white/[0.02] backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="p-6 text-white/90 font-semibold tracking-wide">Codec</th>
                  <th className="p-6 text-white/90 font-semibold tracking-wide">Bitrate</th>
                  <th className="p-6 text-white/90 font-semibold tracking-wide">Quality</th>
                  <th className="p-6 text-white/90 font-semibold tracking-wide">Latency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/60">
                <tr className="hover:bg-white/5 transition-colors relative group">
                  <td className="p-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0050ff] to-[#00d6ff]">LDAC (Hi-Res)</td>
                  <td className="p-6">Up to 990 kbps</td>
                  <td className="p-6 text-white">Lossless Audiophile</td>
                  <td className="p-6">High</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors relative group">
                  <td className="p-6 font-semibold text-white/80">AAC</td>
                  <td className="p-6">Up to 256 kbps</td>
                  <td className="p-6">High-Quality Standard</td>
                  <td className="p-6">Low</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors relative group">
                  <td className="p-6 font-semibold text-white/80">SBC</td>
                  <td className="p-6">Up to 328 kbps</td>
                  <td className="p-6">Standard</td>
                  <td className="p-6">Medium</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </section>

        {/* 5. BATTERY TECHNOLOGY */}
        <section className="py-32 px-6 md:px-12 bg-[#08080A] relative border-y border-white/5 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-[radial-gradient(ellipse_at_center,_#0050ff22_0%,_transparent_70%)] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            <div className="relative flex justify-center items-center h-[400px]">
              <div className="relative w-64 h-64 flex items-center justify-center">
                
                {/* SVG Ring Animation */}
                <svg className="w-full h-full absolute -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" className="stroke-white/10" strokeWidth="2" fill="none" />
                  <motion.circle 
                    cx="50" cy="50" r="45" 
                    className="stroke-[#00d6ff]" 
                    strokeWidth="6" 
                    fill="none" 
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "283", strokeDashoffset: "283" }}
                    whileInView={{ strokeDashoffset: "0" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                  />
                </svg>

                <div className="text-center z-10 flex flex-col items-center">
                  <div className="flex items-baseline gap-1">
                    <span className="text-8xl font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(0,214,255,0.5)]">
                      <AnimatedCounter from={0} to={30} delay={0.5} />
                    </span>
                    <span className="text-[#00d6ff] text-2xl font-bold">hr</span>
                  </div>
                  <span className="text-white/50 text-sm tracking-widest uppercase mt-2">Battery Life</span>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">Power for the long haul.</h2>
              <p className="text-lg text-white/60 mb-6 leading-relaxed">
                A high-density lithium-ion battery paired with the highly efficient QN3 processor delivers up to 30 hours of continuous playback with ANC enabled (40 hours with ANC off).
              </p>
              
              <div className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl flex items-start gap-4">
                 <div className="text-[#00d6ff] text-2xl mt-1">⚡</div>
                 <div>
                   <h4 className="text-white font-bold mb-1">Quick Charge</h4>
                   <p className="text-sm text-white/60">Need power fast? Just 3 minutes on the charger gives you up to 3 hours of playback time.</p>
                 </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 6. MULTIPOINT TECHNOLOGY */}
        <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Seamless Switching</h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">Multipoint connection enables simultaneous pairing with two Bluetooth devices.</p>
          </div>

          <div className="relative w-full max-w-4xl mx-auto h-[400px] flex items-center justify-between border border-white/5 bg-white/[0.01] rounded-3xl p-8 md:p-16 overflow-hidden">
            
            {/* Left Device (Phone) */}
            <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="w-24 h-48 md:w-32 md:h-56 bg-[#111] border-2 border-white/10 rounded-3xl z-10 flex items-center justify-center shadow-2xl relative"
            >
              <span className="text-white/30 font-semibold text-sm">Phone</span>
            </motion.div>

            {/* Center (Headphones) */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.3 }}
               className="w-32 h-32 md:w-48 md:h-48 z-10 rounded-full border border-white/20 bg-[#050505] flex items-center justify-center shadow-[0_0_50px_rgba(0,80,255,0.4)] relative"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#0050ff]/30 to-[#00d6ff]/30 blur-2xl" />
              <div className="text-white/80 font-bold tracking-widest text-sm relative z-20">WH-1000XM6</div>
            </motion.div>

            {/* Right Device (Laptop) */}
            <motion.div 
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="w-32 h-24 md:w-48 md:h-32 bg-[#111] border-2 border-white/10 rounded-xl z-10 flex items-center justify-center shadow-2xl relative"
            >
              <span className="text-white/30 font-semibold text-sm">Laptop</span>
            </motion.div>

            {/* Animated Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              {/* Line phone to headphones */}
              <motion.path 
                d="M 120 200 Q 250 150 400 200" 
                fill="none" 
                stroke="rgba(0,214,255,0.4)" 
                strokeWidth="2"
                strokeDasharray="5 5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="hidden md:block"
              />
              {/* Dynamic decorative particles over lines can be implemented via CSS motion */}
            </svg>
            
            <div className="absolute top-1/2 left-1/4 w-[25%] h-[2px] bg-gradient-to-r from-transparent via-[#00d6ff] to-transparent bg-[length:200%_100%] animate-[flow_2s_linear_infinite]" />
            <div className="absolute top-1/2 right-1/4 w-[25%] h-[2px] bg-gradient-to-r from-transparent via-[#0050ff] to-transparent bg-[length:200%_100%] animate-[flow_2s_linear_infinite_reverse]" />

          </div>
        </section>

      </div>
      
      {/* Footer */}
      <footer className="pt-12 pb-24 text-center border-t border-white/5">
        <p className="text-white/30 text-sm tracking-wide">
          © {new Date().getFullYear()} Sony Corporation. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
