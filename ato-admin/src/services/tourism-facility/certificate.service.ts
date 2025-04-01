import { get, post, put } from '../../helpers/axios-helper';
import { Certificate, CreateCertificateRequest } from '../../types/tourism-facility/certificate.types';

const BASE_URL = '/afto/product';

export const certificateService = {
  getByProduct: async (productId: string): Promise<Certificate[]> => {
    // return mockCertificates;
    const response = await get(`${BASE_URL}/get-certification-by-productid/${productId}`);
    console.log('resp', response);
    return response.data as Certificate[];
  },

  getById: async (id: string): Promise<Certificate> => {
    const response = await get(`${BASE_URL}/get-certification/${id}`);
    return response.data as Certificate;
  },

  create: async (data: CreateCertificateRequest): Promise<Certificate> => {
    const response = await post(BASE_URL + '/create-certification', data);
    return response.data as Certificate;
  },

  update: async (id: string, data: Partial<CreateCertificateRequest>): Promise<Certificate> => {
    const response = await put(`${BASE_URL}/update-certification/${id}`, data);
    return response.data as Certificate;
  }
};
