import Image from 'next/image';

interface PreloaderProps {
  isPreloading: boolean;
}

export default function Preloader({ isPreloading }: PreloaderProps) {
  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-secondary transition-opacity duration-700 ease-in-out ${
        isPreloading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="animate-pulse">
        <Image
          src="/navigationbar_logo2.png"
          alt="Svasthify Logo"
          width={150}
          height={150}
          priority
        />
      </div>
    </div>
  );
}