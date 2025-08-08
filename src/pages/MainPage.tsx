import { useParams } from 'react-router-dom';
import Search from '../components/Search.tsx';
import Result from '../components/Result.tsx';
import Pagination from '../components/Pagination.tsx';
import { LIMIT, PAGE_DEFAULT } from '../const/const.ts';
import { useNavigate } from 'react-router-dom';
import { useBooks } from '../hooks/useBook.ts';
import { useLocalStorage } from '../hooks/useLocalStorage.ts';

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
  const { numberPage } = useParams();
  const pageParam = Number(numberPage) || PAGE_DEFAULT;
  const navigate = useNavigate();
  const [searchStr, setSearchStr] = useLocalStorage('lastRequest');
  const { responseState, isLoading, error } = useBooks(pageParam, searchStr);
  console.log('MainPage');
  const setURL = (bookKey: string) => {
    navigate(`/page/${pageParam}/book/${bookKey}`);
  };
  const handleSetCurrentPage = (pageParam: number) => {
    navigate(`/page/${pageParam}`);
  };
  const total_pages = responseState
    ? Math.max(1, Math.ceil(responseState.numFound / LIMIT))
    : 1;
  return (
    <div className="px-5 text-inherit">
      <Search setSearchStr={setSearchStr} />
      {isLoading || !responseState ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <>
          <Result setURL={setURL} response={responseState} error={error} />
          <Pagination
            totalPage={total_pages}
            currentPage={Number(pageParam)}
            setCurrentPage={handleSetCurrentPage}
          />
        </>
      )}
    </div>
  );
}

export default MainPage;
