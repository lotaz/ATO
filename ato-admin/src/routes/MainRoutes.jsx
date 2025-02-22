import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import { URLs } from 'constants/urls';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: URLs.DASHBOARD,
  element: <Dashboard />,
  children: [
    {
      path: URLs.DASHBOARD,
      element: <DashboardDefault />
    },
    {
      path: URLs.DASHBOARD,
      element: <DashboardDefault />
    },
    {
      path: URLs.SAMPLE_PAGE,
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
