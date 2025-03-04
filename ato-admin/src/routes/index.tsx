import { createBrowserRouter } from 'react-router-dom';

// project import
import { lazy } from 'react';
import Loadable from '../components/Loadable';
import MinimalLayout from '../layout/MinimalLayout';
import AuthenRoutes from './AuthenRoutes';
import AdminRoutes from './admin';
import ContentModeratorRoutes from './content-moderator';
import { TRoute } from './types';

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

const router = createBrowserRouter([IndexRoutes, AuthenRoutes, AdminRoutes, ContentModeratorRoutes], { basename: '/' });

export default router;
