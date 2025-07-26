import { useEffect, useState } from 'react';

import { Link, useSearchParams } from 'react-router-dom';
import Search from '../components/Search.tsx';
import Result from '../components/Result.tsx';
import Pagination from '../components/Pagination.tsx';
import { LIMIT, PAGE_DEFAULT } from '../components/const/const.ts';
import { getBooks } from '../services/getBooks.ts';

export type BooksList = {
  key: string;
  title: string;
  author_name: string[];
};
export type Response = {
  numFound: number;
  docs: BooksList[];
};

function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get('page')) || PAGE_DEFAULT;

  const [responseState, setResponseState] = useState<Response | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // useEffect(() => {
  //   initialBooksDisplay(setResponseState, setIsLoading, setError);
  // }, []);
  const loadBooksForPage = async (page: number) => {
    try {
      setIsLoading(true);
      const query = localStorage.getItem('lastRequest') || 'the';
      const resp = await getBooks(query, page);
      setResponseState(resp);
    } catch (err) {
      setError('Something went wrong');
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadBooksForPage(pageParam);
    setSearchParams({ page: String(pageParam) });
  }, [pageParam, setSearchParams]);

  const total_pages = responseState
    ? Math.ceil(responseState.numFound / LIMIT)
    : 0;
  console.log(responseState);
  return (
    <div className="px-5">
      <Link
        to="/about"
        className="text-xl font-bold text-gray-700 hover:drop-shadow-[1px_1px_2px_#FFF]"
      >
        About
      </Link>
      <Search
        onSearch={setResponseState}
        setIsLoading={setIsLoading}
        setCurrentPage={(page) => setSearchParams({ page: page.toString() })}
      />
      {isLoading || !responseState ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <>
          <Result
            response={responseState}
            error={error}
            setLoading={setIsLoading}
          />
          <Pagination
            totalPage={total_pages}
            setIsLoading={setIsLoading}
            setResponse={setResponseState}
            currentPage={Number(pageParam)}
            setCurrentPage={(page) =>
              setSearchParams({ page: page.toString() })
            }
          />
        </>
      )}
    </div>
  );
}
export default MainPage;
