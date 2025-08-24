import type { FieldValues, UseFormRegister, Path } from 'react-hook-form';

type InputFieldProps<T extends FieldValues> = {
  label: string;
  type: string;
  placeholder?: string;
  name: Path<T>;
  accept?: string;
  register: UseFormRegister<T>;
};

function InputField<T extends FieldValues>({
  label,
  type,
  placeholder,
  name,
  register,
}: InputFieldProps<T>) {
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
          {...register(name)}
        />
      </div>
    </div>
  );
}
export default InputField;
