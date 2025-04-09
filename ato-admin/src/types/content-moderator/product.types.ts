import { StatusApproval } from './certification.types';
import { ProductCategory } from '../tourism-facility/product-category.enum';
import { UnitProduct } from './certification.types';

export interface CertificationResponse {
  certificationId: string;
  certificationName: string;
  issuingOrganization: string;
  imgs?: string[];
  issueDate: string;
  expiryDate: string;
  certificationDetails?: string;
  createDate: string;
  updateDate?: string;
  statusApproval: StatusApproval;
  replyRequest?: string;
}

export interface ProductDTO_CM {
  productId: string;
  productName: string;
  imgs: string[];
  price?: number;
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
  productCategory: ProductCategory;
  createDate: string;
  updateDate?: string;
  statusApproval: StatusApproval;
  replyRequest?: string;
  touristFacilityId: string;
  touristFacility?: {
    touristFacilityId: string;
    touristFacilityName: string;
  };
  certifications?: CertificationResponse[];
}