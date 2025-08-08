import type { BooksCard } from '../pages/MainPage.tsx';

type BookProps = {
  book: BooksCard;
  onClick: (bookKey: string) => void;
};

function BookCard({ book, onClick }: BookProps) {
  return (
    <div
      key={book.key}
      className="mb-15 w-fit duration-300 text-start text-inherit text-shadow:inherit
                   hover:cursor-pointer group"
      onClick={() => onClick(book.key.split('/')[2])}
    >
      <div className="flex items-start gap-2">
        <input type="checkbox" onClick={(e) => e.stopPropagation()} />
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
