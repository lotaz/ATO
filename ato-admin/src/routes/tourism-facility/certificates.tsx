import CertificateList from '../../pages/tourism-facility/product/certificate';
import CreateCertificate from '../../pages/tourism-facility/product/certificate/create';
import UpdateCertificate from '../../pages/tourism-facility/product/certificate/update';
import ViewCertificate from '../../pages/tourism-facility/product/certificate/view';
import { TRouteItem } from '../types';

const tourismFacilityCertificatesRoutes: TRouteItem[] = [
  {
    path: 'product/certificates',
    element: <CertificateList />
  },
  {
    path: 'product/certificates/create',
    element: <CreateCertificate />
  },
  {
    path: 'product/certificates/update',
    element: <UpdateCertificate />
  },
  {
    path: 'product/certificates/view',
    element: <ViewCertificate />
  }
];

export default tourismFacilityCertificatesRoutes;
