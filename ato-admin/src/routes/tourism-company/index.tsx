import { TOURISM_COMPANY_BASE_URL } from '../../constants/tourism-company-urls';
import Layout from '../../layout';
import { TRoute } from '../types';
import tourDestinationRoutes from './tour-destination';
import TourGuideTeamRoutes from './tour-guide-team';
import tourismCompanyTourPackageRoutes from './tour-package';

const TourCompanyRoutes: TRoute = {
  path: TOURISM_COMPANY_BASE_URL,
  element: <Layout />,
  children: [...TourGuideTeamRoutes, ...tourismCompanyTourPackageRoutes, ...tourDestinationRoutes]
};

export default TourCompanyRoutes;
