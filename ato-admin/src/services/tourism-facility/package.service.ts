import { get, post, put } from '../../helpers/axios-helper';
import { TourismPackageResponse, CreatePackageRequest } from '../../types/tourism-facility/package.types';

const PACKAGE_API = '/afto/tourism-package';

export const packageService = {
  getPackages: () => get<TourismPackageResponse[]>(PACKAGE_API + '/list-tourism-package'),

  getPackage: (id: string) => get<TourismPackageResponse>(`${PACKAGE_API}/get-tourism-package/${id}`),

  createPackage: (data: CreatePackageRequest) => post<TourismPackageResponse>(PACKAGE_API + '/create-tourism-package', data),

  updatePackage: (id: string, data: CreatePackageRequest) =>
    put<TourismPackageResponse>(`${PACKAGE_API}/update-tourism-package/${id}`, data),

  getPackageActivities: (packageId: string) => get<TourismPackageResponse>(`${PACKAGE_API}/${packageId}/activities`),

  approvePackage: (packageId: string) => put<TourismPackageResponse>(`${PACKAGE_API}/${packageId}/approve`, {}),

  rejectPackage: (packageId: string, replyRequest: string) =>
    put<TourismPackageResponse>(`${PACKAGE_API}/${packageId}/reject`, { replyRequest }),

  updatePackageStatus: (packageId: string, statusOperating: number) =>
    put<TourismPackageResponse>(`${PACKAGE_API}/${packageId}/status`, { statusOperating })
};
