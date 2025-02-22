// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const authentication = {
  id: 'authentication',
  title: 'Xác thực',
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
