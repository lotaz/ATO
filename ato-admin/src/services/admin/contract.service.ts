import { get, post, put } from '../../helpers/axios-helper';
import { Contract, CreateContractRequest, UpdateContractRequest } from '../../types/admin/contract.types';
const BASE_URL = '/contract';

export const contractService = {
  getContracts: async (): Promise<Contract[]> => {
    const response = await get(BASE_URL);
    return response.data;
  },

  getContract: async (id: string): Promise<Contract> => {
    const response = await get(`${BASE_URL}/${id}`);
    return response.data;
  },

  createContract: async (data: CreateContractRequest): Promise<Contract> => {
    const response = await post(BASE_URL, data);
    return response.data;
  },

  updateContract: async (data: UpdateContractRequest): Promise<Contract> => {
    const response = await put(`${BASE_URL}/${data.contractId}`, data);
    return response.data;
  }
};
