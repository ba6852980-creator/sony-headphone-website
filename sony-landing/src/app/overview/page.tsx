"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

export default function OverviewPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.15 
      } 
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  const features = [
    { title: "30hr Battery", desc: "Listen longer with massive power reserves, plus quick charging capabilities." },
    { title: "Industry-leading ANC", desc: "Dual noise sensor technology blocks out the world more effectively than ever." },
    { title: "LDAC Hi-Res Audio", desc: "Lossless audio streaming for an uncompromised high-fidelity experience." },
    { title: "Multipoint Connection", desc: "Seamlessly pair and switch between two Bluetooth devices simultaneously." },
    { title: "Speak-to-Chat", desc: "Music naturally pauses when you start speaking, letting ambient sound in." },
    { title: "Wearing Detection", desc: "Headphones automatically pause playback when removed to save battery." }
  ];

  const colors = [
    { name: "Midnight Black", color: "#111111" },
    { name: "Platinum Silver", color: "#E0E0E0" },
    { name: "Midnight Blue", color: "#1A2534" }
  ];

  const boxItems = [
    "Headphones",
    "Carry Case",
    "USB-C Charging Cable",
    "3.5mm Audio Cable",
    "Airplane Adapter"
  ];

  const specs = [
    "Driver: 30mm Specially Designed",
    "Frequency: 4Hz - 40,000Hz (JEITA)",
    "Weight: Approx. 250g",
    "Bluetooth: Version 5.3",
    "Codecs: SBC, AAC, LDAC"
  ];

  return (
    <main className="relative bg-[#050505] min-h-screen font-sans selection:bg-[#0050ff]/30">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#050815_0%,_#050505_70%)] pointer-events-none" />
        
        <motion.div
           initial={{ opacity: 0, y: 40, scale: 0.95 }}
           animate={{ opacity: 1, y: 0, scale: 1 }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="relative z-10 text-center flex flex-col items-center"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0050ff] to-[#00d6ff] text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-6 drop-shadow-[0_0_15px_rgba(0,214,255,0.3)]">
            Explore the details
          </span>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white/90 drop-shadow-2xl">
            Overview
          </h1>
          <p className="mt-6 md:mt-8 text-lg md:text-2xl text-white/60 font-medium max-w-2xl tracking-tight leading-relaxed">
            Everything you need to know about WH-1000XM6.
          </p>
        </motion.div>
      </section>

      {/* 2. KEY FEATURES GRID */}
      <section id="technology" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#0050ff]/50 to-transparent" />
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {features.map((opt, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="group relative p-8 md:p-10 rounded-2xl bg-white/[0.02] backdrop-blur-md overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Subtle Gradient Border */}
              <div className="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-transparent transition-colors duration-500" />
              <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-[#0050ff] to-[#00d6ff] opacity-0 group-hover:opacity-30 transition-opacity duration-500 mask-border" style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />
              
              <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-xl font-bold text-white/90 mb-3 tracking-tight">{opt.title}</h3>
                <p className="text-base text-white/50 leading-relaxed font-medium">{opt.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. COLOR VARIANTS */}
      <section className="py-24 px-6 md:px-12 bg-[#08080A] relative border-y border-white/5 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.8 }}
             className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white/90">Crafted for your style.</h2>
            <p className="mt-4 text-white/50 text-lg">Available in three striking finishes.</p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-8 lg:gap-16 justify-center items-center w-full">
            {colors.map((color, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group flex flex-col items-center cursor-pointer"
              >
                {/* Abstract Visual Placeholder */}
                <div 
                  className="w-48 h-64 md:w-56 md:h-72 rounded-t-full rounded-b-[40px] shadow-2xl relative overflow-hidden transition-all duration-700 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                  style={{ backgroundColor: color.color }}
                >
                  {/* Subtle highlights */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
                </div>
                <h4 className="mt-8 text-lg font-semibold text-white/80 tracking-tight transition-colors group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{color.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. IN THE BOX & 5. QUICK SPECS */}
      <section className="py-24 md:py-32 overflow-hidden flex flex-col gap-24 relative">
        <div className="px-6 md:px-12 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <motion.div
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white/90 mb-8">
              What's in the box.
            </h2>
            <div className="h-[1px] w-12 bg-gradient-to-r from-[#0050ff] to-[#00d6ff] mb-8" />
            <ul className="space-y-6">
              {boxItems.map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-center text-lg text-white/60 font-medium"
                >
                  <span className="mr-5 flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 text-[#00d6ff] text-sm">
                    ✓
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 1 }}
             className="relative aspect-square w-full max-w-md mx-auto hidden md:flex items-center justify-center border border-white/5 rounded-3xl bg-[radial-gradient(ellipse_at_center,_#111_0%,_#050505_100%)] overflow-hidden"
          >
            {/* Box visualization */}
            <div className="w-2/3 h-1/2 border border-white/20 rounded-xl relative flex items-center justify-center bg-black/50 backdrop-blur-md shadow-2xl">
              <span className="text-white/20 font-bold tracking-widest text-xl uppercase">Sony</span>
              <div className="absolute -bottom-12 w-3/4 h-8 bg-gradient-to-t from-[#0050ff]/20 to-transparent blur-xl" />
            </div>
            
            {/* Corner glows */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00d6ff]/10 blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#0050ff]/10 blur-[100px]" />
          </motion.div>

        </div>

        {/* Quick Specs Marquee */}
        <div id="specs" className="w-full relative border-y border-white/10 bg-white/[0.01] overflow-hidden py-6 flex shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
          
          <motion.div 
            animate={{ x: [0, -1035] }} // -1035 is approx width of one set of items.
            transition={{ ease: "linear", duration: 25, repeat: Infinity }}
            className="flex flex-nowrap whitespace-nowrap items-center w-max"
          >
            {/* Render items twice for infinite loop effect */}
            {[...specs, ...specs].map((spec, i) => (
              <div key={i} className="flex items-center px-12">
                <span className="text-[#0050ff] mr-4 text-xs font-bold">●</span>
                <span className="text-xl md:text-2xl font-semibold tracking-tight text-white/50">{spec}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Footer minimal padding */}
      <footer className="pt-12 pb-24 text-center">
        <p className="text-white/30 text-sm tracking-wide">
          © {new Date().getFullYear()} Sony Corporation. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
