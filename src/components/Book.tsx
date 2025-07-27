import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export type BookDetails = {
  title: string;
  publish_date: string;
  number_of_pages: number;
  cover_edition_key: string;
};

function Book() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [bookDetails, setBookDetails] = useState<BookDetails | null>(null);
  const hiddenBook = () => {
    const page = searchParams.get('page') || '1';
    navigate(`/?page=${page}`);
  };
  console.log(id);
  useEffect(() => {
    const getBooksDetails = async () => {
      try {
        const res = await fetch(`https://openlibrary.org/books/${id}.json`);
        const data = await res.json();
        setBookDetails(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };
    getBooksDetails();
  }, [id]);
  return (
    <div className="flex flex-col relative border-1 w-1/4 h-95 min-w-[200px] items-center justify-center border border-gray-200 rounded-md">
      <button
        onClick={() => hiddenBook()}
        className="absolute top-2 right-2 text-gray-500 text-xl font-bold hover: cursor-pointer hover:drop-shadow-[1px_1px_2px_#FFF]"
      >
        ×
      </button>
      {id ? (
        <>
          <h2 className="text-2xl drop-shadow-[1px_1px_0px_#FFF] font-bold text-gray-800 mb-2">
            {bookDetails?.title}
          </h2>
          <div
            className="bg-gray-100/50 w-4/5 text-sm text-gray-600 rounded-md py-6 px-1
         hover:bg-blue-50 duration-500"
          >
            {/*<p>*/}
            {/*  <span className="font-medium">Author:</span> {'authors'}*/}
            {/*</p>*/}
            <p>
              <span className="font-medium">Publish year: </span>
              {bookDetails?.publish_date}
            </p>
            <p>
              <span className="font-medium">Count of pages: </span>{' '}
              {bookDetails?.number_of_pages}
            </p>
          </div>
        </>
      ) : (
        <p className="text-gray-500">No more information</p>
      )}
    </div>
  );
}

export default Book;
