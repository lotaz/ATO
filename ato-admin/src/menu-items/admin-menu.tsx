// assets
import {
  BankOutlined,
  BookOutlined,
  DashboardOutlined,
  DollarCircleOutlined,
  HomeOutlined,
  MailOutlined,
  MessageOutlined,
  MoneyCollectOutlined,
  PaperClipOutlined,
  ProfileOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { ADMIN_URLs } from '../constants/admin-urls';
import { TMenu } from './types';

const adminMenu: TMenu = {
  id: 'pages',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Trang chủ',
      type: 'item',
      url: ADMIN_URLs.DASHBOARD,
      icon: DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'account',
      title: 'Quản lý người dùng',
      type: 'item',
      url: ADMIN_URLs.ACCOUNT.INDEX,
      icon: TeamOutlined,
      subItems: [
        {
          id: 'create-account',
          title: 'Thêm mới người dùng',
          type: 'item',
          url: ADMIN_URLs.ACCOUNT.CREATE,
          icon: ProfileOutlined
        },
        {
          id: 'view-account',
          title: 'Thông tin người dùng',
          type: 'item',
          url: ADMIN_URLs.ACCOUNT.DETAILS,
          icon: ProfileOutlined
        },
        {
          id: 'update-account',
          title: 'Chỉnh sửa thông tin người dùng',
          type: 'item',
          url: ADMIN_URLs.ACCOUNT.UPDATE,
          icon: ProfileOutlined
        }
      ]
    },
    {
      id: 'contract',
      title: 'Quản lý hợp đồng',
      type: 'item',
      url: ADMIN_URLs.CONTRACT.INDEX,
      icon: BookOutlined,
      subItems: [
        {
          id: 'create-contract',
          title: 'Thêm mới hợp đồng',
          type: 'item',
          url: ADMIN_URLs.CONTRACT.CREATE,
          icon: ProfileOutlined
        },
        {
          id: 'view-contract',
          title: 'Thông tin hợp đồng',
          type: 'item',
          url: ADMIN_URLs.CONTRACT.DETAILS,
          icon: ProfileOutlined
        },
        {
          id: 'update-contract',
          title: 'Chỉnh sửa thông tin hợp đồng',
          type: 'item',
          url: ADMIN_URLs.CONTRACT.UPDATE,
          icon: ProfileOutlined
        }
      ]
    },
    {
      id: 'company',
      title: 'Quản lý công ty tour',
      type: 'item',
      url: ADMIN_URLs.COMPANY.INDEX,
      icon: HomeOutlined,
      subItems: [
        {
          id: 'create-company',
          title: 'Thêm mới công ty',
          type: 'item',
          url: ADMIN_URLs.COMPANY.CREATE,
          icon: ProfileOutlined
        },
        {
          id: 'view-company',
          title: 'Thông tin công ty',
          type: 'item',
          url: ADMIN_URLs.COMPANY.DETAILS,
          icon: ProfileOutlined
        },
        {
          id: 'update-company',
          title: 'Chỉnh sửa thông tin công ty ',
          type: 'item',
          url: ADMIN_URLs.COMPANY.UPDATE,
          icon: ProfileOutlined
        }
      ]
    },
    {
      id: 'facility',
      title: 'Quản lý cơ sở du lịch',
      type: 'item',
      url: ADMIN_URLs.FACILITY.INDEX,
      icon: BankOutlined,
      subItems: [
        {
          id: 'create-facility',
          title: 'Thêm mới cơ sở du lịch',
          type: 'item',
          url: ADMIN_URLs.FACILITY.CREATE,
          icon: ProfileOutlined
        },
        {
          id: 'view-facility',
          title: 'Thông tin cơ sở du lịch',
          type: 'item',
          url: ADMIN_URLs.FACILITY.DETAILS,
          icon: ProfileOutlined
        },
        {
          id: 'update-facility',
          title: 'Chỉnh sửa thông tin cơ sở du lịch',
          type: 'item',
          url: ADMIN_URLs.FACILITY.UPDATE,
          icon: ProfileOutlined
        }
      ]
    },
    // {
    //   id: 'request',
    //   title: 'Quản lý yêu cầu',
    //   type: 'item',
    //   url: ADMIN_URLs.REQUEST.INDEX,
    //   icon: MessageOutlined,
    //   subItems: [
    //     {
    //       id: 'reply-request',
    //       title: 'Phản hồi yêu cầu',
    //       type: 'item',
    //       url: ADMIN_URLs.REQUEST.REPLY,
    //       icon: ProfileOutlined
    //     }
    //   ]
    // },
    {
      id: 'config-email',
      title: 'Cấu hình email',
      type: 'item',
      icon: MailOutlined,
      url: ADMIN_URLs.CONFIG.EMAIL
    },
    {
      id: 'config-vnpay',
      title: 'Cấu hình VNPay',
      type: 'item',
      icon: MoneyCollectOutlined,
      url: ADMIN_URLs.CONFIG.VNPAY
    },
    {
      id: 'payment-history',
      title: 'Lịch sử giải ngân',
      type: 'item',
      icon: DollarCircleOutlined,
      url: ADMIN_URLs.PAYMENTHISTORY.INDEX
    }
  ]
};

export default adminMenu;
