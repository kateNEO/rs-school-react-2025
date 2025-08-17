import type { BooksCard, Response } from '../pages/page/[pageNumber].tsx';
import BookCard from './BookCard';
import { Outlet } from 'react-router-dom';
import DownloadPanel from './DownloadPanel';
import { useState } from 'react';
import { store } from '../store/store';
import Button from './Button';
type ResultProps = {
  response: Response;
  error: Error | null;
  setURL: (bookKey: string) => void;
  refetch: () => void;
};

function Result({ response, error, setURL, refetch }: ResultProps) {
  const [countOfSelected, setCountOfSelected] = useState(
    store.getState().selectedIdList.length
  );
  if (error) return <p className="text-gray-500">{error.message}</p>;
  return (
    <>
      <div className="flex justify-between gap-5">
        <div className="grid text-start grid-cols-2 duration-300 gap-x-[2vw] gap-y-[6vw] c max-w-[1440px] w-3/3 xl:grid-cols-3">
          {response.numFound === 0 && (
            <p className="text-gray-500">Not Found :( </p>
          )}
          {response.docs.map((book: BooksCard) => (
            <BookCard
              book={book}
              onClick={setURL}
              key={book.key}
              setSelected={setCountOfSelected}
            />
          ))}
        </div>
        <Outlet />
      </div>
      {countOfSelected > 0 && (
        <DownloadPanel
          countOfSelected={countOfSelected}
          setSelected={setCountOfSelected}
        />
      )}
      <Button text="refetch" type="button" onClick={() => refetch()} />
    </>
  );
}

export default Result;
