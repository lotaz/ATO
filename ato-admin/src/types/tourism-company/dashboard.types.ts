export enum StatusBooking {
  Pending = 0,
  Confirmed = 1,
  Cancelled = 2,
  Completed = 3
}

export interface RecentBooking {
  bookingId: string;
  packageName: string;
  bookingDate: Date;
  totalAmount: number;
  status: StatusBooking;
}

export interface MonthlyRevenue {
  month: number;
  year: number;
  totalAmount: number;
}

export interface YearlyRevenue {
  year: number;
  totalAmount: number;
}

export interface TourCompanyDashboardData {
  tourCount: number;
  driverCount: number;
  accommodationCount: number;
  totalEarnings: number;
  recentBookings: RecentBooking[];
  monthlyRevenues: MonthlyRevenue[];
  yearlyRevenues: YearlyRevenue[];
}
