import type { BooksList, Response } from './MainPage.tsx';
import Pagination from './Pagination.tsx';
import { LIMIT } from './const/const.ts';
import { navigate } from '../services/navigation.ts';
type ResultProps = {
  response: Response;
  error: string | null;
  setLoading: (isLoading: boolean) => void;
};

function Result({ response, error /*setLoading*/ }: ResultProps) {
  const total_pages = Math.ceil(response.numFound / LIMIT);
  if (error) return <p className="text-gray-500">{error}</p>;
  return (
    <div className="flex flex-col gap-5">
      <div className="grid text-start grid-cols-2 gap-[2vw] max-w-[1440px] py-3 xl:grid-cols-3">
        {response.numFound > 0 ? (
          response.docs.map((book: BooksList) => (
            <div
              key={book.key}
              className="mb-10 text-white text-start h-15
                   hover:cursor-pointer group"
            >
              <div className="flex items-start gap-2">
                <span className="py-1">📚</span>
                <h2
                  className="text-xl text-start drop-shadow-[1px_1px_1px_#AAA] font-bold text-gray-700 duration-300
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
          ))
        ) : (
          <p className="text-gray-500">Not Found :( </p>
        )}
      </div>
      <div className="hidden w-60 h-20"></div>
      <Pagination
        totalPage={total_pages}
        navigate={navigate} /*responseObj={response}*/
      />
    </div>
  );
}

export default Result;
