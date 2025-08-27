import Button from './Button';
import React, { useRef, useState } from 'react';
import { userFormSchema } from '../validation/schema';
import InputField from './InputField';
import { countries } from '../const/const';
import { fileToBase64 } from '../services/converterToBase64.ts';
import { formStore } from '../store/formStore.ts';
import type { FormData } from '../store/formStore.ts';

function UncontrolledForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const genderValue = formData.get('gender');
    let gender: 'male' | 'female';
    if (genderValue === 'male') {
      gender = 'male';
    } else if (genderValue === 'female') {
      gender = 'female';
    } else {
      gender = 'male';
    }
    const fileInput = formRef.current?.elements.namedItem(
      'picture'
    ) as HTMLInputElement;
    const data = {
      name: String(formData.get('name')),
      age: Number(formData.get('age')),
      email: String(formData.get('email')),
      password: {
        password: String(formData.get('password')),
        confirmPassword: String(formData.get('confirmPassword')),
      },
      country: String(formData.get('country')),
      gender,
      acceptTerms: formData.get('acceptTerms') === 'on',
      picture: fileInput?.files,
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
      setErrors(fieldErrors);
    } else {
      console.log(data);
      let pictureBase64 = '';
      if (data.picture && data.picture.length > 0) {
        pictureBase64 = await fileToBase64(data.picture[0]);
      }
      const formattedData: FormData = { ...data, picture: pictureBase64 };
      formStore.getState().setData(formattedData);
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
      {errors.confirmPassword && (
        <p className="h-5 text-red-500 text-[12px]">{errors.confirmPassword}</p>
      )}
      <div>
        <label className="text-left text-sm leading-6 text-[#545454]">
          Gender
        </label>
        <select
          className="border border-[#9F9F9F] w-full h-10 rounded-[7px] hover:cursor-pointer"
          name="gender"
        >
          <option>male</option>
          <option>female</option>
        </select>
      </div>
      <InputField
        type="text"
        label="Country"
        name="country"
        autoCompleteList={countries}
      />
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
        name="picture"
      />
      {errors.picture && (
        <p className="h-5 text-red-500 text-[12px]">{errors.picture}</p>
      )}
      <Button text="Submit" type="submit" />
    </form>
  );
}

export default UncontrolledForm;
