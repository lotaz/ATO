import { lazy } from 'react';
import Loadable from '../../components/Loadable';
import { CONTENT_MODERATOR_URLs } from '../../constants/content-moderator-urls';
import { TRouteItem } from '../types';

const List = Loadable(lazy(() => import('../../pages/content-moderator/blog/index')));
const Create = Loadable(lazy(() => import('../../pages/content-moderator/blog/create')));
const Update = Loadable(lazy(() => import('../../pages/content-moderator/blog/update')));
const Details = Loadable(lazy(() => import('../../pages/content-moderator/blog/details')));

const ManageBlogRoutes: TRouteItem[] = [
  {
    path: CONTENT_MODERATOR_URLs.BLOG.INDEX,
    element: <List />
  },
  {
    path: CONTENT_MODERATOR_URLs.BLOG.CREATE,
    element: <Create />
  },
  {
    path: CONTENT_MODERATOR_URLs.BLOG.UPDATE,
    element: <Update />
  },
  {
    path: CONTENT_MODERATOR_URLs.BLOG.DETAILS,
    element: <Details />
  }
];

export default ManageBlogRoutes;
