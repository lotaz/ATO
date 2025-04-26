import { get } from '../../helpers/axios-helper';
import { AgriculturalTourPackageResponse } from '../../types/tourism-company/agricultural-tour.types';

const API_URL = '/tour-guide/tour';

export const tourTrackingService = {
  getPackages: () => get<AgriculturalTourPackageResponse[]>(`${API_URL}`),
  getPackageById: (id: string) => get<AgriculturalTourPackageResponse>(`${API_URL}/${id}`)
};
