import { AxiosResponse } from 'axios';
import { ReplyUserSupportRequest, UserSupport } from '../../types/admin/support.types';
import { get, post } from '../../helpers/axios-helper';

const BASE_URL = '/api/admin/support';

export const supportService = {
  // Get list of all support requests
  getUserSupports: (): Promise<AxiosResponse<UserSupport[]>> => {
    return get(`${BASE_URL}/list-user-supports`);
  },

  // Get details of a specific support request
  getSupportDetail: (id: string): Promise<AxiosResponse<UserSupport>> => {
    return get(`${BASE_URL}/request-support-detail/${id}`);
  },

  // Reply to a support request
  replySupport: (data: ReplyUserSupportRequest): Promise<AxiosResponse<UserSupport>> => {
    return post(`${BASE_URL}/reply-request-support`, data);
  }
};
