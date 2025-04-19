import { TOURISM_COMPANY_URLs } from '../../constants/tourism-company-urls';
import TourPaymentHistory from '../../pages/tourism-company/history_payment';
import { TRouteItem } from '../types';

const HistoryPaymentRoutes: TRouteItem[] = [
  {
    path: TOURISM_COMPANY_URLs.HISTORY_PAYMENT.INDEX,
    element: <TourPaymentHistory />
  }
];

export default HistoryPaymentRoutes;
