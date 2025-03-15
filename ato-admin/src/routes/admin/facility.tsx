import { lazy } from 'react';
import Loadable from '../../components/Loadable';
import { ADMIN_URLs } from '../../constants/admin-urls';
import { TRouteItem } from '../types';

const List = Loadable(lazy(() => import('../../pages/admin/facility/index')));
const Create = Loadable(lazy(() => import('../../pages/admin/facility/create')));
const Update = Loadable(lazy(() => import('../../pages/admin/facility/update')));
const Details = Loadable(lazy(() => import('../../pages/admin/facility/details')));

const ManageFacilityRoutes: TRouteItem[] = [
  {
    path: ADMIN_URLs.FACILITY.INDEX,
    element: <List />
  },
  {
    path: ADMIN_URLs.FACILITY.CREATE,
    element: <Create />
  },
  {
    path: ADMIN_URLs.FACILITY.UPDATE,
    element: <Update />
  },
  {
    path: ADMIN_URLs.FACILITY.DETAILS,
    element: <Details />
  }
];

export default ManageFacilityRoutes;
