import { lazy } from 'react';

// project import
import Loadable from '../../components/Loadable';
import { ADMIN_BASE_URL, ADMIN_URLs } from '../../constants/admin-urls';
import ManageAccountRoutes from './account';
import ManageCompanyRoutes from './company';
import { TRoute } from '../types';
import ManageRequestRoutes from './request';
import EmailConfig from '../../pages/admin/config/email';

const Layout = Loadable(lazy(() => import('../../layout')));
const Dashboard = Loadable(lazy(() => import('../../pages/admin/dashboard/index')));

const AdminRoutes: TRoute = {
  path: ADMIN_BASE_URL,
  element: <Layout />,
  children: [
    {
      path: ADMIN_URLs.DASHBOARD,
      element: <Dashboard />
    },
    {
      path: ADMIN_URLs.CONFIG.EMAIL,
      element: <EmailConfig />
    },
    ...ManageAccountRoutes,
    ...ManageCompanyRoutes,
    ...ManageRequestRoutes
  ]
};

export default AdminRoutes;
