import { API_URLs } from '../../constants/api';
import { get, put } from '../../helpers/axios-helper';
import { VNPayConfig, UpdateVNPayConfigRequest } from './types';

export const vnpayService = {
  getConfig: async (): Promise<VNPayConfig> => {
    const response = await get<VNPayConfig>(API_URLs.CONFIG.VNPAY.GET);
    console.log(response);
    return response.data;
  },

  updateConfig: async (data: UpdateVNPayConfigRequest): Promise<VNPayConfig> => {
    const response = await put<VNPayConfig>(API_URLs.CONFIG.VNPAY.UPDATE, data);
    return response.data;
  }
};
