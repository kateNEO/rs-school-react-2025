'use client';
// import '../App.css';
// import '../index.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeContext, type ThemeType } from '../hooks/themeContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [savedObj, setValue] = useLocalStorage();
  const [theme, setTheme] = useState<ThemeType>(savedObj.theme);

  useEffect(() => {
    if (savedObj.theme !== theme) setValue({ theme });
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme, savedObj.theme, setValue]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  }, []);

  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider value={value}>
        <ErrorBoundary
          fallback={
            <div className="text-red-500">
              It&apos;s okay. You need refresh page.
            </div>
          }
        >
          <Component {...pageProps} />
        </ErrorBoundary>
      </ThemeContext.Provider>
    </QueryClientProvider>
  );
}
