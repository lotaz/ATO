import { TOURISM_FACILITY_BASE_URL } from '../../constants/tourism-facility-urls';
import Layout from '../../layout';
import { TRoute } from '../types';
import productRoutes from './product';

const TourFacilityoutes: TRoute = {
  path: TOURISM_FACILITY_BASE_URL,
  element: <Layout />,
  children: [...productRoutes]
};

export default TourFacilityoutes;
