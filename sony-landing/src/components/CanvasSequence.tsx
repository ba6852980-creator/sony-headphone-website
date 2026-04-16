"use client";
import { useEffect, useRef, useState } from "react";

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
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;
      if (canvasRatio > imgRatio) {
        drawHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      }
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
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      const frameIndex = Math.round(progress * (frameCount - 1));
      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        isDirtyRef.current = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [frameCount]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        isDirtyRef.current = true;
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="sticky top-0 left-0 h-screen w-full overflow-hidden bg-[#050505]">
      {!isLoaded && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]">
          <p className="text-white/40 text-sm tracking-widest uppercase mb-4">
            Loading Experience
          </p>
          <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-white transition-all duration-300"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <p className="text-white/20 text-xs mt-3 tracking-widest">
            {loadProgress}%
          </p>
        </div>
      )}
      <canvas ref={canvasRef} className="h-full w-full" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#050505_100%)] opacity-30 pointer-events-none" />
    </div>
  );
}