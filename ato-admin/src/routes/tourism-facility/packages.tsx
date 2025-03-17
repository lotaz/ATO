import PackageList from '../../pages/tourism-facility/package';
import CreatePackage from '../../pages/tourism-facility/package/create';
import PackageDetails from '../../pages/tourism-facility/package/details';
import UpdatePackage from '../../pages/tourism-facility/package/update';
import { TRouteItem } from '../types';

const tourismFacilityPackagesRoutes: TRouteItem[] = [
  {
    path: 'package',
    element: <PackageList />
  },
  {
    path: 'package/create',
    element: <CreatePackage />
  },
  {
    path: 'package/update',
    element: <UpdatePackage />
  },
  {
    path: 'package/details',
    element: <PackageDetails />
  }
];

export default tourismFacilityPackagesRoutes;
