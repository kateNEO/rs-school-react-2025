'use client';
import { getBooks } from '../services/getBooks';
import type { Response } from '../pages/page/[pageNumber].tsx';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';

export const useBooks = (
  page: number,
  searchStr: string
): UseQueryResult<Response, Error> => {
  return useQuery<Response, Error>({
    queryKey: ['books', searchStr, page],
    queryFn: () => getBooks(searchStr, page),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
