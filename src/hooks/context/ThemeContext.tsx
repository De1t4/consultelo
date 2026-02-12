'use client';

import { createContext, useContext } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme: Theme = 'light';

  // Sync theme with document class
  // useEffect(() => {
  //   if (theme === 'dark') {
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //   }
  // }, [theme]);

  // // Initial load from local storage
  // useEffect(() => {
  //   const storedTheme = localStorage.getItem('theme') as Theme | null;

  //   // Only update state if different from default 'light' to avoid unnecessary re-renders
  //   if (storedTheme === 'dark') {
  //     // eslint-disable-next-line
  //     setTheme('dark');
  //   } else if (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  //     setTheme('dark');
  //   }
  // }, []);

  const toggleTheme = () => {
    // setTheme((prevTheme) => {
    //   const newTheme = prevTheme === 'light' ? 'dark' : 'light';
    //   localStorage.setItem('theme', newTheme);
    //   return newTheme;
    // });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
