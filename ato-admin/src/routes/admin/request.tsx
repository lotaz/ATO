import { lazy } from 'react';
import Loadable from '../../components/Loadable';
import { ADMIN_URLs } from '../../constants/admin-urls';
import { TRouteItem } from '../types';

const List = Loadable(lazy(() => import('../../pages/admin/request/index')));
const Reply = Loadable(lazy(() => import('../../pages/admin/request/reply')));

const ManageRequestRoutes: TRouteItem[] = [
  {
    path: ADMIN_URLs.REQUEST.INDEX,
    element: <List />
  },
  {
    path: ADMIN_URLs.REQUEST.REPLY,
    element: <Reply />
  }
];

export default ManageRequestRoutes;
