import { API_URLs } from '../../constants/api';
import { get, post, put } from '../../helpers/axios-helper';
import type { Product } from '../../types/tourism-facility/product.types';

export const productService = {
  getProducts: async () => {
    const response = await get<Product[]>(API_URLs.FACILITY_OWNER.PRODUCT.LIST);
    console.log('response', response);

    return response.data;
  },

  getProduct: async (id: string) => {
    return await get<Product>(`${API_URLs.FACILITY_OWNER.PRODUCT.GET.replace(':id', id)}`);
  },

  createProduct: async (data: Omit<Product, 'productId' | 'createDate' | 'updateDate' | 'descriptionAPI'>) => {
    return await post<Product>(API_URLs.FACILITY_OWNER.PRODUCT.CREATE, data);
  },

  updateProduct: async (id: string, data: Partial<Product>) => {
    return await put<Product>(`${API_URLs.FACILITY_OWNER.PRODUCT.UPDATE}/${id}`, data);
  }
};
