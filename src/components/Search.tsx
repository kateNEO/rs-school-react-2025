import { Component } from 'react';
import Input from './Input.tsx';
import Button from './Button.tsx';

class Search extends Component {
  render() {
    return (
      <div className="w-1/1 h-40 flex justify-between items-center gap-8">
        <Input />
        <Button />
      </div>
    );
  }
}
export default Search;
