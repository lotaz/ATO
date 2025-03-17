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
  name: string;
  description: string;
  durationInHours?: number;
  location?: string;
  breakTimeInMinutes: number;
  packageId: number;
  imgs: string;
}