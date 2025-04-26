export interface Contract {
  contractId: string;
  contractContent?: string;
  discountRate?: number;
  startDate?: Date;
  endDate?: Date;
  signedDate?: Date;
  status?: boolean;
  requestReSignContract?: boolean;
  createDate?: Date;
  updateDate?: Date;
  tourCompanyId?: string;
  touristFacilityId?: string;
  tourCompany?: TourCompnay;
  touristFacility?: TouristFacility;
  signingStatus: SigningStatus;
}

interface TouristFacility {
  touristFacilityId: string;
  touristFacilityName: string;
  description: string;
  emailTouristFacility: string;
  website: string;
}

interface TourCompnay {
  tourCompanyId: string;
  userId: string;
  companynName: string;
  companyDescription: string;
  addressCompany: string;
  emailCompany: string;
  website: string;
  logoURL: string;
  createDate: string;
}

export enum SigningStatus {
  New = 0,
  Signed = 1,
  RequestExtend = 2,
  ApprovedExtend = 3,
  AboutToEnd = 4,
  Ended = 5,
  Rejected = 6
}

export interface CreateContractRequest {
  contractContent?: string;
  discountRate?: number;
  startDate?: Date;
  endDate?: Date;
  signedDate?: Date;
  tourCompanyId?: string;
  touristFacilityId?: string;
}

export interface UpdateContractRequest extends CreateContractRequest {
  contractId: string;
}
