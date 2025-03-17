import { get, post, put } from '../../helpers/axios-helper';
import { mockPackages } from '../../mock/tourism-facility/package.mock';
import { CreatePackageRequest, TourPackage } from '../../types/tourism-facility/package.types';

const BASE_URL = '/api/packages';

export const packageService = {
  getAll: async (): Promise<TourPackage[]> => {
    return mockPackages;
    const response = await get(BASE_URL);
    return response.data as TourPackage[];
  },

  getById: async (id: number): Promise<TourPackage> => {
    return mockPackages[0];

    const response = await get(`${BASE_URL}/${id}`);
    return response.data as TourPackage;
  },

  create: async (data: CreatePackageRequest): Promise<TourPackage> => {
    const response = await post(BASE_URL, data);
    return response.data as TourPackage;
  },

  update: async (id: number, data: Partial<CreatePackageRequest>): Promise<TourPackage> => {
    const response = await put(`${BASE_URL}/${id}`, data);
    return response.data as TourPackage;
  }
};
