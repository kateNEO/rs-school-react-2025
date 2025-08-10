import type { BookDetails } from '../components/Book.tsx';

export async function getBookDetails(id: string): Promise<BookDetails> {
  const res = await fetch(`https://openlibrary.org/works/${id}.json`);
  if (!res.ok) throw new Error('Failed to fetch book details');
  return res.json();
}
