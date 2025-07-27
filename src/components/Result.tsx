import type { BooksCard, Response } from '../pages/MainPage.tsx';
//import Book from './Book.tsx';
//import { useState } from 'react';
import BookCard from './BookCard.tsx';
import { Outlet } from 'react-router-dom';
type ResultProps = {
  response: Response;
  error: string | null;
  setURL: (bookKey: string) => void;
};

function Result({ response, error, setURL }: ResultProps) {
  // const [showDetails, setShowDetails] = useState(false);
  if (error) return <p className="text-gray-500">{error}</p>;
  console.log(response);
  return (
    <div className="flex justify-between">
      <div className="grid text-start grid-cols-2 duration-300 gap-[2vw] max-w-[1440px] w-3/3 py-3 xl:grid-cols-3">
        {response.numFound > 0 ? (
          response.docs.map((book: BooksCard) => (
            <BookCard book={book} onClick={setURL} key={book.key} />
          ))
        ) : (
          <p className="text-gray-500">Not Found :( </p>
        )}
      </div>
      <Outlet />
      {/*{showDetails && <Book setShowDetails={setShowDetails} />}*/}
    </div>
  );
}

export default Result;
