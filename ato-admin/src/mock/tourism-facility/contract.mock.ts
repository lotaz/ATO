import dayjs from 'dayjs';
import { Contract } from '../../types/tourism-facility/contract.types';

export const mockContracts: Contract[] = [
  {
    contractId: 1,
    companyId: 1,
    contractContent:
      'Hợp đồng hợp tác kinh doanh giữa cơ sở du lịch và công ty du lịch A. Điều khoản về chiết khấu và điều kiện hợp tác...',
    discountRate: 15.5,
    startDate: dayjs().subtract(1, 'month').toISOString(),
    endDate: dayjs().add(11, 'month').toISOString(),
    signedDate: dayjs().subtract(1, 'month').toISOString(),
    createdDate: dayjs().subtract(1, 'month').toISOString(),
    updatedDate: null,
    contractImgs: [
      'https://www.mydock365.com/hs-fs/hubfs/The%20Dos%20and%20Donts%20of%20Contract%20Amendment.webp?width=1854&height=1234&name=The%20Dos%20and%20Donts%20of%20Contract%20Amendment.webp'
    ],
    company: {
      tourCompanyId: '1',
      companynName: 'Công ty Du lịch A',
      emailCompany: 'contact@companya.com',
      website: 'www.companya.com'
    }
  },
  {
    contractId: 2,
    companyId: 2,
    contractContent: 'Hợp đồng hợp tác kinh doanh giữa cơ sở du lịch và công ty du lịch B. Chi tiết về quy trình đặt tour và thanh toán...',
    discountRate: 12.0,
    startDate: dayjs().subtract(2, 'month').toISOString(),
    endDate: dayjs().add(10, 'month').toISOString(),
    signedDate: null,
    createdDate: dayjs().subtract(2, 'month').toISOString(),
    updatedDate: null,
    contractImgs: [
      'https://www.mydock365.com/hs-fs/hubfs/The%20Dos%20and%20Donts%20of%20Contract%20Amendment.webp?width=1854&height=1234&name=The%20Dos%20and%20Donts%20of%20Contract%20Amendment.webp'
    ],
    company: {
      tourCompanyId: '2',
      companynName: 'Công ty Du lịch B',
      emailCompany: 'info@companyb.com',
      website: 'www.companyb.com'
    }
  },
  {
    contractId: 3,
    companyId: 3,
    contractContent: 'Hợp đồng hợp tác kinh doanh với công ty du lịch C. Bao gồm các điều khoản về marketing và quảng bá sản phẩm...',
    discountRate: 20.0,
    startDate: dayjs().subtract(3, 'month').toISOString(),
    endDate: dayjs().add(9, 'month').toISOString(),
    signedDate: dayjs().subtract(3, 'month').toISOString(),
    createdDate: dayjs().subtract(3, 'month').toISOString(),
    updatedDate: dayjs().subtract(1, 'day').toISOString(),
    contractImgs: [
      'https://www.mydock365.com/hs-fs/hubfs/The%20Dos%20and%20Donts%20of%20Contract%20Amendment.webp?width=1854&height=1234&name=The%20Dos%20and%20Donts%20of%20Contract%20Amendment.webp'
    ],
    company: {
      tourCompanyId: '3',
      companynName: 'Công ty Du lịch C',
      emailCompany: 'support@companyc.com',
      website: 'www.companyc.com'
    }
  }
];
