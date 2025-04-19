import { get } from '../../helpers/axios-helper';

export interface Accommodation {
  accommodationId: string;
  accommodationName: string;
  accommodationDescription: string;
  address: string;
  phoneNumber: string;
  star: number;
  imgs: string[];
}

export const accommodationService = {
  getAccommodations: () => get<Accommodation[]>('tour-company/accommodation/get-list-accommodations')
};