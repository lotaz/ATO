import { get, put } from '../../helpers/axios-helper';
import { StatusApproval } from '../../types/content-moderator/certification.types';
import { ProductDTO_CM } from '../../types/content-moderator/product.types';

const BASE_URL = '/content-moderators/product';

export const productService = {
  getProducts: async (): Promise<ProductDTO_CM[]> => {
    const response = await get(`${BASE_URL}/get-products`);
    return response.data || [];
  },
  getProduct: async (productId: string): Promise<ProductDTO_CM> => {
    const response = await get(`${BASE_URL}/get-product/${productId}`);
    return response.data;
  },
  approveProduct: async (productId: string, data: { statusApproval: StatusApproval; replyRequest?: string }): Promise<void> => {
    await put(`${BASE_URL}/approvel-products/${productId}`, data);
  }
};
