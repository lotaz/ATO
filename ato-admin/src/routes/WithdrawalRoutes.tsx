import { WITHDRAWAL_BASE_URL, WITHDRAWAL_URLs } from '../constants/withdrawal-history-urls';
import Layout from '../layout';
import WithdrawalHistory from '../pages/withdrawal-history';
import WithdrawalDetailsPage from '../pages/withdrawal-history/details';
import { TRoute } from './types';

const WithdrawalRoutes: TRoute = {
  path: WITHDRAWAL_BASE_URL,
  element: <Layout />,
  children: [
    {
      path: WITHDRAWAL_BASE_URL,
      element: <WithdrawalHistory />
    },
    {
      path: WITHDRAWAL_URLs.DETAILS,
      element: <WithdrawalDetailsPage />
    }
  ]
};

export default WithdrawalRoutes;
