import type { BooksCard } from '../pages/MainPage.tsx';
import { store } from '../store/store.ts';
import { useState } from 'react';

type BookProps = {
  book: BooksCard;
  onClick: (bookKey: string) => void;
};

function BookCard({ book, onClick }: BookProps) {
  const bookId = book.key.split('/')[2];
  const [isSelected, setIsSelect] = useState(
    store.getState().isSelected(bookId)
  );

  const toggleItem = (id: string) => {
    store.getState().toggleItem(id);
    setIsSelect(!isSelected);
  };
  return (
    <div
      key={bookId}
      className="mb-15 w-fit duration-300 text-start text-inherit text-shadow:inherit
                   hover:cursor-pointer group"
      onClick={() => onClick(bookId)}
    >
      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          onClick={(e) => e.stopPropagation()}
          onChange={() => toggleItem(bookId)}
          checked={isSelected}
        />
        <span className="py-1">📚</span>
        <h2 className="text-sm font-bold  duration-300 group-hover:drop-shadow-[1px_1px_2px_#AAA] md:text-2xl">
          {book.title}
        </h2>
      </div>
      {book.author_name?.map((author: string, index: number) => (
        <span
          key={index}
          className="text-sm font-bold duration-300 group-hover:drop-shadow-[1px_1px_2px_#AAA]"
        >
          {author}
          {index < book.author_name.length - 1 && <span>, </span>}
        </span>
      ))}
    </div>
  );
}

export default BookCard;
