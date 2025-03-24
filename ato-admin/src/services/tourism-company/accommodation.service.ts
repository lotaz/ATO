import { get, post, put } from '../../helpers/axios-helper';
import { API_URLs } from '../../constants/api';
import { Accommodation, CreateAccommodationRequest, UpdateAccommodationRequest } from '../../types/tourism-company/accommodation.types';

export const accommodationService = {
  getAccommodations: async (): Promise<Accommodation[]> => {
    const response = await get(API_URLs.ACCOMMODATION.LIST);
    return response.data;
  },

  getAccommodationById: async (id: string): Promise<Accommodation> => {
    const response = await get(API_URLs.ACCOMMODATION.GET.replace(':id', id));
    return response.data;
  },

  createAccommodation: async (data: CreateAccommodationRequest): Promise<Accommodation> => {
    const response = await post(API_URLs.ACCOMMODATION.CREATE, data);
    return response.data;
  },

  updateAccommodation: async (id: string, data: UpdateAccommodationRequest): Promise<Accommodation> => {
    const response = await put(API_URLs.ACCOMMODATION.UPDATE.replace(':id', id), data);
    return response.data;
  }
};
