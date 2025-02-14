import { axiosApi } from '@/config/axios';
import { formModel } from '../hooks/useLogin';
import { z } from 'zod';
import { AxiosResponse } from 'axios';
import { IRegisterRes } from '../types';

export const loginApi = async ({
  data,
}: {
  data: z.infer<typeof formModel>;
}): Promise<AxiosResponse<IRegisterRes>> =>
  await axiosApi.post<IRegisterRes>('/login/test', data);
