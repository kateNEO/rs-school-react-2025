import { useLocalStorage } from '../hooks/useLocalStorage.ts';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeContext, type ThemeType } from '../hooks/themeContext.ts';
import { RouterProvider } from 'react-router-dom';
import router from '../routes/routes.tsx';

function Root() {
  const [savedObj, setValue] = useLocalStorage();
  const [theme, setTheme] = useState<ThemeType>(savedObj.theme);

  useEffect(() => {
    setValue({ theme: theme });
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, setValue]);

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
