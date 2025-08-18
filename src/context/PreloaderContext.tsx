'use client';

import { createContext, useContext } from 'react';

interface PreloaderContextType {
  isPreloaderFinished: boolean;
}

export const PreloaderContext = createContext<PreloaderContextType>({
  isPreloaderFinished: false,
});

export const usePreloader = () => useContext(PreloaderContext);