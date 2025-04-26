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
  description?: string;
  price: number;
  durations: number;
  durationsType: TimeType;
  statusOperating: StatusOperating;
}

export enum TimeType {
  SECOND = 0,
  MINUTE = 1,
  HOUR = 2,
  DAY = 3,
  MONTH = 4,
  YEAR = 5
}

export enum StatusOperating {
  ACTIVE = 0,
  INACTIVE = 1
}

export enum StatusApproval {
  APPROVED = 0,
  PROCESSING = 1,
  REJECT = 2,
  UPDATE = 3
}

export interface Product_ActivityResponse {
  productId: string;
  productName: string;
}

export interface ActivityResponse {
  activityId: string;
  activityName: string;
  description?: string;
  durationInHours: number;
  location?: string;
  imgs?: string[];
  breakTimeInMinutes: number;
  startTime: string;
  endTime: string;
  createDate: string;
  updateDate?: string;
  statusApproval: StatusApproval;
  replyRequest?: string;
  products?: Product_ActivityResponse[]; // Add products field
}

export interface TourismPackageResponse {
  packageId: string;
  packageName: string;
  description?: string;
  price: number;
  durations: number;
  durationsType: TimeType;
  createDate: string;
  updateDate?: string;
  statusApproval: StatusApproval;
  replyRequest?: string;
  statusOperating: StatusOperating;
  activities?: ActivityResponse[];
  touristFacility?: TouristFacilityModel;
}

export interface TouristFacilityModel {
  touristFacilityId: number;
  touristFacilityName: string;
}
