// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { MoveRight } from 'lucide-react';

// export default function HeroSection() {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleMouseMove = (event: MouseEvent) => {
//       setMousePosition({ x: event.clientX, y: event.clientY });
//     };
//     window.addEventListener('mousemove', handleMouseMove);
//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   const parallaxOffset = (factor: number) => ({
//     transform: `translate(${mousePosition.x / factor}px, ${mousePosition.y / factor}px)`,
//   });

//   return (
//     <section className="relative w-full h-screen overflow-hidden bg-secondary flex items-center justify-center">
//       {/* Layer 1: Sand Background (Static) - WITH NEW, WORKING URL */}
//       <Image
//         src="/sandbackground.jpg"
//         alt="Zen garden sand background"
//         fill={true}
//         objectFit="cover"
//         className="z-0 opacity-80"
//         priority={true}
//       />

//       {/* Layer 2: Parallax Stones */}
//       <div
//         className="absolute inset-0 z-10 transition-transform duration-500 ease-out"
//         style={parallaxOffset(50)}
//       >
//         <Image
//           src="/stone.png"
//           alt="Floating stone"
//           width={200}
//           height={200}
//           className="absolute top-[15%] left-[20%] opacity-70"
//         />
//       </div>
      
//       {/* Layer 3: Parallax Leaf */}
//        <div
//         className="absolute inset-0 z-30 transition-transform duration-500 ease-out"
//         style={parallaxOffset(-30)}
//       >
//         <Image
//           src="/leaf.png"
//           alt="Floating leaf"
//           width={250}
//           height={250}
//           className="absolute bottom-[20%] right-[15%] opacity-80"
//         />
//       </div>

//       {/* Layer 4: Glassmorphism Panel */}
//       <div className="relative z-20 w-11/12 max-w-2xl p-8 md:p-12 text-center bg-secondary/50 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl">
//         <h1 className="font-heading text-4xl md:text-6xl font-bold text-text-dark mb-4">
//           Find Your Center
//         </h1>
//         <p className="font-body text-lg text-text-dark/80 mb-8 max-w-md mx-auto">
//           Discover personalized yoga, meditation, and wellness programs designed to cultivate peace and strength in your daily life.
//         </p>
//         <Link
//           href="/programs"
//           className="inline-flex items-center justify-center rounded-md bg-accent px-8 py-3 font-body font-bold text-white shadow-lg hover:opacity-90 transition-all duration-300 active:scale-95 hover:shadow-accent/50"
//         >
//           Explore Programs
//           <MoveRight className="ml-2 h-5 w-5" />
//         </Link>
//       </div>
//     </section>
//   );
// }




// 'use client';

// import Link from 'next/link';
// import { MoveRight } from 'lucide-react';

// export default function HeroSection() {
//   return (
//     <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
//       {/* Layer 1: The Looping 3D Orb Video */}
//       <video
//         autoPlay
//         loop
//         muted
//         playsInline // Important for iOS devices
//         className="absolute top-0 left-0 w-full h-full object-cover z-0"
//       >
//         <source src="/orb121.mp4" type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>

//       {/* Layer 2: A subtle dark overlay for better text contrast */}
//       <div className="absolute top-0 left-0 w-full h-full bg-black/20 z-10"></div>

//       {/* Layer 3: The Glassmorphism Panel */}
//       <div className="relative z-20 w-11/12 max-w-2xl p-8 text-center bg-secondary/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
//         <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-4">
//           Inhale Your Intention
//         </h1>
//         <p className="font-body text-lg text-white/80 mb-8 max-w-md mx-auto">
//           Discover personalized yoga, meditation, and wellness programs designed to cultivate peace and strength in your daily life.
//         </p>
//         <Link
//           href="/programs"
//           className="inline-flex items-center justify-center rounded-md bg-accent px-8 py-3 font-body font-bold text-white shadow-lg hover:opacity-90 transition-all duration-300 active:scale-95 hover:shadow-accent/50"
//         >
//           Explore Programs
//           <MoveRight className="ml-2 h-5 w-5" />
//         </Link>
//       </div>
//     </section>
//   );
// }


// 'use client';

// import { useRef, useEffect, useState } from 'react';
// import Link from 'next/link';
// import { MoveRight } from 'lucide-react';

// // --- Configuration ---
// // UPDATED: Set to 200 to match your total number of image frames.
// const frameCount = 200; 
// // UPDATED: This function now generates the exact filenames you have (e.g., "ezgif-frame-001.jpg").
// const imagePath = (frame: number) => `/orb-sequence/ezgif-frame-${String(frame + 1).padStart(3, '0')}.jpg`;

// export default function HeroSection() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
  
//   const [images, setImages] = useState<HTMLImageElement[]>([]);
//   const [isLoaded, setIsLoaded] = useState(false);

//   // Effect to pre-load all images into memory
//   useEffect(() => {
//     const loadImages = async () => {
//       const loadedImages: HTMLImageElement[] = [];
//       const promises = [];

