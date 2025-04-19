import { TOURISM_FACILITY_URLs } from '../../constants/tourism-facility-urls';
import OrderPaymentHistory from '../../pages/tourism-facility/history_payment';
import { TRouteItem } from '../types';

const historyPaymentRoutes: TRouteItem[] = [
  {
    path: TOURISM_FACILITY_URLs.HISTORY_PAYMENT_ORDER.INDEX,
    element: <OrderPaymentHistory />
  }
];

export default historyPaymentRoutes;
