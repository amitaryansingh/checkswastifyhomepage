// 'use client';

// import { useRef, useEffect, useState } from 'react';
// import Link from 'next/link';
// import { Users, Award, BookOpen } from 'lucide-react';

// const frameCount = 59;
// const imagePath = (frame: number) => `/orb-sequence6/designforhp_${String(frame + 1).padStart(3, '0')}.jpg`;

// // NEW: A reusable component for the staggered text effect
// const StaggeredText = ({ text, as: Component = 'h1' }: { text: string; as?: 'h1' | 'h2' }) => {
//   // The key is used to re-trigger the animation when the text changes
//   return (
//     <Component className="w-11/12 max-w-4xl font-heading text-4xl md:text-6xl font-bold text-white text-center drop-shadow-lg">
//       {text.split(' ').map((word, index) => (
//         <span key={`${word}-${index}`} className="inline-block">
//           {word.split('').map((char, charIndex) => (
//             <span
//               key={`${char}-${charIndex}`}
//               className="animate-fadeInUp inline-block"
//               style={{ animationDelay: `${index * 0.05}s` }} // Stagger delay for each word
//             >
//               {char}
//             </span>
//           ))}
//           {/* Add a space after each word */}
//           <span className="inline-block">&nbsp;</span>
//         </span>
//       ))}
//     </Component>
//   );
// };


// export default function HeroSection() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const scrollContainerRef = useRef<HTMLDivElement>(null);
//   const [images, setImages] = useState<HTMLImageElement[]>([]);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [scrollProgress, setScrollProgress] = useState(0);
//   // NEW: Track the visible slide to re-trigger animations
//   const [visibleSlide, setVisibleSlide] = useState(0); 

//   useEffect(() => {
//     const loadImages = async () => {
//       const loadedImages: HTMLImageElement[] = [];
//       for (let i = 0; i < frameCount; i++) {
//         const img = new Image();
//         img.src = imagePath(i);
//         await new Promise(resolve => { img.onload = resolve; });
//         loadedImages[i] = img;
//       }
//       setImages(loadedImages);
//       setIsLoaded(true);
//     };
//     loadImages();
//   }, []);

//   // This effect now also tracks the visible slide
//   useEffect(() => {
//     if (!isLoaded || !canvasRef.current || images.length < 1) return;

//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     const scrollContainer = scrollContainerRef.current;

//     const handleScroll = () => {
//       if (!scrollContainer) return;
      
//       const { scrollTop, clientHeight, scrollHeight } = scrollContainer;
//       const scrollableDistance = scrollHeight - clientHeight;
      
//       if (scrollableDistance === 0) {
//         setScrollProgress(0);
//         setVisibleSlide(0);
//         return;
//       }

//       const scrollFraction = scrollTop / scrollableDistance;
//       setScrollProgress(scrollFraction);

//       // Determine the current slide index
//       const currentSlide = Math.round(scrollTop / clientHeight);
//       setVisibleSlide(currentSlide);

//       const frameIndex = Math.min(frameCount - 1, Math.floor(scrollFraction * frameCount));
//       const img = images[frameIndex];

//       if (img && context) {
//         requestAnimationFrame(() => {
//           context.clearRect(0, 0, canvas.width, canvas.height);
//           context.drawImage(img, 0, 0, canvas.width, canvas.height);
//         });
//       }
//     };

//     scrollContainer?.addEventListener('scroll', handleScroll, { passive: true });

//     const firstImage = images[0];
//     if (firstImage && context) {
//       context.drawImage(firstImage, 0, 0, canvas.width, canvas.height);
//     }

//     return () => scrollContainer?.removeEventListener('scroll', handleScroll);
//   }, [isLoaded, images]);

//   return (
//     <section className="relative h-screen w-full">
//       <div className="fixed top-0 left-0 h-full w-full">
//         <canvas ref={canvasRef} width="1920" height="1080" className="h-full w-full object-cover saturate-100 brightness-140" />
//         <div className="absolute inset-0 bg-black/40"></div>
//       </div>
      
//       <div ref={scrollContainerRef} className="relative z-10 h-screen w-full overflow-y-scroll snap-y snap-mandatory">
        
//         {/* Slide 1 */}
//         <div className="h-screen w-full flex items-end justify-center snap-start pb-40">
//           {/* Use the new StaggeredText component */}
//           {visibleSlide === 0 && <StaggeredText text="Searching for a guide on your path to wellness?" />}
//         </div>

