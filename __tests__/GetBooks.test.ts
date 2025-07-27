import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getBooks } from '../src/services/getBooks';
import { LIMIT } from '../src/components/const/const';

describe('getAllPlanets', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });
  const mockResponse = {
    numFound: 1,
    docs: [
      {
        key: 'OL123W',
        title: 'Test Book',
        author_name: ['Author'],
        lending_edition_s: 'OL1234M',
      },
    ],
  };
  it('calls fetch with the correct URL and returns the parsed data', async () => {
    const mockJson = vi.fn().mockResolvedValue(mockResponse);
    const mockFetch = vi.fn().mockResolvedValue({ json: mockJson });
    global.fetch = mockFetch;
    const search = 'test';
    const page = 1;
    const expectedUrl = `https://openlibrary.org/search.json?title=${search}&page=${page}&limit=${LIMIT}`;
    const data = await getBooks('test', 1);
    expect(mockFetch).toHaveBeenCalledWith(expectedUrl);
    expect(data).toEqual(mockResponse);
  });

  it('uses "the" as default search string when empty', async () => {
    const mockJson = vi.fn().mockResolvedValue(mockResponse);
    const mockFetch = vi.fn().mockResolvedValue({ json: mockJson });
    global.fetch = mockFetch;

    await getBooks('', 2);

    expect(mockFetch).toHaveBeenCalledWith(
      `https://openlibrary.org/search.json?title=the&page=2&limit=${LIMIT}`
    );
  });
});
