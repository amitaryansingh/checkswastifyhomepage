'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

const frameCount = 200;
const imagePath = (frame: number) => `/orb-sequence/ezgif-frame-${String(frame + 1).padStart(3, '0')}.jpg`;

const calculateTransform = (scrollFraction: number, start: number, end: number) => {
  if (scrollFraction < start) return 20;
  if (scrollFraction > end) return -20;
  const range = end - start;
  const progress = (scrollFraction - start) / range;
  return 20 - (progress * 40); // Animate from translateY(20px) to translateY(-20px)
};

const calculateOpacity = (scrollFraction: number, start: number, end: number) => {
  if (scrollFraction < start || scrollFraction > end) return 0;
  const fadeInEnd = start + (end-start)*0.25;
  const fadeOutStart = end - (end-start)*0.25;
  if(scrollFraction < fadeInEnd) return (scrollFraction - start) / (fadeInEnd - start);
  if(scrollFraction > fadeOutStart) return (end - scrollFraction) / (end - fadeOutStart);
  return 1;
};

export default function HeroDualPath() {
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

  return (
    <section ref={containerRef} className="relative h-[400vh] w-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} width="1920" height="1080" className="absolute top-0 left-0 w-full h-full object-cover z-0" />
        <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10"></div>
        
        <div className="relative z-20 w-full h-full">
            {/* Stage 1: Intro Question */}
            <div 
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
              style={{ opacity: calculateOpacity(scrollFraction, 0, 0.25) }}
            >
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-white text-center">What is your role on the path?</h1>
            </div>

            {/* Stage 2: User Path (Left) */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 left-8 md:left-16 w-5/12 max-w-md p-6 bg-secondary/10 backdrop-blur-xl border border-white/20 rounded-2xl transition-all duration-300"
              style={{ 
                opacity: calculateOpacity(scrollFraction, 0.25, 0.5),
                transform: `translateY(${calculateTransform(scrollFraction, 0.25, 0.5)}px)` 
              }}
            >
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-white">I am Seeking a Path.</h2>
              <p className="font-body text-md text-white/80 mt-2">Explore thousands of classes in yoga, meditation, and more.</p>
            </div>

            {/* Stage 3: Trainer Path (Right) */}
             <div 
              className="absolute top-1/2 -translate-y-1/2 right-8 md:right-16 w-5/12 max-w-md p-6 bg-secondary/10 backdrop-blur-xl border border-white/20 rounded-2xl transition-all duration-300"
              style={{ 
                opacity: calculateOpacity(scrollFraction, 0.5, 0.75),
                transform: `translateY(${calculateTransform(scrollFraction, 0.5, 0.75)}px)` 
              }}
            >
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-white">I am Guiding the Way.</h2>
              <p className="font-body text-md text-white/80 mt-2">Share your passion, build your community, and manage your practice.</p>
            </div>
            
            {/* Stage 4: Final CTA */}
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center text-center transition-opacity duration-500"
              style={{ opacity: scrollFraction > 0.8 ? 1 : 0 }}
            >
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-4">
                Your Journey Starts Here
              </h1>
              <p className="font-body text-lg text-white/80 mb-8">Join the Svasthify Community.</p>
              <Link href="/programs" className="inline-flex items-center justify-center rounded-md bg-accent px-8 py-3 font-body font-bold text-white shadow-lg hover:opacity-90 transition-all active:scale-95 hover:shadow-accent/50">
                Get Started
              </Link>
            </div>
        </div>
      </div>
    </section>
  );
}