import type { BooksCard } from '../src/pages/MainPage';
import { createCSV } from '../src/services/createCSV';

const clickMock = vi.fn();
const createObjectURLMock = vi.fn(() => 'blob:mock-url');
const revokeObjectURLMock = vi.fn();

Object.defineProperty(globalThis, 'URL', {
  value: {
    createObjectURL: createObjectURLMock,
    revokeObjectURL: revokeObjectURLMock,
  },
  writable: true,
});

vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
  if (tag === 'a') {
    return { click: clickMock } as unknown as HTMLAnchorElement;
  }
  return document.createElement(tag);
});

describe('createCSV', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('triggers CSV download', () => {
    const books: BooksCard[] = [
      {
        key: '/works/OL123',
        title: 'Book 1',
        author_name: ['Author 1'],
        lending_edition_s: 'E1',
      },
    ];

    createCSV(books);

    expect(createObjectURLMock).toHaveBeenCalled();
    expect(clickMock).toHaveBeenCalled();
    expect(revokeObjectURLMock).toHaveBeenCalled();
  });

  it('works with empty array', () => {
    createCSV([]);

    expect(createObjectURLMock).toHaveBeenCalled();
    expect(clickMock).toHaveBeenCalled();
    expect(revokeObjectURLMock).toHaveBeenCalled();
  });
});
