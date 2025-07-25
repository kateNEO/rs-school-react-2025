import Button from './Button.tsx';
import { PAGE_DEFAULT } from './const/const.ts';

type PaginationProps = {
  // responseObj: Response
  currentPage?: number;
  totalPage: number;
  navigate: (page: number) => void;
  // next: string | null;
  // prev:string | null;
  // setIsLoading: (value: boolean) => void;
};

function Pagination({
  /*responseObj*/ currentPage = PAGE_DEFAULT,
  totalPage,
  navigate /*setIsLoading*/,
}: PaginationProps) {
  // const [lastPage, setLastPage] = useState(1);
  // useEffect(() => {
  //   setLastPage(totalPage);
  // }, []);
  return (
    <div className="flex justify-center items-center">
      <Button onClick={() => navigate(currentPage - 1)} text="←" />
      <span className="text-white px-5">
        Page {currentPage} of {totalPage}
      </span>
      <Button onClick={() => navigate(currentPage + 1)} text="→" />
    </div>
  );
}
export default Pagination;
