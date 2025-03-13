import { API_URLs } from '../../constants/api';
import { post, get } from '../../helpers/axios-helper';
import { IEmailConfig, IEmailConfigResponse } from './types';

export const configService = {
  getEmailConfig: async () => {
    const response = await get<IEmailConfigResponse>(API_URLs.CONFIG.EMAIL.GET);
    return response.data;
  },
  updateEmailConfig: async (config: IEmailConfig) => {
    const response = await post<IEmailConfigResponse>(API_URLs.CONFIG.EMAIL.UPDATE, config);
    return response.data;
  }
};
