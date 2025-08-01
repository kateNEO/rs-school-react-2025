import { useState, useEffect } from 'react';
import { getBooks } from '../services/getBooks';
import type { Response } from '../pages/MainPage.tsx';

export const useBooks = (page: number, searchStr: string) => {
  const [responseState, setResponseState] = useState<Response | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const response = await getBooks(searchStr, page);
        setResponseState(response);
      } catch (err) {
        setError('Something went wrong');
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [page, searchStr]);

  return { responseState, isLoading, error, setResponseState, setIsLoading };
};
