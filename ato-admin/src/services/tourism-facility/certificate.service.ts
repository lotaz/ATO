import { Certificate, CreateCertificateRequest } from '../../types/tourism-facility/certificate.types';
import { get, post, put } from '../../helpers/axios-helper';
import { mockCertificates } from '../../mock/tourism-facility/certificate.mock';

const BASE_URL = '/api/certificates';

export const certificateService = {
  getByProduct: async (productId: number): Promise<Certificate[]> => {
    return mockCertificates;
    const response = await get(`${BASE_URL}/product/${productId}`);
    return response.data as Certificate[];
  },

  getById: async (id: number): Promise<Certificate> => {
    return mockCertificates[0];
    const response = await get(`${BASE_URL}/${id}`);
    return response.data as Certificate;
  },

  create: async (data: CreateCertificateRequest): Promise<Certificate> => {
    const response = await post(BASE_URL, data);
    return response.data as Certificate;
  },

  update: async (id: number, data: Partial<CreateCertificateRequest>): Promise<Certificate> => {
    const response = await put(`${BASE_URL}/${id}`, data);
    return response.data as Certificate;
  }
};
