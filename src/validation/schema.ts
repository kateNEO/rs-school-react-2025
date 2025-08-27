import { z } from 'zod';
import { countries } from '../const/const';

const firstUppercaseLetter = /^[A-Z].*$/;

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Password must contain at least 8 characters' })
      .refine((val) => /[A-Z]/.test(val), {
        message: 'Password must contain at least one uppercase letter',
      })
      .refine((val) => /[a-z]/.test(val), {
        message: 'Password must contain at least one lowercase letter',
      })
      .refine((val) => !/\s/.test(val), {
        message: 'Password must not contain leading or trailing whitespace',
      })
      .refine((val) => /[0-9]/.test(val), {
        message: 'Password must contain at least one digit',
      })
      .refine((val) => /[^A-Za-z0-9]/.test(val), {
        message: 'Password must contain at least one special symbol',
      }),

    confirmPassword: z
      .string()
      .min(1, { message: 'You must confirm password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export const userFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .regex(firstUppercaseLetter, {
      message: 'First letter must be uppercase',
    }),

  age: z
    .number({ message: 'Value should be number' })
    .min(1, { message: 'Age cannot be negative or 0' }),

  email: z.email('Invalid email address'),

  password: passwordSchema,

  gender: z.enum(['male', 'female'], 'Please select gender'),

  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the Terms and Conditions',
  }),

  picture: z
    .custom<FileList>((val) => val instanceof FileList && val.length > 0, {
      message: 'File is required',
    })
    .refine((fileList) => fileList.length > 0, 'File is required')
    .refine((files) => files[0]?.size <= 5 * 1024 * 1024, {
      message: 'File must be smaller than 5MB',
    })
    .refine((files) => ['image/png', 'image/jpeg'].includes(files[0]?.type), {
      message: 'Only PNG or JPEG files are allowed',
    }),

  country: z.enum(countries, 'Please select country'),
});
