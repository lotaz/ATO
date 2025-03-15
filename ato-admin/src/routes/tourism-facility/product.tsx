import { lazy } from 'react';
import Loadable from '../../components/Loadable';
import { TOURISM_FACILITY_URLs } from '../../constants/tourism-facility-urls';
import { TRouteItem } from '../types';

const ProductList = Loadable(lazy(() => import('../../pages/tourism-facility/product')));
const ProductCreate = Loadable(lazy(() => import('../../pages/tourism-facility/product/create')));
const ProductEdit = Loadable(lazy(() => import('../../pages/tourism-facility/product/update')));
const ProductDetail = Loadable(lazy(() => import('../../pages/tourism-facility/product/details')));

export const productRoutes: TRouteItem[] = [
  {
    path: TOURISM_FACILITY_URLs.PRODUCT.INDEX,
    element: <ProductList />
  },
  {
    path: TOURISM_FACILITY_URLs.PRODUCT.CREATE,
    element: <ProductCreate />
  },
  {
    path: `${TOURISM_FACILITY_URLs.PRODUCT.UPDATE}`,
    element: <ProductEdit />
  },
  {
    path: `${TOURISM_FACILITY_URLs.PRODUCT.DETAILS}`,
    element: <ProductDetail />
  }
];

export default productRoutes;