//       for (let i = 0; i < frameCount; i++) {
//         const promise = new Promise<void>((resolve) => {
//           const img = new Image();
//           img.src = imagePath(i);
//           img.onload = () => {
//             loadedImages[i] = img;
//             resolve();
//           };
//           // Optional: handle image load errors
//           img.onerror = () => {
//             console.error(`Failed to load image: ${img.src}`);
//             resolve(); // Resolve even if an image fails to load
//           }
//         });
//         promises.push(promise);
//       }
      
//       await Promise.all(promises);
//       setImages(loadedImages);
//       setIsLoaded(true);
//     };

//     loadImages();
//   }, []);
  
//   // Effect to handle drawing on the canvas during scroll
//   useEffect(() => {
//     if (!isLoaded || !canvasRef.current || images.length < frameCount) return;

//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     let frameId: number;

//     // Draw the first frame initially
//     const firstImage = images[0];
//     if (firstImage && context) {
//       context.drawImage(firstImage, 0, 0, canvas.width, canvas.height);
//     }
    
//     const handleScroll = () => {
//       frameId = requestAnimationFrame(() => {
//         const container = containerRef.current;
//         if (!container) return;

//         const { top, height } = container.getBoundingClientRect();
//         const scrollableDistance = height - window.innerHeight;
//         const scrollPosition = -top;
//         const scrollFraction = Math.max(0, Math.min(1, scrollPosition / scrollableDistance));
        
//         const frameIndex = Math.min(
//           frameCount - 1,
//           Math.floor(scrollFraction * frameCount)
//         );
        
//         const img = images[frameIndex];
//         if (img && context) {
//           context.clearRect(0, 0, canvas.width, canvas.height); // Clear previous frame
//           context.drawImage(img, 0, 0, canvas.width, canvas.height);
//         }
//       });
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       if (frameId) cancelAnimationFrame(frameId);
//     };
//   }, [isLoaded, images]);

//   return (
//     <section ref={containerRef} className="relative h-[300vh] w-full">
//       <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
//         <canvas ref={canvasRef} width="1920" height="1080" className="absolute top-0 left-0 w-full h-full object-cover z-0" />
        
//         {!isLoaded && (
//           <div className="absolute z-50 text-white font-body">Loading Animation...</div>
//         )}

//         <div className="absolute top-0 left-0 w-full h-full bg-black/20 z-10"></div>
//         <div className="relative z-20 w-11/12 max-w-2xl p-8 text-center bg-secondary/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
//           <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-4">
//             Inhale Your Intention
//           </h1>
//           <p className="font-body text-lg text-white/80 mb-8 max-w-md mx-auto">
//             Discover personalized yoga, meditation, and wellness programs designed to cultivate peace and strength in your daily life.
//           </p>
//           <Link
//             href="/programs"
//             className="inline-flex items-center justify-center rounded-md bg-accent px-8 py-3 font-body font-bold text-white shadow-lg hover:opacity-90 transition-all duration-300 active:scale-95 hover:shadow-accent/50"
//           >
//             Explore Programs
//             <MoveRight className="ml-2 h-5 w-5" />
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }



// 'use client';

// import { useRef, useEffect, useState } from 'react';
// import Link from 'next/link';

// const frameCount = 200;
// const imagePath = (frame: number) => `/orb-sequence/ezgif-frame-${String(frame + 1).padStart(3, '0')}.jpg`;

// // --- Helper function for complex scroll animations ---
// // Calculates opacity and transform based on a scroll range
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
  
//   // Animate Y position from 30px to 0px and back to -30px
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

//   // Pre-load all images for a smooth animation
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

//   // Set up the scroll listener
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

//   // Draw the correct image frame onto the canvas
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

//   // --- Calculate styles for each stage ---
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

//   return (
//     <section ref={containerRef} className="relative h-[400vh] w-full">
//       <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
//         <canvas ref={canvasRef} width="1920" height="1080" className="absolute top-0 left-0 w-full h-full object-cover z-0" />
//         <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>
        
//         <div className="relative z-20 w-11/12 max-w-4xl text-center">
          
//           {/* Stage 1: Initial text, visible on load, fades and moves up on scroll */}
//           <div className="absolute inset-0 flex items-center justify-center transition-all duration-100" style={stage1Style}>
//              <h1 className="font-heading text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
//                 Searching for a guide on your path to wellness?
//              </h1>
//           </div>

//           {/* Stage 2: Credibility, slides in and out */}
//           <div className="absolute inset-0 flex items-center justify-center transition-all duration-100" style={stage2Style}>
//             <h2 className="font-heading text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
//                 Discover premier yoga and meditation programs, right here in the NCR.
//             </h2>
//           </div>
          
//           {/* Stage 3: For Trainers, slides in and out */}
//           <div className="absolute inset-0 flex items-center justify-center transition-all duration-100" style={stage3Style}>
//              <h2 className="font-heading text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
//                 <span className="text-accent">Are you a trainer?</span> Inspire others and grow your practice with us.
//              </h2>
//           </div>

//           {/* Stage 4: Final CTA, scales up and fades in */}
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
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }



// 'use client';

// import { useRef, useEffect, useState } from 'react';
// import Link from 'next/link';
// import { Users, Award, BookOpen } from 'lucide-react';

