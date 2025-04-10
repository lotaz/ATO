import { CONTENT_MODERATOR_BASE_URL } from '../../constants/content-moderator-urls';
import Layout from '../../layout';
import { TRoute } from '../types';
import ManageBlogRoutes from './blog';
import ManageCertificateRoutes from './certificate';
import productRoutes from './product';
import ManageReviewRoutes from './review';

const ContentModeratorRoutes: TRoute = {
  path: CONTENT_MODERATOR_BASE_URL,
  element: <Layout />,
  children: [...ManageBlogRoutes, ...ManageReviewRoutes, ...ManageCertificateRoutes, ...productRoutes]
};

export default ContentModeratorRoutes;
