import { CONTENT_MODERATOR_BASE_URL } from '../../constants/content-moderator-urls';
import Layout from '../../layout';
import { TRoute } from '../types';
import ManageBlogRoutes from './blog';
import ManageReviewRoutes from './review';

const ContentModeratorRoutes: TRoute = {
  path: CONTENT_MODERATOR_BASE_URL,
  element: <Layout />,
  children: [...ManageBlogRoutes, ...ManageReviewRoutes]
};

export default ContentModeratorRoutes;
