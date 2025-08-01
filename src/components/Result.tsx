import type { BooksCard, Response } from '../pages/MainPage.tsx';
import BookCard from './BookCard.tsx';
import { Outlet } from 'react-router-dom';
type ResultProps = {
  response: Response;
  error: string | null;
  setURL: (bookKey: string) => void;
};

function Result({ response, error, setURL }: ResultProps) {
  if (error) return <p className="text-gray-500">{error}</p>;
  return (
    <div className="flex justify-between gap-5">
      <div className="grid text-start grid-cols-2 duration-300 gap-[2vw] max-w-[1440px] w-3/3 xl:grid-cols-3">
        {response.numFound > 0 ? (
          response.docs.map((book: BooksCard) => (
            <BookCard book={book} onClick={setURL} key={book.key} />
          ))
        ) : (
          <p className="text-gray-500">Not Found :( </p>
        )}
      </div>
      <Outlet />
    </div>
  );
}

export default Result;
