import Button from './Button.tsx';
import type { Response } from '../pages/MainPage.tsx';
import { useNavigate } from 'react-router-dom';

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
  setCurrentPage,
}: PaginationProps) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center">
      <Button
        onClick={() => {
          setCurrentPage(currentPage - 1);
          navigate(`/?page=${currentPage - 1}`);
        }}
        type="button"
        text="←"
      />
      <span className="text-white px-5">
        Page {currentPage} of {totalPage}
      </span>
      <Button
        onClick={() => {
          setCurrentPage(currentPage + 1);
          navigate(`/?page=${currentPage + 1}`);
        }}
        text="→"
        type="button"
      />
    </div>
  );
}

export default Pagination;
