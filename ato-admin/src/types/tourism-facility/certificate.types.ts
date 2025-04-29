import { TouristFacility } from '../../types';

export interface Certificate {
  certificationId: number;
  productId: number;
  certificationName: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate: string | null;
  certificationDetails: string;
  statusApproval: StatusApproval;
  replyRequest: string | null;
  facilityId: number | null;
  updatedDate: string | null;
  imgs: string[] | null;
  uploadedDate: string;
}

export interface FacilityCertification {
  certificationId: string;
  certificationName: string;
  imgs?: string[];
  issueDate: Date;
  expiryDate: Date;
  certificationDetails?: string;
  createDate: Date;
  updateDate?: Date;
  statusApproval: StatusApproval;
  replyRequest?: string;
  touristFacilityId?: string;
  touristFacility?: TouristFacility;
}

export enum StatusApproval {
  Approved = 0,
  Processing = 1,
  Reject = 2,
  Update = 3
}

export interface CreateCertificateRequest {
  productId: string;
  certificationName: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate?: string;
  certificationDetails: string;
  imgs?: string[];
}
