import { lazy } from 'react';
import { CONTENT_MODERATOR_URLs } from '../../constants/content-moderator-urls';
import { TRouteItem } from '../types';
import Loadable from '../../components/Loadable';

const BlogList = Loadable(lazy(() => import('../../pages/content-moderator/blog/index')));
const BlogCreate = Loadable(lazy(() => import('../../pages/content-moderator/blog/create')));
const BlogUpdate = Loadable(lazy(() => import('../../pages/content-moderator/blog/update')));
const BlogDetails = Loadable(lazy(() => import('../../pages/content-moderator/blog/details')));

const ManageBlogRoutes: TRouteItem[] = [
  {
    path: CONTENT_MODERATOR_URLs.BLOG.INDEX,
    element: <BlogList />
  },
  {
    path: CONTENT_MODERATOR_URLs.BLOG.CREATE,
    element: <BlogCreate />
  },
  {
    path: `${CONTENT_MODERATOR_URLs.BLOG.UPDATE}`,
    element: <BlogUpdate />
  },
  {
    path: `${CONTENT_MODERATOR_URLs.BLOG.DETAILS}`,
    element: <BlogDetails />
  }
];

export default ManageBlogRoutes;
