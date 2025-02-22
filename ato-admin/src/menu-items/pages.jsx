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
import { URLs } from 'constants/urls';

const pages = {
  id: 'pages',
  children: [
    {
      id: 'dashboard',
      title: 'Trang chủ',
      type: 'item',
      url: URLs.DASHBOARD,
      icon: DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'account',
      title: 'Người dùng',
      type: 'item',
      url: URLs.ACCOUNT.INDEX,
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

export default pages;
