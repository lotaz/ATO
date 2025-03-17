import { TOURISM_FACILITY_URLs } from '../../constants/tourism-facility-urls';
import OrderList from '../../pages/tourism-facility/order';
import OrderDetails from '../../pages/tourism-facility/order/details';
import { TRouteItem } from '../types';

const tourismFacilityOrderRoutes: TRouteItem[] = [
  {
    path: TOURISM_FACILITY_URLs.ORDER.INDEX,
    element: <OrderList />
  },
  {
    path: TOURISM_FACILITY_URLs.ORDER.DETAILS,
    element: <OrderDetails />
  }
];

export default tourismFacilityOrderRoutes;
