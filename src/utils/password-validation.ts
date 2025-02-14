import { z } from 'zod';

export const validate_password = () =>
  z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[\W_]/, 'Password must contain at least one special character')
    .refine((_) => !_.includes(' '));
