import { getBooks } from './getBooks.ts';
import type { Response } from '../components/MainPage.tsx';

export async function initialBooksDisplay(
  setResp: (response: Response) => void,
  setIsLoading: (value: boolean) => void,
  setError: (error: string) => void
) {
  const data = localStorage.getItem('lastRequest');
  const lastRequest = data?.trim();
  try {
    let resp: Response;
    if (lastRequest) {
      resp = await getBooks(lastRequest);
    } else {
      resp = await getBooks('the');
    }
    setResp(resp);
  } catch (error) {
    console.error('Error:', error);
    setError('Something wrong!');
  } finally {
    setIsLoading(false);
  }
}
