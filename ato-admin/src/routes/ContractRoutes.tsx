import { CONTRACT_BASE_URL, CONTRACT_DETAILS } from '../constants/contract-urls';
import Layout from '../layout';
import ContractList from '../pages/contract';
import ContractDetails from '../pages/contract/details';
import { TRoute } from './types';

const ContractRoutes: TRoute = {
  path: '/contracts',
  element: <Layout />,
  children: [
    {
      path: CONTRACT_BASE_URL,
      element: <ContractList />
    },
    {
      path: CONTRACT_DETAILS,
      element: <ContractDetails />
    }
  ]
};

export default ContractRoutes;
