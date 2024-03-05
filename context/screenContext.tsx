'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
} from 'react';

interface ScreenCtxProps {
  width: number;
  setWidth: Dispatch<SetStateAction<number>>;
}

const ScreenContext = createContext<ScreenCtxProps>({
  width: 0,
  setWidth: () => {},
});

export function ScreenContextProvider({children}: {children: React.ReactNode}) {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Initial width
    setWidth(window.innerWidth);

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const ctx = {
    width,
    setWidth,
  };
  return (
    <ScreenContext.Provider value={ctx}>{children}</ScreenContext.Provider>
  );
}

export const useScreen = () => useContext(ScreenContext);
