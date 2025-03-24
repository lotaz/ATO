import { CreateDriverRequest, Driver, UpdateDriverRequest } from '../../types/tourism-company/driver.types';
import { API_URLs } from '../../constants/api';
import { get, post, put } from '../../helpers/axios-helper';

export const driverService = {
  getDrivers: async (): Promise<Driver[]> => {
    const response = await get(API_URLs.COMPANY.DRIVER.LIST);
    return response.data;
  },

  getDriverById: async (id: string): Promise<Driver> => {
    const response = await get(API_URLs.COMPANY.DRIVER.GET.replace(':id', id));
    return response.data;
  },

  createDriver: async (data: CreateDriverRequest): Promise<Driver> => {
    const response = await post(API_URLs.COMPANY.DRIVER.CREATE, data);
    return response.data;
  },

  updateDriver: async (id: string, data: UpdateDriverRequest): Promise<Driver> => {
    const response = await put(API_URLs.COMPANY.DRIVER.UPDATE.replace(':id', id), data);
    return response.data;
  }
};
