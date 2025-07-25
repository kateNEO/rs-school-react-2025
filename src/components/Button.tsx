type ButtonProps = {
  onClick: () => void;
  text: string;
  disabled?: boolean;
};
function Button({ onClick, text, disabled = false }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="px-5 py-2 w-fit bg-[#1c1e45]
      text-white font-semibold rounded-md shadow-md hover:shadow-[0_4px_20px_#FFF] duration-300 hover:cursor-pointer"
    >
      {text}
    </button>
  );
}
export default Button;
