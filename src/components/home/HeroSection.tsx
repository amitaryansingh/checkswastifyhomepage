'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { Users, Award, BookOpen } from 'lucide-react';

const frameCount = 32;
const imagePath = (frame: number) => `/orb-sequence3/ezgif-frame-${String(frame + 1).padStart(3, '0')}.png`;

// Staggered Text Animation Component (from our previous step)
const StaggeredText = ({ text, as: Component = 'h1' }: { text: string; as?: 'h1' | 'h2' }) => {
  return (
    <Component className="w-11/12 max-w-4xl font-heading text-4xl md:text-6xl font-bold text-white text-center drop-shadow-lg">
      {text.split(' ').map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block">
          {word.split('').map((char, charIndex) => (
            <span
              key={`${char}-${charIndex}`}
              className="animate-fadeInUp inline-block"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {char}
            </span>
          ))}
          <span className="inline-block">&nbsp;</span>
        </span>
      ))}
    </Component>
  );
};

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSlide, setVisibleSlide] = useState(0);
  
  // Refs to manage animation state
  const isAnimating = useRef(false);
  const slideIndex = useRef(0);

  useEffect(() => {
    const loadImages = async () => {
      // ... image loading logic (unchanged)
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
  
  // GSAP Scroll Logic Effect
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const slides = gsap.utils.toArray<HTMLElement>('.slide');
    const totalSlides = slides.length;

    const goToSlide = (index: number) => {
      if (isAnimating.current) return;
      isAnimating.current = true;
      slideIndex.current = index;
      
      gsap.to(scrollContainer, {
        scrollTo: { y: index * window.innerHeight, autoKill: false },
        duration: 1.2, // Duration of the scroll animation
        ease: 'power2.inOut',
        onComplete: () => {
          isAnimating.current = false;
        },
      });
    };

    const handleWheel = (e: WheelEvent) => {
      if (isAnimating.current) {
        e.preventDefault();
        return;
      }
      
      // This is the "force" threshold. 
      // A small scroll (deltaY < 30) won't do anything.
      const scrollThreshold = 30; 

      if (e.deltaY > scrollThreshold) {
        // Scrolling down
        if (slideIndex.current < totalSlides - 1) {
          e.preventDefault();
          goToSlide(slideIndex.current + 1);
        }
      } else if (e.deltaY < -scrollThreshold) {
        // Scrolling up
        if (slideIndex.current > 0) {
          e.preventDefault();
          goToSlide(slideIndex.current - 1);
        }
      }
    };

    // We need the GSAP ScrollToPlugin
    gsap.registerPlugin(ScrollToPlugin);
    scrollContainer.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel);
    };

  }, [isLoaded]);

  // Canvas Drawing Effect (updated to use slideIndex)
  useEffect(() => {
    if (!isLoaded || !canvasRef.current || images.length < 1) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const scrollContainer = scrollContainerRef.current;
    
    const handleScroll = () => {
        if (!scrollContainer) return;
        const { scrollTop, clientHeight, scrollHeight } = scrollContainer;
        const scrollableDistance = scrollHeight - clientHeight;
        if (scrollableDistance === 0) return;

        const scrollFraction = scrollTop / scrollableDistance;
        setScrollProgress(scrollFraction);

        const currentSlide = Math.round(scrollTop / clientHeight);
        setVisibleSlide(currentSlide);

        const frameIndex = Math.min(frameCount - 1, Math.floor(scrollFraction * frameCount));
        const img = images[frameIndex];

        if (img && context) {
            requestAnimationFrame(() => {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, 0, 0, canvas.width, canvas.height);
            });
        }
    };

    scrollContainer?.addEventListener('scroll', handleScroll, { passive: true });
    
    // Draw initial frame
    const firstImage = images[0];
    if (firstImage && context) {
        context.drawImage(firstImage, 0, 0, canvas.width, canvas.height);
    }
    
    return () => scrollContainer?.removeEventListener('scroll', handleScroll);
  }, [isLoaded, images]);

  return (
    <section className="relative h-screen w-full">
      <div className="fixed top-0 left-0 h-full w-full">
        <canvas ref={canvasRef} width="1920" height="1080" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Container is now controlled by GSAP, not CSS snap */}
      <div ref={scrollContainerRef} className="relative z-10 h-screen w-full overflow-y-scroll">
        
        {/* Added a "slide" class to each section */}
        <div className="slide h-screen w-full flex items-end justify-center pb-40">
          {visibleSlide === 0 && <StaggeredText text="Searching for a guide on your path to wellness?" />}
        </div>

        <div className="slide h-screen w-full flex items-end justify-center pb-40">
          {visibleSlide === 1 && <StaggeredText text="Discover premier yoga and meditation programs, right here in the NCR." as="h2" />}
        </div>

        <div className="slide h-screen w-full flex items-end justify-center pb-40">
           {visibleSlide === 2 && (
             <h2 className="w-11/12 max-w-4xl font-heading text-4xl md:text-6xl font-bold text-white text-center drop-shadow-lg">
                <span className="animate-fadeInUp inline-block" style={{ animationDelay: '0s' }}><span className="text-accent">Are</span></span><span className="inline-block">&nbsp;</span>
                <span className="animate-fadeInUp inline-block" style={{ animationDelay: '0.05s' }}><span className="text-accent">you</span></span><span className="inline-block">&nbsp;</span>
                <span className="animate-fadeInUp inline-block" style={{ animationDelay: '0.1s' }}><span className="text-accent">a</span></span><span className="inline-block">&nbsp;</span>
                <span className="animate-fadeInUp inline-block" style={{ animationDelay: '0.15s' }}><span className="text-accent">trainer?</span></span><span className="inline-block">&nbsp;</span>
                <span className="animate-fadeInUp inline-block" style={{ animationDelay: '0.2s' }}>Inspire</span><span className="inline-block">&nbsp;</span>
                <span className="animate-fadeInUp inline-block" style={{ animationDelay: '0.25s' }}>others</span><span className="inline-block">&nbsp;</span>
                <span className="animate-fadeInUp inline-block" style={{ animationDelay: '0.3s' }}>and</span><span className="inline-block">&nbsp;</span>
                <span className="animate-fadeInUp inline-block" style={{ animationDelay: '0.35s' }}>grow</span><span className="inline-block">&nbsp;</span>
                <span className="animate-fadeInUp inline-block" style={{ animationDelay: '0.4s' }}>your</span><span className="inline-block">&nbsp;</span>
                <span className="animate-fadeInUp inline-block" style={{ animationDelay: '0.45s' }}>practice</span><span className="inline-block">&nbsp;</span>
                <span className="animate-fadeInUp inline-block" style={{ animationDelay: '0.5s' }}>with</span><span className="inline-block">&nbsp;</span>
                <span className="animate-fadeInUp inline-block" style={{ animationDelay: '0.55s' }}>us.</span>
             </h2>
           )}
        </div>

        <div className="slide h-screen w-full flex flex-col items-center justify-end pb-40">
          {visibleSlide === 3 && (
            <>
              <div className="text-center">
                <StaggeredText text="The World of Svasthify Awaits." />
                <div className="animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
                  <Link href="/programs" className="inline-flex items-center justify-center rounded-md bg-accent px-8 py-3 font-body font-bold text-white shadow-lg hover:opacity-90 transition-all active:scale-95 hover:shadow-accent/50 mt-8">
                    Start Your Journey
                  </Link>
                </div>
              </div>
              <div className="mt-16 animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 text-white/80">
                  <div className="flex items-center gap-3"><Award size={24} className="text-accent"/><div><p className="font-bold text-xl font-heading">50+</p><p className="text-sm font-body">Expert Trainers</p></div></div>
                  <div className="flex items-center gap-3"><Users size={24} className="text-accent"/><div><p className="font-bold text-xl font-heading">1000+</p><p className="text-sm font-body">Members Strong</p></div></div>
                  <div className="flex items-center gap-3"><BookOpen size={24} className="text-accent"/><div><p className="font-bold text-xl font-heading">200+</p><p className="text-sm font-body">Curated Classes</p></div></div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/10 z-20">
        <div className="h-full bg-accent" style={{ width: `${scrollProgress * 100}%` }}></div>
      </div>
    </section>
  );
}