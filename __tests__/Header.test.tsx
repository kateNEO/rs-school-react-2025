import { ThemeContext } from '../src/hooks/themeContext';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../src/components/Header';
describe('Header component', () => {
  const toggleMock = vi.fn();

  const renderWithTheme = (theme: 'light' | 'dark') => {
    return render(
      <MemoryRouter>
        <ThemeContext.Provider value={{ theme, toggle: toggleMock }}>
          <Header />
        </ThemeContext.Provider>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    toggleMock.mockClear();
  });

  it('renders Home and About links with correct href', () => {
    renderWithTheme('light');
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute(
      'href',
      '/'
    );
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute(
      'href',
      '/about'
    );
  });

  it('renders Dark icon when theme is light', () => {
    const { container } = renderWithTheme('light');
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders Light icon when theme is dark', () => {
    const { container } = renderWithTheme('dark');
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('calls toggle when icon clicked', () => {
    const { container } = renderWithTheme('light');
    const toggleDiv = container.querySelector('.icon-wrapper');
    if (!toggleDiv) throw new Error('Toggle div not found');
    fireEvent.click(toggleDiv);
    expect(toggleMock).toHaveBeenCalledTimes(1);
  });
});
