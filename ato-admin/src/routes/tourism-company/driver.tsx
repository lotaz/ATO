import DriverList from '../../pages/tourism-company/driver';
import CreateDriver from '../../pages/tourism-company/driver/create';
import DriverDetails from '../../pages/tourism-company/driver/details';
import UpdateDriver from '../../pages/tourism-company/driver/update';
import { TRouteItem } from '../types';
import { TOURISM_COMPANY_URLs } from '../../constants/tourism-company-urls';

const DriverRoutes: TRouteItem[] = [
  {
    path: TOURISM_COMPANY_URLs.DRIVER.INDEX,
    element: <DriverList />
  },
  {
    path: TOURISM_COMPANY_URLs.DRIVER.CREATE,
    element: <CreateDriver />
  },
  {
    path: `${TOURISM_COMPANY_URLs.DRIVER.DETAILS}/:id`,
    element: <DriverDetails />
  },
  {
    path: `${TOURISM_COMPANY_URLs.DRIVER.UPDATE}/:id`,
    element: <UpdateDriver />
  }
];

export default DriverRoutes;