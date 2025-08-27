type ButtonProps<T = boolean> = {
  onClick?: (value?: boolean) => void;
  text: string;
  type: string;
  disabled?: boolean;
  value?: T;
};
function Button({ onClick, text, value, disabled = false }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={() => onClick?.(value)}
      className={`px-5 py-2 w-fit bg-[#1c1e45]
      text-white font-semibold rounded-md h-10 shadow-md hover:shadow-[0_4px_20px_#FFF] duration-300 hover:cursor-pointer
      ${
        disabled
          ? 'bg-gray-400 cursor-not-allowed hover:shadow-none'
          : 'bg-[#1c1e45] hover:shadow-[0_4px_20px_#FFF] hover:cursor-pointer duration-300'
      }
    `}
    >
      {text}
    </button>
  );
}
export default Button;
