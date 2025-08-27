import type { BooksCard } from '../pages/page/[pageNumber]';

export function createCSV(selectedBooks: BooksCard[]) {
  const rows = selectedBooks.map((book) => [
    book.key.split('/')[2],
    book.title,
    book.author_name.join(', '),
  ]);
  const headers = ['Key', 'Title', 'Authors'];

  const csvContent = [headers, ...rows]
    .map((row) => row.map(String).join(','))
    .join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${selectedBooks.length}_selected_books.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}
