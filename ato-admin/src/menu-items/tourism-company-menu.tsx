// assets
import {
  BankOutlined,
  BookOutlined,
  BoxPlotOutlined,
  CarOutlined,
  DashboardOutlined,
  HistoryOutlined,
  HomeOutlined,
  MoneyCollectOutlined,
  SpotifyOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { TOURISM_COMPANY_URLs } from '../constants/tourism-company-urls';
import { TMenu } from './types';
import { CONTRACT_BASE_URL } from '../constants/contract-urls';
import { BANK_BASE_URL } from '../constants/bank-account-urls';
import { WITHDRAWAL_BASE_URL } from '../constants/withdrawal-history-urls';

const tourCompanuMenu: TMenu = {
  id: 'pages',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Trang chủ',
      type: 'item',
      url: TOURISM_COMPANY_URLs.DASHBOARD.INDEX,
      icon: DashboardOutlined
    },
    {
      id: 'tour-package',
      title: 'Quản lí tour',
      type: 'item',
      url: TOURISM_COMPANY_URLs.TOUR_PACKAGE.INDEX,
      icon: BoxPlotOutlined,
      subItems: [
        {
          id: 'create-tour-package',
          title: 'Thêm tour du lịch',
          type: 'item',
          url: TOURISM_COMPANY_URLs.TOUR_PACKAGE.CREATE,
          icon: BoxPlotOutlined
        },
        {
          id: 'view-tour-package',
          title: 'Chi tiết tour du lịch',
          type: 'item',
          url: TOURISM_COMPANY_URLs.TOUR_PACKAGE.DETAILS,
          icon: BoxPlotOutlined
        },
        {
          id: 'update-tour-package',
          title: 'Cập nhật tour du lịch',
          type: 'item',
          url: TOURISM_COMPANY_URLs.TOUR_PACKAGE.UPDATE,
          icon: BoxPlotOutlined
        }
      ]
    },
    {
      id: 'tour-guide-team',
      title: 'Quản lý hướng dẫn viên',
      type: 'item',
      url: TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.INDEX,
      icon: TeamOutlined,
      subItems: [
        {
          id: 'create-tour-guide',
          title: 'Thêm hướng dẫn viên',
          type: 'item',
          url: TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.CREATE,
          icon: TeamOutlined
        },
        {
          id: 'view-tour-guide',
          title: 'Danh sách hướng dẫn viên',
          type: 'item',
          url: TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.INDEX,
          icon: TeamOutlined
        }
      ]
    },
    {
      id: 'driver',
      title: 'Quản lý tài xế',
      type: 'item',
      url: TOURISM_COMPANY_URLs.DRIVER.INDEX,
      icon: CarOutlined,
      subItems: [
        {
          id: 'create-driver',
          title: 'Thêm tài xế',
          type: 'item',
          url: TOURISM_COMPANY_URLs.DRIVER.CREATE,
          icon: CarOutlined
        },
        {
          id: 'view-driver',
          title: 'Chi tiết tài xế',
          type: 'item',
          url: TOURISM_COMPANY_URLs.DRIVER.DETAILS,
          icon: CarOutlined
        },
        {
          id: 'update-driver',
          title: 'Cập nhật tài xế',
          type: 'item',
          url: TOURISM_COMPANY_URLs.DRIVER.UPDATE,
          icon: CarOutlined
        },
        {
          id: 'accommodation',
          title: 'Quản lý nhà nghỉ',
          type: 'item',
          url: TOURISM_COMPANY_URLs.ACCOMMODATION.INDEX,
          icon: HomeOutlined,
          subItems: [
            {
              id: 'create-accommodation',
              title: 'Thêm nhà nghỉ',
              type: 'item',
              url: TOURISM_COMPANY_URLs.ACCOMMODATION.CREATE,
              icon: HomeOutlined
            },
            {
              id: 'view-accommodation',
              title: 'Chi tiết nhà nghỉ',
              type: 'item',
              url: TOURISM_COMPANY_URLs.ACCOMMODATION.DETAILS,
              icon: HomeOutlined
            },
            {
              id: 'update-accommodation',
              title: 'Cập nhật nhà nghỉ',
              type: 'item',
              url: TOURISM_COMPANY_URLs.ACCOMMODATION.UPDATE,
              icon: HomeOutlined
            }
          ]
        }
      ]
    },
    {
      id: 'accommodation',
      title: 'Quản lý nhà nghỉ',
      type: 'item',
      url: TOURISM_COMPANY_URLs.ACCOMMODATION.INDEX,
      icon: HomeOutlined,
      subItems: [
        {
          id: 'create-accommodation',
          title: 'Thêm nhà nghỉ',
          type: 'item',
          url: TOURISM_COMPANY_URLs.ACCOMMODATION.CREATE,
          icon: HomeOutlined
        },
        {
          id: 'view-accommodation',
          title: 'Chi tiết nhà nghỉ',
          type: 'item',
          url: TOURISM_COMPANY_URLs.ACCOMMODATION.DETAILS,
          icon: HomeOutlined
        },
        {
          id: 'update-accommodation',
          title: 'Cập nhật nhà nghỉ',
          type: 'item',
          url: TOURISM_COMPANY_URLs.ACCOMMODATION.UPDATE,
          icon: HomeOutlined
        }
      ]
    },
    {
      id: 'booking',
      title: 'Quản lý đặt tour',
      type: 'item',
      url: TOURISM_COMPANY_URLs.BOOKING.INDEX,
      icon: SpotifyOutlined,
      subItems: []
    },
    {
      id: 'history-payment',
      title: 'Quản lý lịch sử thanh toán',
      type: 'item',
      url: TOURISM_COMPANY_URLs.HISTORY_PAYMENT.INDEX,
      icon: MoneyCollectOutlined,
      subItems: []
    },
    {
      id: 'contract',
      title: 'Quản lý hợp đồng',
      type: 'item',
      url: CONTRACT_BASE_URL.replace(':entity', 'company'),
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
      icon: HistoryOutlined,
      subItems: []
    }
  ]
};

export default tourCompanuMenu;
