import { fireEvent, render, screen } from '@testing-library/react';
import Search from '../src/components/Search';
import { vi } from 'vitest';

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
});
