import { axiosApi } from '@/config/axios';
import { formModel } from '../hooks/useRegister';
import { z } from 'zod';
import { AxiosResponse } from 'axios';
import { IRegisterRes } from '../types';

export const registerApi = async ({
  data,
}: {
  data: z.infer<typeof formModel>;
}): Promise<AxiosResponse<IRegisterRes>> =>
  await axiosApi.post<IRegisterRes>('/register/test', data);
