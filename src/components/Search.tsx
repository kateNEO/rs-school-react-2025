import { useEffect } from 'react';
import Button from './Button.tsx';
import { PAGE_DEFAULT } from '../const/const.ts';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  type LocalStorageType,
  useLocalStorage,
} from '../hooks/useLocalStorage.ts';

type SearchProps = {
  setSearchStr: (val: Partial<LocalStorageType>) => void;
};
function Search({ setSearchStr }: SearchProps) {
  const [savedObj] = useLocalStorage();
  const { register, handleSubmit, setValue, getValues } = useForm<{
    searchStr: string;
  }>({
    mode: 'onChange',
    defaultValues: {
      searchStr: '',
    },
  });
  useEffect(() => {
    const saved = savedObj.lastRequest;
    if (saved) {
      setValue('searchStr', saved);
    }
  }, [setValue, savedObj.lastRequest]);

  const navigate = useNavigate();
  const handleClickSearch = async ({ searchStr }: { searchStr: string }) => {
    setSearchStr({ lastRequest: searchStr });
    const currentValue = getValues('searchStr');
    console.log(currentValue, savedObj.lastRequest);
    if (currentValue !== savedObj.lastRequest) {
      navigate(`/page/${PAGE_DEFAULT}`);
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
        className="border border-[#9F9F9F] text-white w-full h-10 rounded-[7px] p-4 hover:cursor-pointer hover:shadow-[0_4px_20px_#DDD] duration-300"
        placeholder="Harry Potter"
      />
      <Button text="search" type="submit" />
    </form>
  );
}

export default Search;
