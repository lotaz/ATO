import dayjs from 'dayjs';
import { DurationType, TourPackage } from '../../types/tourism-company/tour-package.types';

export const mockTourPackages: TourPackage[] = [
  {
    tourId: 1,
    packageName: 'Trải nghiệm làm nông dân 1 ngày',
    description: 'Khám phá cuộc sống nông trại, trồng rau và chăm sóc vật nuôi. Bao gồm bữa trưa với các món ăn đặc sản địa phương.',
    slot: 20,
    startTime: dayjs().add(1, 'day').hour(8).minute(0).second(0).toISOString(),
    endTime: dayjs().add(1, 'day').hour(17).minute(0).second(0).toISOString(),
    durations: 1,
    durationsType: DurationType.DAYS,
    price: 500000,
    createdDate: dayjs().subtract(1, 'month').toISOString(),
    updatedDate: null,
    companyId: 1
  },
  {
    tourId: 2,
    packageName: 'Tour học làm nông 2 ngày 1 đêm',
    description: 'Chương trình học làm nông chuyên sâu, bao gồm: kỹ thuật trồng rau sạch, chăm sóc cây ăn quả, và quy trình thu hoạch.',
    slot: 15,
    startTime: dayjs().add(2, 'day').hour(7).minute(30).second(0).toISOString(),
    endTime: dayjs().add(3, 'day').hour(16).minute(30).second(0).toISOString(),
    durations: 2,
    durationsType: DurationType.DAYS,
    price: 1200000,
    createdDate: dayjs().subtract(2, 'week').toISOString(),
    updatedDate: dayjs().subtract(1, 'day').toISOString(),
    companyId: 1
  },
  {
    tourId: 3,
    packageName: 'Khám phá vườn cây ăn trái 4 giờ',
    description: 'Tham quan vườn cây ăn trái, tìm hiểu quy trình chăm sóc và thu hoạch. Được thưởng thức trái cây tươi tại vườn.',
    slot: 30,
    startTime: dayjs().add(3, 'day').hour(8).minute(0).second(0).toISOString(),
    endTime: dayjs().add(3, 'day').hour(12).minute(0).second(0).toISOString(),
    durations: 4,
    durationsType: DurationType.HOURS,
    price: 300000,
    createdDate: dayjs().subtract(1, 'week').toISOString(),
    updatedDate: null,
    companyId: 2
  },
  {
    tourId: 4,
    packageName: 'Tuần lễ trải nghiệm nông trại',
    description: 'Chương trình học tập và trải nghiệm toàn diện về nông nghiệp, từ trồng trọt đến chăn nuôi. Bao gồm chỗ ở và các bữa ăn.',
    slot: 10,
    startTime: dayjs().add(1, 'week').hour(14).minute(0).second(0).toISOString(),
    endTime: dayjs().add(2, 'week').hour(12).minute(0).second(0).toISOString(),
    durations: 1,
    durationsType: DurationType.WEEKS,
    price: 5000000,
    createdDate: dayjs().subtract(3, 'day').toISOString(),
    updatedDate: null,
    companyId: 2
  }
];
