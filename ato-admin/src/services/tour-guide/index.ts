import { API_URLs } from '../../constants/api';
import { get, post, put } from '../../helpers/axios-helper';
import { TourGuideResponse } from '../../types/tourism-company/tour-guide.types';
import { ITourGuideRequest } from './types';

export const tourGuideService = {
  getTourGuides: async () => {
    const response = await get<TourGuideResponse[]>(API_URLs.TOUR_GUIDE.LIST);
    return response.data;
  },

  getTourGuideById: async (id: string) => {
    const response = await get<TourGuideResponse>(`${API_URLs.TOUR_GUIDE.DETAILS}/${id}`);
    return response.data;
  },

  createTourGuide: async (data: ITourGuideRequest) => {
    const response = await post(API_URLs.TOUR_GUIDE.CREATE, data);
    return response.data;
  },

  updateTourGuide: async (id: string, data: Partial<ITourGuideRequest>) => {
    const response = await put(`${API_URLs.TOUR_GUIDE.UPDATE}/${id}`, data);
    return response.data;
  },

  requestTourGuide: async (data: ITourGuideRequest) => {
    const response = await post(API_URLs.TOUR_GUIDE.REQUEST, data);
    return response.data;
  }
};
