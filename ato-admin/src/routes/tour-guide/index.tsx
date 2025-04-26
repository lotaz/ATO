import { lazy } from 'react';
import Loadable from '../../components/Loadable';
import { TOUR_GUIDE_BASE_URL, TOUR_GUIDE_URLs } from '../../constants/tour-guide-urls';
import Layout from '../../layout';
import { TRoute } from '../types';

const List = Loadable(lazy(() => import('../../pages/tour-guide/index')));
const Details = Loadable(lazy(() => import('../../pages/tour-guide/details')));
// const Active = Loadable(lazy(() => import('../../pages/tour-guide/tracking/active')));
// const History = Loadable(lazy(() => import('../../pages/tour-guide/tracking/history')));

const TourGuideRoutes: TRoute = {
  path: TOUR_GUIDE_BASE_URL,
  element: <Layout />,
  children: [
    {
      path: TOUR_GUIDE_URLs.PACKAGE.INDEX,
      element: <List />
    },
    {
      path: TOUR_GUIDE_URLs.PACKAGE.DETAILS,
      element: <Details />
    }
  ]
};

export default TourGuideRoutes;
