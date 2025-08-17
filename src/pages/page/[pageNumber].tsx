import Search from '../../components/Search';
import Result from '../../components/Result';
import Pagination from '../../components/Pagination';
import { LIMIT, PAGE_DEFAULT } from '../../const/const';
import { useBooks } from '../../hooks/useBook';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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
  const router = useRouter();
  const [storedObj, setValue] = useLocalStorage();
  const [currentPage, setCurrentPage] = useState(PAGE_DEFAULT);
  const { data, isLoading, error, refetch } = useBooks(
    currentPage,
    storedObj.lastRequest
  );
  const setURL = (bookKey: string) => {
    router.push(`/page/${currentPage}/book/${bookKey}`);
  };
  const handleSetCurrentPage = (pageParam: number) => {
    setCurrentPage(pageParam);
    router.push(`/page/${pageParam}`);
  };
  const total_pages = data ? Math.max(1, Math.ceil(data.numFound / LIMIT)) : 1;
  useEffect(() => {
    const pageParam = Number(router.query.pageNumber) || PAGE_DEFAULT;
    setCurrentPage(pageParam);
  }, [router.query.pageNumber]);
  return (
    <div className="px-5 text-inherit">
      <Search setSearchStr={setValue} />
      {isLoading || !data ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <>
          <Result
            setURL={setURL}
            response={data}
            error={error}
            refetch={refetch}
          />
          <Pagination
            totalPage={total_pages}
            currentPage={Number(currentPage)}
            setCurrentPage={handleSetCurrentPage}
          />
        </>
      )}
    </div>
  );
}

export default MainPage;
