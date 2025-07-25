import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../src/App';
import * as dataLoader from '../src/services/initialPlanetsDisplay';

describe('App component', () => {
  it('renders loading state on mount', () => {
    vi.spyOn(dataLoader, 'initialBooksDisplay').mockImplementation(
      async (_, setIsLoading) => {
        setIsLoading(true);
      }
    );

    render(<App />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
