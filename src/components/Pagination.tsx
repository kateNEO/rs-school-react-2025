import Button from './Button.tsx';

type PaginationProps = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPage: number;
};

function Pagination({
  currentPage,
  totalPage,
  setCurrentPage,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center">
      <Button
        onClick={() => {
          setCurrentPage(currentPage - 1);
        }}
        type="button"
        text="←"
        disabled={currentPage === 1}
      />
      <span className="text-white px-5">
        Page {currentPage} of {totalPage}
      </span>
      <Button
        onClick={() => {
          setCurrentPage(currentPage + 1);
        }}
        text="→"
        type="button"
        disabled={currentPage === totalPage}
      />
    </div>
  );
}

export default Pagination;
