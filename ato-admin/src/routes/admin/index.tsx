import { lazy } from 'react';

// project import
import Loadable from '../../components/Loadable';
import { ADMIN_BASE_URL, ADMIN_URLs } from '../../constants/admin-urls';
import ManageAccountRoutes from './account';
import ManageCompanyRoutes from './company';
import { TRoute } from '../types';
import ManageRequestRoutes from './request';
import ManageFacilityRoutes from './facility';

const Layout = Loadable(lazy(() => import('../../layout')));
const Dashboard = Loadable(lazy(() => import('../../pages/admin/dashboard/index')));
const EmailConfig = Loadable(lazy(() => import('../../pages/admin/config/email')));
const VNPayConfig = Loadable(lazy(() => import('../../pages/admin/config/vnpay')));

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
    {
      path: ADMIN_URLs.CONFIG.VNPAY,
      element: <VNPayConfig />
    },
    ...ManageAccountRoutes,
    ...ManageCompanyRoutes,
    ...ManageRequestRoutes,
    ...ManageFacilityRoutes
  ]
};

export default AdminRoutes;
