import { get, put } from '../../helpers/axios-helper';
import { StatusApproval } from '../../types/content-moderator/certification.types';
import { AgriculturalTourPackageResponse } from '../../types/tourism-company/agricultural-tour.types';

const API_URL = '/content-moderators/package';

export const packageService = {
  getPackages: () => get<AgriculturalTourPackageResponse[]>(`${API_URL}`),

  getPackageById: (id: string) => get<AgriculturalTourPackageResponse>(`${API_URL}/${id}`),

  processApproval: (id: string, status: StatusApproval) => put<any>(`${API_URL}/process-approval/${id}/${status}`, {})
};
