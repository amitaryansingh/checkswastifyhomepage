'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import Preloader from '@/components/layout/Preloader';
import Header from '@/components/layout/Header';

interface PreloaderContextType {
  isPreloaderFinished: boolean;
}

export const PreloaderContext = createContext<PreloaderContextType>({
  isPreloaderFinished: false,
});

export const usePreloader = () => useContext(PreloaderContext);

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isPreloading, setIsPreloading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPreloading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <PreloaderContext.Provider value={{ isPreloaderFinished: !isPreloading }}>
      <Preloader isPreloading={isPreloading} />
      <Header />
      <main>{children}</main>
    </PreloaderContext.Provider>
  );
}