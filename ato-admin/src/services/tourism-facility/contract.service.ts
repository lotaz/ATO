import { API_URLs } from '../../constants/api';
import { get, post, put } from '../../helpers/axios-helper';
import { mockContracts } from '../../mock/tourism-facility/contract.mock';
import { Contract, CreateContractRequest, UpdateContractRequest } from '../../types/tourism-facility/contract.types';

export const contractService = {
  getContracts: async (): Promise<Contract[]> => {
    return mockContracts;
    const response = await get<Contract[]>(API_URLs.FACILITY_OWNER.CONTRACT.LIST);
    return response.data;
  },

  getContract: async (id: number): Promise<Contract> => {
    return mockContracts[0];

    const response = await get<Contract>(`${API_URLs.FACILITY_OWNER.CONTRACT.GET.replace(':id', id.toString())}`);
    return response.data;
  },

  createContract: async (data: CreateContractRequest): Promise<Contract> => {
    const response = await post<Contract>(API_URLs.FACILITY_OWNER.CONTRACT.CREATE, data);
    return response.data;
  },

  updateContract: async (data: UpdateContractRequest): Promise<Contract> => {
    const response = await put<Contract>(API_URLs.FACILITY_OWNER.CONTRACT.UPDATE, data);
    return response.data;
  }
};
