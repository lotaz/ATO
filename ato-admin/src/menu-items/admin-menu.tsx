// assets
import {
  ApiOutlined,
  CarOutlined,
  DashboardOutlined,
  MessageOutlined,
  PaperClipOutlined,
  ProductOutlined,
  ProfileOutlined
} from '@ant-design/icons';
import { ADMIN_URLs } from '../constants/admin-urls';
import { TMenu } from './types';

const adminMenu: TMenu = {
  id: 'pages',
  title: 'Admin Pages',
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
      icon: ProfileOutlined
    },
    {
      id: 'tour',
      title: 'Tour',
      type: 'item',
      url: '/tour',
      icon: CarOutlined
    },
    {
      id: 'news',
      title: 'Tin tức',
      type: 'item',
      url: '/news',
      icon: PaperClipOutlined
    },

    {
      id: 'ocop',
      title: 'Sản phẩm OCOP',
      type: 'item',
      url: '/ocop',
      icon: ProductOutlined
    },
    {
      id: 'partner',
      title: 'Đối tác',
      type: 'item',
      url: '/partner',
      icon: ApiOutlined
    },
    {
      id: 'feedback',
      title: 'Phản hồi',
      type: 'item',
      url: '/feedback',
      icon: MessageOutlined
    }
  ]
};

export default adminMenu;
