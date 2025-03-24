import { lazy } from 'react';
import Loadable from '../../components/Loadable';
import { TRouteItem } from '../types';
import { TOURISM_COMPANY_URLs } from '../../constants/tourism-company-urls';

const AccommodationList = Loadable(lazy(() => import('../../pages/tourism-company/accommodation')));
const CreateAccommodation = Loadable(lazy(() => import('../../pages/tourism-company/accommodation/create')));
const UpdateAccommodation = Loadable(lazy(() => import('../../pages/tourism-company/accommodation/update')));
const AccommodationDetails = Loadable(lazy(() => import('../../pages/tourism-company/accommodation/details')));

const accommodationRoutes: TRouteItem[] = [
  {
    path: TOURISM_COMPANY_URLs.ACCOMMODATION.INDEX,
    element: <AccommodationList />
  },
  {
    path: TOURISM_COMPANY_URLs.ACCOMMODATION.CREATE,
    element: <CreateAccommodation />
  },
  {
    path: TOURISM_COMPANY_URLs.ACCOMMODATION.UPDATE,
    element: <UpdateAccommodation />
  },
  {
    path: TOURISM_COMPANY_URLs.ACCOMMODATION.DETAILS,
    element: <AccommodationDetails />
  }
];

export default accommodationRoutes;
