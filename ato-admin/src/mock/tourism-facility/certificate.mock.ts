import dayjs from 'dayjs';
import { Certificate } from '../../types/tourism-facility/certificate.types';

export const mockCertificates: Certificate[] = [
  {
    certificationId: 1,
    productId: 1,
    certificationName: 'Chứng nhận VietGAP',
    issuingOrganization: 'Cục Quản lý Chất lượng Nông Lâm sản và Thủy sản',
    issueDate: dayjs().subtract(6, 'month').toISOString(),
    expiryDate: dayjs().add(6, 'month').toISOString(),
    certificationDetails: 'Chứng nhận sản phẩm đạt tiêu chuẩn VietGAP trong sản xuất nông nghiệp',
    statusApproval: true,
    replyRequest: 'Đã xác nhận đầy đủ hồ sơ',
    facilityId: 1,
    updatedDate: null,
    imgs: [
      'https://duoclieumientay.com/wp-content/uploads/2023/05/3856cd30a62c7872213d-729x1024.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQybMWbt1eWLbxXsocH9sYBoIJM2Hmh-UJALw&s'
    ],
    uploadedDate: dayjs().subtract(6, 'month').toISOString()
  },
  {
    certificationId: 2,
    productId: 1,
    certificationName: 'Chứng nhận HACCP',
    issuingOrganization: 'Tổ chức Chứng nhận HACCP Việt Nam',
    issueDate: dayjs().subtract(3, 'month').toISOString(),
    expiryDate: dayjs().add(9, 'month').toISOString(),
    certificationDetails: 'Chứng nhận hệ thống phân tích mối nguy và điểm kiểm soát tới hạn',
    statusApproval: true,
    replyRequest: 'Hồ sơ đạt yêu cầu',
    facilityId: 1,
    updatedDate: dayjs().subtract(1, 'month').toISOString(),
    imgs: ['https://file.hstatic.net/200000685015/file/412757494_344144151708207_682351_868e2140777c4b398d82eb4fd2bd9c49_grande.png'],
    uploadedDate: dayjs().subtract(3, 'month').toISOString()
  },
  {
    certificationId: 3,
    productId: 2,
    certificationName: 'Chứng nhận ISO 22000',
    issuingOrganization: 'Tổ chức Chứng nhận Quốc tế',
    issueDate: dayjs().subtract(2, 'month').toISOString(),
    expiryDate: dayjs().add(10, 'month').toISOString(),
    certificationDetails: 'Chứng nhận hệ thống quản lý an toàn thực phẩm',
    statusApproval: false,
    replyRequest: 'Đang chờ xác minh thông tin',
    facilityId: 2,
    updatedDate: null,
    imgs: ['https://duoclieumientay.com/wp-content/uploads/2023/05/GCN_4_SAO_DINH_LANG.jpg'],
    uploadedDate: dayjs().subtract(2, 'month').toISOString()
  },
  {
    certificationId: 4,
    productId: 1,
    certificationName: 'Chứng nhận Hữu cơ',
    issuingOrganization: 'Tổ chức Chứng nhận Hữu cơ Việt Nam',
    issueDate: dayjs().subtract(1, 'month').toISOString(),
    expiryDate: dayjs().add(11, 'month').toISOString(),
    certificationDetails: 'Chứng nhận sản phẩm đạt tiêu chuẩn hữu cơ',
    statusApproval: false,
    replyRequest: null,
    facilityId: 1,
    updatedDate: null,
    imgs: [
      'https://duoclieumientay.com/wp-content/uploads/2023/05/GCN_4_SAO_DINH_LANG.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkqT-AQrutb7aQZKrpjXsd4qk7zG4QfSP8NQ&s'
    ],
    uploadedDate: dayjs().subtract(1, 'month').toISOString()
  }
];
