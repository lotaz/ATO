export interface TourPackage {
  tourId: number;
  packageName: string;
  description: string;
  slot: number;
  startTime: string;
  endTime: string;
  durations: number;
  durationsType: DurationType;
  price: number;
  createdDate: string;
  updatedDate: string | null;
  companyId: number;
}

export enum DurationType {
  HOURS = 1,
  DAYS = 2,
  WEEKS = 3,
  MONTHS = 4
}

export interface CreateTourPackageRequest {
  packageName: string;
  description: string;
  slot: number;
  startTime: string;
  endTime: string;
  durations: number;
  durationsType: DurationType;
  price: number;
  companyId: number;
}

export interface UpdateTourPackageRequest extends CreateTourPackageRequest {
  tourId: number;
}
