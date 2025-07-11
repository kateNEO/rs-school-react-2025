import { Component } from 'react';

class Input extends Component {
  render() {
    return (
      <input
        type="text"
        className="border border-[#9F9F9F] w-full h-10 rounded-[7px] p-4 hover:cursor-pointer"
        placeholder="Tatooine"
      />
    );
  }
}
export default Input;
