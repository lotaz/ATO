import { API_URLs } from '../../constants/api';
import { get, post, put } from '../../helpers/axios-helper';
import { User } from '../../types';
import { ICreateAccountRequest } from './types';

export interface IUpdateAccountRequest {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  fullname: string;
  gender: boolean;
  avatarURL?: string;
  dob: string;
  isAccountActive: boolean;
  role: string;
}

export const accountService = {
  getAccounts: async () => {
    const response = await get<User[]>(API_URLs.ACCOUNT.LIST);
    return response.data;
  },
  getAccount: async (id: string) => {
    const response = await get<User>(API_URLs.ACCOUNT.GET.replace(':id', id));
    return response.data;
  },
  createAccount: async (data: ICreateAccountRequest) => {
    const response = await post(`${API_URLs.ACCOUNT.CREATE}`, data);
    return response.data;
  },

  createGuideAccount: async (data: ICreateAccountRequest) => {
    const response = await post(`${API_URLs.ACCOUNT.CREATE_GUIDE}`, data);
    console.log('response', response);
  },
  updateAccount: async (data: IUpdateAccountRequest) => {
    const response = await put(`admin/user/update-account`, data);
    return response.data;
  }
};
