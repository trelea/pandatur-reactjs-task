import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  form: UseFormReturn<any>;
  name: string;
  label?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'] | 'textarea';
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
            {type === 'textarea' ? (
              <Textarea
                {...field}
                required={required}
                placeholder={placeholder}
                className={cn('', style?.input?.className)}
                rows={4}
              />
            ) : type === 'password' ? (
              <PasswordInput
                {...field}
                required={required}
                placeholder={placeholder}
                className={cn('', style?.input?.className)}
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
