import React, { useEffect, useState } from 'react';
import Button from './Button.tsx';
import { searchPlanet } from '../services/searchPlanet.ts';
import { saveToLocalStorage } from '../services/saveToLocalStorage.ts';
import type { Response } from './MainPage.tsx';
import { getAllPlanets } from '../services/getAllPlanets.ts';

type SearchProps = {
  onSearch: (response: Response) => void;
  setIsLoading: (value: boolean) => void;
};

function Search({ onSearch, setIsLoading }: SearchProps) {
  const [searchStr, setSearchStr] = useState<string>('');
  useEffect(() => {
    const saved = localStorage.getItem('lastRequest');
    if (saved) {
      setSearchStr(saved);
    }
  }, []);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchStr(e.target.value);
  };
  const handleClickSearch = async () => {
    setIsLoading(true);
    try {
      let data;
      if (searchStr === '') {
        data = await getAllPlanets();
      } else {
        data = await searchPlanet(searchStr.trim());
        saveToLocalStorage(searchStr);
      }
      onSearch(data);
      console.log(data.result);

      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-1/1 h-40 flex justify-between items-center gap-8">
      <input
        type="text"
        value={searchStr}
        className="border border-[#9F9F9F] text-white w-full h-10 rounded-[7px] p-4 hover:cursor-pointer hover:shadow-[0_4px_20px_#9ca3af] duration-300"
        placeholder="Tatooine"
        onChange={handleSearchChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleClickSearch();
          }
        }}
      />
      <Button text="search" onClick={handleClickSearch} disabled={false} />
    </div>
  );
}

export default Search;
