import { TOURISM_FACILITY_BASE_URL } from '../../constants/tourism-facility-urls';
import Layout from '../../layout';
import { TRoute } from '../types';
import tourismFacilityActivityRoutes from './activities';
import tourismFacilityCertificatesRoutes from './certificates';
import tourismFacilityContractRoutes from './contract';
import historyPaymentRoutes from './history_payment';
import ocopSellRoutes from './ocop-sell';
import tourismFacilityOrderRoutes from './order';
import tourismFacilityPackagesRoutes from './packages';
import productRoutes from './product';

const TourFacilityoutes: TRoute = {
  path: TOURISM_FACILITY_BASE_URL,
  element: <Layout />,
  children: [
    ...productRoutes,
    ...tourismFacilityCertificatesRoutes,
    ...tourismFacilityPackagesRoutes,
    ...tourismFacilityActivityRoutes,
    ...tourismFacilityOrderRoutes,
    ...ocopSellRoutes,
    ...historyPaymentRoutes
  ]
};

export default TourFacilityoutes;
