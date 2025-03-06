import { lazy } from 'react';
import Loadable from '../../components/Loadable';
import { ADMIN_URLs } from '../../constants/admin-urls';
import { TRouteItem } from '../types';

const List = Loadable(lazy(() => import('../../pages/admin/company/index')));
const Create = Loadable(lazy(() => import('../../pages/admin/company/create')));
const Update = Loadable(lazy(() => import('../../pages/admin/company/update')));
const Details = Loadable(lazy(() => import('../../pages/admin/company/details')));

const ManageCompanyRoutes: TRouteItem[] = [
  {
    path: ADMIN_URLs.COMPANY.INDEX,
    element: <List />
  },
  {
    path: ADMIN_URLs.COMPANY.CREATE,
    element: <Create />
  },
  {
    path: ADMIN_URLs.COMPANY.UPDATE,
    element: <Update />
  },
  {
    path: ADMIN_URLs.COMPANY.DETAILS,
    element: <Details />
  }
];

export default ManageCompanyRoutes;
