import { useNavigate, useParams } from 'react-router-dom';
import { PAGE_DEFAULT } from '../const/const';
import { useQuery } from '@tanstack/react-query';
import { getBookDetails } from '../services/getBooksDetails';
import Button from './Button';

export type BookDetails = {
  title: string;
  first_publish_date: string;
  number_of_pages: number;
  subjects: string[];
};

function Book() {
  const { id, numberPage } = useParams();
  const navigate = useNavigate();
  const hiddenBook = () => {
    const page = Number(numberPage) || PAGE_DEFAULT;
    navigate(`/page/${page}`);
  };
  const isIdPresent = Boolean(id && id.length > 0);
  const {
    data: bookDetails,
    isLoading,
    error,
    refetch,
  } = useQuery<BookDetails, Error>({
    queryKey: ['bookDetails', id],
    queryFn: () => {
      if (!id) {
        return Promise.reject(new Error('No id'));
      }
      return getBookDetails(id);
    },
    enabled: isIdPresent,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
  return (
    <>
      <div
        className="flex flex-col justify-around relative border-1 w-1/4 h-fit min-w-[200px] min-h-80
      pt-10 pb-5 px-1 items-center border border-gray-200 rounded-md text-inherit text-shadow:inherit"
      >
        <button
          onClick={() => hiddenBook()}
          className="absolute top-2 right-2 text-gray-500 text-xl font-bold duration-300 hover:cursor-pointer hover:drop-shadow-[1px_1px_2px_#FFF]"
        >
          ×
        </button>
        {error && <p className="text-gray-500">{error.message}</p>}
        {isLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : id ? (
          <>
            <h2 className=" text-xl font-bold mb-2 md:text-2xl">
              {bookDetails?.title}
            </h2>
            <div
              className="bg-gray-100/50 w-7/8 text-sm mb-3 text-gray-600 rounded-md py-6 px-1
         hover:bg-blue-50 duration-500"
            >
              <p className="text-xs md:text-sm">
                <span className="font-medium">Publish year: </span>
                {bookDetails?.first_publish_date || 'no information'}
              </p>
              <p className="text-xs md:text-sm">
                <span className="font-medium">Count of pages: </span>
                {bookDetails?.number_of_pages || 'no information'}
              </p>
              <p className="text-xs md:text-sm">
                <span className="font-medium">Subjects: </span>
                {Array.isArray(bookDetails?.subjects)
                  ? bookDetails?.subjects.map(
                      (subject: string, index: number) =>
                        index < 6 ? (
                          <span key={index}>
                            {subject}
                            {index < bookDetails?.subjects.length - 1 && (
                              <span>, </span>
                            )}
                          </span>
                        ) : null
                    )
                  : 'no information'}
              </p>
            </div>
          </>
        ) : (
          <p className="text-gray-500">No more information</p>
        )}
        <Button text="Refetch card" type="button" onClick={() => refetch()} />
      </div>
    </>
  );
}

export default Book;
