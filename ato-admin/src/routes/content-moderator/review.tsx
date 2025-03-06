import { lazy } from 'react';
import Loadable from '../../components/Loadable';
import { CONTENT_MODERATOR_URLs } from '../../constants/content-moderator-urls';
import { TRouteItem } from '../types';

const List = Loadable(lazy(() => import('../../pages/content-moderator/review/index')));
const Details = Loadable(lazy(() => import('../../pages/content-moderator/review/details')));

const ManageReviewRoutes: TRouteItem[] = [
  {
    path: CONTENT_MODERATOR_URLs.REVIEW.INDEX,
    element: <List />
  },
  {
    path: CONTENT_MODERATOR_URLs.REVIEW.DETAILS,
    element: <Details />
  }
];

export default ManageReviewRoutes;
