import { API_URLs } from '../../constants/api';
import { get, post, put } from '../../helpers/axios-helper';
import type { Product, ProductParams, ProductResponse } from '../../types/tourism-facility/product.types';

export const productService = {
  getProducts: (params: ProductParams) => {
    return get<ProductResponse>(API_URLs.FACILITY_OWNER.PRODUCT.LIST, { params });
  },

  getProduct: (id: string) => {
    return get<Product>(`${API_URLs.FACILITY_OWNER.PRODUCT.GET.replace(':id', id)}`);
  },

  createProduct: (data: Omit<Product, 'productId' | 'createDate' | 'updateDate' | 'descriptionAPI'>) => {
    return post<Product>(API_URLs.FACILITY_OWNER.PRODUCT.CREATE, data);
  },

  updateProduct: (id: string, data: Partial<Product>) => {
    return put<Product>(`${API_URLs.FACILITY_OWNER.PRODUCT.UPDATE}/${id}`, data);
  }
};
