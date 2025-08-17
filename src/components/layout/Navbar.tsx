// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Menu, X } from 'lucide-react';

// const navLinks = [
//   { href: '/', label: 'Home' },
//   { href: '/programs', label: 'Programs' },
//   { href: '/trainers', label: 'Trainers' },
//   { href: '/about', label: 'About' },
//   { href: '/contact', label: 'Contact' },
// ];

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="w-full bg-secondary shadow-sm sticky top-0">
//       <div className="relative z-50 bg-secondary">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="flex h-20 items-center justify-between">
//             <div className="flex-shrink-0">
//               <Link href="/" className="flex items-center">
//                 <Image
//                   src="/navigationbar_logo2.png"
//                   alt="Svasthify Logo"
//                   width={120}
//                   height={90}
//                   className="h-15 w-auto"
//                 />
//               </Link>
//             </div>
//             <div className="hidden lg:flex lg:items-center lg:space-x-8">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   className="relative font-medium text-text-dark transition-colors duration-300 group"
//                 >
//                   {link.label}
//                   <span className="absolute bottom-0 left-0 h-[2px] w-full bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
//                 </Link>
//               ))}
//               <Link
//                 href="/login"
//                 className="ml-8 inline-flex items-center justify-center rounded-md border border-transparent bg-accent px-4 py-2 font-medium text-white shadow-sm hover:opacity-90 transition-transform active:scale-95"
//               >
//                 Log in →
//               </Link>
//             </div>
//             <div className="flex items-center lg:hidden">
//               <button
//                 onClick={toggleMenu}
//                 className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
//                 aria-expanded={isOpen}
//               >
//                 <span className="sr-only">Open main menu</span>
//                 {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div
//         className={`lg:hidden fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out bg-black/20 backdrop-blur-md ${
//           isOpen ? 'translate-x-0' : 'translate-x-full'
//         }`}
//       >
//         <div className="flex h-full flex-col p-6 pt-24">
//           <div className="flex flex-col space-y-4 items-center">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 onClick={toggleMenu}
//                 className="text-lg font-medium text-text-dark hover:text-accent py-2"
//               >
//                 {link.label}
//               </Link>
//             ))}
//             {/* FIX: Corrected the closing tag and removed corrupted text from this Link component */}
//             <Link
//               href="/login"
//               onClick={toggleMenu}
//               className="mt-4 w-full inline-flex items-center justify-center rounded-md border border-transparent bg-accent px-4 py-2 text-lg font-medium text-white shadow-sm hover:opacity-90"
//             >
//               Log in →
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/programs', label: 'Programs' },
  { href: '/trainers', label: 'Trainers' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    // THE FIX: Removed `sticky top-0` as the parent <header> is now `fixed`
    <nav className="w-full shadow-sm">
      {/* THE FIX: Added glassmorphism effect to match the TopBar */}
      <div className="relative z-50 bg-secondary/20 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image
                  src="/navigationbar_logo2.png"
                  alt="Svasthify Logo"
                  width={120}
                  height={90}
                  className="h-15 w-auto"
                />
              </Link>
            </div>
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative font-medium text-text-dark transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 h-[2px] w-full bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
                </Link>
              ))}
              <Link
                href="/login"
                className="ml-8 inline-flex items-center justify-center rounded-md border border-transparent bg-accent px-4 py-2 font-medium text-white shadow-sm hover:opacity-90 transition-transform active:scale-95"
              >
                Log in →
              </Link>
            </div>
            <div className="flex items-center lg:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`lg:hidden fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out bg-black/20 backdrop-blur-md ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col p-6 pt-24">
          <div className="flex flex-col space-y-4 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={toggleMenu}
                className="text-lg font-medium text-text-dark hover:text-accent py-2"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={toggleMenu}
              className="mt-4 w-full inline-flex items-center justify-center rounded-md border border-transparent bg-accent px-4 py-2 text-lg font-medium text-white shadow-sm hover:opacity-90"
            >
              Log in →
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}