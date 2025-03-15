import { API_URLs } from '../../constants/api';
import { get, put } from '../../helpers/axios-helper';
import { IEmailConfig, IEmailConfigResponse } from './types';

export const configService = {
  getEmailConfig: async () => {
    const response = await get<IEmailConfigResponse>(API_URLs.CONFIG.EMAIL.GET);
    console.log(response);
    return response.data;
  },
  updateEmailConfig: async (config: IEmailConfig) => {
    const response = await put<IEmailConfigResponse>(API_URLs.CONFIG.EMAIL.UPDATE, config);
    return response.data;
  }
};
