export enum VehicleType {
  CAR_4 = 0,
  CAR_7 = 1,
  CAR_16 = 2,
  CAR_29 = 3,
  CAR_45 = 4,
  SLEEPER_BUS_SINGLE = 5,
  SLEEPER_BUS_COUPLE = 6,
  FLY = 7
}

export interface Driver {
  driverId: string;
  driverName: string;
  phoneNumber: string;
  vehicleType: VehicleType;
  imgs?: string[];
  tourCompanyId: string;
}

export interface CreateDriverRequest {
  driverName: string;
  phoneNumber: string;
  vehicleType: VehicleType;
  imgs?: string[];
}

export interface UpdateDriverRequest extends CreateDriverRequest {
  driverId: string;
}
