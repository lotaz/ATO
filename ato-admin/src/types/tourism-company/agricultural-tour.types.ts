import { TouristFacility } from '../../types';
import { Activity } from '../tourism-facility/activity.types';
import { StatusOperating, TimeType } from '../tourism-facility/package.types';
import { VehicleType } from './driver.types';
import { TourDestination } from './tour-destination.types';

export interface AgriculturalTourPackageResponse {
  tourId: string;
  packageName: string;
  description?: string;
  imgs?: string[];
  slot: number;
  priceOfAdults: number;
  priceOfChildren: number;
  childTicketAge: string;
  startTime: Date;
  endTime: Date;
  durations: number;
  durationsType: TimeType;
  createDate: Date;
  updateDate?: Date;
  tourDestinations?: AgriculturalTourPackageDestinationResponse[];
  tourGuides?: AgriculturalTourPackageGuideResponse[];
}

export interface AgriculturalTourPackageDestinationResponse {
  tourDestinationId: string;
  title: string;
  description?: string;
  createDate: Date;
  updateDate?: Date;
  startTime: Date;
  endTime: Date;
  checkInDate?: Date;
  checkOutDate?: Date;
  visitOrder: number;
  typeActivity: TypeActivity;
  statusApproval: StatusApproval;
  replyRequest?: string;
  tourismPackage?: TourismPackage;
  driver?: DriverResponse;
  accommodation?: AccommodationResponse;
  activity?: AgriculturalTourPackageDestinationActivityResponse;
  tourGuides?: AgriculturalTourPackageGuideResponse[];
}

export interface AgriculturalTourPackageGuideResponse {
  guideId: string;
  userId: string;
  bio?: string;
  languages?: string;
  expertiseArea?: string;
  rating: number;
  account?: TourGuideAccountResponse;
}

export interface AgriculturalTourPackageDestinationActivityResponse {
  activityId: string;
  activityName: string;
  description?: string;
  durationInHours: number;
  location?: string;
  imgs?: string[];
  breakTimeInMinutes: number;
  startTime: Date;
  endTime: Date;
}

export interface TourGuideAccountResponse {
  userId: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  avatarURL?: string;
}

export interface DriverResponse {
  driverId: string;
  driverName: string;
  phoneNumber: string;
  vehicleType: VehicleType;
  imgs?: string[];
}

export interface AccommodationResponse {
  accommodationId: string;
  accommodationName: string;
  accommodationDescription?: string;
  address: string;
  phoneNumber: string;
  star?: number;
  imgs?: string[];
}

export interface TourismPackage {
  packageId: string;
  touristFacilityId: string;
  packageName: string;
  description?: string;
  price: number;
  durations: number;
  durationsType: TimeType;
  createDate: Date;
  updateDate?: Date;
  statusApproval: StatusApproval;
  replyRequest?: string;
  statusOperating: StatusOperating;
  touristFacility?: TouristFacility;
  activities?: Activity[];
  tourDestinations?: TourDestination[];
}

export enum TypeActivity {
  Accommodation = 0,
  Activity = 1,
  Transportation = 2
}

export enum StatusApproval {
  Pending = 0,
  Approved = 1,
  Rejected = 2
}
