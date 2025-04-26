import { lazy } from 'react';
import Loadable from '../../components/Loadable';
import { ADMIN_URLs } from '../../constants/admin-urls';
import WithdrawalDetailsPage from '../../pages/admin/payment-history/details';
import { TRouteItem } from '../types';

const List = Loadable(lazy(() => import('../../pages/admin/payment-history/index')));

const ManagePaymentHistoryRoutes: TRouteItem[] = [
  {
    path: ADMIN_URLs.PAYMENTHISTORY.INDEX,
    element: <List />
  },
  {
    path: ADMIN_URLs.PAYMENTHISTORY.DETAILS,
    element: <WithdrawalDetailsPage />
  }
];

export default ManagePaymentHistoryRoutes;
