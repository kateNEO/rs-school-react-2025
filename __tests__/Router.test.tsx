import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { ROUTES } from '../src/routes/paths';
import { ThemeContext } from '../src/hooks/themeContext';
import type { ThemeContextType } from '../src/hooks/themeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import router from '../src/routes/routes';

function renderWithRouterAndTheme(initialEntries: string[]) {
  const queryClient = new QueryClient();

  const memoryRouter = createMemoryRouter(router.routes, { initialEntries });

  const themeValue: ThemeContextType = { theme: 'light', toggle: vi.fn() };

  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider value={themeValue}>
        <RouterProvider router={memoryRouter} />
      </ThemeContext.Provider>
    </QueryClientProvider>
  );
}

describe('Router', () => {
  it('redirects "/" to "/page/number"', async () => {
    renderWithRouterAndTheme(['/']);

    await waitFor(() => {
      expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    });
  });

  it('renders About page on "/about" route', async () => {
    renderWithRouterAndTheme([`/${ROUTES.ABOUT}`]);

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /about/i })
      ).toBeInTheDocument();
    });
  });

  it('renders NotFound page on unknown route', async () => {
    renderWithRouterAndTheme(['/unknown']);

    await waitFor(() => {
      expect(screen.getByText(/not found/i)).toBeInTheDocument();
    });
  });

  it('renders Book component on "/page/:page/book/:id" route', async () => {
    renderWithRouterAndTheme(['/page/1/book/OL14942956W']);

    await waitFor(() => {
      expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    });
  });
});
