import { TOURISM_COMPANY_URLs } from '../../constants/tourism-company-urls';
import TourPackageList from '../../pages/tourism-company/tour-package';
import CreateTourPackage from '../../pages/tourism-company/tour-package/create';
import TourPackageDetails from '../../pages/tourism-company/tour-package/details';
import UpdateTourPackage from '../../pages/tourism-company/tour-package/update';
import { TRouteItem } from '../types';

const tourismCompanyTourPackageRoutes: TRouteItem[] = [
  {
    path: TOURISM_COMPANY_URLs.TOUR_PACKAGE.INDEX,
    element: <TourPackageList />
  },
  {
    path: TOURISM_COMPANY_URLs.TOUR_PACKAGE.CREATE,
    element: <CreateTourPackage />
  },
  {
    path: TOURISM_COMPANY_URLs.TOUR_PACKAGE.DETAILS,
    element: <TourPackageDetails />
  },
  {
    path: TOURISM_COMPANY_URLs.TOUR_PACKAGE.UPDATE,
    element: <UpdateTourPackage />
  }
];

export default tourismCompanyTourPackageRoutes;
