import * as localStorageHook from '../src/hooks/useLocalStorage';
import { render } from '@testing-library/react';
import Root from '../src/components/Root';
describe('Root component', () => {
  const setValueMock = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
    document.documentElement.className = '';
  });

  it('renders with initial light theme', () => {
    vi.spyOn(localStorageHook, 'useLocalStorage').mockReturnValue([
      { theme: 'light', lastRequest: '' },
      setValueMock,
    ]);
    render(<Root />);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('renders with initial dark theme', () => {
    vi.spyOn(localStorageHook, 'useLocalStorage').mockReturnValue([
      { theme: 'dark', lastRequest: '' },
      setValueMock,
    ]);
    render(<Root />);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
