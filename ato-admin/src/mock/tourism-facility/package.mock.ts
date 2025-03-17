import dayjs from 'dayjs';
import { TourPackage } from '../../types/tourism-facility/package.types';

export const mockPackages: TourPackage[] = [
  {
    packageId: 1,
    facilityId: 101,
    packageName: 'Tour Hạ Long 3 ngày 2 đêm',
    description:
      'Khám phá vịnh Hạ Long với tour trọn gói bao gồm du thuyền, khách sạn 4 sao và các hoạt động thú vị như chèo kayak, thăm hang động.',
    price: 3500000,
    durations: 3,
    createdDate: dayjs().subtract(30, 'day').toISOString(),
    updatedDate: dayjs().subtract(15, 'day').toISOString(),
    tourCompanyId: 201
  },
  {
    packageId: 2,
    facilityId: 102,
    packageName: 'Tour Sapa - Fansipan 2 ngày',
    description: "Chinh phục đỉnh Fansipan, thăm bản Cat Cat, trải nghiệm văn hóa dân tộc H'Mong với homestay đặc sắc.",
    price: 2800000,
    durations: 2,
    createdDate: dayjs().subtract(45, 'day').toISOString(),
    updatedDate: null,
    tourCompanyId: 202
  },
  {
    packageId: 3,
    facilityId: 103,
    packageName: 'Tour Phú Quốc 4 ngày 3 đêm',
    description: 'Tận hưởng biển xanh Phú Quốc với resort 5 sao, tour câu cá, lặn biển và thăm vườn tiêu.',
    price: 5900000,
    durations: 4,
    createdDate: dayjs().subtract(20, 'day').toISOString(),
    updatedDate: dayjs().subtract(5, 'day').toISOString(),
    tourCompanyId: 203
  },
  {
    packageId: 4,
    facilityId: 104,
    packageName: 'Tour Đà Lạt 3 ngày',
    description: 'Khám phá thành phố ngàn hoa với các điểm tham quan nổi tiếng: vườn hoa, thác Datanla, và chợ đêm Đà Lạt.',
    price: 2500000,
    durations: 3,
    createdDate: dayjs().subtract(60, 'day').toISOString(),
    updatedDate: dayjs().subtract(2, 'day').toISOString(),
    tourCompanyId: 204
  },
  {
    packageId: 5,
    facilityId: 105,
    packageName: 'Tour Hội An - Đà Nẵng 5 ngày',
    description: 'Khám phá di sản văn hóa Hội An, tắm biển Đà Nẵng, thăm Bà Nà Hills và cầu Vàng nổi tiếng.',
    price: 6500000,
    durations: 5,
    createdDate: dayjs().subtract(15, 'day').toISOString(),
    updatedDate: null,
    tourCompanyId: 205
  }
];
