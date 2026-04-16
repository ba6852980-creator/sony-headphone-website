"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // 0 at top, 1 after 100px of scroll
      const progress = Math.min(window.scrollY / 100, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bgOpacity = scrollProgress * 0.75;
  const blurAmount = scrollProgress * 12;

  return (
    <header
      style={{
        backgroundColor: `rgba(5, 5, 5, ${bgOpacity})`,
        backdropFilter: `blur(${blurAmount}px)`,
        WebkitBackdropFilter: `blur(${blurAmount}px)`,
      }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-colors duration-300 md:px-12"
    >
      <div className="flex items-center">
        <Link href="/" className="text-xl font-bold tracking-tight text-white/90">
          Sony
        </Link>
        <span className="ml-3 hidden text-sm font-medium tracking-tight text-white/60 md:block">
          WH-1000XM6
        </span>
      </div>

      <nav className="hidden items-center space-x-8 md:flex">
        {["Overview", "Technology", "Noise Cancelling", "Specs", "Buy"].map((item) => {
          // Special route logic for multi-page
          let href = `/#${item.toLowerCase().replace(" ", "-")}`;
          if (item === "Overview") href = "/overview";
          if (item === "Technology") href = "/technology";
          if (item === "Noise Cancelling") href = "/noise-cancelling";
          if (item === "Specs") href = "/specs";
          if (item === "Buy") href = "/buy";

          const isActive = pathname === href;

          return (
            <Link
              key={item}
              href={href}
              className={`text-sm tracking-wide transition-all duration-300 ${
                isActive 
                  ? "text-[#00d6ff] font-bold drop-shadow-[0_0_10px_rgba(0,214,255,0.4)]" 
                  : "text-white/60 font-medium hover:text-white"
              }`}
            >
              {item}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center">
        <Link
          href="/buy"
          className="group relative overflow-hidden rounded-full p-[1px]"
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0050ff] to-[#00d6ff] opacity-70 transition-opacity group-hover:opacity-100" />
          <span className="relative flex items-center justify-center rounded-full bg-[#050505] px-5 py-2 text-sm font-medium text-white transition-all group-hover:bg-opacity-0 group-hover:shadow-[0_0_15px_rgba(0,214,255,0.4)]">
            Experience WH-1000XM6
          </span>
        </Link>
      </div>
    </header>
  );
}
