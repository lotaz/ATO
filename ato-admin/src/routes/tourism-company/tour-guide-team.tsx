import TourGuideList from '../../pages/tourism-company/tour-guide-team';
import CreateTourGuide from '../../pages/tourism-company/tour-guide-team/create';
import TourGuideDetails from '../../pages/tourism-company/tour-guide-team/details';
import UpdateTourGuide from '../../pages/tourism-company/tour-guide-team/update';
import RequestTourGuide from '../../pages/tourism-company/tour-guide-team/request';
import { TRouteItem } from '../types';
import { TOURISM_COMPANY_URLs } from '../../constants/tourism-company-urls';

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
    path: TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.DETAILS,
    element: <TourGuideDetails />
  },
  {
    path: TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.UPDATE,
    element: <UpdateTourGuide />
  },
  {
    path: TOURISM_COMPANY_URLs.TOUR_GUIDE_TEAM.REQUEST,
    element: <RequestTourGuide />
  }
];

export default TourGuideTeamRoutes;
