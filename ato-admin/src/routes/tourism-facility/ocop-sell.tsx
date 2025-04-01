import { lazy } from 'react';
import Loadable from '../../components/Loadable';
import { TOURISM_FACILITY_BASE_URL } from '../../constants/tourism-facility-urls';
import { TRouteItem } from '../types';

const CreateOCOPSell = Loadable(lazy(() => import('../../pages/tourism-facility/product/ocop-sell/create')));
const UpdateOCOPSell = Loadable(lazy(() => import('../../pages/tourism-facility/product/ocop-sell/update')));
const ViewOCOPSell = Loadable(lazy(() => import('../../pages/tourism-facility/product/ocop-sell/view')));

const ocopSellRoutes: TRouteItem[] = [
  {
    path: TOURISM_FACILITY_BASE_URL + '/product/ocop-sell/create',
    element: <CreateOCOPSell />
  },
  {
    path: TOURISM_FACILITY_BASE_URL + '/product/ocop-sell/update',
    element: <UpdateOCOPSell />
  },
  {
    path: TOURISM_FACILITY_BASE_URL + '/product/ocop-sell/view',
    element: <ViewOCOPSell />
  }
];

export default ocopSellRoutes;
