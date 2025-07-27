import { useState, useEffect } from 'react';
import { getBooks } from '../services/getBooks';
import type { Response } from '../pages/MainPage.tsx';
import { useLocalStorage } from './useLocalStorage.ts';

export const useBooks = (page: number) => {
  const [responseState, setResponseState] = useState<Response | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRequest] = useLocalStorage('lastRequest');
  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const response = await getBooks(lastRequest, page);
        setResponseState(response);
      } catch (err) {
        setError('Something went wrong');
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [page, lastRequest]);

  return { responseState, isLoading, error, setResponseState, setIsLoading };
};
