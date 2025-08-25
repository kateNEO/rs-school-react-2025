import InputField from './InputField';
import Button from './Button';
import { useForm } from 'react-hook-form';
import { userFormSchema } from '../validation/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { countries } from '../const/const';

export type userFormSchemaData = z.infer<typeof userFormSchema>;
function RHFForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<userFormSchemaData>({
    mode: 'onChange',
    resolver: zodResolver(userFormSchema),
  });
  const submitHandler = () => {};
  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col max-h-250 gap-2"
    >
      <InputField
        {...register('name')}
        label="First Name"
        type="text"
        placeholder="name"
      />
      {errors.name && (
        <p className="h-5 text-red-500 text-[12px]">{errors.name.message}</p>
      )}
      <InputField
        label="Age"
        type="text"
        placeholder="age"
        {...register('age', { valueAsNumber: true })}
      />
      {errors.age && (
        <p className="h-5 text-red-500 text-[12px]">{errors.age.message}</p>
      )}
      <InputField
        label="Email"
        type="text"
        placeholder="example@example.com"
        {...register('email')}
      />
      {errors.email && (
        <p className="h-5 text-red-500 text-[12px]">{errors.email.message}</p>
      )}
      <InputField
        {...register('password')}
        label="Password"
        type="password"
        placeholder="password..."
      />
      {errors.password && (
        <p className="h-5 text-red-500 text-[12px]">
          {errors.password.message}
        </p>
      )}
      <InputField
        {...register('confirmPassword')}
        label="Repeat password"
        type="password"
        placeholder="password..."
      />
      {errors.confirmPassword && (
        <p className="h-5 text-red-500 text-[12px]">
          {errors.confirmPassword.message}
        </p>
      )}
      <label className="text-left text-sm leading-8 text-[#545454]">
        Gender
      </label>
      <select
        className="border border-[#9F9F9F] w-full h-10 rounded-[7px] hover:cursor-pointer"
        {...register('gender')}
      >
        <option>male</option>
        <option>female</option>
      </select>
      {errors.gender && (
        <p className="h-5 text-red-500 text-[12px]">{errors.gender.message}</p>
      )}
      <InputField
        type="text"
        label="Country"
        autoCompleteList={countries}
        {...register('country')}
      />
      {errors.country && (
        <p className="h-5 text-red-500 text-[12px]">{errors.country.message}</p>
      )}
      <div className="flex items-center gap-2">
        <input
          className="w-4 h-4"
          type="checkbox"
          {...register('acceptTerms')}
        />
        <span className="text-sm leading-5 text-[#545454]">
          Accept Terms and Conditions agreement
        </span>
      </div>
      {errors.acceptTerms && (
        <p className="h-5 text-red-500 text-[12px]">
          {errors.acceptTerms.message}
        </p>
      )}
      <InputField
        type="file"
        label="Upload Picture"
        accept="image/png, image/jpeg"
        {...register('picture')}
      />
      {errors.picture && (
        <p className="h-5 text-red-500 text-[12px]">{errors.picture.message}</p>
      )}
      <Button text="Submit" type="submit" disabled={!isValid} />
    </form>
  );
}

export default RHFForm;
