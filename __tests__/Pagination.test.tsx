import { MemoryRouter, useNavigate } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Pagination from '../src/components/Pagination';

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('Pagination', () => {
  const mockedNavigate = vi.fn();
  const setCurrentPage = vi.fn();

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockedNavigate);
    setCurrentPage.mockClear();
    mockedNavigate.mockClear();
  });

  const renderComponent = (currentPage: number, totalPage: number) => {
    render(
      <MemoryRouter>
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          setCurrentPage={setCurrentPage}
          setResponse={() => {}}
          setIsLoading={() => {}}
        />
      </MemoryRouter>
    );
  };

  it('disables prev button on first page', () => {
    renderComponent(1, 5);
    const prevButton = screen.getByText<HTMLButtonElement>('←');
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    renderComponent(5, 5);
    const nextButton = screen.getByText<HTMLButtonElement>('→');
    expect(nextButton).toBeDisabled();
  });

  it('calls setCurrentPage and navigate when next clicked', () => {
    renderComponent(2, 5);
    const nextButton = screen.getByText('→');
    fireEvent.click(nextButton);
    expect(setCurrentPage).toHaveBeenCalledWith(3);
    expect(mockedNavigate).toHaveBeenCalledWith('/?page=3');
  });

  it('calls setCurrentPage and navigate when prev clicked', () => {
    renderComponent(3, 5);
    const prevButton = screen.getByText('←');
    fireEvent.click(prevButton);
    expect(setCurrentPage).toHaveBeenCalledWith(2);
    expect(mockedNavigate).toHaveBeenCalledWith('/?page=2');
  });

  it('shows correct page info', () => {
    renderComponent(3, 7);
    expect(screen.getByText('Page 3 of 7')).toBeInTheDocument();
  });
});
