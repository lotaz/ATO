import { lazy } from 'react';

// project import
import Loadable from '../../components/Loadable';
import { ADMIN_BASE_URL, ADMIN_URLs } from '../../constants/admin-urls';
import { TRoute } from '../types';
import ManageAccountRoutes from './account';
import ManageCompanyRoutes from './company';
import ManageFacilityRoutes from './facility';
import ManageContractRoutes from './contract';
import ManageRequestRoutes from './request';
import ManagePaymentHistoryRoutes from './payment-history';

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
    ...ManageFacilityRoutes,
    ...ManageContractRoutes,
    ...ManagePaymentHistoryRoutes
  ]
};

export default AdminRoutes;
