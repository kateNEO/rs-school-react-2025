import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Search from '../src/components/Search';
import { vi } from 'vitest';
import * as localStorageHook from '../src/hooks/useLocalStorage';
import { MemoryRouter } from 'react-router-dom';
import { PAGE_DEFAULT } from '../src/const/const';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});
describe('Search component', () => {
  beforeEach(() => {
    vi.spyOn(localStorageHook, 'useLocalStorage').mockReturnValue([
      { theme: 'light', lastRequest: '' },
      vi.fn(),
    ]);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test('renders input with default value from localStorage', () => {
    const mockSetSearchStr = vi.fn();
    render(
      <MemoryRouter>
        <Search setSearchStr={mockSetSearchStr} />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText<HTMLInputElement>('Harry Potter');
    expect(input.value).toBe('');
  });

  test('updates input value on change', () => {
    const mockSetSearchStr = vi.fn();
    render(
      <MemoryRouter>
        <Search setSearchStr={mockSetSearchStr} />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText<HTMLInputElement>('Harry Potter');
    expect(input.value).toBe('');
    fireEvent.change(input, { target: { value: 'Story' } });
    expect(input.value).toBe('Story');
  });

  test('calls setSearchStr and navigates on submit', async () => {
    const mockSetSearchStr = vi.fn();
    render(
      <MemoryRouter>
        <Search setSearchStr={mockSetSearchStr} />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText<HTMLInputElement>('Harry Potter');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'Story' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockSetSearchStr).toHaveBeenCalledWith({ lastRequest: 'Story' });
      expect(mockNavigate).toHaveBeenCalledWith(`/page/${PAGE_DEFAULT}`);
    });
  });
});
