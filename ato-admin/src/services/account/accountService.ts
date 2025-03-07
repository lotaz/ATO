import { API_URLs } from '../../constants/api';
import { get } from '../../helpers/axios-helper';
import { User } from '../../types';

export const accountService = {
  getAccounts: async () => {
    const response = await get<User[]>(API_URLs.ACCOUNT.LIST);
    return response.data;
  },
  getAccount: async (id: string) => {
    const response = await get<User>(API_URLs.ACCOUNT.GET.replace(':id', id));
    return response.data;
  }
};
