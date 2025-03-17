import { lazy } from 'react';
import { TRouteItem } from '../types';

const CreateTourDestination = lazy(() => import('../../pages/tourism-company/tour-destination/create'));
const UpdateTourDestination = lazy(() => import('../../pages/tourism-company/tour-destination/update'));
const TourDestinationDetails = lazy(() => import('../../pages/tourism-company/tour-destination/details'));

const tourDestinationRoutes: TRouteItem[] = [
  {
    path: 'tour-package/destinations/create',
    element: <CreateTourDestination />
  },
  {
    path: 'tour-package/destinations/update',
    element: <UpdateTourDestination />
  },
  {
    path: 'tour-package/destinations/details',
    element: <TourDestinationDetails />
  }
];

export default tourDestinationRoutes;
