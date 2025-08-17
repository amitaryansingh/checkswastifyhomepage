'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

const frameCount = 200;
const imagePath = (frame: number) => `/orb-sequence/ezgif-frame-${String(frame + 1).padStart(3, '0')}.jpg`;

const calculateBlockStyle = (scrollFraction: number, start: number, end: number) => {
  const progress = Math.max(0, Math.min(1, (scrollFraction - start) / (end - start)));
  const opacity = progress;
  const scale = 0.9 + progress * 0.1;
  const translateY = 50 - progress * 50;
  return { opacity, transform: `translateY(${translateY}px) scale(${scale})` };
};

export default function HeroSanctuary() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollFraction, setScrollFraction] = useState(0);

  // Pre-load images...
  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      for (let i = 0; i < frameCount; i++) {
        const img = new Image(); img.src = imagePath(i);
        await new Promise(r => img.onload=r); loadedImages[i] = img;
      }
      setImages(loadedImages); setIsLoaded(true);
    };
    loadImages();
  }, []);

  // Set up scroll listener...
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current; if (!container) return;
      const { top, height } = container.getBoundingClientRect();
      const scrollableDistance = height - window.innerHeight;
      const scrollPosition = -top;
      const fraction = Math.max(0, Math.min(1, scrollPosition / scrollableDistance));
      setScrollFraction(fraction);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Draw image frame on scroll...
  useEffect(() => {
    if (!isLoaded || !canvasRef.current || images.length < 1) return;
    const canvas = canvasRef.current; const context = canvas.getContext('2d');
    const frameIndex = Math.min(frameCount - 1, Math.floor(scrollFraction * frameCount));
    const img = images[frameIndex];
    if (img && context) {
      requestAnimationFrame(() => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      });
    }
  }, [scrollFraction, isLoaded, images]);

    function calculateOpacity(scrollFraction: number, start: number, end: number): number {
        if (scrollFraction < start) return 0;
        if (scrollFraction > end) return 0;
        const progress = (scrollFraction - start) / (end - start);
        return Math.max(0, Math.min(1, progress));
    }
  return (
    <section ref={containerRef} className="relative h-[400vh] w-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} width="1920" height="1080" className="absolute top-0 left-0 w-full h-full object-cover z-0" />
        <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10"></div>
        
        <div className="relative z-20 w-full h-full">

            {/* Stage 1: Intro */}
            <div className="absolute inset-0 flex items-center justify-center transition-opacity" style={{ opacity: calculateOpacity(scrollFraction, 0, 0.25) }}>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-white text-center">Your wellness sanctuary, built for you.</h1>
            </div>

            {/* Feature Blocks */}
            <div 
              className="absolute top-[20%] left-[10%] w-72 h-40 p-4 bg-secondary/10 backdrop-blur-xl border border-white/20 rounded-2xl transition-all duration-300"
              style={calculateBlockStyle(scrollFraction, 0.2, 0.45)}
            >
              <h3 className="font-heading text-xl font-bold text-white">Limitless Programs</h3>
              <p className="text-white/80 text-sm mt-1">From Vinyasa flow to mindful meditation.</p>
            </div>
            
             <div 
              className="absolute bottom-[20%] right-[10%] w-72 h-40 p-4 bg-secondary/10 backdrop-blur-xl border border-white/20 rounded-2xl transition-all duration-300"
              style={calculateBlockStyle(scrollFraction, 0.45, 0.7)}
            >
              <h3 className="font-heading text-xl font-bold text-white">Expert Guidance</h3>
              <p className="text-white/80 text-sm mt-1">Learn from certified, passionate instructors.</p>
            </div>
            
            <div 
              className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-72 h-40 p-4 bg-secondary/10 backdrop-blur-xl border border-white/20 rounded-2xl transition-all duration-300"
              style={calculateBlockStyle(scrollFraction, 0.7, 0.95)}
            >
              <h3 className="font-heading text-xl font-bold text-white">Thriving Community</h3>
              <p className="text-white/80 text-sm mt-1">Grow with fellow members and trainers.</p>
            </div>
            
            {/* Final CTA */}
             <div 
              className="absolute inset-0 flex flex-col items-center justify-center text-center transition-opacity duration-500"
              style={{ opacity: scrollFraction > 0.95 ? 1 : 0 }}
            >
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-4">
                Your Sanctuary is Ready
              </h1>
              <Link href="/programs" className="inline-flex items-center justify-center rounded-md bg-accent px-8 py-3 font-body font-bold text-white shadow-lg hover:opacity-90 transition-all active:scale-95 hover:shadow-accent/50">
                Begin Your Practice
              </Link>
            </div>
        </div>
      </div>
    </section>
  );
}