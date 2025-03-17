import { TOURISM_FACILITY_URLs } from '../../constants/tourism-facility-urls';
import ContractList from '../../pages/tourism-facility/contract';
import CreateContract from '../../pages/tourism-facility/contract/create';
import ContractDetails from '../../pages/tourism-facility/contract/details';
import UpdateContract from '../../pages/tourism-facility/contract/update';
import { TRouteItem } from '../types';

const tourismFacilityContractRoutes: TRouteItem[] = [
  {
    path: TOURISM_FACILITY_URLs.CONTRACT.INDEX,
    element: <ContractList />
  },
  {
    path: TOURISM_FACILITY_URLs.CONTRACT.CREATE,
    element: <CreateContract />
  },
  {
    path: TOURISM_FACILITY_URLs.CONTRACT.DETAILS,
    element: <ContractDetails />
  },
  {
    path: TOURISM_FACILITY_URLs.CONTRACT.UPDATE,
    element: <UpdateContract />
  }
];

export default tourismFacilityContractRoutes;
