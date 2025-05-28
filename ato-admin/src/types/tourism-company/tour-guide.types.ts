export interface TourGuideRequest {
  bio?: string;
  languages?: string;
  expertiseArea?: string;
  rating: number;
  account?: {
    userName: string;
    email: string;
    phoneNumber: string;
    fullname: string;
    gender: boolean;
    avatarURL?: string;
    dob: string;
  };
}

export interface TourGuideResponse {
  guideId: string;
  tourCompanyId: string;
  userId: string;
  bio?: string;
  languages?: string;
  expertiseArea?: string;
  rating: number;
  createDate: string;
  updateDate?: string;
  isAvailable?: boolean;
  message?: string;
  account?: {
    id: string;
    email?: string;
    userName?: string;
    phoneNumber?: string;
    fullname?: string;
    gender?: boolean;
    avatarURL?: string;
    dob?: string;
    isAccountActive: boolean;
  };
}
