import { Company } from './services/company/types';

export interface UserInfo {
  role: Role;
  name: string;
}

export type Role = 'Admin' | 'ContentModerators' | 'TourGuides' | 'TourismCompanies' | 'Tourists' | 'AgriculturalTourismFacilityOwners';

// Define the type for the 'touristFacility' object
export type TouristFacility = {
  touristFacilityId: string;
  touristFacilityName: string;
  address: string;
  description: string;
  contactInfor: string;
  emailTouristFacility: string;
  website: string;
  logoURL: string;
  createDate: string; // Use ISO string representation for date
  updateTime: string; // Use ISO string representation for date
};

// Define the main user object type that contains the above nested objects
export type User = {
  id: string; // UUID format
  userName: 'string';
  email: string;
  phoneNumber: string;
  fullname: string;
  gender: boolean; // True or false
  avatarURL: string;
  dob: string; // ISO 8601 format date string
  isAccountActive: boolean;
  roleName?: string;
  tourCompany?: Company; // Nested object of type TourCompany
  touristFacility?: TouristFacility; // Nested object of type TouristFacility
};
