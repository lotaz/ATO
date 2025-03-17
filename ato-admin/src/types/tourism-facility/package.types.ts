export interface TourPackage {
  packageId: number;
  facilityId: number;
  packageName: string;
  description: string;
  price: number;
  durations: number;
  createdDate: string;
  updatedDate: string | null;
  tourCompanyId: number;
}

export interface CreatePackageRequest {
  packageName: string;
  description: string;
  price: number;
  durations: number;
}
