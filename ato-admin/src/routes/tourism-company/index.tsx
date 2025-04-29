import { TOURISM_COMPANY_BASE_URL, TOURISM_COMPANY_URLs } from '../../constants/tourism-company-urls';
import Layout from '../../layout';
import TourCompanyDashboard from '../../pages/tourism-company/dashboard';
import { TRoute } from '../types';
import accommodationRoutes from './accommodation';
import BookingRoutes from './booking';
import DriverRoutes from './driver';
import HistoryPaymentRoutes from './history_payment';
import tourDestinationRoutes from './tour-destination';
import TourGuideTeamRoutes from './tour-guide-team';
import tourismCompanyTourPackageRoutes from './tour-package';

const TourCompanyRoutes: TRoute = {
  path: TOURISM_COMPANY_BASE_URL,
  element: <Layout />,
  children: [
    ...TourGuideTeamRoutes,
    ...tourismCompanyTourPackageRoutes,
    ...tourDestinationRoutes,
    ...DriverRoutes,
    ...accommodationRoutes,
    ...TourGuideTeamRoutes,
    ...BookingRoutes,
    ...HistoryPaymentRoutes,
    {
      path: TOURISM_COMPANY_URLs.DASHBOARD.INDEX,
      element: <TourCompanyDashboard />
    }
  ]
};

export default TourCompanyRoutes;
