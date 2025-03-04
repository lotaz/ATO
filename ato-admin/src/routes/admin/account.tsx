import { lazy } from 'react';
import Loadable from '../../components/Loadable';
import { ADMIN_URLs } from '../../constants/admin-urls';
import { TRouteItem } from '../types';

const ListAccount = Loadable(lazy(() => import('../../pages/admin/account/index')));
const CreateAccount = Loadable(lazy(() => import('../../pages/admin/account/create')));
const UpdateAccount = Loadable(lazy(() => import('../../pages/admin/account/update')));
const DetailsAccount = Loadable(lazy(() => import('../../pages/admin/account/details')));

const ManageAccountRoutes: TRouteItem[] = [
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
];

export default ManageAccountRoutes;
