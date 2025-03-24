import { TOURISM_COMPANY_BASE_URL } from '../../constants/tourism-company-urls';
import Layout from '../../layout';
import { TRoute } from '../types';
import DriverRoutes from './driver';
import tourDestinationRoutes from './tour-destination';
import TourGuideTeamRoutes from './tour-guide-team';
import tourismCompanyTourPackageRoutes from './tour-package';
import accommodationRoutes from './accommodation';

const TourCompanyRoutes: TRoute = {
  path: TOURISM_COMPANY_BASE_URL,
  element: <Layout />,
  children: [
    ...TourGuideTeamRoutes,
    ...tourismCompanyTourPackageRoutes,
    ...tourDestinationRoutes,
    ...DriverRoutes,
    ...accommodationRoutes,
    ...TourGuideTeamRoutes
  ]
};

export default TourCompanyRoutes;
