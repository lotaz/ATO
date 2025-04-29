import { get } from '../../helpers/axios-helper';
import { TourCompanyDashboardData } from '../../types/tourism-company/dashboard.types';

export const dashboardService = {
  getDashboardData: async (): Promise<TourCompanyDashboardData> => {
    const response = await get('/dashboard/company');
    return response.data;
  }
};
