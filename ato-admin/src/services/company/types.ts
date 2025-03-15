import { User } from '../../types';

export interface Company {
  tourCompanyId: string;
  userId: string;
  companynName: string;
  companyDescription: string;
  addressCompany: string;
  emailCompany: string;
  website: string;
  logoURL: string;
  createDate: string;
  updateTime: string | null;
  account?: User;
}

export interface CreateCompanyRequest {
  userId: string;
  companynName: string;
  companyDescription: string;
  addressCompany: string;
  emailCompany: string;
  website: string;
  logoURL: string;
}

export interface UpdateCompanyRequest extends CreateCompanyRequest {
  tourCompanyId: string;
}
