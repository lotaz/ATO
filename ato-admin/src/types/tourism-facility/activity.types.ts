import { TimeType } from './package.types';

export interface Activity {
  activityId: number;
  name: string;
  description: string;
  durationInHours: number | null;
  location: string | null;
  approvalStatus: boolean;
  approvalContent: string | null;
  breakTimeInMinutes: number;
  packageId: number;
  createdDate: string;
  imgs: string;
  updatedDate: string | null;
}

export interface CreateActivityRequest {
  activityName: string;
  description: string;
  durationInHours: number;
  durationInHoursType: number;
  location?: string;
  imgs: string[];
  breakTimeInMinutes: number;
  breakTimeInMinutesType: number;
  startTime: Date;
  endTime: Date;
  packageId: string;
}

export interface ProductActivityRequest {
  productId: string;
}

export interface ActivityRequest {
  activityName: string;
  description?: string;
  durationInHours: number;
  durationInHoursType: TimeType;
  location?: string;
  imgs?: string[];
  breakTimeInMinutes: number;
  breakTimeInMinutesType: TimeType;
  startTime: Date;
  endTime: Date;
  packageId?: string;
  products?: ProductActivityRequest[];
}

// Make sure TimeType is imported or defined in your types
