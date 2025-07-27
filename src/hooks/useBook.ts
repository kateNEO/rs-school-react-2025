import { useState, useEffect } from 'react';
import { getBooks } from '../services/getBooks';
import type { Response } from '../pages/MainPage.tsx';

export const useBooks = (page: number) => {
  const [responseState, setResponseState] = useState<Response | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const query = localStorage.getItem('lastRequest') || 'the';
        const response = await getBooks(query, page);
        setResponseState(response);
      } catch (err) {
        setError('Something went wrong');
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [page]);

  return { responseState, isLoading, error, setResponseState, setIsLoading };
};
