type InputFieldProps = {
  label: string;
  type: string;
  placeholder?: string;
  name: string;
};

function InputField({ label, type, placeholder }: InputFieldProps) {
  return (
    <div className="flex flex-col mt-1.5">
      <label className="text-left text-sm leading-8 text-[#545454]">
        {label}
      </label>
      <div className="relative w-full">
        <input
          type={type}
          className="border border-[#9F9F9F] w-full h-10 rounded-[7px] p-4 hover:cursor-pointer"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
export default InputField;
