import { lazy } from 'react';
import Loadable from '../../components/Loadable';
import { CONTENT_MODERATOR_URLs } from '../../constants/content-moderator-urls';
import { TRouteItem } from '../types';

const List = Loadable(lazy(() => import('../../pages/content-moderator/facility-certification/index')));
const Details = Loadable(lazy(() => import('../../pages/content-moderator/facility-certification/details')));

const ManageFacilityCertificateRoutes: TRouteItem[] = [
  {
    path: CONTENT_MODERATOR_URLs.FACILITY_CER.INDEX,
    element: <List />
  },
  {
    path: CONTENT_MODERATOR_URLs.FACILITY_CER.DETAILS,
    element: <Details />
  }
];

export default ManageFacilityCertificateRoutes;
