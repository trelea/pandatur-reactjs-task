import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { registerApi } from '../api/register.api';
import { AxiosError, AxiosResponse } from 'axios';
import { IRegisterRes } from '../types';
import { toast } from 'sonner';
import { validate_password } from '@/utils/password-validation';
import { useNavigate } from 'react-router';

export const formModel = z.object({
  email: z.string().email().max(180),
  username: z.string().max(180),
  password: validate_password(),
});

export const useRegister = () => {
  const redirect = useNavigate();
  const mutation = useMutation({
    mutationKey: ['register'],
    mutationFn: async ({ data }: { data: z.infer<typeof formModel> }) =>
      await registerApi({ data }),
    onSuccess: (_: AxiosResponse<IRegisterRes>) => {
      form.reset({ email: '', password: '', username: '' });
      toast('Registred Successfully.');
      setTimeout(() => redirect('/login'), 500);
    },
    onError: (err: AxiosError<IRegisterRes>) => {
      toast(`${err.response?.data.message} !!!`);
    },
  });

  const form = useForm<z.infer<typeof formModel>>({
    resolver: zodResolver(formModel),
    defaultValues: {
      email: undefined,
      username: undefined,
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
