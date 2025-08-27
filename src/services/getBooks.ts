import type { Response } from '../pages/page/[pageNumber]';
import { LIMIT } from '../const/const';

export async function getBooks(
  searchString: string,
  pageNumber: number
): Promise<Response> {
  if (!searchString) {
    searchString = 'the';
  }
  const res = await fetch(
    `https://openlibrary.org/search.json?title=${searchString}&page=${pageNumber}&limit=${LIMIT}`
  );
  const data: Response = await res.json();
  return {
    numFound: data.numFound,
    docs: data.docs,
  };
}
