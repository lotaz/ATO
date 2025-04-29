import { get } from '../../helpers/axios-helper';

export interface AdminDashboardData {
  updateAccommodationserCount: number;
  companyCount: number;
  facilityCount: number;
  totalOrderAmount: number;
  totalTourAmount: number;
  totalAmount: number;
  monthlyRevenues: MonthlyRevenue[];
  yearlyRevenues: YearlyRevenue[];
}

export interface MonthlyRevenue {
  year: number;
  month: number;
  totalAmount: number;
}

export interface YearlyRevenue {
  year: number;
  totalAmount: number;
}

export const dashboardService = {
  getDashboardData: () => get<AdminDashboardData>('/dashboard/admin')
};