//         {/* Slide 2 */}
//         <div className="h-screen w-full flex items-end justify-center snap-start pb-40">
//           {visibleSlide === 1 && <StaggeredText text="Discover premier yoga and meditation programs, right here in the NCR." as="h2" />}
//         </div>

//         {/* Slide 3 */}
//         <div className="h-screen w-full flex items-end justify-center snap-start pb-40">
//            {visibleSlide === 2 && (
//              <h2 className="w-11/12 max-w-4xl font-heading text-4xl md:text-6xl font-bold text-white text-center drop-shadow-lg">
//                 <span className="animate-fadeInUp inline-block" style={{ animationDelay: '0s' }}>
//                    <span className="text-accent">Are</span>
//                 </span>
//                  <span className="inline-block">&nbsp;</span>
//                 <span className="animate-fadeInUp inline-block" style={{ animationDelay: '0.05s' }}><span className="text-accent">you</span></span>
//                  <span className="inline-block">&nbsp;</span>
//                 <span className="animate-fadeInUp inline-block" style={{ animationDelay: '0.1s' }}><span className="text-accent">a</span></span>
//                  <span className="inline-block">&nbsp;</span>
//                 <span className="animate-fadeInUp inline-block" style={{ animationDelay: '0.15s' }}><span className="text-accent">trainer?</span></span>
//                  <span className="inline-block">&nbsp;</span>
//                 <span className="animate-fadeInUp inline-block" style={{ animationDelay: '0.2s' }}>Inspire</span>
//                  <span className="inline-block">&nbsp;</span>
//                 <span className="animate-fadeInUp inline-block" style={{ animationDelay: '0.25s' }}>others</span>
//                  <span className="inline-block">&nbsp;</span>
//                 <span className="animate-fadeInUp inline-block" style={{ animationDelay: '0.3s' }}>and</span>
//                  <span className="inline-block">&nbsp;</span>
//                 <span className="animate-fadeInUp inline-block" style={{ animationDelay: '0.35s' }}>grow</span>
//                  <span className="inline-block">&nbsp;</span>
//                 <span className="animate-fadeInUp inline-block" style={{ animationDelay: '0.4s' }}>your</span>
//                  <span className="inline-block">&nbsp;</span>
//                 <span className="animate-fadeInUp inline-block" style={{ animationDelay: '0.45s' }}>practice</span>
//                  <span className="inline-block">&nbsp;</span>
//                 <span className="animate-fadeInUp inline-block" style={{ animationDelay: '0.5s' }}>with</span>
//                  <span className="inline-block">&nbsp;</span>
//                 <span className="animate-fadeInUp inline-block" style={{ animationDelay: '0.55s' }}>us.</span>
//              </h2>
//            )}
//         </div>


//         {/* Slide 4 */}
//         <div className="h-screen w-full flex flex-col items-center justify-end snap-start pb-40">
//           {visibleSlide === 3 && (
//             <>
//               <div className="text-center">
//                 <StaggeredText text="The World of Svasthify Awaits." />
//                 <div className="animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
//                   <Link href="/programs" className="inline-flex items-center justify-center rounded-md bg-accent px-8 py-3 font-body font-bold text-white shadow-lg hover:opacity-90 transition-all active:scale-95 hover:shadow-accent/50 mt-8">
//                     Start Your Journey
//                   </Link>
//                 </div>
//               </div>

//               <div className="mt-16 animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
//                 <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 text-white/80">
//                   <div className="flex items-center gap-3">
//                     <Award size={24} className="text-accent"/>
//                     <div>
//                       <p className="font-bold text-xl font-heading">50+</p>
//                       <p className="text-sm font-body">Expert Trainers</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Users size={24} className="text-accent"/>
//                     <div>
//                       <p className="font-bold text-xl font-heading">1000+</p>
//                       <p className="text-sm font-body">Members Strong</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <BookOpen size={24} className="text-accent"/>
//                     <div>
//                       <p className="font-bold text-xl font-heading">200+</p>
//                       <p className="text-sm font-body">Curated Classes</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
      
//       <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/10 z-20">
//         <div className="h-full bg-accent" style={{ width: `${scrollProgress * 100}%` }}></div>
//       </div>
//     </section>
//   );
// }











'use client';

import { useRef, useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Award, BookOpen } from 'lucide-react';
import { PreloaderContext } from '@/components/layout/ClientLayout';

