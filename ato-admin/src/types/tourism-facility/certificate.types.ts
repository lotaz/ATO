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
