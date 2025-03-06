import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import { AUTHEN_URLs } from '../constants/authen-url';
import MinimalLayout from '../layout/MinimalLayout';

// render - login
const AuthLogin = Loadable(lazy(() => import('../pages/authentication/login')));
const AuthRegister = Loadable(lazy(() => import('../pages/authentication/register')));

// ==============================|| AUTH ROUTING ||============================== //

const AuthenRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: AUTHEN_URLs.LOGIN,
      element: <AuthLogin />
    },
    {
      path: AUTHEN_URLs.REGISTER,
      element: <AuthRegister />
    }
  ]
};

export default AuthenRoutes;
