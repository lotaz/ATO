import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MinimalLayout from '../layout/MinimalLayout';
import { ADMIN_URLs } from '../constants/admin-urls';

// render - login
const AuthLogin = Loadable(lazy(() => import('../pages/authentication/login')));
const AuthRegister = Loadable(lazy(() => import('../pages/authentication/register')));

// ==============================|| AUTH ROUTING ||============================== //

const AuthenRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: ADMIN_URLs.AUTHEN.LOGIN,
      element: <AuthLogin />
    },
    {
      path: ADMIN_URLs.AUTHEN.REGISTER,
      element: <AuthRegister />
    }
  ]
};

export default AuthenRoutes;
