import type { BooksCard } from '../pages/MainPage.tsx';

type BookProps = {
  book: BooksCard;
  onClick: (bookKey: string) => void;
};
function BookCard({ book, onClick }: BookProps) {
  return (
    <div
      key={book.key}
      className="mb-15 duration-300 text-white text-start h-15
                   hover:cursor-pointer group"
      onClick={
        () => onClick(book.cover_edition_key)
        // {
        //   // setShowDetails(true);
        //   // setURL(book.cover_edition_key);
        //   // console.log(e.target);
        // }
      }
    >
      <div className="flex items-start gap-2">
        <span className="py-1">📚</span>
        <h2
          className="text-sm duration-300 text-start drop-shadow-[1px_1px_1px_#AAA] font-bold text-gray-700 duration-300
                    group-hover:drop-shadow-[1px_1px_2px_#FFF] md:text-2xl"
        >
          {book.title}
        </h2>
      </div>
      {book.author_name?.map((author: string, index: number) => (
        <span
          key={index}
          className="text-sm drop-shadow-[1px_1px_1px_#AAA] font-bold text-gray-700
                    duration-300 group-hover:drop-shadow-[1px_1px_2px_#FFF]"
        >
          {author}
          {index < book.author_name.length - 1 && <span>, </span>}
        </span>
      ))}
    </div>
  );
}
export default BookCard;
