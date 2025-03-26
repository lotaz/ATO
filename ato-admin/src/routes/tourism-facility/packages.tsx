import { TOURISM_FACILITY_URLs } from '../../constants/tourism-facility-urls';
import PackageList from '../../pages/tourism-facility/package';
import CreatePackage from '../../pages/tourism-facility/package/create';
import PackageDetails from '../../pages/tourism-facility/package/details';
import UpdatePackage from '../../pages/tourism-facility/package/update';
import { TRouteItem } from '../types';

const tourismFacilityPackagesRoutes: TRouteItem[] = [
  {
    path: TOURISM_FACILITY_URLs.PACKAGE.INDEX,
    element: <PackageList />
  },
  {
    path: TOURISM_FACILITY_URLs.PACKAGE.CREATE,
    element: <CreatePackage />
  },
  {
    path: TOURISM_FACILITY_URLs.PACKAGE.UPDATE,
    element: <UpdatePackage />
  },
  {
    path: TOURISM_FACILITY_URLs.PACKAGE.DETAILS,
    element: <PackageDetails />
  }
];

export default tourismFacilityPackagesRoutes;
