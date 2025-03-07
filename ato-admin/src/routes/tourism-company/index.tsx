import { TOURISM_COMPANY_BASE_URL } from '../../constants/tourism-company-urls';
import Layout from '../../layout';
import { TRoute } from '../types';

const TourCompanyRoutes: TRoute = {
  path: TOURISM_COMPANY_BASE_URL,
  element: <Layout />,
  children: []
};

export default TourCompanyRoutes;
