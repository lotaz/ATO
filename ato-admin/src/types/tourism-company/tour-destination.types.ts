import { Transport } from './transport.types';

export interface TourDestination {
  tourDestinationsId: number;
  tourId: number;
  title: string;
  description: string | null;
  createDate: string;
  updateDate: string;
  tourismPackageId: number;
  startTime: string;
  endTime: string;
  transport: Transport;
  destinationType: DestinationType;
  driver: Driver;
}

export interface CreateTourDestinationRequest {
  tourId: number;
  title: string;
  description: string | null;
  tourismPackageId: number;
  startTime: string;
  endTime: string;
}

export interface UpdateTourDestinationRequest extends CreateTourDestinationRequest {
  tourDestinationsId: number;
}

export enum DestinationType {
  TOURIST_SPOT = 'TOURIST_SPOT',
  ACCOMMODATION = 'ACCOMMODATION'
}

export interface Driver {
  id: number;
  name: string;
  age: number;
  phone: string;
  vehicle: string;
}
