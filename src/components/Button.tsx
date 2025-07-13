import { Component } from 'react';
type ButtonProps = {
  onClick: () => void;
  text: string;
};
class Button extends Component<ButtonProps> {
  render() {
    return (
      <button
        onClick={this.props.onClick}
        className="px-5 py-2 bg-[#1c1e45]
      text-white font-semibold rounded-md shadow-md hover:shadow-[0_4px_20px_#9ca3af] duration-300 hover:cursor-pointer"
      >
        {this.props.text}
      </button>
    );
  }
}
export default Button;
