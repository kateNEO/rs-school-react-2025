import Button from './Button.tsx';
import type { Response } from './MainPage.tsx';
import { getBooks } from '../services/getBooks.ts';

type PaginationProps = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPage: number;
  setResponse: (response: Response) => void;
  setIsLoading: (value: boolean) => void;
};

function Pagination({
  currentPage,
  totalPage,
  setIsLoading,
  setResponse,
  setCurrentPage,
}: PaginationProps) {
  const navigate = (page: number) => {
    console.log(page);
    const searchString = localStorage.getItem('lastRequest');
    if (searchString) {
      setIsLoading(true);
      console.log(page);
      getBooks(searchString, page)
        .then((res) => {
          setResponse(res);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  console.log(currentPage);
  return (
    <div className="flex justify-center items-center">
      <Button
        onClick={() => {
          navigate(currentPage - 1);
          setCurrentPage(currentPage - 1);
        }}
        text="←"
      />
      <span className="text-white px-5">
        Page {currentPage} of {totalPage}
      </span>
      <Button
        onClick={() => {
          navigate(currentPage + 1);
          setCurrentPage(currentPage + 1);
        }}
        text="→"
      />
    </div>
  );
}

export default Pagination;
