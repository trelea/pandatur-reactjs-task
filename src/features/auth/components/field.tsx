import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { cn } from '@/lib/utils';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  form: UseFormReturn<any>;
  name: string;
  label?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  required?: boolean;
  placeholder?: string;
  style?: {
    label?: React.HTMLAttributes<HTMLLabelElement>;
    input?: React.HTMLAttributes<HTMLInputElement>;
    item?: React.HTMLAttributes<HTMLElement>;
  };
}

export default function Field({
  form,
  name,
  label,
  type = 'text',
  required = false,
  placeholder,
  style,
}: Props): React.ReactNode {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('', style?.item?.className)}>
          {label && (
            <FormLabel className={cn('', style?.label?.className)}>
              {label}
            </FormLabel>
          )}
          <FormControl>
            {type === 'password' ? (
              <PasswordInput
                {...field}
                required={required}
                placeholder={placeholder}
              />
            ) : (
              <Input
                {...field}
                type={type}
                required={required}
                placeholder={placeholder}
                className={cn('', style?.input?.className)}
              />
            )}
          </FormControl>
          <FormMessage className='text-xs' />
        </FormItem>
      )}
    />
  );
}
