// import { Mail, Phone, Facebook, Twitter, Instagram } from 'lucide-react';
// import Navbar from './Navbar';
// import Link from 'next/link';

// const TopBar = () => {
//     return (
//         // Animation class was removed from here
//         <div className="hidden md:block bg-primary text-text-light">
//             <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//                 <div className="flex h-10 items-center justify-between">
//                     <div className="flex items-center space-x-6 text-sm">
//                         <a
//                           href="mailto:info@svasthify.com" 
//                           className="flex items-center gap-2 hover:opacity-80 transition"
//                         >
//                             <Mail size={16} />
//                             <span>info@svasthify.com</span>
//                         </a>
//                         <a
//                           href="tel:+12345678910" 
//                           className="flex items-center gap-2 hover:opacity-80 transition"
//                         >
//                             <Phone size={16} />
//                             <span>+1 234 567 8910</span>
//                         </a>
//                     </div>
//                     <div className="flex items-center space-x-4">
//                         <Link href="#" className="hover:opacity-80 transition-opacity"><Twitter size={18} /></Link>
//                         <Link href="#" className="hover:opacity-80 transition-opacity"><Facebook size={18} /></Link>
//                         <Link href="#" className="hover:opacity-80 transition-opacity"><Instagram size={18} /></Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default function Header() {
//   return (
//     <header className="font-body">
//       <TopBar />
//       <Navbar />
//     </header>
//   );
// }


import { Mail, Phone, Facebook, Twitter, Instagram } from 'lucide-react';
import Navbar from './Navbar';
import Link from 'next/link';

const TopBar = () => {
    return (
        // Added glassmorphism effect: bg-opacity and backdrop-blur
        <div className="hidden md:block bg-primary/100 backdrop-blur-md text-text-light">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-10 items-center justify-between">
                    <div className="flex items-center space-x-6 text-sm">
                        <a
                          href="mailto:info@svasthify.com" 
                          className="flex items-center gap-2 hover:opacity-80 transition"
                        >
                            <Mail size={16} />
                            <span>info@svasthify.com</span>
                        </a>
                        <a
                          href="tel:+12345678910" 
                          className="flex items-center gap-2 hover:opacity-80 transition"
                        >
                            <Phone size={16} />
                            <span>+1 234 567 8910</span>
                        </a>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href="#" className="hover:opacity-80 transition-opacity"><Twitter size={18} /></Link>
                        <Link href="#" className="hover:opacity-80 transition-opacity"><Facebook size={18} /></Link>
                        <Link href="#" className="hover:opacity-80 transition-opacity"><Instagram size={18} /></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Header() {
  return (
    // THE FIX: Made the entire header fixed to the top of the page
    <header className="font-body fixed top-0 left-0 w-full z-50">
      <TopBar />
      <Navbar />
    </header>
  );
}