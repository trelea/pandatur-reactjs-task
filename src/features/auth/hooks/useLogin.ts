import { validate_password } from '@/utils/password-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ILoginRes } from '../types';
import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'sonner';
import { loginApi } from '../api/login.api';

export const formModel = z.object({
  email: z.string().email().max(180),
  password: validate_password(),
});

export const useLogin = () => {
  const mutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async ({ data }: { data: z.infer<typeof formModel> }) =>
      await loginApi({ data }),
    onSuccess: (_: AxiosResponse<ILoginRes>) => {
      form.reset({ email: '', password: '' });
      toast('Loged In Successfully.');
    },
    onError: (err: AxiosError<ILoginRes>) => {
      toast(`${err.response?.data.message} !!!`);
    },
  });

  const form = useForm<z.infer<typeof formModel>>({
    resolver: zodResolver(formModel),
    defaultValues: {
      email: undefined,
      password: undefined,
    },
  });

  const onSubmit = (val: z.infer<typeof formModel>) =>
    mutation.mutate({ data: val });

  return {
    form,
    onSubmit,
    pending: mutation.isPending,
    error: mutation.error?.response?.data,
  };
};
