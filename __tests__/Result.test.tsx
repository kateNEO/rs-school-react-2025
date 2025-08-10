import type { BooksCard, Response } from '../src/pages/MainPage';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Result from '../src/components/Result';

describe('Result component', () => {
  const mockSetURL = vi.fn();

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

  test('renders books when response has data', () => {
    render(
      <MemoryRouter>
        <Result response={responseWithBooks} error={null} setURL={mockSetURL} />
      </MemoryRouter>
    );

    expect(screen.getByText('Book One')).toBeInTheDocument();
    expect(screen.getByText('Book Two')).toBeInTheDocument();
  });

  test('renders error message when error is present', () => {
    render(
      <MemoryRouter>
        <Result
          response={responseWithBooks}
          error="Error occurred"
          setURL={mockSetURL}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Error occurred')).toBeInTheDocument();
  });

  test('renders "Not Found :(" when no books', () => {
    render(
      <MemoryRouter>
        <Result response={responseNoBooks} error={null} setURL={mockSetURL} />
      </MemoryRouter>
    );

    expect(screen.getByText('Not Found :(')).toBeInTheDocument();
  });

  test('calls setURL when a book card is clicked', () => {
    render(
      <MemoryRouter>
        <Result response={responseWithBooks} error={null} setURL={mockSetURL} />
      </MemoryRouter>
    );

    const bookElement = screen.getByText('Book One');

    fireEvent.click(bookElement);

    expect(mockSetURL).toHaveBeenCalledWith('book1');
  });
});