const frameCount = 59;
const imagePath = (frame: number) => `/orb-sequence6/designforhp_${String(frame).padStart(3, '0')}.jpg`;

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
  const [isAnimationReady, setIsAnimationReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSlide, setVisibleSlide] = useState(0); 
  const { isPreloaderFinished } = useContext(PreloaderContext);

  // More resilient lazy-loading effect
  useEffect(() => {
    const loadAnimationImages = async () => {
      const promises = [];
      for (let i = 0; i < frameCount; i++) {
        const promise = new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new window.Image();
          img.src = imagePath(i);
          img.onload = () => resolve(img);
          img.onerror = () => reject(`Failed to load image: ${img.src}`);
        });
        promises.push(promise);
      }
      
      try {
        const loadedImages = await Promise.all(promises);
        setImages(loadedImages);
        setIsAnimationReady(true);
      } catch (error) {
        console.error(error);
        // Even if some images fail, we can try to proceed
        setIsAnimationReady(true);
      }
    };
    
    loadAnimationImages();
  }, []);

  // Handle scroll and draw to canvas
  useEffect(() => {
    if (!isAnimationReady || !canvasRef.current || images.length < 1) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const scrollContainer = scrollContainerRef.current;

    const handleScroll = () => {
      if (!scrollContainer) return;
      const { scrollTop, clientHeight, scrollHeight } = scrollContainer;
      const scrollableDistance = scrollHeight - clientHeight;
      const scrollFraction = scrollableDistance > 0 ? scrollTop / scrollableDistance : 0;
      setScrollProgress(scrollFraction);
      const currentSlide = Math.round(scrollTop / clientHeight);
      setVisibleSlide(currentSlide);
      const frameIndex = Math.min(images.length - 1, Math.floor(scrollFraction * images.length));
      const img = images[frameIndex];
      if (img && context) {
        requestAnimationFrame(() => {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
        });
      }
    };

    scrollContainer?.addEventListener('scroll', handleScroll, { passive: true });
    
    const firstImage = images[0];
    if (firstImage && context) {
      context.drawImage(firstImage, 0, 0, canvas.width, canvas.height);
    }
    
    return () => scrollContainer?.removeEventListener('scroll', handleScroll);
  }, [isAnimationReady, images]);

  const showPlaceholder = isPreloaderFinished && !isAnimationReady;
  const showCanvas = isPreloaderFinished && isAnimationReady;
  const showUI = isPreloaderFinished;

  return (
    <section className="relative h-screen w-full">
      <div className="fixed top-0 left-0 h-full w-full">
        <Image
          src="/hero-placeholder.jpg"
          alt="A woman in a yoga pose"
          fill
          priority
          className={`h-full w-full object-cover filter  transition-opacity duration-500 ${showPlaceholder ? 'opacity-100' : 'opacity-0'}`}
        />
        <canvas 
          ref={canvasRef} 
          width="1920" 
          height="1080" 
          className={`h-full w-full object-cover filter  transition-opacity duration-500 ${showCanvas ? 'opacity-100' : 'opacity-0'}`} 
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div ref={scrollContainerRef} className={`relative z-10 h-screen w-full overflow-y-scroll snap-y snap-mandatory transition-opacity duration-500 ${showUI ? 'opacity-100' : 'opacity-0'}`}>
        
        <div className="h-screen w-full flex items-end justify-center snap-start pb-40">
          {isPreloaderFinished && visibleSlide === 0 && <StaggeredText text="Searching for a guide on your path to wellness?" />}
        </div>
        <div className="h-screen w-full flex items-end justify-center snap-start pb-40">
          {isPreloaderFinished && visibleSlide === 1 && <StaggeredText text="Discover premier yoga and meditation programs, right here in the NCR." as="h2" />}
        </div>
        <div className="h-screen w-full flex items-end justify-center snap-start pb-40">
           {isPreloaderFinished && visibleSlide === 2 && (
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
        <div className="h-screen w-full flex flex-col items-center justify-end snap-start pb-40">
          {isPreloaderFinished && visibleSlide === 3 && (
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
      
      <div className={`absolute bottom-0 left-0 w-full h-1.5 bg-white/10 z-20 transition-opacity duration-500 ${showUI ? 'opacity-100' : 'opacity-0'}`}>
        <div className="h-full bg-accent" style={{ width: `${scrollProgress * 100}%` }}></div>
      </div>
    </section>
  );
}