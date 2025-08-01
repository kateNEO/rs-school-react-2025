import { useSearchParams } from 'react-router-dom';
import Search from '../components/Search.tsx';
import Result from '../components/Result.tsx';
import Pagination from '../components/Pagination.tsx';
import { LIMIT, PAGE_DEFAULT } from '../const/const.ts';
import { useNavigate } from 'react-router-dom';
import { useBooks } from '../hooks/useBook.ts';
import { useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.ts';
import Header from '../components/Header.tsx';

export type BooksCard = {
  key: string;
  title: string;
  author_name: string[];
  lending_edition_s: string;
};
export type Response = {
  numFound: number;
  docs: BooksCard[];
};

function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get('page')) || PAGE_DEFAULT;
  const navigate = useNavigate();
  const [searchStr, setSearchStr] = useLocalStorage('lastRequest');
  const { responseState, isLoading, error, setResponseState, setIsLoading } =
    useBooks(pageParam, searchStr);

  const setURL = (bookKey: string) => {
    const page = Number(pageParam);
    navigate(`/book/${bookKey}?page=${page}`);
  };
  useEffect(() => {
    if (!searchParams.has('page')) {
      navigate(`?page=${pageParam}`, { replace: true });
    }
  }, [pageParam, navigate, searchParams]);

  const total_pages = responseState
    ? Math.max(1, Math.ceil(responseState.numFound / LIMIT))
    : 1;
  return (
    <div className="px-5">
      <Header />
      <Search
        setSearchStr={(query: string) => setSearchStr(query)}
        setIsLoading={setIsLoading}
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
