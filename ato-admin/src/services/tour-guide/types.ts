import { User } from '../../types';

export interface ITourGuide {
  id: string;
  userId: number;
  companyId: number;
  bio: string;
  languages: string[];
  expertiseArea: string;
  rating: number;
  createdDate: string;
  updatedDate?: string;
  user: User;
}

export interface ITourGuideRequest {
  userId: number;
  companyId: number;
  bio: string;
  languages: string[];
  expertiseArea: string[];
}
