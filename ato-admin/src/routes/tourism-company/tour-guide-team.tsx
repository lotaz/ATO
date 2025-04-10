import { TOURISM_COMPANY_URLs } from '../../constants/tourism-company-urls';
import TourGuideList from '../../pages/tourism-company/tour-guide-team';
import CreateTourGuide from '../../pages/tourism-company/tour-guide-team/create';
import TourGuideDetails from '../../pages/tourism-company/tour-guide-team/details';
import UpdateTourGuide from '../../pages/tourism-company/tour-guide-team/update';
import { TRouteItem } from '../types';

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
  }
];

export default TourGuideTeamRoutes;
