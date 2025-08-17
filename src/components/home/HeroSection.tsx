// 'use client';

// import { useRef, useEffect, useState } from 'react';
// import Link from 'next/link';
// import { Users, Award, BookOpen } from 'lucide-react';

// const frameCount = 32;
// const imagePath = (frame: number) => `/orb-sequence3/ezgif-frame-${String(frame + 1).padStart(3, '0')}.png`;

// // Helper function to calculate opacity and transform for text stages
// const calculateAnimationValues = (scrollFraction: number, start: number, end: number) => {
//   if (scrollFraction < start || scrollFraction > end) {
//     return { opacity: 0, transform: `translateY(30px)` };
//   }
//   const fadeInEnd = start + (end - start) * 0.25;
//   const fadeOutStart = end - (end - start) * 0.25;
//   let opacity = 1;
//   if (scrollFraction < fadeInEnd) {
//     opacity = (scrollFraction - start) / (fadeInEnd - start);
//   } else if (scrollFraction > fadeOutStart) {
//     opacity = (end - scrollFraction) / (end - fadeOutStart);
//   }
//   const progress = (scrollFraction - start) / (end - start);
//   const translateY = 30 - (progress * 60);
//   return { opacity, transform: `translateY(${translateY}px)` };
// };

// export default function HeroSection() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [images, setImages] = useState<HTMLImageElement[]>([]);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [scrollFraction, setScrollFraction] = useState(0);

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

//   useEffect(() => {
//     const handleScroll = () => {
//       const container = containerRef.current;
//       if (!container) return;
//       const { top, height } = container.getBoundingClientRect();
//       const scrollableDistance = height - window.innerHeight;
//       const scrollPosition = -top;
//       const fraction = Math.max(0, Math.min(1, scrollPosition / scrollableDistance));
//       setScrollFraction(fraction);
//     };
//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     if (!isLoaded || !canvasRef.current || images.length < 1) return;
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     const frameIndex = Math.min(frameCount - 1, Math.floor(scrollFraction * frameCount));
//     const img = images[frameIndex];
//     if (img && context) {
//       requestAnimationFrame(() => {
//         context.clearRect(0, 0, canvas.width, canvas.height);
//         context.drawImage(img, 0, 0, canvas.width, canvas.height);
//       });
//     }
//   }, [scrollFraction, isLoaded, images]);

//   const stage1Style = {
//     opacity: scrollFraction < 0.2 ? 1 - (scrollFraction / 0.2) : 0,
//     transform: `translateY(${scrollFraction * -50}px)`,
//   };
//   const stage2Style = calculateAnimationValues(scrollFraction, 0.2, 0.45);
//   const stage3Style = calculateAnimationValues(scrollFraction, 0.5, 0.75);
//   const stage4Style = {
//     opacity: scrollFraction > 0.8 ? (scrollFraction - 0.8) / 0.2 : 0,
//     transform: `scale(${0.9 + (scrollFraction - 0.8) / 0.2 * 0.1})`,
//   };
//   const proofStyle = { opacity: scrollFraction > 0.9 ? (scrollFraction - 0.9) / 0.1 : 0 };

//   return (
//     <section ref={containerRef} className="relative h-[400vh] w-full">
//       <div className="sticky top-0 h-screen w-full flex items-end justify-center pb-80 overflow-hidden">
//         {/* --- ENHANCEMENT ADDED: CSS filters to adjust color --- */}
//         <canvas
//           ref={canvasRef}
//           width="1920"
//           height="1080"
//           className="absolute top-0 left-0 w-full h-full object-cover z-0"
          
//         />
//         <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>
        
//         <div className="relative z-20 w-11/12 max-w-4xl text-center">
          
//           <div className="absolute inset-0 flex items-center justify-center transition-all duration-100" style={stage1Style}>
//              <h1 className="font-heading text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
//                 Searching for a guide on your path to wellness?
//              </h1>
//           </div>

//           <div className="absolute inset-0 flex items-center justify-center transition-all duration-100" style={stage2Style}>
//             <h2 className="font-heading text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
//                 Discover premier yoga and meditation programs, right here in the NCR.
//             </h2>
//           </div>
          
//           <div className="absolute inset-0 flex items-center justify-center transition-all duration-100" style={stage3Style}>
//              <h2 className="font-heading text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
//                 <span className="text-accent">Are you a trainer?</span> Inspire others and grow your practice with us.
//              </h2>
//           </div>

//           <div className="absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-100" style={stage4Style}>
//             <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-8 drop-shadow-lg">
//               The World of Svasthify Awaits.
//             </h1>
//             <Link 
//               href="/programs" 
//               className="inline-flex items-center justify-center rounded-md bg-accent px-8 py-3 font-body font-bold text-white shadow-lg hover:opacity-90 transition-all active:scale-95 hover:shadow-accent/50"
//             >
//               Start Your Journey
//             </Link>

