import React, { Component } from 'react';
import Button from './Button.tsx';
import { searchPlanet } from '../services/searchPlanet.ts';
import { saveToLocalStorage } from '../services/saveToLocalStorage.ts';
import type { Response } from './MainPage.tsx';
import { getAllPlanets } from '../services/getAllPlanets.ts';
type SearchProps = {
  onSearch: (response: Response) => void;
  setIsLoading: (value: boolean) => void;
};
class Search extends Component<SearchProps> {
  state = {
    searchStr: '',
  };
  componentDidMount() {
    const saved = localStorage.getItem('lastRequest');
    if (saved) {
      console.log(saved);
      this.setState({ searchStr: saved });
    }
  }
  handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchStr: e.target.value });
  };
  handleClickSearch = async () => {
    this.props.setIsLoading(true);
    try {
      let data;
      if (this.state.searchStr === '') {
        data = await getAllPlanets();
      } else {
        data = await searchPlanet(this.state.searchStr.trim());
        saveToLocalStorage(this.state.searchStr);
      }

      this.props.onSearch(data);
      console.log(data.result);

      this.props.setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    return (
      <div className="w-1/1 h-40 flex justify-between items-center gap-8">
        <input
          type="text"
          value={this.state.searchStr}
          className="border border-[#9F9F9F] text-white w-full h-10 rounded-[7px] p-4 hover:cursor-pointer hover:shadow-[0_4px_20px_#9ca3af] duration-300"
          placeholder="Tatooine"
          onChange={this.handleSearchChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              this.handleClickSearch();
            }
          }}
        />
        <Button
          text="search"
          onClick={this.handleClickSearch}
          disabled={false}
        />
      </div>
    );
  }
}

export default Search;
