import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import routerTree from '../src/routes/routes';
describe('Router', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders MainPage on "/" route', () => {
    const router = createMemoryRouter(routerTree.routes, {
      initialEntries: ['/'],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByPlaceholderText(/harry potter/i)).toBeInTheDocument(); // input from Search
  });

  it('renders About page on "/about" route', () => {
    const router = createMemoryRouter(routerTree.routes, {
      initialEntries: ['/about'],
    });

    render(<RouterProvider router={router} />);
    expect(screen.getByText(/about/i)).toBeInTheDocument();
  });

  it('renders NotFound page on unknown route', () => {
    const router = createMemoryRouter(routerTree.routes, {
      initialEntries: ['/unknown-page'],
    });

    render(<RouterProvider router={router} />);
    expect(screen.getByText(/not found/i)).toBeInTheDocument(); // или ваш текст
  });

  it('renders Book component on "/book/:id" route', () => {
    const router = createMemoryRouter(routerTree.routes, {
      initialEntries: ['/book/OL123M'],
    });

    render(<RouterProvider router={router} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument(); // Пример: при ожидании fetch
  });
});
