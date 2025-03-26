import { get, post, put } from '../../helpers/axios-helper';
import { AgriculturalTourPackageResponse } from '../../types/tourism-company/agricultural-tour.types';

const API_URL = '/tour-company/agricultural-tour-package';

export const agriculturalTourService = {
  getPackages: () => get<AgriculturalTourPackageResponse[]>(`${API_URL}/get-list-agricultural-tour-packages`),

  getPackageById: (id: string) => get<AgriculturalTourPackageResponse>(`${API_URL}/get-agricultural-tour-package/${id}`),

  createPackage: (data: FormData) => post<AgriculturalTourPackageResponse>(`${API_URL}/create-agricultural-tour-package`, data),

  updatePackage: (id: string, data: FormData) =>
    put<AgriculturalTourPackageResponse>(`${API_URL}/update-agricultural-tour-package/${id}`, data),

  uploadImages: (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    return post<string[]>(`${API_URL}/upload-images`, formData);
  }
};
