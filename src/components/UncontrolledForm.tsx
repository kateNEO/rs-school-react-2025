import Button from './Button';
import { useRef, useState } from 'react';
import { userFormSchema } from '../validation/schema.ts';

function UncontrolledForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    console.log(formData.get('acceptTerms'));
    const data = {
      name: formData.get('name'),
      age: Number(formData.get('age')),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      gender: formData.get('gender'),
      acceptTerms: formData.get('acceptTerms') === 'on',
      picture: {
        file: formData.get('picture') as File,
      },
    };
    const result = userFormSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      result.error.issues.forEach((err) => {
        if (err.path.length) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });

      setErrors(fieldErrors);
    }
  };
  return (
    <form className="flex flex-col gap-4" ref={formRef} onSubmit={handleSubmit}>
      <label className="text-left text-sm leading-8 text-[#545454]">Name</label>
      <input
        className="border border-[#9F9F9F] w-full h-10 rounded-[7px] p-4 hover:cursor-pointer"
        name="name"
        type="text"
        placeholder="your name"
      />
      {errors.name && (
        <p className="h-5 text-red-500 text-[12px]">{errors.name}</p>
      )}
      <label className="text-left text-sm leading-8 text-[#545454]">Age</label>
      <input
        className="border border-[#9F9F9F] w-full h-10 rounded-[7px] p-4 hover:cursor-pointer"
        name="age"
        type="number"
        placeholder="your age"
      />
      {errors.age && (
        <p className="h-5 text-red-500 text-[12px]">{errors.age}</p>
      )}
      <label className="text-left text-sm leading-8 text-[#545454]">
        Email
      </label>
      <input
        className="border border-[#9F9F9F] w-full h-10 rounded-[7px] p-4 hover:cursor-pointer"
        name="email"
        type="email"
        placeholder="example@example.com"
      />
      {errors.email && (
        <p className="h-5 text-red-500 text-[12px]">{errors.email}</p>
      )}
      <label className="text-left text-sm leading-8 text-[#545454]">
        Password
      </label>
      <input
        className="border border-[#9F9F9F] w-full h-10 rounded-[7px] p-4 hover:cursor-pointer"
        name="password"
        type="password"
        placeholder="password..."
      />
      {errors.password && (
        <p className="h-5 text-red-500 text-[12px]">{errors.password}</p>
      )}
      <label className="text-left text-sm leading-8 text-[#545454]">
        Repeat password
      </label>
      <input
        className="border border-[#9F9F9F] w-full h-10 rounded-[7px] p-4 hover:cursor-pointer"
        name="confirmPassword"
        type="password"
        placeholder="repite password..."
      />
      {errors.confirmPassword && (
        <p className="h-5 text-red-500 text-[12px]">{errors.confirmPassword}</p>
      )}
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
        <input className="w-4 h-4" type="checkbox" name="acceptTerms" />
        <span className="text-sm leading-5 text-[#545454]">
          Accept Terms and Conditions agreement
        </span>
      </div>
      <label>Upload Picture</label>
      <input
        className="border border-[#9F9F9F] w-full h-10 rounded-[7px] p-4 hover:cursor-pointer"
        name="picture"
        type="file"
        accept="image/png, image/jpeg"
      />
      <Button text="Submit" type="submit" />
    </form>
  );
}

export default UncontrolledForm;
