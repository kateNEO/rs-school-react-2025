import React, { Component } from 'react';
import Button from './Button.tsx';
import { searchPlanet } from '../services/searchPlanet.ts';

class Search extends Component {
  state = {
    searchStr: '',
  };
  handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchStr: e.target.value });
    console.log(this.state.searchStr);
  };
  handleClick = async () => {
    try {
      const data = await searchPlanet(this.state.searchStr);
      console.log(data);
      this.setState({ data });
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    return (
      <div className="w-1/1 h-40 flex justify-between items-center gap-8">
        <input
          type="text"
          className="border border-[#9F9F9F] w-full h-10 rounded-[7px] p-4 hover:cursor-pointer"
          placeholder="Tatooine"
          onChange={this.handleSearchChange}
        />
        <Button text="search" onClick={this.handleClick} />
      </div>
    );
  }
}

export default Search;
