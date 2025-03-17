import dayjs from 'dayjs';
import { Activity } from '../../types/tourism-facility/activity.types';

export const mockActivities: Activity[] = [
  {
    activityId: 1,
    name: 'Thăm vịnh Hạ Long',
    description: 'Du ngoạn vịnh Hạ Long bằng thuyền, khám phá các hang động tự nhiên và thưởng thức hải sản tươi sống.',
    durationInHours: 6,
    location: 'Vịnh Hạ Long, Quảng Ninh',
    approvalStatus: true,
    approvalContent: 'Hoạt động đã được phê duyệt',
    breakTimeInMinutes: 30,
    packageId: 1,
    createdDate: dayjs().subtract(5, 'day').toISOString(),
    imgs: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC7lPqXqn6QpGGTx8IRjso0dahRRuWh8F9Jg&s',
    updatedDate: null
  },
  {
    activityId: 2,
    name: 'Leo núi Fansipan',
    description: 'Chinh phục đỉnh núi cao nhất Đông Dương với hướng dẫn viên chuyên nghiệp.',
    durationInHours: 8,
    location: 'Fansipan, Sapa, Lào Cai',
    approvalStatus: true,
    approvalContent: 'Hoạt động phù hợp với tour',
    breakTimeInMinutes: 45,
    packageId: 2,
    createdDate: dayjs().subtract(10, 'day').toISOString(),
    imgs: 'https://example.com/fansipan.jpg',
    updatedDate: dayjs().subtract(2, 'day').toISOString()
  },
  {
    activityId: 3,
    name: 'Lặn biển Phú Quốc',
    description: 'Khám phá đại dương với hoạt động lặn biển, ngắm san hô và các loài cá nhiệt đới.',
    durationInHours: 4,
    location: 'Bãi Sao, Phú Quốc',
    approvalStatus: false,
    approvalContent: 'Đang chờ xác nhận an toàn',
    breakTimeInMinutes: 20,
    packageId: 3,
    createdDate: dayjs().subtract(3, 'day').toISOString(),
    imgs: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUjyVRzizqzLRorKu9mHEaMh6hbNSi-aq8vg&s',
    updatedDate: null
  },
  {
    activityId: 4,
    name: 'Thăm vườn hoa Đà Lạt',
    description: 'Tham quan vườn hoa với hàng trăm loài hoa đặc trưng của Đà Lạt.',
    durationInHours: 3,
    location: 'Vườn hoa thành phố, Đà Lạt',
    approvalStatus: true,
    approvalContent: 'Hoạt động được chấp thuận',
    breakTimeInMinutes: 15,
    packageId: 4,
    createdDate: dayjs().subtract(15, 'day').toISOString(),
    imgs: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHS8bUzdFjXOAjBo6AEoL4-qSK9fxumtpSZg&s',
    updatedDate: dayjs().subtract(1, 'day').toISOString()
  },
  {
    activityId: 5,
    name: 'Khám phá Phố cổ Hội An',
    description: 'Dạo bước trong phố cổ, thăm các di tích lịch sử và thưởng thức ẩm thực địa phương.',
    durationInHours: 5,
    location: 'Phố cổ Hội An, Quảng Nam',
    approvalStatus: true,
    approvalContent: 'Đã xác nhận lịch trình',
    breakTimeInMinutes: 25,
    packageId: 5,
    createdDate: dayjs().subtract(7, 'day').toISOString(),
    imgs: 'https://beestravel.com.vn/wp-content/uploads/2023/02/hoi-an-2-1.jpg',
    updatedDate: null
  }
];
