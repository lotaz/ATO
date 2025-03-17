import dayjs from 'dayjs';
import { TourDestination, DestinationType, Driver } from '../../types/tourism-company/tour-destination.types';
import { Transport, TransportType } from '../../types/tourism-company/transport.types';

export const mockDrivers: Driver[] = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    age: 35,
    phone: '0123456789',
    vehicle: 'Toyota 16 chỗ - 30A-12345'
  },
  {
    id: 2,
    name: 'Trần Văn B',
    age: 42,
    phone: '0987654321',
    vehicle: 'Hyundai 29 chỗ - 30A-54321'
  }
];

export const mockTransports: Transport[] = [
  {
    transportId: '1',
    fromDestinationId: '1',
    toDestinationId: '2',
    transportType: TransportType.BUS,
    departureTime: dayjs().add(1, 'day').hour(10).minute(0).second(0).toISOString(),
    arrivalTime: dayjs().add(1, 'day').hour(12).minute(0).second(0).toISOString(),
    notes: 'Xe bus cao cấp 45 chỗ, có điều hòa',
    driver: mockDrivers[0]
  },
  {
    transportId: '2',
    fromDestinationId: '2',
    toDestinationId: '3',
    transportType: TransportType.TRAIN,
    departureTime: dayjs().add(1, 'day').hour(14).minute(0).second(0).toISOString(),
    arrivalTime: dayjs().add(1, 'day').hour(16).minute(0).second(0).toISOString(),
    notes: 'Tàu hỏa khoang VIP',
    driver: mockDrivers[1]
  }
];

export const mockTouristSpots = [
  {
    id: 1,
    name: 'Vườn rau sạch Đà Lạt',
    description: 'Khu vườn rau sạch với nhiều loại rau củ theo mùa',
    address: 'Đà Lạt, Lâm Đồng'
  },
  {
    id: 2,
    name: 'Làng rau Trại Mát',
    description: 'Làng rau truyền thống của Đà Lạt',
    address: 'Trại Mát, Đà Lạt'
  }
];

export const mockAccommodations = [
  {
    id: 1,
    name: 'Khách sạn Mường Thanh Đà Lạt',
    description: 'Khách sạn 4 sao với view thành phố',
    address: 'Đà Lạt, Lâm Đồng'
  },
  {
    id: 2,
    name: 'Ana Mandara Villas',
    description: 'Resort cao cấp phong cách Pháp',
    address: 'Đà Lạt, Lâm Đồng'
  }
];

export const mockTourDestinations: TourDestination[] = [
  {
    tourDestinationsId: 1,
    tourId: 1,
    destinationType: DestinationType.TOURIST_SPOT,
    destinationId: 1,
    title: 'Tham quan vườn rau sạch',
    description: 'Khám phá quy trình trồng và chăm sóc rau sạch.',
    createDate: dayjs().subtract(1, 'month').toISOString(),
    updateDate: dayjs().toISOString(),
    tourismPackageId: 1,
    startTime: dayjs().add(1, 'day').hour(8).minute(0).second(0).toISOString(),
    endTime: dayjs().add(1, 'day').hour(10).minute(0).second(0).toISOString(),
    transport: mockTransports[0]
  },
  {
    tourDestinationsId: 2,
    tourId: 1,
    destinationType: DestinationType.ACCOMMODATION,
    destinationId: 1,
    title: 'Khách sạn Mường Thanh Đà Lạt',
    description: 'Nghỉ ngơi tại khách sạn 4 sao',
    createDate: dayjs().subtract(1, 'month').toISOString(),
    updateDate: dayjs().toISOString(),
    tourismPackageId: 1,
    startTime: dayjs().add(1, 'day').hour(12).minute(0).second(0).toISOString(),
    endTime: dayjs().add(1, 'day').hour(14).minute(0).second(0).toISOString(),
    transport: mockTransports[1]
  }
];
