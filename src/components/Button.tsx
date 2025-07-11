import { Component } from 'react';

class Button extends Component {
  render() {
    return (
      <button
        className="px-5 py-2 bg-[#1c1e45]
      text-white font-semibold rounded-md shadow-md hover:bg-[#61637d] transition-colors duration-300 hover:cursor-pointer"
      >
        search
      </button>
    );
  }
}
export default Button;
