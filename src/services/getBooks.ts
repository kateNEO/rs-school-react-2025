import type { Response } from '../components/MainPage.tsx';
import { LIMIT } from '../components/const/const.ts';

export async function getBooks(
  searchString: string,
  pageNumber: number
): Promise<Response> {
  if (searchString === '') {
    searchString = 'the';
  }
  console.log(pageNumber, searchString);
  const res = await fetch(
    `https://openlibrary.org/search.json?title=${searchString}&page=${pageNumber}&limit=${LIMIT}`
  );
  const data: Response = await res.json();
  console.log(data);
  return {
    numFound: data.numFound,
    docs: data.docs,
  };
}
