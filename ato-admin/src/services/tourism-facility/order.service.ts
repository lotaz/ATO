import { get } from '../../helpers/axios-helper';
import { OrderResponse } from '../../types/tourism-facility/order.types';

export const orderService = {
  getOrders: async (): Promise<OrderResponse[]> => {
    const response = await get('afto/order/get-list-orders');
    return response.data;
  }
};
