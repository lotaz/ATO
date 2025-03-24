import { lazy } from 'react';
import Loadable from '../../../components/Loadable';
import { TOURISM_COMPANY_URLs } from '../../../constants/tourism-company-urls';
import { TRouteItem } from '../../types';

const TourGuideList = Loadable(lazy(() => import('../../../pages/tourism-company/tour-guide')));
const CreateTourGuide = Loadable(lazy(() => import('../../../pages/tourism-company/tour-guide/create')));
const UpdateTourGuide = Loadable(lazy(() => import('../../../pages/tourism-company/tour-guide/update')));
const TourGuideDetails = Loadable(lazy(() => import('../../../pages/tourism-company/tour-guide/details')));

const TourGuideTeamRoutes: TRouteItem[] = [
  {
    path: TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.INDEX,
    element: <TourGuideList />
  },
  {
    path: TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.CREATE,
    element: <CreateTourGuide />
  },
  {
    path: `${TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.UPDATE}`,
    element: <UpdateTourGuide />
  },
  {
    path: `${TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.DETAILS}`,
    element: <TourGuideDetails />
  }
];

export default TourGuideTeamRoutes;
