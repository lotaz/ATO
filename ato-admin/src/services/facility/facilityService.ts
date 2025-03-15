import { API_URLs } from '../../constants/api';
import { get, post, put } from '../../helpers/axios-helper';
import { User } from '../../types';
import { Facility, CreateFacilityRequest, UpdateFacilityRequest } from './types';

export const facilityService = {
  getCompanies: async (): Promise<Facility[]> => {
    const response = await get<Facility[]>(API_URLs.FACILITY.LIST);
    return response.data;
  },

  getCompany: async (id: string): Promise<Facility> => {
    const response = await get<Facility>(`${API_URLs.FACILITY.GET.replace(':id', id)}`);
    return response.data;
  },

  createCompany: async (data: CreateFacilityRequest) => {
    console.log(data);
    const response = await post(API_URLs.FACILITY.CREATE, data);
    console.log(response);
    return response.data;
  },

  updateCompany: async (data: UpdateFacilityRequest): Promise<Facility> => {
    const response = await put<Facility>(API_URLs.FACILITY.UPDATE, data);
    return response.data;
  },
  getUnAssigedAccounts: async (): Promise<User[]> => {
    const response = await get<User[]>(API_URLs.FACILITY.UNASSIGED);
    return response.data;
  }
};
