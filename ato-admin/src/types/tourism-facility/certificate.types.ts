export interface Certificate {
  certificationId: number;
  productId: number;
  certificationName: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate: string | null;
  certificationDetails: string;
  statusApproval: boolean;
  replyRequest: string | null;
  facilityId: number | null;
  updatedDate: string | null;
  imgs: string[] | null;
  uploadedDate: string;
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
