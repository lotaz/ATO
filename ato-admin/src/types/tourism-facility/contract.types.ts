import { Company } from '../../services/company/types';

export interface Contract {
  contractId: number;
  companyId: number;
  contractContent: string;
  discountRate: number;
  startDate: string;
  endDate: string;
  signedDate: string | null;
  createdDate: string;
  updatedDate: string | null;
  contractImgs: string[] | null;
  company?: Company;
}

export interface CreateContractRequest {
  companyId: number;
  contractContent: string;
  discountRate: number;
  startDate: string;
  endDate: string;
  signedDate?: string;
  contractImgs?: string[];
}

export interface UpdateContractRequest extends CreateContractRequest {
  contractId: number;
}