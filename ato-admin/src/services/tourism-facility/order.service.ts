import { get, put } from '../../helpers/axios-helper';
import { mockOrders } from '../../mock/tourism-facility/order.mock';
import { Order, UpdateOrderStatusRequest, UpdatePaymentStatusRequest } from '../../types/tourism-facility/order.types';

const BASE_URL = '/afto/order';

export const orderService = {
  getAll: async (): Promise<Order[]> => {
    return mockOrders;

    const response = await get(`${BASE_URL}/list`);
    return response.data;
  },

  getById: async (id: number): Promise<Order> => {
    return mockOrders[0];

    const response = await get(`${BASE_URL}/${id}`);
    return response.data;
  },

  updateStatus: async (data: UpdateOrderStatusRequest): Promise<Order> => {
    const response = await put(`${BASE_URL}/${data.orderId}/status`, { status: data.status });
    return response.data;
  },

  updatePaymentStatus: async (data: UpdatePaymentStatusRequest): Promise<Order> => {
    const response = await put(`${BASE_URL}/${data.orderId}/payment-status`, { paymentStatus: data.paymentStatus });
    return response.data;
  }
};
