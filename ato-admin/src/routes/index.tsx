import { createBrowserRouter } from 'react-router-dom';

// project import
import { lazy } from 'react';
import Loadable from '../components/Loadable';
import MinimalLayout from '../layout/MinimalLayout';
import AuthenRoutes from './AuthenRoutes';
import AdminRoutes from './admin';
import ContentModeratorRoutes from './content-moderator';
import TourGuideRoutes from './tour-guide';
import TourCompanyRoutes from './tourism-company';
import TourFacilityoutes from './tourism-facility';
import { TRoute } from './types';
import ContractRoutes from './ContractRoutes';
import BankAccountRoutes from './BankAccountRoutes';
import WithdrawalRoutes from './WithdrawalRoutes';

// ==============================|| ROUTING RENDER ||============================== //
const Index = Loadable(lazy(() => import('../pages/index')));

const IndexRoutes: TRoute = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <Index />
    }
  ]
};

const router = createBrowserRouter(
  [
    IndexRoutes,
    AuthenRoutes,
    AdminRoutes,
    ContentModeratorRoutes,
    TourGuideRoutes,
    TourCompanyRoutes,
    TourFacilityoutes,
    ContractRoutes,
    BankAccountRoutes,
    WithdrawalRoutes
  ],
  { basename: '/' }
);

export default router;
