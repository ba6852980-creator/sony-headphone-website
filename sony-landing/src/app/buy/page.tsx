"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import { useState, useRef, FormEvent } from "react";

// --- CUSTOM ACCORDION COMPONENT ---
function FaqAccordion({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 w-full overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
      >
        <span className="text-lg font-medium text-white/90 group-hover:text-white transition-colors">{question}</span>
        <motion.span 
          animate={{ rotate: isOpen ? 180 : 0 }} 
          className="text-[#0050ff] text-2xl group-hover:text-[#00d6ff]"
        >
          ↓
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="pb-6 text-white/60 leading-relaxed pr-8">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- ANIMATED PROGRESS BAR COMPONENT ---
function AnimatedRatingBar({ stars, percentage }: { stars: number, percentage: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="w-full flex items-center gap-4 mb-3">
      <div className="w-16 text-white/80 font-medium text-sm flex gap-1">
        <span>{stars}</span>
        <span className="text-[#00d6ff]">★</span>
      </div>
      <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${percentage}%` : 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-[#0050ff] to-[#00d6ff] rounded-full"
        />
      </div>
      <div className="w-10 text-right text-white/50 text-sm font-medium">{percentage}%</div>
    </div>
  );
}

// --- WRITE REVIEW FORM ---
function WriteReviewSection() {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section className="px-6 md:px-12 max-w-4xl mx-auto mb-32 pb-16">
      <div className="p-8 md:p-12 bg-[#08080A] border border-white/5 rounded-[2rem]">
        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="text-center py-16 flex flex-col items-center"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#0050ff]/20 to-[#00d6ff]/20 flex items-center justify-center mb-6 border border-[#00d6ff]/30">
              <span className="text-[#00d6ff] text-4xl">✓</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Thank you for your review!</h3>
            <p className="text-white/60">It will appear after verification.</p>
          </motion.div>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-6">Share Your Experience</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="flex flex-col gap-2 mb-2">
                <label className="text-white/80 font-medium text-sm">Overall Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setSelectedRating(star)}
                      className={`text-3xl transition-colors duration-200 ${
                        (hoveredRating || selectedRating) >= star ? "text-[#00d6ff]" : "text-white/20"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-white/60 text-sm">Your Name</label>
                  <input required type="text" className="bg-[#050505] border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#00d6ff] transition-colors focus:shadow-[0_0_15px_rgba(0,214,255,0.2)]" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white/60 text-sm">Email Address</label>
                  <input required type="email" className="bg-[#050505] border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#00d6ff] transition-colors focus:shadow-[0_0_15px_rgba(0,214,255,0.2)]" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white/60 text-sm">Review Title</label>
                <input required type="text" className="bg-[#050505] border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#00d6ff] transition-colors focus:shadow-[0_0_15px_rgba(0,214,255,0.2)]" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white/60 text-sm">Your Review</label>
                <textarea required rows={4} className="bg-[#050505] border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#00d6ff] transition-colors focus:shadow-[0_0_15px_rgba(0,214,255,0.2)] resize-none" />
              </div>

              <button type="submit" className="mt-4 w-full md:w-auto self-end relative group overflow-hidden rounded-xl">
                 <span className="absolute inset-0 bg-gradient-to-r from-[#0050ff] to-[#00d6ff] transition-opacity duration-300 group-hover:opacity-80" />
                 <span className="relative block px-10 py-4 font-bold text-white tracking-wide">Submit Review</span>
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}

// --- MAIN PAGE DISPATCHER ---
export default function BuyPage() {
  const [selectedColor, setSelectedColor] = useState("Midnight Black");
  
  // Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const colors = [
    { name: "Midnight Black", hex: "#111111", price: "$349" },
    { name: "Platinum Silver", hex: "#E0E0E0", price: "$349" },
    { name: "Midnight Blue", hex: "#1A2534", price: "$349" }
  ];

  const includes = [
    { icon: "🎧", label: "WH-1000XM6 Headphones" },
    { icon: "💼", label: "Collapsible Carrying Case" },
    { icon: "⚡", label: "USB-C Charging Cable" },
    { icon: "🔌", label: "3.5mm Headphone Cable" }
  ];

  const retailers = [
    { name: "Amazon", url: "https://www.amazon.com" },
    { name: "Best Buy", url: "https://www.bestbuy.com" },
    { name: "Sony Store", url: "https://www.sony.com" },
  ];

  const faqs = [
    { q: "What is your return policy?", a: "We offer a 30-day money-back guarantee. If you aren't completely satisfied, return the headphones in their original packaging for a full refund." },
    { q: "How long is the warranty?", a: "Every purchase directly from Sony includes an extended 2-year manufacturer warranty covering parts and labor." },
    { q: "When will my order ship?", a: "Orders placed before 2 PM EST shift the same business day. Free Express shipping typically arrives in 2-3 days." },
    { q: "Can I connect to multiple devices?", a: "Yes, Multipoint connection allows you to pair with two Bluetooth devices simultaneously and switch seamlessly." },
    { q: "Do these support high-res audio?", a: "Absolutely. They support LDAC, allowing you to stream High-Resolution Audio at exceptional quality." }
  ];

  const reviews = [
    { name: "James K.", rating: 5, text: "Absolutely incredible noise cancellation. I can finally focus in my open office. Worth every penny." },
    { name: "Sarah M.", rating: 5, text: "Best headphones I have ever owned. The sound quality is studio-level and battery lasts forever." },
    { name: "Ahmed R.", rating: 4, text: "Premium build quality and amazing ANC. The app makes customization easy. Highly recommend." },
    { name: "Lisa T.", rating: 5, text: "Wore these on a 14 hour flight. Complete silence the entire time. My travel essential now." }
  ];

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsOrderPlaced(true);
  };

  return (
    <main className="relative bg-[#050505] min-h-screen font-sans selection:bg-[#0050ff]/30 text-white overflow-hidden pb-10">
      <Navbar />

      {/* --- ADD TO CART DRAWER MODAL --- */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => !isOrderPlaced && setIsCheckoutOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 cursor-pointer"
            />
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.8 }}
              className="fixed top-0 right-0 h-full w-full max-w-[500px] bg-[#0A0A0C] border-l border-white/5 z-50 flex flex-col shadow-[-20px_0_100px_rgba(0,0,0,0.8)]"
            >
              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <h2 className="text-xl font-bold tracking-tight text-white/90">Complete Your Order</h2>
                <button 
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setTimeout(() => setIsOrderPlaced(false), 500); // reset state after closing
                  }}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-white/50"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                {isOrderPlaced ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center space-y-6"
                  >
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#0050ff]/20 to-[#00d6ff]/20 flex items-center justify-center border border-[#00d6ff]/50 shadow-[0_0_50px_rgba(0,214,255,0.2)]">
                      <span className="text-5xl text-[#00d6ff]">✓</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Order Placed Successfully!</h3>
                      <p className="text-white/60 text-lg leading-relaxed px-4">
                        We'll contact you at <span className="text-white font-medium">{checkoutEmail}</span> within 24 hours with shipping details.
                      </p>
                    </div>
                    <button 
                      onClick={() => setIsCheckoutOpen(false)}
                      className="mt-8 px-8 py-3 rounded-full border border-white/20 hover:bg-white/5 transition-colors font-medium"
                    >
                      Return to Store
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <div className="bg-[#111] p-5 rounded-2xl border border-white/5 mb-8 flex justify-between items-center relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#0050ff]/20 to-transparent blur-2xl" />
                      <div>
                        <div className="text-white/50 text-sm uppercase tracking-wider mb-1">Total Due</div>
                        <div className="text-xl font-bold">{selectedColor}</div>
                      </div>
                      <div className="text-3xl font-light text-white">$349</div>
                    </div>

                    <form onSubmit={handleCheckoutSubmit} className="flex flex-col gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="text-white/60 text-sm">Full Name</label>
                        <input required type="text" className="bg-[#050505] border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#00d6ff] transition-colors focus:shadow-[0_0_15px_rgba(0,214,255,0.2)]" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-white/60 text-sm">Email Address</label>
                        <input required type="email" value={checkoutEmail} onChange={(e)=>setCheckoutEmail(e.target.value)} className="bg-[#050505] border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#00d6ff] transition-colors focus:shadow-[0_0_15px_rgba(0,214,255,0.2)]" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-white/60 text-sm">Phone Number</label>
                        <input required type="tel" className="bg-[#050505] border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#00d6ff] transition-colors focus:shadow-[0_0_15px_rgba(0,214,255,0.2)]" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-white/60 text-sm">Shipping Address</label>
                        <textarea required rows={2} className="bg-[#050505] border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#00d6ff] transition-colors focus:shadow-[0_0_15px_rgba(0,214,255,0.2)] resize-none" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-white/60 text-sm">City</label>
                          <input required type="text" className="bg-[#050505] border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#00d6ff] transition-colors focus:shadow-[0_0_15px_rgba(0,214,255,0.2)]" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-white/60 text-sm">Zip/Postal Code</label>
                          <input required type="text" className="bg-[#050505] border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#00d6ff] transition-colors focus:shadow-[0_0_15px_rgba(0,214,255,0.2)]" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 mb-4">
                        <label className="text-white/60 text-sm">Country</label>
                        <input required type="text" className="bg-[#050505] border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#00d6ff] transition-colors focus:shadow-[0_0_15px_rgba(0,214,255,0.2)]" />
                      </div>

                      <h3 className="text-lg font-semibold text-white/90 border-b border-white/10 pb-2 mb-2">Payment Details</h3>
                      
                      <div className="flex flex-col gap-2">
                        <label className="text-white/60 text-sm">Card Number</label>
                        <input required type="text" placeholder="1234 5678 9012 3456" className="bg-[#050505] border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#00d6ff] transition-colors focus:shadow-[0_0_15px_rgba(0,214,255,0.2)]" />
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="flex flex-col gap-2">
                          <label className="text-white/60 text-sm">Expiry Date</label>
                          <input required type="text" placeholder="MM/YY" className="bg-[#050505] border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#00d6ff] transition-colors focus:shadow-[0_0_15px_rgba(0,214,255,0.2)]" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-white/60 text-sm">CVV</label>
                          <input required type="text" placeholder="123" className="bg-[#050505] border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#00d6ff] transition-colors focus:shadow-[0_0_15px_rgba(0,214,255,0.2)]" />
                        </div>
                      </div>

                      <div className="border-t border-white/10 pt-6 pb-4 bg-[#0A0A0C]">
                        <button type="submit" className="w-full relative group overflow-hidden rounded-full cursor-pointer focus:outline-none">
                          <span className="absolute inset-0 bg-gradient-to-r from-[#0050ff] to-[#00d6ff] transition-all duration-300 group-hover:blur-sm" />
                          <span className="relative block px-12 py-5 bg-gradient-to-r from-[#0050ff] to-[#00d6ff] text-white font-bold tracking-wide rounded-full text-lg shadow-[0_0_30px_rgba(0,80,255,0.4)]">
                            Place Order
                          </span>
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 1. HERO SECTION */}
      <section className="pt-40 pb-16 px-6 text-center max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6"
        >
          Choose Your WH-1000XM6
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-white/50"
        >
          Available in three premium finishes.
        </motion.p>
      </section>

      {/* 2. COLOR SELECTOR */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {colors.map((color) => (
            <div 
              key={color.name}
              onClick={() => setSelectedColor(color.name)}
              className="relative cursor-pointer group"
            >
              {selectedColor === color.name && (
                <motion.div
                  layoutId="selectedColorBorder"
                  className="absolute -inset-[2px] rounded-3xl z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0050ff] to-[#00d6ff] rounded-3xl" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0050ff] to-[#00d6ff] blur-md opacity-50" />
                </motion.div>
              )}
              
              <div className="relative z-10 bg-[#0a0a0c] border border-white/5 rounded-3xl p-8 h-full flex flex-col items-center justify-between overflow-hidden shadow-[inset_0_4px_20px_rgba(255,255,255,0.02)] transition-colors hover:bg-[#111]">
                <div 
                  className="w-40 h-48 md:w-48 md:h-56 mt-8 rounded-t-full rounded-b-[40px] shadow-2xl relative mb-12 transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundColor: color.hex }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-50" />
                  <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent" />
                </div>
                
                <div className="text-center w-full">
                  <h3 className="text-xl font-bold text-white/90 mb-2">{color.name}</h3>
                  <div className="text-2xl font-light text-white">{color.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. INCLUDES SECTION & 4. PURCHASE OPTIONS */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto mb-32 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Col */}
        <div className="lg:col-span-5">
           <h3 className="text-2xl font-bold mb-8 text-white/90">What's in the box</h3>
           <div className="space-y-6">
              {includes.map((item, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="flex items-center gap-6 p-4 rounded-2xl bg-white/[0.02] border border-white/5"
                >
                  <span className="text-3xl grayscale opacity-70">{item.icon}</span>
                  <span className="text-lg text-white/80 font-medium">{item.label}</span>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Right Col */}
        <div className="lg:col-span-7 space-y-8">
           
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="relative p-1 rounded-3xl bg-gradient-to-br from-[#0050ff]/50 to-[#00d6ff]/50 shadow-[0_0_50px_rgba(0,100,255,0.2)] overflow-hidden group"
           >
              <div className="absolute inset-0 bg-gradient-to-r from-[#0050ff] to-[#00d6ff] animate-pulse opacity-20" />
              <div className="relative bg-[#050505] p-8 md:p-10 rounded-[23px] flex flex-col md:flex-row justify-between items-center gap-8">
                 <div>
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#00d6ff] mb-2 block">Sony Direct Delivery</span>
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedColor}</h2>
                    <p className="text-white/50 text-sm mb-4">Ships in 2-3 business days. Free shipping.</p>
                    <div className="text-4xl font-light">$349</div>
                 </div>
                 <button 
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full md:w-auto relative group/btn overflow-hidden rounded-full cursor-pointer focus:outline-none"
                 >
                    <span className="absolute inset-0 bg-gradient-to-r from-[#0050ff] to-[#00d6ff] transition-all duration-300 group-hover/btn:blur-sm" />
                    <span className="relative block px-12 py-5 bg-white text-black font-bold tracking-wide rounded-full transition-transform duration-300 group-hover/btn:scale-[0.98]">
                      Add to Cart
                    </span>
                 </button>
              </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="p-8 rounded-3xl bg-white/[0.02] border border-white/5"
           >
              <h4 className="text-sm font-semibold tracking-widest uppercase text-white/40 mb-6">Authorized Retailers</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 {retailers.map((store) => (
                   <a 
                     key={store.name} 
                     href={store.url} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/[0.03] border border-white/5 text-white/70 font-medium hover:bg-[#0050ff]/10 hover:border-[#00d6ff]/50 hover:text-[#00d6ff] hover:shadow-[0_0_15px_rgba(0,214,255,0.2)] transition-all cursor-pointer group"
                   >
                     {store.name}
                     <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest mt-1 text-[#00d6ff]">↗ External</span>
                   </a>
                 ))}
              </div>
           </motion.div>

        </div>
      </section>

      {/* 5. WHY BUY FROM SONY */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto mb-32">
        <h3 className="text-center text-2xl font-bold text-white/90 mb-12">Why buy directly from us?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: "🛡️", t: "2 Year Warranty", d: "Extended protection standard on all direct purchases." },
            { icon: "🔄", t: "30 Day Returns", d: "Not entirely completely satisfied? Send them back for free." },
            { icon: "📦", t: "Express Shipping", d: "Expedited shipping is included on all headphone orders." }
          ].map((feat, i) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              key={i}
              className="p-8 rounded-3xl bg-[#08080A] border border-white/5 text-center flex flex-col items-center group hover:border-[#0050ff]/50 transition-colors"
            >
              <span className="text-4xl mb-4 grayscale opacity-80 group-hover:scale-110 transition-transform">{feat.icon}</span>
              <h4 className="text-xl font-bold text-white mb-2">{feat.t}</h4>
              <p className="text-white/50">{feat.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="px-6 md:px-12 max-w-3xl mx-auto mb-32">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Frequently Asked Questions</h2>
        <div className="border-t border-white/10">
          {faqs.map((faq, i) => (
            <FaqAccordion key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </section>

      {/* 7. CUSTOMER REVIEWS & RATINGS */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row gap-16 mb-16"
        >
           <div className="md:w-1/3 flex flex-col justify-center items-center md:items-start text-center md:text-left">
             <h2 className="text-3xl font-bold text-white mb-6">What Customers Are Saying</h2>
             <div className="flex items-end gap-4 mb-2">
               <span className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50">4.8</span>
               <div className="flex flex-col pb-2">
                 <span className="text-[#00d6ff] text-xl">★★★★★</span>
                 <span className="text-white/50 text-sm">Based on 2,847 reviews</span>
               </div>
             </div>
           </div>

           <div className="md:w-2/3 flex flex-col justify-center border-l border-white/5 pl-0 md:pl-16">
             <AnimatedRatingBar stars={5} percentage={78} />
             <AnimatedRatingBar stars={4} percentage={15} />
             <AnimatedRatingBar stars={3} percentage={5} />
             <AnimatedRatingBar stars={2} percentage={1} />
             <AnimatedRatingBar stars={1} percentage={1} />
           </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl flex flex-col relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#0050ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0050ff] to-[#00d6ff] flex items-center justify-center font-bold text-lg shadow-lg">
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white/90">{rev.name}</h4>
                    <span className="text-[#00d6ff] text-xs font-semibold tracking-widest uppercase rounded-full border border-[#00d6ff]/30 px-2 py-0.5 bg-[#00d6ff]/10">Verified Purchase</span>
                  </div>
                </div>
                <div className="text-[#00d6ff] text-lg">
                  {"★".repeat(rev.rating)}{"☆".repeat(5-rev.rating)}
                </div>
              </div>
              <p className="text-white/70 leading-relaxed relative z-10 italic">"{rev.text}"</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8. WRITE A REVIEW */}
      <WriteReviewSection />
      
    </main>
  );
}
