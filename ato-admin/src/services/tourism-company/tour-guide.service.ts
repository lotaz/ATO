import { get, post, put } from '../../helpers/axios-helper';
import { TourGuideRequest, TourGuideResponse } from '../../types/tourism-company/tour-guide.types';

const TOUR_GUIDE_API = '/tour-company/guideteams';

export const tourGuideService = {
  getTourGuides: async () => await get<TourGuideResponse[]>(`${TOUR_GUIDE_API}/get-list-guide-teams`),
  getTourGuidesAvailable: async (packageId: string) => await get<TourGuideResponse[]>(`${TOUR_GUIDE_API}/available/${packageId}`),

  getTourGuide: async (id: string) => await get<TourGuideResponse>(`${TOUR_GUIDE_API}/get-guide-team/${id}`),

  createTourGuide: async (data: TourGuideRequest) => await post<TourGuideResponse>(`${TOUR_GUIDE_API}`, data),

  updateTourGuide: async (id: string, data: TourGuideRequest) =>
    await put<TourGuideResponse>(`${TOUR_GUIDE_API}/update-guide-team/${id}`, data)
};
