import React from 'react';

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  type: string;
  placeholder?: string;
  accept?: string;
  autoCompleteList?: string[];
};

function InputField({
  label,
  type,
  placeholder,
  autoCompleteList,
  ...props
}: InputFieldProps) {
  const countryListId = 'countries-list';
  return (
    <div className="flex flex-col mt-1">
      <label className="text-left text-sm leading-6 text-[#545454]">
        {label}
      </label>
      <div className="relative w-full">
        <input
          type={type}
          className="border border-[#9F9F9F] w-full h-8 rounded-[7px] p-2 hover:cursor-pointer"
          placeholder={placeholder}
          list={autoCompleteList ? countryListId : undefined}
          {...props}
        />
        {autoCompleteList && (
          <datalist id={countryListId}>
            {autoCompleteList.map((value) => (
              <option key={value} value={value} />
            ))}
          </datalist>
        )}
      </div>
    </div>
  );
}

export default InputField;
