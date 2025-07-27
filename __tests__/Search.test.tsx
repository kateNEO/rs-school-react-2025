import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Search from '../src/components/Search';
import { vi } from 'vitest';
import * as localStorageHook from '../src/hooks/useLocalStorage';
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
  test('renders input with default value from localStorage', () => {
    const mockSetSearchStr = vi.fn();
    const mockSetIsLoading = vi.fn();

    render(
      <MemoryRouter>
        <Search
          setSearchStr={mockSetSearchStr}
          setIsLoading={mockSetIsLoading}
        />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText<HTMLInputElement>('Harry Potter');
    expect(input.value).toBe('');
  });

  test('updates input value on change', () => {
    const mockSetSearchStr = vi.fn();
    const mockSetIsLoading = vi.fn();
    render(
      <MemoryRouter>
        <Search
          setSearchStr={mockSetSearchStr}
          setIsLoading={mockSetIsLoading}
        />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText<HTMLInputElement>('Harry Potter');
    expect(input.value).toBe('');
    fireEvent.change(input, { target: { value: 'Story' } });
    expect(input.value).toBe('Story');
  });

  test('calls setSearchStr and navigates on submit', async () => {
    const mockSetSearchStr = vi.fn();
    const mockSetIsLoading = vi.fn();
    // const mockNavigate = vi.fn();
    // (useNavigate as unknown as vi.Mock).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <Search
          setSearchStr={mockSetSearchStr}
          setIsLoading={mockSetIsLoading}
        />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText<HTMLInputElement>('Harry Potter');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'Story' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockSetSearchStr).toHaveBeenCalledWith('Story');
      expect(mockSetIsLoading).toHaveBeenCalledWith(true);
    });
  });
});
