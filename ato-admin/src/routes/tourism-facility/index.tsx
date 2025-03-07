import { TOURISM_FACILITY_BASE_URL } from '../../constants/tourism-facility-urls';
import Layout from '../../layout';
import { TRoute } from '../types';

const TourFacilityoutes: TRoute = {
  path: TOURISM_FACILITY_BASE_URL,
  element: <Layout />,
  children: []
};

export default TourFacilityoutes;
