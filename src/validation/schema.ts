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

    age: z
      .number({ message: 'Age must be a number' })
      .nonnegative({ message: 'Age cannot be negative' }),

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
      .any()
      .refine((file) => file instanceof File, 'File is required')
      .refine(
        (file) => ['image/png', 'image/jpeg'].includes(file.type),
        'Only PNG or JPEG files are allowed'
      )
      .refine((file) => file.size <= 5 * 1024 * 1024, 'Max file size is 5MB'),

    country: z.string().min(1, 'Country is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });
