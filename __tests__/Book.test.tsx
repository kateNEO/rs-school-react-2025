import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Book, { type BookDetails } from '../src/components/Book';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const mockNavigate = vi.fn();
const mockBookDetails: BookDetails = {
  title: 'Mock Book Title',
  first_publish_date: '1995',
  number_of_pages: 123,
  subjects: ['Fiction', 'Adventure', 'Fantasy'],
};

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: 'OL12345W', numberPage: '1' }),
}));

vi.mock('../src/services/getBooksDetails.ts', () => ({
  getBookDetails: () => Promise.resolve(mockBookDetails),
}));

function renderWithQueryClient(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe('Book component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading initially', () => {
    renderWithQueryClient(<Book />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders book details after fetch', async () => {
    renderWithQueryClient(<Book />);
    await waitFor(() =>
      expect(screen.getByText('Mock Book Title')).toBeInTheDocument()
    );
    expect(screen.getByText(/1995/)).toBeInTheDocument();
    expect(screen.getByText(/123/)).toBeInTheDocument();
    expect(screen.getByText(/Fiction/)).toBeInTheDocument();
  });

  it('calls navigate on close button click', async () => {
    renderWithQueryClient(<Book />);
    await waitFor(() =>
      expect(screen.getByText('Mock Book Title')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: /×/ }));
    expect(mockNavigate).toHaveBeenCalledWith('/page/1');
  });

  it('calls refetch when Refetch button clicked', async () => {
    renderWithQueryClient(<Book />);
    await waitFor(() =>
      expect(screen.getByText('Mock Book Title')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: /refetch card/i }));
  });
});
