import InputField from './InputField.tsx';
import Button from './Button.tsx';

function UncontrolledForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <InputField
        name="name"
        label="Name"
        type="text"
        placeholder="your name"
      />

      <InputField name="age" label="Age" type="number" placeholder="your age" />

      <InputField
        name="email"
        label="Email"
        type="email"
        placeholder="example@example.com"
      />

      <InputField
        name="password"
        label="Password"
        type="password"
        placeholder="password..."
      />

      <InputField
        name="confirmPassword"
        label="Repite password"
        type="password"
        placeholder="repite password..."
      />

      <label className="text-left text-sm leading-8 text-[#545454]">
        Gender
      </label>
      <select
        className="border border-[#9F9F9F] w-full h-10 rounded-[7px] hover:cursor-pointer"
        name="gender"
      >
        <option>male</option>
        <option>female</option>
      </select>
      <div className="flex items-center gap-2">
        <input className="w-4 h-4" type="checkbox" />
        <span className="text-sm leading-5 text-[#545454]">
          Accept Terms and Conditions agreement
        </span>
      </div>
      <Button text="Submit" type="submit" />
    </form>
  );
}

export default UncontrolledForm;
