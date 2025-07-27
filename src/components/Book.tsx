import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export type BookDetails = {
  title: string;
  first_publish_date: string;
  number_of_pages: number;
  subjects: string[];
};

function Book() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [bookDetails, setBookDetails] = useState<BookDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const hiddenBook = () => {
    const page = searchParams.get('page') || '1';
    navigate(`/?page=${page}`);
  };
  useEffect(() => {
    const getBooksDetails = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`https://openlibrary.org/works/${id}.json`);
        const data = await res.json();
        setBookDetails(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getBooksDetails();
  }, [id]);
  return (
    <>
      <div className="flex flex-col relative border-1 w-1/4 h-95 min-w-[240px] items-center justify-center border border-gray-200 rounded-md">
        <button
          onClick={() => hiddenBook()}
          className="absolute top-2 right-2 text-gray-500 text-xl font-bold hover: cursor-pointer hover:drop-shadow-[1px_1px_2px_#FFF]"
        >
          ×
        </button>
        {isLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : id ? (
          <>
            <h2 className=" text-xl text-2xl mt-4 drop-shadow-[1px_1px_0px_#FFF] font-bold text-gray-800 mb-2 md:text-2xl">
              {bookDetails?.title}
            </h2>
            <div
              className="bg-gray-100/50 w-4/5 text-sm text-gray-600 rounded-md py-6 px-1
         hover:bg-blue-50 duration-500"
            >
              <p>
                <span className="font-medium">Publish year: </span>
                {bookDetails?.first_publish_date || 'no information'}
              </p>
              <p>
                <span className="font-medium">Count of pages: </span>
                {bookDetails?.number_of_pages || 'no information'}
              </p>
              <p>
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
      </div>
    </>
  );
}

export default Book;
