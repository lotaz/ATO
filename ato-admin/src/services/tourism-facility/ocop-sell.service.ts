import { AxiosResponse } from 'axios';
import { get, post, put } from '../../helpers/axios-helper';
import { CreateOCOPSell, OCOPSell, UpdateOCOPSell } from '../../types/tourism-facility/ocop-sell.types';

const BASE_URL = '/afto/product';

export const ocopSellService = {
  getOCOPSells: (id: string): Promise<AxiosResponse<OCOPSell[]>> => {
    return get(BASE_URL + '/get-ocop-sells-by-productid/' + id);
  },

  getOCOPSell: (id: string): Promise<AxiosResponse<OCOPSell>> => {
    return get(`${BASE_URL}/get-ocop-sell/${id}`);
  },

  createOCOPSell: (data: CreateOCOPSell): Promise<AxiosResponse<OCOPSell>> => {
    return post(BASE_URL + '/create-ocop-sell', data);
  },

  updateOCOPSell: (id: string, data: UpdateOCOPSell): Promise<AxiosResponse<OCOPSell>> => {
    return put(`${BASE_URL}/update-ocop-sell/${id}`, data);
  }
};
