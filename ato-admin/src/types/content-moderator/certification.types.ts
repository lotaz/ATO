export enum StatusApproval {
  Approved = 0,
  Processing = 1,
  Reject = 2,
  Update = 3
}

export enum UnitProduct {
  Kg = 0,
  g = 1,
  mg = 2,
  l = 3,
  ml = 4
}

export interface TouristFacilityDTO {
  touristFacilityId: string;
  touristFacilityName: string;
}

export interface ProductDTO {
  productId: string;
  productName: string;
  imgs: string[];
  description?: string;
  additional?: string;
  nutritionType?: string;
  age?: string;
  ingredient?: string;
  volume?: string;
  origin?: string;
  manufacturer?: string;
  addressManufacturer?: string;
  unitProduct?: UnitProduct;
  productCategory: number;
  createDate: string;
  updateDate?: string;
}

export interface CertificationResponseCM {
  certificationId: string;
  certificationName: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate: string;
  certificationDetails?: string;
  createDate: string;
  updateDate?: string;
  statusApproval: StatusApproval;
  replyRequest?: string;
  touristFacilityId?: string;
  touristFacility?: TouristFacilityDTO;
  productId?: string;
  product?: ProductDTO;
}

export const UnitProductLabels = {
  [UnitProduct.Kg]: 'Kilogram',
  [UnitProduct.g]: 'Gram',
  [UnitProduct.mg]: 'Miligram',
  [UnitProduct.l]: 'Lít',
  [UnitProduct.ml]: 'Mililit'
};