//             <div className="mt-16 transition-opacity duration-500" style={proofStyle}>
//               <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 text-white/80">
//                 <div className="flex items-center gap-3">
//                   <Award size={24} className="text-accent"/>
//                   <div>
//                     <p className="font-bold text-xl font-heading">50+</p>
//                     <p className="text-sm font-body">Expert Trainers</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Users size={24} className="text-accent"/>
//                   <div>
//                     <p className="font-bold text-xl font-heading">1000+</p>
//                     <p className="text-sm font-body">Members Strong</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <BookOpen size={24} className="text-accent"/>
//                   <div>
//                     <p className="font-bold text-xl font-heading">200+</p>
//                     <p className="text-sm font-body">Curated Classes</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//           </div>
//         </div>
        
//         <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/10 z-50">
//           <div 
//             className="h-full bg-accent" 
//             style={{ width: `${scrollFraction * 100}%` }}
//           ></div>
//         </div>
//       </div>
//     </section>
//   );
// }



'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { Users, Award, BookOpen } from 'lucide-react';

const frameCount = 32;
const imagePath = (frame: number) => `/orb-sequence3/ezgif-frame-${String(frame + 1).padStart(3, '0')}.png`;

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  useEffect(() => {
    if (!isLoaded || !canvasRef.current || images.length < 1) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const scrollContainer = scrollContainerRef.current;

    const handleScroll = () => {
      if (!scrollContainer) return;
      
      const scrollableDistance = scrollContainer.scrollHeight - scrollContainer.clientHeight;
      if (scrollableDistance === 0) {
        setScrollProgress(0);
        return;
      }
      const scrollFraction = scrollContainer.scrollTop / scrollableDistance;
      
      setScrollProgress(scrollFraction);

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

    const firstImage = images[0];
    if (firstImage && context) {
      context.drawImage(firstImage, 0, 0, canvas.width, canvas.height);
    }

    return () => scrollContainer?.removeEventListener('scroll', handleScroll);
  }, [isLoaded, images]);

  return (
    <section className="relative h-screen w-full">
      {/* Layer 1: The animation is fixed to the background */}
      <div className="fixed top-0 left-0 h-full w-full">
        <canvas
          ref={canvasRef}
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Layer 2: The scrollable, snapping container for the text */}
      <div 
        ref={scrollContainerRef} 
        className="relative z-10 h-screen w-full overflow-y-scroll snap-y snap-mandatory"
      >
        {/* Slide 1: Initial text */}
        {/* UPDATED: Changed items-center to items-end and added pb-40 */}
        <div className="h-screen w-full flex items-end justify-center snap-start pb-40">
          <h1 className="w-11/12 max-w-4xl font-heading text-4xl md:text-6xl font-bold text-white text-center drop-shadow-lg">
            Searching for a guide on your path to wellness?
          </h1>
        </div>

        {/* Slide 2: Credibility */}
        {/* UPDATED: Changed items-center to items-end and added pb-40 */}
        <div className="h-screen w-full flex items-end justify-center snap-start pb-40">
          <h2 className="w-11/12 max-w-4xl font-heading text-4xl md:text-6xl font-bold text-white text-center drop-shadow-lg">
            Discover premier yoga and meditation programs, right here in the NCR.
          </h2>
        </div>

        {/* Slide 3: For Trainers */}
        {/* UPDATED: Changed items-center to items-end and added pb-40 */}
        <div className="h-screen w-full flex items-end justify-center snap-start pb-40">
          <h2 className="w-11/12 max-w-4xl font-heading text-4xl md:text-6xl font-bold text-white text-center drop-shadow-lg">
            <span className="text-accent">Are you a trainer?</span> Inspire others and grow your practice with us.
          </h2>
        </div>

        {/* Slide 4: Final CTA with Social Proof */}
        {/* UPDATED: Changed justify-center to justify-end and added pb-40 */}
        <div className="h-screen w-full flex flex-col items-center justify-end snap-start pb-40">
          <div className="text-center">
            <h1 className="w-11/12 mx-auto max-w-4xl font-heading text-4xl md:text-6xl font-bold text-white mb-8 drop-shadow-lg">
              The World of Svasthify Awaits.
            </h1>
            <Link 
              href="/programs" 
              className="inline-flex items-center justify-center rounded-md bg-accent px-8 py-3 font-body font-bold text-white shadow-lg hover:opacity-90 transition-all active:scale-95 hover:shadow-accent/50"
            >
              Start Your Journey
            </Link>
          </div>

          <div className="mt-16">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 text-white/80">
              <div className="flex items-center gap-3">
                <Award size={24} className="text-accent"/>
                <div>
                  <p className="font-bold text-xl font-heading">50+</p>
                  <p className="text-sm font-body">Expert Trainers</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users size={24} className="text-accent"/>
                <div>
                  <p className="font-bold text-xl font-heading">1000+</p>
                  <p className="text-sm font-body">Members Strong</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <BookOpen size={24} className="text-accent"/>
                <div>
                  <p className="font-bold text-xl font-heading">200+</p>
                  <p className="text-sm font-body">Curated Classes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/10 z-20">
        <div 
          className="h-full bg-accent" 
          style={{ width: `${scrollProgress * 100}%` }}
        ></div>
      </div>
    </section>
  );
}