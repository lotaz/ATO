// assets
import {
  CarOutlined,
  DashboardOutlined,
  MailOutlined,
  MessageOutlined,
  MoneyCollectOutlined,
  ProfileOutlined,
  SettingOutlined,
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
      id: 'company',
      title: 'Quản lý công ty tour',
      type: 'item',
      url: ADMIN_URLs.COMPANY.INDEX,
      icon: CarOutlined,
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
      icon: CarOutlined,
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
    {
      id: 'request',
      title: 'Quản lý yêu cầu',
      type: 'item',
      url: ADMIN_URLs.REQUEST.INDEX,
      icon: MessageOutlined,
      subItems: [
        {
          id: 'reply-request',
          title: 'Phản hồi yêu cầu',
          type: 'item',
          url: ADMIN_URLs.REQUEST.REPLY,
          icon: ProfileOutlined
        }
      ]
    },
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
    }
  ]
};

export default adminMenu;
