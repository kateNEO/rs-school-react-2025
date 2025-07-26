import { useEffect } from 'react';
import Button from './Button.tsx';
import { saveToLocalStorage } from '../services/saveToLocalStorage.ts';
import type { Response } from '../pages/MainPage.tsx';
import { getBooks } from '../services/getBooks.ts';
import { PAGE_DEFAULT } from './const/const.ts';
import { useForm } from 'react-hook-form';

type SearchProps = {
  onSearch: (response: Response) => void;
  setIsLoading: (value: boolean) => void;
};
function Search({ onSearch, setIsLoading }: SearchProps) {
  // const [searchStr, setSearchStr] = useState<string>('');
  const {
    register,
    handleSubmit,
    setValue,
    // getValues
  } = useForm<{ searchStr: string }>({
    mode: 'onChange',
    defaultValues: {
      searchStr: '',
    },
  });
  useEffect(() => {
    const saved = localStorage.getItem('lastRequest');
    if (saved) {
      setValue('searchStr', saved);
    }
  }, [setValue]);

  const handleClickSearch = async ({ searchStr }: { searchStr: string }) => {
    setIsLoading(true);
    try {
      const data = await getBooks(searchStr, PAGE_DEFAULT);
      saveToLocalStorage(searchStr);
      onSearch(data);
      console.log(data.docs);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      className="w-1/1 h-25 flex justify-between items-center gap-8"
      onSubmit={handleSubmit(handleClickSearch)}
    >
      <input
        {...register('searchStr')}
        type="text"
        // value={searchStr}
        className="border border-[#9F9F9F] text-white w-full h-10 rounded-[7px] p-4 hover:cursor-pointer hover:shadow-[0_4px_20px_#DDD] duration-300"
        placeholder="Witcher"
        // onChange={handleSearchChange}
        // onKeyDown={(e) => {
        //   if (e.key === 'Enter') {
        //     handleClickSearch();
        //   }
        // }}
      />
      <Button text="search" type="submit" />
    </form>
  );
}

export default Search;
