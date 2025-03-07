// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';
import { TMenu } from './types';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined
};

const authentication: TMenu = {
  id: 'authentication',
  type: 'group',
  children: [
    {
      id: 'login',
      title: 'Đăng nhập',
      type: 'item',
      url: '/login',
      icon: icons.LoginOutlined,
      target: true
    },
    {
      id: 'register',
      title: 'Đăng ký',
      type: 'item',
      url: '/register',
      icon: icons.ProfileOutlined,
      target: true
    },
    {
      id: 'forgot-password',
      title: 'Quên mật khẩu',
      type: 'item',
      url: '/forgot-password',
      icon: icons.ProfileOutlined,
      target: true
    }
  ]
};

export default authentication;
