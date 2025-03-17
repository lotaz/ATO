export enum TransportType {
  BUS = 'BUS',
  TRAIN = 'TRAIN',
  PLANE = 'PLANE',
  BOAT = 'BOAT',
  OTHER = 'OTHER'
}

export interface Transport {
  transportId: string;
  fromDestinationId: string;
  toDestinationId: string;
  transportType: TransportType;
  departureTime: string;
  arrivalTime: string;
  notes: string | null;
}

export interface CreateTransportRequest {
  fromDestinationId: string;
  toDestinationId: string;
  transportType: TransportType;
  departureTime: string;
  arrivalTime: string;
  notes?: string;
}

export interface UpdateTransportRequest extends CreateTransportRequest {
  transportId: string;
}
