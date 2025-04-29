import { TOURISM_FACILITY_URLs } from '../../constants/tourism-facility-urls';
import CertificateList from '../../pages/tourism-facility/certificates';
import CreateCertificate from '../../pages/tourism-facility/certificates/create';
import CertificateDetails from '../../pages/tourism-facility/certificates/details';
import EditCertificate from '../../pages/tourism-facility/certificates/edit';
import { TRouteItem } from '../types';

const certRoutes: TRouteItem[] = [
  {
    path: TOURISM_FACILITY_URLs.CERTIFICATES.INDEX,
    element: <CertificateList />
  },
  {
    path: TOURISM_FACILITY_URLs.CERTIFICATES.CREATE,
    element: <CreateCertificate />
  },
  {
    path: TOURISM_FACILITY_URLs.CERTIFICATES.EDIT,
    element: <EditCertificate />
  },
  {
    path: TOURISM_FACILITY_URLs.CERTIFICATES.DETAILS,
    element: <CertificateDetails />
  }
];

export default certRoutes;
