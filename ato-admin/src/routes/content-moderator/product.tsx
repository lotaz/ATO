import { lazy } from 'react';
import Loadable from '../../components/Loadable';
import { TRouteItem } from '../types';
import { CONTENT_MODERATOR_URLs } from '../../constants/content-moderator-urls';

const ProductList = Loadable(lazy(() => import('../../pages/content-moderator/product')));
const Details = Loadable(lazy(() => import('../../pages/content-moderator/product/details')));

const productRoutes: TRouteItem[] = [
  {
    path: CONTENT_MODERATOR_URLs.PRODUCT.INDEX,
    element: <ProductList />
  },
  {
    path: CONTENT_MODERATOR_URLs.PRODUCT.DETAILS,
    element: <Details />
  }
];

export default productRoutes;
