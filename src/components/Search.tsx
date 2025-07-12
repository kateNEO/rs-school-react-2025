import React, { Component } from 'react';
import Button from './Button.tsx';
import { searchPlanet } from '../services/searchPlanet.ts';
import type { PlanetProps } from './Planet.tsx';
type SearchProps = {
  onSearch: (planet: PlanetProps[]) => void;
  setIsLoading: (value: boolean) => void;
};
class Search extends Component<SearchProps> {
  state = {
    searchStr: '',
  };
  handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchStr: e.target.value });
  };
  handleClick = async () => {
    this.props.setIsLoading(true);
    try {
      const data = await searchPlanet(this.state.searchStr);
      if (data && 'results' in data) {
        this.setState(data.results);
        this.props.onSearch(data.results);
      }
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
          className="border border-[#9F9F9F] text-white w-full h-10 rounded-[7px] p-4 hover:cursor-pointer"
          placeholder="Tatooine"
          onChange={this.handleSearchChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              this.handleClick();
            }
          }}
        />
        <Button text="search" onClick={this.handleClick} />
      </div>
    );
  }
}

export default Search;
