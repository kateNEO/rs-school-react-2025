import { useEffect, useState } from 'react';
import { initialBooksDisplay } from '../services/initialBooksDisplay.ts';
import { Link } from 'react-router-dom';
import Search from '../components/Search.tsx';
import Result from '../components/Result.tsx';
import Pagination from '../components/Pagination.tsx';
import { LIMIT } from '../components/const/const.ts';

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
  const [responseState, setResponseState] = useState<Response | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  useEffect(() => {
    initialBooksDisplay(setResponseState, setIsLoading, setError);
  }, []);
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
        setCurrentPage={setCurrentPage}
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
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
export default MainPage;
