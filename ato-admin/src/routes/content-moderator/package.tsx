import { lazy } from 'react';
import Loadable from '../../components/Loadable';
import { TRouteItem } from '../types';
import { CONTENT_MODERATOR_URLs } from '../../constants/content-moderator-urls';

const List = Loadable(lazy(() => import('../../pages/content-moderator/tour-package/index')));
const Details = Loadable(lazy(() => import('../../pages/content-moderator/tour-package/details')));

const packageRoutes: TRouteItem[] = [
  {
    path: CONTENT_MODERATOR_URLs.PACKAGE.INDEX,
    element: <List />
  },
  {
    path: CONTENT_MODERATOR_URLs.PACKAGE.DETAILS,
    element: <Details />
  }
];

export default packageRoutes;
