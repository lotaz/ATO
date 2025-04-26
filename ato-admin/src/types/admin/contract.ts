

export interface Contract {
  contractId: number;
  contractContent?: string;
  discountRate?: number;
  startDate?: Date;
  endDate?: Date;
  signedDate?: Date;
  status?: boolean;
  createDate?: Date;
  updateDate?: Date;
  tourCompanyId?: string;
  touristFacilityId?: string;
  tourCompany?: TourCompany;
  touristFacility?: TouristFacility;
}
export interface TourCompany {
    tourCompanyId: string;
    companynName: string;
    companyDescription?: string;
    addressCompany?: string;
    emailCompany?: string;
    website?: string;
    logoURL?: string;
  }
  export interface TouristFacility {
    touristFacilityId: string;
    touristFacilityName: string;
    address?: string;
    description?: string;
    contactInfor?: string;
    emailTouristFacility?: string;
    website?: string;
    logoURL?: string;
  }