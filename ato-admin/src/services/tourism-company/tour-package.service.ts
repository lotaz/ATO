import { get, post, put } from '../../helpers/axios-helper';
import { mockTourPackages } from '../../mock/tourism-company/tour-package.mock';
import { CreateTourPackageRequest, TourPackage, UpdateTourPackageRequest } from '../../types/tourism-company/tour-package.types';

const BASE_URL = '/api/tour-packages';

export const tourPackageService = {
  getAll: async (): Promise<TourPackage[]> => {
    return mockTourPackages;
    const response = await get(BASE_URL);
    return response.data;
  },

  getById: async (id: number): Promise<TourPackage> => {
    return mockTourPackages[0];
    const response = await get(`${BASE_URL}/${id}`);
    return response.data;
  },

  create: async (data: CreateTourPackageRequest): Promise<TourPackage> => {
    const response = await post(BASE_URL, data);
    return response.data;
  },

  update: async (data: UpdateTourPackageRequest): Promise<TourPackage> => {
    const response = await put(`${BASE_URL}/${data.tourId}`, data);
    return response.data;
  }
};
