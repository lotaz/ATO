import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import { ADMIN_BASE_URL, ADMIN_URLs } from '../constants/admin-urls';
import { TRoute } from './types';

const Layout = Loadable(lazy(() => import('../layout')));
const Dashboard = Loadable(lazy(() => import('../pages/admin/dashboard/index')));

const ListAccount = Loadable(lazy(() => import('../pages/admin/account/index')));
const CreateAccount = Loadable(lazy(() => import('../pages/admin/account/create')));
const UpdateAccount = Loadable(lazy(() => import('../pages/admin/account/update')));
const DetailsAccount = Loadable(lazy(() => import('../pages/admin/account/details')));

const AdminRoutes: TRoute = {
  path: ADMIN_BASE_URL,
  element: <Layout />,
  children: [
    {
      path: ADMIN_URLs.DASHBOARD,
      element: <Dashboard />
    },
    {
      path: ADMIN_URLs.ACCOUNT.INDEX,
      element: <ListAccount />
    },
    {
      path: ADMIN_URLs.ACCOUNT.CREATE,
      element: <CreateAccount />
    },
    {
      path: ADMIN_URLs.ACCOUNT.UPDATE,
      element: <UpdateAccount />
    },
    {
      path: ADMIN_URLs.ACCOUNT.DETAILS,
      element: <DetailsAccount />
    }
  ]
};

export default AdminRoutes;
