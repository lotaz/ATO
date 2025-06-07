import { get } from '../../helpers/axios-helper';

export interface Driver {
  driverId: string;
  driverName: string;
  phoneNumber: string;
  vehicleType: number;
  imgs: string[];
}

export const driverService = {
  getDrivers: () => get<Driver[]>('tour-company/driver/get-list-drivers'),
  getAvailableDrivers: (packageId: string) => get<Driver[]>('tour-company/driver/available/' + packageId),
  getAllAvailableDrivers: () => get<Driver[]>('tour-company/driver/available')
};
