"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import { useEffect, useRef, useState } from "react";

// --- CUSTOM CANVAS SOUND WAVE COMPONENT ---
function SoundWaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener("resize", resize);
    resize();

    const draw = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerY = canvas.height / 2;
      
      // Draw 5 overlapping waves with different phases and amplitudes
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        
        // Dynamic styling for waves
        const opacity = 0.1 - (i * 0.015);
        ctx.strokeStyle = `rgba(0, 214, 255, ${opacity})`;
        ctx.lineWidth = 1 + i * 0.5;

        // Wave characteristics
        const frequency = 0.002 + (i * 0.001);
        const amplitudeBase = 50 + (i * 30);
        
        for (let x = 0; x < canvas.width; x += 5) {
          // Complex sine combination for organic feel
          const normalizedX = x / canvas.width;
          const dampening = Math.sin(normalizedX * Math.PI); // Taper off edges
          
          const y = centerY + 
                    Math.sin(x * frequency + time + i) * (amplitudeBase * dampening) + 
                    Math.cos(x * frequency * 1.5 - time) * (20 * dampening);
                    
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        
        ctx.stroke();
      }

      time += 0.02;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />;
}

// --- ANIMATED PROGRESS BAR COMPONENT ---
function AnimatedProgressBar({ label, percentage }: { label: string; percentage: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="w-full mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-white/80 font-medium">{label}</span>
        <span className="text-[#00d6ff] font-bold">{isInView ? percentage : 0}%</span>
      </div>
      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${percentage}%` : 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-[#0050ff] to-[#00d6ff]"
        />
      </div>
    </div>
  );
}

export default function NoiseCancellingPage() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  
  const steps = [
    { title: "Capture", desc: "Dual sensor microphones detect ambient noise on the headphone's surface." },
    { title: "Process", desc: "The QN3 processor analyzes the noise profile in real-time, 100,000 times a second." },
    { title: "Cancel", desc: "A precise inverse sound wave is generated, canceling out the unwanted noise instantly." }
  ];

  const modes = [
    { name: "Full ANC", desc: "Maximum isolation. Drops you into absolute silence for deep focus." },
    { name: "Ambient Sound", desc: "Lets essential world sounds through naturally while keeping your music clear." },
    { name: "Off", desc: "Standard listening mode maximizing battery life." }
  ];

  const scenarios = [
    { env: "Airplane Engine", redux: 99 },
    { env: "Office Chatter", redux: 85 },
    { env: "City Commute", redux: 92 },
    { env: "Cafe Background", redux: 88 }
  ];

  return (
    <main className="relative bg-[#050505] min-h-screen font-sans selection:bg-[#0050ff]/30 text-white overflow-hidden">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative h-[120vh]">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-6 overflow-hidden">
          <SoundWaveCanvas />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/40 to-[#050505] pointer-events-none" />
          
          <motion.div
             style={{ opacity: heroOpacity }}
             className="relative z-10 text-center"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl md:text-8xl font-bold tracking-tighter text-white drop-shadow-2xl mb-6"
            >
              Silence, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0050ff] to-[#00d6ff]">Engineered.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-4 text-xl md:text-2xl text-white/60 font-medium tracking-tight"
            >
              Immerse yourself without distraction.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. HOW ANC WORKS */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-20">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
          >
            The Anatomy of Silence
          </motion.h2>
          <p className="text-lg text-white/60">A 3-step continuous processing loop.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-y-1/2" />
          
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm overflow-hidden group hover:border-white/20 transition-colors duration-500"
            >
              <div className="absolute -top-10 -right-10 text-[150px] font-bold text-white/[0.03] pointer-events-none transition-transform duration-500 group-hover:scale-110">
                {i + 1}
              </div>
              <h3 className="text-2xl font-bold text-white/90 mb-4">{step.title}</h3>
              <p className="text-white/60 leading-relaxed relative z-10">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. MICROPHONE ARRAY SECTION */}
      <section className="py-32 px-6 md:px-12 bg-[#08080A] shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full md:w-1/2"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">Multi-Noise Sensor Technology</h2>
            <div className="h-1 w-16 bg-[#00d6ff] mb-8" />
            <p className="text-lg text-white/60 mb-6 leading-relaxed">
              Equipped with a total of 8 microphones—four on each ear cup—this is our biggest step ever in noise canceling.
            </p>
            <p className="text-lg text-white/60 leading-relaxed">
              Ambient sound is captured even more accurately for a dramatic reduction in high-frequency noise. Unprecedented omnidirectional analysis ensures complete coverage wherever you are.
            </p>
          </motion.div>

          <div className="w-full md:w-1/2 h-[400px] relative flex items-center justify-center">
             {/* Abstract Microphone Diagram */}
             <div className="w-64 h-80 rounded-[100px] border border-white/20 relative">
               {/* Mic points */}
               {[0, 45, 135, 180, 225, 315].map((deg, i) => (
                 <motion.div 
                   key={i}
                   initial={{ scale: 0, opacity: 0 }}
                   whileInView={{ scale: 1, opacity: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.5 + i * 0.1 }}
                   className="absolute w-3 h-3 bg-[#00d6ff] rounded-full shadow-[0_0_15px_#00d6ff]"
                   style={{
                     left: `calc(50% + ${Math.sin(deg * Math.PI / 180) * 128}px - 6px)`,
                     top: `calc(50% - ${Math.cos(deg * Math.PI / 180) * 160}px - 6px)`
                   }}
                 />
               ))}
               <div className="absolute inset-0 flex border border-dashed border-[#0050ff]/30 rounded-[100px] animate-pulse" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/20 tracking-widest text-xs uppercase animate-pulse">
                Array Sensor
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 4. ANC MODES SHOWCASE */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Total Control</h2>
          <p className="text-lg text-white/60">Switch intuitively between acoustic modes.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {modes.map((mode, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover="hover"
              className="relative w-full md:w-1/3 h-64 rounded-3xl bg-white/[0.02] border border-white/10 overflow-hidden cursor-crosshair group flex items-end p-8"
            >
              {/* Default State Background Image Mock */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-[#050505]/80 to-transparent z-0" />
              
              {/* Glow map */}
              <motion.div 
                variants={{ hover: { opacity: 1 } }}
                className="absolute inset-0 bg-gradient-to-br from-[#0050ff]/10 to-[#00d6ff]/10 opacity-0 transition-opacity duration-300 z-0" 
              />
              
              <div className="relative z-10 w-full transform transition-transform duration-500 group-hover:-translate-y-4">
                <h3 className="text-2xl font-bold text-white/90 mb-2">{mode.name}</h3>
                <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-500 opacity-0 group-hover:opacity-100">
                  <p className="text-white/60 mt-2 text-sm leading-relaxed">{mode.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. REAL WORLD SCENARIOS */}
      <section className="py-32 px-6 md:px-12 max-w-4xl mx-auto border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Real-World Efficacy</h2>
          <p className="text-lg text-white/60">Measurable silence across diverse environments.</p>
        </div>

        <div className="space-y-8 bg-white/[0.02] p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl">
          {scenarios.map((scene, i) => (
            <AnimatedProgressBar key={i} label={scene.env} percentage={scene.redux} />
          ))}
        </div>
      </section>

      {/* 6. ADAPTIVE SOUND CONTROL */}
      <section className="py-32 px-6 md:px-12 relative overflow-hidden bg-black flex items-center justify-center">
        <div className="absolute inset-0">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.3 }}
            transition={{ duration: 2 }}
            className="w-full h-full bg-[radial-gradient(circle_at_center,_#0050ff33_0%,_transparent_100%)] block" 
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative z-10 max-w-4xl mx-auto text-center p-12 md:p-20 border border-white/10 rounded-[3rem] bg-white/[0.01] backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">Adaptive Sound Control</h2>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed">
            A smart function that senses where you are and what you're doing, then adjusts ambient sound settings for the ideal listening experience. Over time, it learns your behavior and recognizes locations you frequently visit—like your workplace or your favorite café.
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="pt-12 pb-24 text-center bg-[#050505]">
        <p className="text-white/30 text-sm tracking-wide">
          © {new Date().getFullYear()} Sony Corporation. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
