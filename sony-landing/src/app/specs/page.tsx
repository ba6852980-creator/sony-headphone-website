"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import CanvasSequence from "@/components/CanvasSequence";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const rowVariants: any = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

// Removed BackgroundHeadphoneAnimation to use CanvasSequence

export default function SpecsPage() {
  const specsCategories = [
    {
      title: "Sound",
      items: [
        { label: "Driver Unit", value: "30mm (Specially designed)" },
        { label: "Frequency Response", value: "4Hz - 40,000Hz" },
        { label: "Impedance", value: "48 ohms (1kHz) (connecting via headphone cable with unit on)" },
      ]
    },
    {
      title: "Noise Cancelling",
      items: [
        { label: "Processor", value: "QN3 Noise Cancelling Processor" },
        { label: "Sensors", value: "8 Microphones (4 on each ear cup)" },
        { label: "Adaptive ANC", value: "Yes (Environment & location based)" },
      ]
    },
    {
      title: "Wireless",
      items: [
        { label: "Bluetooth Version", value: "Version 5.3" },
        { label: "Effective Range", value: "Approx. 30m (98 ft)" },
        { label: "Supported Codecs", value: "SBC, AAC, LDAC" },
      ]
    },
    {
      title: "Battery",
      items: [
        { label: "Battery Life", value: "Up to 30 hours (NC ON), Up to 40 hours (NC OFF)" },
        { label: "Charging Method", value: "USB Type-C" },
        { label: "Quick Charge", value: "3 minutes = 3 hours of playback" },
      ]
    },
    {
      title: "Physical",
      items: [
        { label: "Weight", value: "Approx. 250g (8.8 oz)" },
        { label: "Design structure", value: "Foldable and swivel mechanism" },
        { label: "Analog Input", value: "3.5mm stereo mini jack" },
      ]
    },
    {
      title: "Controls",
      items: [
        { label: "Touch Sensor", value: "Right ear cup (Volume, play/pause, skip)" },
        { label: "Voice Assistant", value: "Google Assistant, Amazon Alexa compatible" },
        { label: "Wear Detection", value: "Yes (Auto pause/play)" },
      ]
    }
  ];

  return (
    <main className="relative bg-[#050505] min-h-screen font-sans selection:bg-[#0050ff]/30 text-white overflow-x-hidden">
      {/* Massive Cinematic Canvas Scroll Tracker Background */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none mix-blend-screen overflow-hidden">
        <CanvasSequence frameCount={240} />
        {/* Additional gradient overlay to keep text hyper-readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* 1. HERO SECTION */}
      <section className="pt-48 pb-20 px-6 flex flex-col items-center justify-center border-b border-white/5 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#0050ff11_0%,_transparent_60%)] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center flex flex-col items-center"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0050ff] to-[#00d6ff] tracking-[0.3em] uppercase text-xs font-semibold mb-4 border border-white/10 px-4 py-1.5 rounded-full">
            Technical Details
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
            Full Specifications
          </h1>
        </motion.div>
      </section>

      {/* 2. COMPLETE SPECS TABLE (STAGGERED) */}
      <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="space-y-16"
        >
          {specsCategories.map((cat, idx) => (
            <motion.div key={idx} variants={containerVariants} className="w-full">
              <motion.h3
                variants={rowVariants}
                className="text-2xl pt-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-white/90 to-white/50 mb-6 border-l-4 border-[#00d6ff] pl-4"
              >
                {cat.title}
              </motion.h3>

              <div className="w-full border-t border-white/10 flex flex-col divide-y divide-white/5">
                {cat.items.map((item, i) => (
                  <motion.div
                    variants={rowVariants}
                    key={i}
                    className="flex flex-col md:flex-row py-5 group hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="md:w-1/3 text-white/50 font-medium md:pl-2 pb-2 md:pb-0 transition-colors group-hover:text-white/80">
                      {item.label}
                    </div>
                    <div className="md:w-2/3 text-white/90 font-medium">
                      {item.value}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. COMPARISON SECTION */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 relative">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
          >
            How it compares
          </motion.h2>
          <p className="text-lg text-white/60">The apex of listening technology.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="overflow-x-auto pb-8"
        >
          <div className="min-w-[800px] grid grid-cols-4 gap-4 items-end mb-4">
            <div className="p-4" /> {/* Empty corner */}
            <div className="p-6 text-center border-b border-white/20">
              <span className="text-white/50 font-medium">Competitor Pro</span>
            </div>
            <div className="p-6 text-center border-b border-white/20">
              <span className="text-white/80 font-bold">WH-1000XM5</span>
            </div>
            {/* Highlighted XM6 Column Header */}
            <div className="relative p-6 text-center rounded-t-2xl bg-gradient-to-b from-[#0050ff]/20 to-transparent border-t border-x border-[#00d6ff]/30 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#0050ff] to-[#00d6ff]" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00d6ff] font-extrabold text-xl tracking-tight drop-shadow-[0_0_10px_rgba(0,214,255,0.8)]">
                WH-1000XM6
              </span>
            </div>
          </div>

          {[
            { feature: "Processor", comp: "Standard ANC Chip", xm5: "V1 + QN1 Processors", xm6: "QN3 Processor (Real-time)" },
            { feature: "Microphones", comp: "6 Microphones", xm5: "8 Microphones", xm6: "8 Microphones (Spatial Array)" },
            { feature: "Battery (ANC ON)", comp: "20 Hours", xm5: "30 Hours", xm6: "30 Hours" },
            { feature: "Quick Charge", comp: "5 min = 1 hr", xm5: "3 min = 3 hr", xm6: "3 min = 3 hr" },
            { feature: "Connection", comp: "Bluetooth 5.1", xm5: "Bluetooth 5.2", xm6: "Bluetooth 5.3" },
            { feature: "Hi-Res Audio", comp: "SBC, AAC", xm5: "LDAC", xm6: "LDAC + AI Upscaling" }
          ].map((row, i) => (
            <div key={i} className="min-w-[800px] grid grid-cols-4 gap-4 items-center group relative border-b border-white/5 transition-colors hover:bg-white/[0.02]">
              <div className="p-6 text-white/70 font-medium group-hover:text-white transition-colors">{row.feature}</div>
              <div className="p-6 text-center text-white/50">{row.comp}</div>
              <div className="p-6 text-center text-white/70">{row.xm5}</div>
              {/* Highlighted XM6 Content */}
              <div className="relative h-full p-6 text-center font-bold text-white bg-gradient-to-b from-[#050505] to-[#0a0f1a] border-x border-[#00d6ff]/30 shadow-[inset_0_0_20px_rgba(0,80,255,0.05)]">
                {row.xm6}
              </div>
            </div>
          ))}

          <div className="min-w-[800px] grid grid-cols-4 gap-4">
            <div className="col-span-3" />
            <div className="h-4 rounded-b-2xl bg-[#0a0f1a] border-b border-x border-[#00d6ff]/30 shadow-[inset_0_-10px_20px_rgba(0,80,255,0.05)]" />
          </div>

        </motion.div>
      </section>

      {/* 4. DOWNLOAD SECTION (GRADIENT CTA) */}
      <section className="py-24 px-6 relative bg-black border-y border-white/5 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-6">Need printed literature?</h2>

          <a
            href="/Sony_WH-1000XM6_Specs.pdf"
            download="Sony_WH-1000XM6_Specs.pdf"
            className="inline-flex relative group overflow-hidden rounded-full p-[1px] cursor-pointer"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#0050ff] to-[#00d6ff] rounded-full opacity-60 group-hover:opacity-100 group-hover:blur-[2px] transition-all duration-300" />
            <div className="relative bg-[#050505] rounded-full px-8 py-4 flex items-center justify-center gap-3 transition-colors group-hover:bg-[#08080A]">
              <span className="text-white font-semibold tracking-wide">Download Full Spec Sheet</span>
              <svg className="w-5 h-5 text-[#00d6ff] group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
          </a>

          <p className="mt-6 text-white/40 text-sm">PDF, 1.2MB for printing and archiving.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-12 pb-24 text-center bg-[#050505]">
        <p className="text-white/30 text-sm tracking-wide">
          © {new Date().getFullYear()} Sony Corporation. All rights reserved.
        </p>
      </footer>
      </div>
    </main>
  );
}
