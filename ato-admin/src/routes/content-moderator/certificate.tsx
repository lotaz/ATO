import { lazy } from 'react';
import Loadable from '../../components/Loadable';
import { CONTENT_MODERATOR_URLs } from '../../constants/content-moderator-urls';
import { TRouteItem } from '../types';

const List = Loadable(lazy(() => import('../../pages/content-moderator/certification/index')));
const Details = Loadable(lazy(() => import('../../pages/content-moderator/certification/details')));

const ManageCertificateRoutes: TRouteItem[] = [
  {
    path: CONTENT_MODERATOR_URLs.CER.INDEX,
    element: <List />
  },
  {
    path: CONTENT_MODERATOR_URLs.CER.DETAILS,
    element: <Details />
  }
];

export default ManageCertificateRoutes;
