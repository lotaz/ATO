// assets
import {
  BankOutlined,
  BookOutlined,
  BoxPlotOutlined,
  CheckCircleOutlined,
  DashboardOutlined,
  ProductOutlined,
  ShopOutlined
} from '@ant-design/icons';
import { TOURISM_FACILITY_URLs } from '../constants/tourism-facility-urls';
import { TMenu } from './types';
import { CONTRACT_BASE_URL } from '../constants/contract-urls';
import { BANK_BASE_URL } from '../constants/bank-account-urls';
import { WITHDRAWAL_BASE_URL } from '../constants/withdrawal-history-urls';

const tourismFacilityMenu: TMenu = {
  id: 'pages',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Trang chủ',
      type: 'item',
      url: '/tourism-facility',
      icon: DashboardOutlined
    },
    {
      id: 'product',
      title: 'Quản lý sản phẩm',
      type: 'item',
      url: TOURISM_FACILITY_URLs.PRODUCT.INDEX,
      icon: ProductOutlined,
      subItems: [
        {
          id: 'create-product',
          title: 'Thêm mới sản phẩm',
          type: 'item',
          url: TOURISM_FACILITY_URLs.PRODUCT.CREATE,
          icon: ProductOutlined
        },
        {
          id: 'view-product',
          title: 'Thông tin sản phẩm',
          type: 'item',
          url: TOURISM_FACILITY_URLs.PRODUCT.DETAILS,
          icon: ProductOutlined
        },
        {
          id: 'update-product',
          title: 'Chỉnh sửa thông tin sản phẩm',
          type: 'item',
          url: TOURISM_FACILITY_URLs.PRODUCT.UPDATE,
          icon: ProductOutlined
        }
      ]
    },
    {
      id: 'package',
      title: 'Quản lý gói du lịch',
      type: 'item',
      url: TOURISM_FACILITY_URLs.PACKAGE.INDEX,
      icon: BoxPlotOutlined
    },
    {
      id: 'certificates',
      title: 'Quản lý chứng chỉ',
      type: 'item',
      url: TOURISM_FACILITY_URLs.CERTIFICATES.INDEX,
      icon: CheckCircleOutlined,
      subItems: [
        {
          id: 'create-certificates',
          title: 'Thêm mới chứng chỉ',
          type: 'item',
          url: TOURISM_FACILITY_URLs.PRODUCT.CREATE,
          icon: ProductOutlined
        },
        {
          id: 'view-certificates',
          title: 'Thông tin chứng chỉ',
          type: 'item',
          url: TOURISM_FACILITY_URLs.PRODUCT.DETAILS,
          icon: ProductOutlined
        },
        {
          id: 'update-certificates',
          title: 'Chỉnh sửa thông tin chứng chỉ',
          type: 'item',
          url: TOURISM_FACILITY_URLs.PRODUCT.UPDATE,
          icon: ProductOutlined
        }
      ]
    },
    {
      id: 'orders',
      title: 'Quản lý hóa đơn',
      type: 'item',
      url: TOURISM_FACILITY_URLs.ORDER.INDEX,
      icon: ShopOutlined
    },
    {
      id: 'history_payment_orders',
      title: 'Lịch sử thanh toán',
      type: 'item',
      url: TOURISM_FACILITY_URLs.HISTORY_PAYMENT_ORDER.INDEX,
      icon: ShopOutlined
    },
    {
      id: 'contract',
      title: 'Quản lý hợp đồng',
      type: 'item',
      url: CONTRACT_BASE_URL.replace(':entity', 'facility'),
      icon: BookOutlined,
      subItems: []
    },
    {
      id: 'bank',
      title: 'Quản lý tài khoản ngân hàng',
      type: 'item',
      url: BANK_BASE_URL,
      icon: BankOutlined,
      subItems: []
    },
    {
      id: 'withdrawal-history',
      title: 'Lịch sử giải ngân',
      type: 'item',
      url: WITHDRAWAL_BASE_URL,
      icon: BankOutlined,
      subItems: []
    }
  ]
};

export default tourismFacilityMenu;
