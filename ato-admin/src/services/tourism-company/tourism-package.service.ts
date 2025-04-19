import { get } from '../../helpers/axios-helper';
import { TimeType } from '../../types/tourism-facility/package.types';
export interface TourismPackageResponse {
  packageId: string;
  packageName: string;
  description?: string;
  price: number;
  durations: number;
  durationsType: TimeType;
  touristFacility?: TouristFacilityDTO;
  activities?: ActivityResponse[];
}
export interface TouristFacilityDTO {
  touristFacilityId: string;
  userId: string;
  touristFacilityName: string;
  address: string | null;
  description: string | null;
  contactInfor: string | null;
  phone: string | null;
  ward_name: string | null;
  district_name: string | null;
  province_name: string | null;
  ward_code: string | null;
  district_id: number | null;
  emailTouristFacility: string | null;
  website: string | null;
  logoURL: string | null;
  createDate: Date;
  updateTime: Date | null;
}

export interface ActivityResponse {
  activityId: string;
  activityName: string;
  description: string | null;
  durationInHours: number;
  location: string | null;
  imgs: string[] | null;
  breakTimeInMinutes: number;
  startTime: Date;
  endTime: Date;
  createDate: Date;
  updateDate: Date | null;
  statusApproval: number;
  replyRequest: string | null;
}

export const tourismPackageService = {
  getListTourismPackages: () => get<TourismPackageResponse[]>('tour-company/tourism-package/list-tourism-package')
};
