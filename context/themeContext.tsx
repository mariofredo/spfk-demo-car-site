'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
} from 'react';

interface ThemeCtxProps {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

const ThemeContext = createContext<ThemeCtxProps>({
  theme: 'dark',
  setTheme: () => {},
});

export function ThemeContextProvider({children}: {children: React.ReactNode}) {
  const [theme, setTheme] = useState<string>('dark');
  const ctx = {
    theme,
    setTheme,
  };
  return <ThemeContext.Provider value={ctx}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
