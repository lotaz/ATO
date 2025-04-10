import { get, put } from '../../helpers/axios-helper';
import { CertificationResponseCM, StatusApproval } from '../../types/content-moderator/certification.types';

const BASE_URL = '/content-moderators/product';

export const certificationService = {
  getCertifications: async (): Promise<CertificationResponseCM[]> => {
    const response = await get(`${BASE_URL}/get-certifications`);
    return response.data || [];
  },
  getCertificationDetail: async (id: string): Promise<CertificationResponseCM> => {
    const response = await get(`${BASE_URL}/get-certification/${id}`);
    return response.data;
  },
  approveCertification: async (certificateId: string, data: { statusApproval: StatusApproval; replyRequest?: string }): Promise<void> => {
    await put(`${BASE_URL}/approvel-certification/${certificateId}`, data);
  }
};
