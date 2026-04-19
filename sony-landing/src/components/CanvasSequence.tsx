"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll, useSpring, AnimatePresence, motion } from "framer-motion";

interface CanvasSequenceProps {
  frameCount?: number;
}

export default function CanvasSequence({ frameCount = 240 }: CanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const isDirtyRef = useRef(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll();
  
  // Refined Physics: Lower stiffness and higher mass for luxurious, heavy smoothness
  // This completely eliminates any "fucked up" stuttering or jittery pixel movement
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 40,
    stiffness: 150, 
    mass: 0.5
  });

  useEffect(() => {
    let loadedCount = 0;
    const totalImages = frameCount;
    const tempImages: HTMLImageElement[] = new Array(totalImages);

    const loadImage = (i: number) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        const paddedIndex = (i + 1).toString().padStart(3, "0");
        img.src = `/frames/ezgif-frame-${paddedIndex}.jpg`;
        
        img.onload = () => {
          tempImages[i] = img;
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / totalImages) * 100));
          if (loadedCount === totalImages) {
            imagesRef.current = tempImages;
            setIsLoaded(true);
            isDirtyRef.current = true;
          }
          resolve();
        };
        img.onerror = () => resolve();
      });
    };

    const batchSize = 10;
    const loadBatch = async (startIndex: number) => {
      const batch = [];
      for (let i = startIndex; i < Math.min(startIndex + batchSize, totalImages); i++) {
        batch.push(loadImage(i));
      }
      await Promise.all(batch);
      if (startIndex + batchSize < totalImages) {
        loadBatch(startIndex + batchSize);
      }
    };
    loadBatch(0);
  }, [frameCount]);

  useEffect(() => {
    const renderFrame = (img: HTMLImageElement) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;
      
      // Hardware accelerated soothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Fill background universally with the deep dark #050505
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const dpr = window.devicePixelRatio || 1;
      const logicalWidth = canvas.width / dpr;
      const logicalHeight = canvas.height / dpr;

      // INTELLIGENT SCALING: Prevent images from being blown up and destroyed
      // We limit maxScale to 1.4x so the JPEG compression artifacts are never wildly magnified on 4k screens
      const scaleX = logicalWidth / img.width;
      const scaleY = logicalHeight / img.height;
      let scale = Math.max(scaleX, scaleY);
      const maxScale = 1.4; 
      scale = Math.min(scale, maxScale);
      
      const drawWidth = img.width * scale * dpr;
      const drawHeight = img.height * scale * dpr;
      
      // Center the frame beautifully
      const offsetX = (canvas.width - drawWidth) / 2;
      const offsetY = (canvas.height - drawHeight) / 2;
      
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const animate = () => {
      if (isDirtyRef.current && imagesRef.current[currentFrameRef.current]) {
        const img = imagesRef.current[currentFrameRef.current];
        if (img) renderFrame(img);
        isDirtyRef.current = false;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = smoothProgress.onChange((v) => {
      if (!isLoaded) return;
      const frameIndex = Math.min(
        frameCount - 1,
        Math.max(0, Math.round(v * (frameCount - 1)))
      );
      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        isDirtyRef.current = true;
      }
    });
    return () => unsubscribe();
  }, [smoothProgress, isLoaded, frameCount]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
        isDirtyRef.current = true;
      }
    };
    
    // Initial size
    handleResize();

    let timeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="sticky top-0 left-0 h-screen w-full overflow-hidden bg-[#050505]">
      
      {/* Loading Overlay */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]"
          >
            <p className="text-white/40 text-sm tracking-widest uppercase mb-4">
              Loading Experience
            </p>
            <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-white transition-all duration-300"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <p className="text-white/20 text-xs mt-3 tracking-widest tabular-nums">
              {loadProgress}%
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Canvas Layer with CSS Filtering 
          We use filter contrast/saturate to bite through JPEG crush logic and make it pop 
      */}
      <canvas 
        ref={canvasRef} 
        className="h-full w-full object-cover transition-opacity duration-1000"
        style={{
          opacity: isLoaded ? 1 : 0,
          filter: "contrast(1.05) saturate(1.1)"
        }}
      />
      
      {/* Heavy Vignette & Noise Mask 
          Blends out the straight edges of the image container gracefully so it seamlessly melts into the background 
      */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#050505_85%)] pointer-events-none z-10" />
      <div className="absolute inset-0 bg-[#050505] opacity-[0.02] pointer-events-none z-20 mix-blend-screen" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }} />
      
    </div>
  );
}