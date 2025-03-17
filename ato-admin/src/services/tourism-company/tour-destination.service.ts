import { get, post, put } from '../../helpers/axios-helper';
import { mockTourDestinations } from '../../mock/tourism-company/tour-destination.mock';
import {
  CreateTourDestinationRequest,
  TourDestination,
  UpdateTourDestinationRequest
} from '../../types/tourism-company/tour-destination.types';

const BASE_URL = '/api/tour-destinations';

export const tourDestinationService = {
  getAll: async (tourPackageId: number): Promise<TourDestination[]> => {
    return mockTourDestinations;

    const response = await get(`${BASE_URL}?tourPackageId=${tourPackageId}`);
    return response.data;
  },

  getById: async (id: number): Promise<TourDestination> => {
    return mockTourDestinations[0];
    const response = await get(`${BASE_URL}/${id}`);
    return response.data;
  },

  create: async (data: CreateTourDestinationRequest): Promise<TourDestination> => {
    const response = await post(BASE_URL, data);
    return response.data;
  },

  update: async (data: UpdateTourDestinationRequest): Promise<TourDestination> => {
    const response = await put(`${BASE_URL}/${data.tourDestinationsId}`, data);
    return response.data;
  }
};
