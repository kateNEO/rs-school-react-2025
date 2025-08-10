import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Book, { type BookDetails } from '../src/components/Book';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockBookDetails: BookDetails = {
  title: 'Mock Book Title',
  first_publish_date: '1995',
  number_of_pages: 123,
  subjects: ['Fiction', 'Adventure', 'Fantasy'],
};

beforeEach(() => {
  vi.clearAllMocks();
  const mockResponse: Partial<Response> = {
    json: vi.fn().mockResolvedValue(mockBookDetails),
  };
  global.fetch = vi.fn(() => Promise.resolve(mockResponse as Response));
});

describe('Book component', () => {
  it('renders loading initially', () => {
    render(
      <MemoryRouter>
        <Book />
      </MemoryRouter>
    );
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('renders book details after fetch', async () => {
    render(
      <MemoryRouter initialEntries={['/book/OL12345W']}>
        <Routes>
          <Route path="/book/:id" element={<Book />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Mock Book Title')).toBeInTheDocument();
      expect(screen.getByText(/1995/)).toBeInTheDocument();
      expect(screen.getByText(/123/)).toBeInTheDocument();
      expect(screen.getByText(/Fiction/)).toBeInTheDocument();
    });
  });

  it('calls navigate on close button click', async () => {
    render(
      <MemoryRouter initialEntries={['/page/1/book/OL12345W']}>
        <Routes>
          <Route path="/page/1/book/:id" element={<Book />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText('Mock Book Title')).toBeInTheDocument()
    );

    const closeButton = screen.getByRole('button', { name: /×|close/i });
    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/page/1');
  });
});
