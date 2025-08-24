import { z } from 'zod';

const firstUppercaseLetter = /^[A-Z].*$/;

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/;

export const userFormSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Name is required' })
      .regex(firstUppercaseLetter, {
        message: 'First letter must be uppercase',
      }),

    age: z.number().min(0, { message: 'Age cannot be negative' }),

    email: z.email('Invalid email address'),

    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(passwordRegex, {
        message:
          'Password must contain 1 number, 1 uppercase, 1 lowercase, and 1 special character',
      }),

    confirmPassword: z.string(),

    gender: z.enum(['male', 'female', 'other'], 'Please select gender'),

    acceptTerms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the Terms and Conditions',
    }),

    picture: z
      .instanceof(File, { message: 'File is required' })
      .refine((file) => file.size >= 5 * 1024 * 1024, {
        message: 'File must be smaller than 5MB',
      })
      .refine((file) => ['image/png', 'image/jpeg'].includes(file.type), {
        message: 'Only PNG or JPEG files are allowed',
      }),

    country: z.string().min(1, { message: 'Country is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });
