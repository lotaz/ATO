import { DestinationType } from '../../types/tourism-company/tour-destination.types';

export const mockTouristSpots = [
  {
    id: 1,
    name: 'Vịnh Hạ Long',
    description: 'Di sản thiên nhiên thế giới với hàng nghìn hòn đảo đá vôi',
    address: 'Thành phố Hạ Long, Quảng Ninh'
  },
  {
    id: 2,
    name: 'Phố cổ Hội An',
    description: 'Phố cổ được UNESCO công nhận là di sản văn hóa thế giới',
    address: 'Thành phố Hội An, Quảng Nam'
  },
  {
    id: 3,
    name: 'Vịnh Lan Hạ',
    description: 'Vịnh đẹp với những hòn đảo đá vôi và bãi biển hoang sơ',
    address: 'Huyện Cát Hải, Hải Phòng'
  }
];

export const mockAccommodations = [
  {
    id: 1,
    name: 'Khách sạn Mường Thanh',
    description: '5 sao với đầy đủ tiện nghi cao cấp',
    address: '60 Trần Phú, Nha Trang, Khánh Hòa'
  },
  {
    id: 2,
    name: 'Resort Vinpearl',
    description: 'Khu nghỉ dưỡng 5 sao với bãi biển riêng',
    address: 'Đảo Vinpearl, Nha Trang, Khánh Hòa'
  },
  {
    id: 3,
    name: 'FLC Grand Hotel',
    description: 'Khách sạn cao cấp với view biển tuyệt đẹp',
    address: 'Quảng Ninh'
  }
];

export const mockDrivers = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    age: 35,
    phone: '0123456789',
    vehicle: 'Toyota 16 chỗ - 30A-12345',
    licenseNumber: 'B2-123456',
    experience: '10 năm'
  },
  {
    id: 2,
    name: 'Trần Văn B',
    age: 42,
    phone: '0987654321',
    vehicle: 'Hyundai 29 chỗ - 30A-54321',
    licenseNumber: 'D-234567',
    experience: '15 năm'
  },
  {
    id: 3,
    name: 'Lê Văn C',
    age: 38,
    phone: '0369852147',
    vehicle: 'Mercedes Sprinter 16 chỗ - 30A-67890',
    licenseNumber: 'B2-345678',
    experience: '12 năm'
  }
];

export const mockDestinationDetails = {
  id: 1,
  destinationType: DestinationType.TOURIST_SPOT,
  destinationId: 1,
  title: 'Vịnh Hạ Long',
  description: 'Tour tham quan vịnh Hạ Long trong 1 ngày',
  startTime: '2024-02-20T08:00:00',
  endTime: '2024-02-20T17:00:00',
  transport: {
    driverId: 1,
    driver: mockDrivers[0],
    departureTime: '2024-02-20T07:00:00',
    arrivalTime: '2024-02-20T18:00:00',
    notes: 'Đón khách tại khách sạn'
  }
};
