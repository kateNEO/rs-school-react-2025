import { Link, useSearchParams } from 'react-router-dom';
import Search from '../components/Search.tsx';
import Result from '../components/Result.tsx';
import Pagination from '../components/Pagination.tsx';
import { LIMIT, PAGE_DEFAULT } from '../components/const/const.ts';
import { useNavigate } from 'react-router-dom';
import { useBooks } from '../hooks/useBook.ts';
import { useEffect } from 'react';

export type BooksCard = {
  key: string;
  title: string;
  author_name: string[];
  cover_edition_key: string;
};
export type Response = {
  numFound: number;
  docs: BooksCard[];
};

function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get('page')) || PAGE_DEFAULT;
  const navigate = useNavigate();
  const { responseState, isLoading, error, setResponseState, setIsLoading } =
    useBooks(pageParam);
  const setURL = (bookKey: string) => {
    const page = Number(pageParam);
    navigate(`/book/${bookKey}?page=${page}`);
  };
  useEffect(() => {
    setSearchParams({ page: String(pageParam) });
  }, [pageParam, setSearchParams]);

  const total_pages = responseState
    ? Math.ceil(responseState.numFound / LIMIT)
    : 1;
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
          <Result setURL={setURL} response={responseState} error={error} />
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
