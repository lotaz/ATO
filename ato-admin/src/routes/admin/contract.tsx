import { lazy } from 'react';
import Loadable from '../../components/Loadable';
import { ADMIN_URLs } from '../../constants/admin-urls';
import { TRouteItem } from '../types';

const List = Loadable(lazy(() => import('../../pages/admin/contract/index')));
const Create = Loadable(lazy(() => import('../../pages/admin/contract/create')));
const Update = Loadable(lazy(() => import('../../pages/admin/contract/update')));
const Details = Loadable(lazy(() => import('../../pages/admin/contract/details')));

const ManageContractRoutes: TRouteItem[] = [
  {
    path: ADMIN_URLs.CONTRACT.INDEX,
    element: <List />
  },
  {
    path: ADMIN_URLs.CONTRACT.CREATE,
    element: <Create />
  },
  {
    path: ADMIN_URLs.CONTRACT.UPDATE,
    element: <Update />
  },
  {
    path: ADMIN_URLs.CONTRACT.DETAILS,
    element: <Details />
  }
];

export default ManageContractRoutes;
