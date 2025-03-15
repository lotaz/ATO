import { API_URLs } from '../../constants/api';
import { get, post, put } from '../../helpers/axios-helper';
import { User } from '../../types';
import { Company, CreateCompanyRequest, UpdateCompanyRequest } from './types';

export const companyService = {
  getCompanies: async (): Promise<Company[]> => {
    const response = await get<Company[]>(API_URLs.COMPANY.LIST);
    return response.data;
  },

  getCompany: async (id: string): Promise<Company> => {
    const response = await get<Company>(`${API_URLs.COMPANY.GET.replace(':id', id)}`);
    return response.data;
  },

  createCompany: async (data: CreateCompanyRequest) => {
    console.log(data);
    const response = await post(API_URLs.COMPANY.CREATE, data);
    console.log(response);
    return response.data;
  },

  updateCompany: async (data: UpdateCompanyRequest): Promise<Company> => {
    const response = await put<Company>(API_URLs.COMPANY.UPDATE, data);
    return response.data;
  },
  getUnAssigedAccounts: async (): Promise<User[]> => {
    const response = await get<User[]>(API_URLs.COMPANY.UNASSIGED);
    return response.data;
  }
};
