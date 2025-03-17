import CreateActivity from '../../pages/tourism-facility/package/activity/create';
import ActivityDetails from '../../pages/tourism-facility/package/activity/details';
import UpdateActivity from '../../pages/tourism-facility/package/activity/update';
import { TRouteItem } from '../types';

const tourismFacilityActivityRoutes: TRouteItem[] = [
  {
    path: 'package/activities/create',
    element: <CreateActivity />
  },
  {
    path: 'package/activities/update',
    element: <UpdateActivity />
  },
  {
    path: 'package/activities/view',
    element: <ActivityDetails />
  }
];

export default tourismFacilityActivityRoutes;
