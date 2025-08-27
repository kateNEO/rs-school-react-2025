import Button from './Button';
import React, { useRef, useState } from 'react';
import { userFormSchema } from '../validation/schema';
import InputField from './InputField';
import { countries } from '../const/const';

function UncontrolledForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const data = {
      name: formData.get('name'),
      age: Number(formData.get('age')),
      email: formData.get('email'),
      password: {
        password: String(formData.get('password')),
        confirmPassword: String(formData.get('confirmPassword')),
      },
      confirmPassword: String(formData.get('confirmPassword') || ''),
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
        if (err.path[0] === 'password' && err.path.length > 1) {
          const key = err.path[err.path.length - 1].toString();
          fieldErrors[key] = err.message;
        } else {
          const key = err.path[0]?.toString() || 'form';
          fieldErrors[key] = err.message;
        }
      });
      console.log(fieldErrors);
      setErrors(fieldErrors);
    }
  };
  return (
    <form
      className="flex flex-col max-h-250 gap-2"
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <InputField label="Name" type="text" name="name" placeholder="name" />
      {errors.name && (
        <p className="h-5 text-red-500 text-[12px]">{errors.name}</p>
      )}
      {errors.name && (
        <p className="h-5 text-red-500 text-[12px]">{errors.name}</p>
      )}
      <InputField label="Age" name="age" type="text" placeholder="age" />
      {errors.age && (
        <p className="h-5 text-red-500 text-[12px]">{errors.age}</p>
      )}
      <InputField
        label="Email"
        name="email"
        type="text"
        placeholder="example@example.com"
      />
      {errors.email && (
        <p className="h-5 text-red-500 text-[12px]">{errors.email}</p>
      )}
      <InputField
        label="Password"
        type="password"
        placeholder="password..."
        name="password"
      />
      {errors.password && (
        <p className="h-5 text-red-500 text-[12px]">{errors.password}</p>
      )}
      <InputField
        label="Repeat password"
        type="password"
        placeholder="password..."
        name="confirmPassword"
      />
      {errors.password && (
        <p className="h-5 text-red-500 text-[12px]">{errors.confirmPassword}</p>
      )}
      <div>
        <label className="text-left text-sm leading-6 text-[#545454]">
          Gender
        </label>
        <select className="border border-[#9F9F9F] w-full h-10 rounded-[7px] hover:cursor-pointer">
          <option>male</option>
          <option>female</option>
        </select>
      </div>
      <InputField type="text" label="Country" autoCompleteList={countries} />
      {errors.country && (
        <p className="h-5 text-red-500 text-[12px]">{errors.country}</p>
      )}
      <div className="flex items-center gap-2">
        <input className="w-4 h-4" type="checkbox" name="acceptTerms" />
        <span className="text-sm leading-5 text-[#545454]">
          Accept Terms and Conditions agreement
        </span>
      </div>
      {errors.acceptTerms && (
        <p className="h-5 text-red-500 text-[12px]">{errors.acceptTerms}</p>
      )}
      <InputField
        type="file"
        label="Upload Picture"
        accept="image/png, image/jpeg"
      />
      {errors.picture && (
        <p className="h-5 text-red-500 text-[12px]">{errors.picture}</p>
      )}
      <Button text="Submit" type="submit" />
    </form>
  );
}

export default UncontrolledForm;
