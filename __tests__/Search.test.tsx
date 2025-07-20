import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Search from '../src/components/Search';
import { vi } from 'vitest';
import * as searchPlanetMock from '../src/services/searchPlanet';
import type { Response } from '../src/App';

describe('Search component - input behavior', () => {
  test('check searchStr in state', () => {
    const mockOnSearch = vi.fn();
    const mockSetIsLoading = vi.fn();
    render(<Search onSearch={mockOnSearch} setIsLoading={mockSetIsLoading} />);
    const input = screen.getByPlaceholderText('Tatooine') as HTMLInputElement;
    expect(input.value).toBe('');
    fireEvent.change(input, { target: { value: 'Alderaan' } });
    expect(input.value).toBe('Alderaan');
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('loads searchStr from localStorage on mount', () => {
    const mockOnSearch = vi.fn();
    const mockSetIsLoading = vi.fn();
    localStorage.setItem('lastRequest', 'Dagobah');
    render(<Search onSearch={mockOnSearch} setIsLoading={mockSetIsLoading} />);
    const input = screen.getByPlaceholderText('Tatooine') as HTMLInputElement;
    expect(input.value).toBe('Dagobah');
  });

  test('calls searchPlanet with correct value when input is not empty', async () => {
    const mockOnSearch = vi.fn();
    const mockSetIsLoading = vi.fn();
    const mockResult: Response = {
      total_records: 1,
      next: null,
      previous: null,
      total_pages: 1,
      result: [
        {
          name: 'Geonosis',
          climate: 'temperate, arid',
          terrain: 'rock, desert, mountain, barren',
          population: '1000000000',
          diameter: '11370',
          gravity: '0.9 standard',
        },
      ],
    };

    const searchPlanetSpy = vi
      .spyOn(searchPlanetMock, 'searchPlanet')
      .mockResolvedValue(mockResult);

    render(<Search onSearch={mockOnSearch} setIsLoading={mockSetIsLoading} />);

    const input = screen.getByPlaceholderText('Tatooine');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'Alderaan' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(searchPlanetSpy).toHaveBeenCalledWith('Alderaan');
    });
  });
});
