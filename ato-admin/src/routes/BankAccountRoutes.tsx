import { BANK_BASE_URL, BANK_URLs } from '../constants/bank-account-urls';
import Layout from '../layout';
import BankAccountList from '../pages/bank-accounts';
import CreateBankAccount from '../pages/bank-accounts/create';
import { TRoute } from './types';

const BankAccountRoutes: TRoute = {
  path: BANK_BASE_URL,
  element: <Layout />,
  children: [
    {
      path: BANK_BASE_URL,
      element: <BankAccountList />
    },
    {
      path: BANK_URLs.CREATE,
      element: <CreateBankAccount />
    }
  ]
};

export default BankAccountRoutes;
