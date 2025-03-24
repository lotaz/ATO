export interface Accommodation {
  accommodationId: string;
  accommodationName: string;
  accommodationDescription?: string;
  address: string;
  phoneNumber: string;
  star?: number;
  imgs?: string[];
}

export interface CreateAccommodationRequest {
  accommodationName: string;
  accommodationDescription?: string;
  address: string;
  phoneNumber: string;
  star?: number;
  imgs?: string[];
}

export type UpdateAccommodationRequest = CreateAccommodationRequest;