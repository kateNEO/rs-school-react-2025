import { createContext, useContext } from 'react';
export type ThemeType = 'light' | 'dark';
export type ThemeContextType = {
  theme: ThemeType;
  toggle: () => void;
};
export const ThemeContext = createContext<ThemeContextType | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx)
    throw new Error('useTheme must be used within ThemeContext.Provider');
  return ctx;
}
