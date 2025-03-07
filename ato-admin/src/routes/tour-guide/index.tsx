import { TOUR_GUIDE_BASE_URL } from '../../constants/tour-guide-url';
import Layout from '../../layout';
import { TRoute } from '../types';

const TourGuideRoutes: TRoute = {
  path: TOUR_GUIDE_BASE_URL,
  element: <Layout />,
  children: []
};

export default TourGuideRoutes;
