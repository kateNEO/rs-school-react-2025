import { useLocalStorage } from '../hooks/useLocalStorage.ts';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeContext, type ThemeType } from '../hooks/themeContext.ts';
import { RouterProvider } from 'react-router-dom';
import router from '../routes/routes.tsx';

function Root() {
  const [currentTheme, saveTheme] = useLocalStorage('theme');
  const isValidTheme = currentTheme === 'light' || currentTheme === 'dark';
  const [theme, setTheme] = useState<ThemeType>(
    isValidTheme ? currentTheme : 'light'
  );

  useEffect(() => {
    saveTheme(theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, saveTheme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  }, []);

  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);

  return (
    <ThemeContext.Provider value={value}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  );
}
export default Root;
