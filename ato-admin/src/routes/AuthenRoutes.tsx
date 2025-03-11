import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import { AUTHEN_URLs } from '../constants/authen-url';
import MinimalLayout from '../layout/MinimalLayout';
import ForgotPassword from '../pages/authentication/forgot-password';
import VerifyOTP from '../pages/authentication/verify-otp';
import ChangePassword from '../pages/authentication/change-password';

// render - login
const AuthLogin = Loadable(lazy(() => import('../pages/authentication/login')));
const AuthRegister = Loadable(lazy(() => import('../pages/authentication/register')));
const SignOut = Loadable(lazy(() => import('../pages/authentication/sign-out')));

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
    },
    {
      path: AUTHEN_URLs.FORGOT_PASSWORD,
      element: <ForgotPassword />
    },
    {
      path: AUTHEN_URLs.SIGN_OUT,
      element: <SignOut />
    },
    {
      path: AUTHEN_URLs.VERIFY_OTP,
      element: <VerifyOTP />
    },
    {
      path: AUTHEN_URLs.CHANGE_PASSWORD,
      element: <ChangePassword />
    }
  ]
};

export default AuthenRoutes;
