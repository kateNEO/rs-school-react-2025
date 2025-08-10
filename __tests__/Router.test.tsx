import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { ROUTES } from '../src/routes/paths';
import MainPage from '../src/pages/MainPage';
import Book from '../src/components/Book';
import About from '../src/pages/About';
import NotFound from '../src/pages/NotFound';
import { ThemeContext } from '../src/hooks/themeContext';
import type { ThemeContextType } from '../src/hooks/themeContext';

const routerConfig = [
  {
    path: ROUTES.HOME,
    children: [
      { index: true, element: <MainPage /> },
      { path: ROUTES.PAGE, element: <MainPage /> },
      { path: `${ROUTES.PAGE}/${ROUTES.BOOK}`, element: <Book /> },
      { path: ROUTES.ABOUT, element: <About /> },
      { path: ROUTES.NOT_FOUND, element: <NotFound /> },
    ],
  },
];

function renderWithRouterAndTheme(initialEntries: string[]) {
  const router = createMemoryRouter(routerConfig, { initialEntries });

  const themeValue: ThemeContextType = { theme: 'light', toggle: vi.fn() };

  return render(
    <ThemeContext.Provider value={themeValue}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  );
}

describe('Router', () => {
  it('redirects "/" to "/page/number"', () => {
    renderWithRouterAndTheme([ROUTES.HOME]);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });
  it('renders About page on "/about" route', () => {
    renderWithRouterAndTheme([`/${ROUTES.ABOUT}`]);
    expect(screen.getByText(/about/i)).toBeInTheDocument();
  });

  it('renders NotFound page on unknown route', () => {
    renderWithRouterAndTheme(['/unknown']);
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });

  it('renders Book component on "/page/:page/book/:id" route', async () => {
    renderWithRouterAndTheme(['/page/1/book/OL14942956W']);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });
});
