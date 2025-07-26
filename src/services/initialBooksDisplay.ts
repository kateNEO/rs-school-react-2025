import { getBooks } from './getBooks.ts';
import type { Response } from '../components/MainPage.tsx';
import { PAGE_DEFAULT } from '../components/const/const.ts';

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
      resp = await getBooks(lastRequest, PAGE_DEFAULT);
    } else {
      resp = await getBooks('the', PAGE_DEFAULT);
    }
    setResp(resp);
  } catch (error) {
    console.error('Error:', error);
    setError('Something wrong!');
  } finally {
    setIsLoading(false);
  }
}
