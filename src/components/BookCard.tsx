import type { BooksCard } from '../pages/MainPage.tsx';
import { store } from '../store/store.ts';
import { useEffect, useState } from 'react';

type BookProps = {
  book: BooksCard;
  onClick: (bookKey: string) => void;
  setSelected: (count: number) => void;
};

function BookCard({ book, onClick, setSelected }: BookProps) {
  const bookId = book.key.split('/')[2];
  const initialSelectedValue = store.getState().isSelected(bookId) ?? false;
  const [isSelected, setIsSelect] = useState(initialSelectedValue);
  const isSelect = store.getState().isSelected(book.key);
  const selectedCount = store.getState().selectedIdList.length;
  useEffect(() => {
    setSelected(selectedCount);
  }, [selectedCount, setSelected]);

  const toggleItem = () => {
    store.getState().toggleItem(book);
    setIsSelect(!isSelected);
    setSelected(selectedCount);
    console.log(store.getState().selectedIdList);
  };
  return (
    <div
      key={bookId}
      className="w-fit duration-300 text-start text-inherit text-shadow:inherit
                   hover:cursor-pointer group"
      onClick={() => onClick(bookId)}
    >
      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          onClick={(e) => e.stopPropagation()}
          onChange={() => toggleItem()}
          checked={isSelect}
        />
        <span className="py-1">📚</span>
        <h2 className="text-sm font-bold  duration-300 group-hover:drop-shadow-[1px_1px_2px_#AAA] md:text-2xl">
          {book.title}
        </h2>
      </div>
      {book.author_name?.slice(0, 5).map((author: string, index: number) => (
        <span
          key={index}
          className="text-sm font-bold duration-300 group-hover:drop-shadow-[1px_1px_2px_#AAA]"
        >
          {author}
          {index < 5 && index < book.author_name.length - 1 && <span>, </span>}
        </span>
      ))}
    </div>
  );
}

export default BookCard;
