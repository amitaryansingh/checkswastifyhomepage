'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { MoveRight, Users, HeartHandshake, Dumbbell } from 'lucide-react';

const frameCount = 200;
const imagePath = (frame: number) => `/orb-sequence/ezgif-frame-${String(frame + 1).padStart(3, '0')}.jpg`;

// Helper function to calculate opacity based on scroll range
const calculateOpacity = (scrollFraction: number, start: number, end: number) => {
  if (scrollFraction < start) return 0;
  if (scrollFraction > end) return 0;
  // Fade in
  const fadeInDuration = (end - start) * 0.2;
  if (scrollFraction < start + fadeInDuration) {
    return (scrollFraction - start) / fadeInDuration;
  }
  // Fade out
  const fadeOutDuration = (end - start) * 0.2;
  if (scrollFraction > end - fadeOutDuration) {
    return (end - scrollFraction) / fadeOutDuration;
  }
  return 1;
};

export default function HeroJourney() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollFraction, setScrollFraction] = useState(0);

  // Pre-load all images for smooth animation
  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = imagePath(i);
        await new Promise(resolve => { img.onload = resolve; });
        loadedImages[i] = img;
      }
      setImages(loadedImages);
      setIsLoaded(true);
    };
    loadImages();
  }, []);

  // Set up the scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const { top, height } = container.getBoundingClientRect();
      const scrollableDistance = height - window.innerHeight;
      const scrollPosition = -top;
      const fraction = Math.max(0, Math.min(1, scrollPosition / scrollableDistance));
      setScrollFraction(fraction);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Draw the correct image frame on the canvas when scrollFraction changes
  useEffect(() => {
    if (!isLoaded || !canvasRef.current || images.length < 1) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
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
        
        {/* All content stages are positioned on top of each other and fade in/out */}
        <div className="relative z-20 w-11/12 max-w-2xl text-center">
          
          {/* Stage 1: Intro */}
          <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500" style={{ opacity: calculateOpacity(scrollFraction, 0, 0.25) }}>
             <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">Feeling overwhelmed?</h1>
             <p className="font-body text-lg text-white/80 mt-2">The path to clarity begins here.</p>
          </div>

          {/* Stage 2: Programs */}
          <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500" style={{ opacity: calculateOpacity(scrollFraction, 0.25, 0.5) }}>
            <div className="p-8 bg-secondary/10 backdrop-blur-xl border border-white/20 rounded-2xl">
              <div className="flex justify-center gap-8 mb-4">
                <Dumbbell size={32} className="text-accent" />
                <HeartHandshake size={32} className="text-accent" />
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">Discover Curated Programs</h2>
              <p className="font-body text-lg text-white/80 mt-2">Tailored for every level, from beginner to advanced.</p>
            </div>
          </div>
          
          {/* Stage 3: Trainers */}
          <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500" style={{ opacity: calculateOpacity(scrollFraction, 0.5, 0.75) }}>
             <div className="p-8 bg-secondary/10 backdrop-blur-xl border border-white/20 rounded-2xl">
                <Users size={32} className="text-accent mb-4 mx-auto" />
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">Connect with Expert Trainers</h2>
                <p className="font-body text-lg text-white/80 mt-2">Find a guide who understands your personal journey.</p>
             </div>
          </div>

          {/* Stage 4: Final CTA */}
          <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500" style={{ opacity: scrollFraction > 0.75 ? 1 : 0 }}>
            <div className="p-8 bg-secondary/10 backdrop-blur-xl border border-white/20 rounded-2xl">
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-4">
                Your Journey Starts Here
              </h1>
              <p className="font-body text-lg text-white/80 mb-8 max-w-md mx-auto">
                Join a community dedicated to wellness and begin your transformation today.
              </p>
              <Link href="/programs" className="inline-flex items-center justify-center rounded-md bg-accent px-8 py-3 font-body font-bold text-white shadow-lg hover:opacity-90 transition-all active:scale-95 hover:shadow-accent/50">
                Explore Svasthify
                <MoveRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}