// const frameCount = 200;
// const imagePath = (frame: number) => `/orb-sequence2/ezgif-frame-${String(frame + 1).padStart(3, '0')}.png`;

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
//       {/* THE FIX: Changed `items-center` to `items-end` and added `pb-24` to push all text downwards */}
//       <div className="sticky top-0 h-screen w-full flex items-end justify-center pb-80 overflow-hidden">
//         <canvas ref={canvasRef} width="1920" height="1080" className="absolute top-0 left-0 w-full h-full object-cover z-0" />
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
//       </div>
//     </section>
//   );
// }





// 'use client';

// import { useRef, useEffect, useState } from 'react';
// import Link from 'next/link';
// import { Users, Award, BookOpen } from 'lucide-react';

// const frameCount = 200;
// const imagePath = (frame: number) => `/orb-sequence2/ezgif-frame-${String(frame + 1).padStart(3, '0')}.png`;

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
//         <canvas ref={canvasRef} width="1920" height="1080" className="absolute top-0 left-0 w-full h-full object-cover z-0" />
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
  const [activeStage, setActiveStage] = useState(0);

  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Effect to load images and draw the first frame
  useEffect(() => {
    const loadAndDrawFirstFrame = async () => {
      const loadedImages: HTMLImageElement[] = [];
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = imagePath(i);
        await new Promise(resolve => { img.onload = resolve; });
        loadedImages[i] = img;
      }
      setImages(loadedImages);
      setIsLoaded(true);

      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d');
      if (context && loadedImages[0]) {
        context.drawImage(loadedImages[0], 0, 0, canvas.width, canvas.height);
      }
    };
    loadAndDrawFirstFrame();
  }, []);

  // Effect for the smooth background scroll animation
  useEffect(() => {
    if (!isLoaded) return;
    const scrollContainer = scrollContainerRef.current;
    const handleScroll = () => {
      if (!scrollContainer) return;
      const scrollableDistance = scrollContainer.scrollHeight - scrollContainer.clientHeight;
      const scrollFraction = scrollContainer.scrollTop / scrollableDistance;
      const frameIndex = Math.min(frameCount - 1, Math.floor(scrollFraction * frameCount));
      
      requestAnimationFrame(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        const img = images[frameIndex];
        if (img && context) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      });
    };
    scrollContainer?.addEventListener('scroll', handleScroll);
    return () => scrollContainer?.removeEventListener('scroll', handleScroll);
  }, [isLoaded, images]);

  // Effect to observe which slide is visible to trigger text animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stageIndex = parseInt(entry.target.getAttribute('data-stage') || '0', 10);
            setActiveStage(stageIndex);
          }
        });
      },
      { threshold: 0.6 } // Trigger when 60% of the slide is visible
    );
    const currentRefs = slideRefs.current;
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [isLoaded]);

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
        <div ref={el => slideRefs.current[0] = el} data-stage="0" className="h-screen w-full flex items-end justify-center snap-start px-4 pb-32">
          <h1 className="w-11/12 max-w-4xl font-heading text-4xl md:text-6xl font-bold text-white text-center drop-shadow-lg">
            Searching for a guide on your path to wellness?
          </h1>
        </div>

        {/* Slide 2: Credibility */}
        <div ref={el => slideRefs.current[1] = el} data-stage="1" className="h-screen w-full flex items-end justify-center snap-start px-4 pb-32">
          <h2 className={`transition-all duration-700 w-11/12 max-w-4xl font-heading text-4xl md:text-6xl font-bold text-white text-center drop-shadow-lg ${activeStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Discover premier yoga and meditation programs, right here in the NCR.
          </h2>
        </div>

        {/* Slide 3: For Trainers */}
        <div ref={el => slideRefs.current[2] = el} data-stage="2" className="h-screen w-full flex items-end justify-center snap-start px-4 pb-32">
          <h2 className={`transition-all duration-700 w-11/12 max-w-4xl font-heading text-4xl md:text-6xl font-bold text-white text-center drop-shadow-lg ${activeStage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="text-accent">Are you a trainer?</span> Inspire others and grow your practice with us.
          </h2>
        </div>

        {/* Slide 4: Final CTA with Social Proof */}
        <div ref={el => slideRefs.current[3] = el} data-stage="3" className="h-screen w-full flex flex-col items-center justify-end snap-start px-4 pb-24">
          <div className={`text-center transition-all duration-700 ${activeStage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="w-11/12 max-w-4xl font-heading text-4xl md:text-6xl font-bold text-white mb-8 drop-shadow-lg">
              The World of Svasthify Awaits.
            </h1>
            <Link 
              href="/programs" 
              className="inline-flex items-center justify-center rounded-md bg-accent px-8 py-3 font-body font-bold text-white shadow-lg hover:opacity-90 transition-all active:scale-95 hover:shadow-accent/50"
            >
              Start Your Journey
            </Link>

            {/* --- Key Statistics Block Added --- */}
            <div className={`mt-16 transition-all duration-700 delay-300 ${activeStage >= 3 ? 'opacity-100' : 'opacity-0'}`}>
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
      </div>
    </section>
  );
}