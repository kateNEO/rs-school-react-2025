import type { BooksCard, Response } from '../src/pages/MainPage';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Result from '../src/components/Result';

vi.mock('../src/store/store.ts', () => {
  const selectedIdList: BooksCard[] = [];

  return {
    store: {
      getState: () => ({
        selectedIdList,
        isSelected: (key: string) => selectedIdList.some((b) => b.key === key),
        toggleItem: vi.fn(),
        removeAll: vi.fn(),
      }),
    },
  };
});

describe('Result component', () => {
  const mockSetURL = vi.fn();
  const mockRefetch = vi.fn();

  const mockBooks: BooksCard[] = [
    {
      key: '/works/book1',
      title: 'Book One',
      author_name: ['Author One'],
      lending_edition_s: 'ed1',
    },
    {
      key: '/works/book2',
      title: 'Book Two',
      author_name: ['Author Two'],
      lending_edition_s: 'ed2',
    },
  ];

  const responseWithBooks: Response = {
    numFound: 2,
    docs: mockBooks,
  };

  const responseNoBooks: Response = {
    numFound: 0,
    docs: [],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders book titles when response has books', () => {
    render(
      <MemoryRouter>
        <Result
          response={responseWithBooks}
          error={null}
          setURL={mockSetURL}
          refetch={mockRefetch}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Book One')).toBeInTheDocument();
    expect(screen.getByText('Book Two')).toBeInTheDocument();
  });

  test('renders error message when error is present', () => {
    const error = new Error('Error occurred');
    render(
      <MemoryRouter>
        <Result
          response={responseWithBooks}
          error={error}
          setURL={mockSetURL}
          refetch={mockRefetch}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Error occurred')).toBeInTheDocument();
  });

  test('renders "Not Found :(" when no books', () => {
    render(
      <MemoryRouter>
        <Result
          response={responseNoBooks}
          error={null}
          setURL={mockSetURL}
          refetch={mockRefetch}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Not Found :(')).toBeInTheDocument();
  });

  test('calls setURL with correct book key when BookCard clicked', () => {
    render(
      <MemoryRouter>
        <Result
          response={responseWithBooks}
          error={null}
          setURL={mockSetURL}
          refetch={mockRefetch}
        />
      </MemoryRouter>
    );

    const bookElement = screen.getByText('Book One');
    fireEvent.click(bookElement);

    expect(mockSetURL).toHaveBeenCalledWith('book1');
  });

  test('calls refetch when refetch button clicked', () => {
    render(
      <MemoryRouter>
        <Result
          response={responseWithBooks}
          error={null}
          setURL={mockSetURL}
          refetch={mockRefetch}
        />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /refetch/i });
    fireEvent.click(button);

    expect(mockRefetch).toHaveBeenCalled();
  });
});
