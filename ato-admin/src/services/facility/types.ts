import { User } from '../../types';

export interface Facility {
  touristFacilityId: string;
  userId: string;
  touristFacilityName: string;
  address: string;
  description: string;
  contactInfor: string;
  emailTouristFacility: string;
  website: string;
  logoURL: string;
  createDate: string;
  updateTime: string | null;
  account?: User;
}

export interface CreateFacilityRequest {
  userId: string;
  touristFacilityName: string;
  address: string;
  description: string;
  contactInfor: string;
  emailTouristFacility: string;
  website: string;
  logoURL: string;
}

export interface UpdateFacilityRequest extends CreateFacilityRequest {
  touristFacilityId: string;
}
