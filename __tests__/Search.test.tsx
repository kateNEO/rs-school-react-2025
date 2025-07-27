import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Search from '../src/components/Search';
import { vi } from 'vitest';
import * as booksService from '../src/services/getBooks';
import * as localStorageHook from '../src/hooks/useLocalStorage';
import type { Response } from '../src/pages/MainPage';
import { PAGE_DEFAULT } from '../src/components/const/const';
import { MemoryRouter } from 'react-router-dom';

describe('Search component', () => {
  beforeEach(() => {
    vi.spyOn(localStorageHook, 'useLocalStorage').mockReturnValue([
      '',
      vi.fn(),
    ]);
  });
  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  test('updates input value on change', () => {
    const mockOnSearch = vi.fn();
    const mockSetIsLoading = vi.fn();
    render(
      <MemoryRouter>
        <Search onSearch={mockOnSearch} setIsLoading={mockSetIsLoading} />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText<HTMLInputElement>('Harry Potter');
    expect(input.value).toBe('');
    fireEvent.change(input, { target: { value: 'Story' } });
    expect(input.value).toBe('Story');
  });

  test('calls getBooks with correct value when input is not empty', async () => {
    const mockOnSearch = vi.fn();
    const mockSetIsLoading = vi.fn();
    const mockResult: Response = {
      numFound: 1,
      docs: [
        {
          key: 'OL123M',
          title: 'Harry Potter',
          author_name: ['Joanne Rowling'],
          lending_edition_s: 'OL47693833M',
        },
      ],
    };

    const searchBooks = vi
      .spyOn(booksService, 'getBooks')
      .mockResolvedValue(mockResult);

    render(
      <MemoryRouter>
        <Search onSearch={mockOnSearch} setIsLoading={mockSetIsLoading} />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Harry Potter');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'Story' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(searchBooks).toHaveBeenCalledWith('Story', PAGE_DEFAULT);
    });
  });
});
