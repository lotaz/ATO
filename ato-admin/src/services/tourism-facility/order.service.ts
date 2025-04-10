import { get, post } from '../../helpers/axios-helper';
import { OrderResponse } from '../../types/tourism-facility/order.types';

interface ShipOrderRequest {
  client_order_code: string;
  content: string;
  shipAddressId: string;
  insurance_value: number;
  cod_amount: number;
  weight: number;
}

// Add this interface
export interface ShipAddressResponse {
  shipAddressId: string;
  defaultAddress: boolean;
  toName: string;
  toPhone: string;
  toWardCode: string;
  toDistrictId: number;
}

// Add this method to orderService
export const orderService = {
  getOrders: async (): Promise<OrderResponse[]> => {
    const response = await get('afto/order/get-list-orders');
    return response.data;
  },
  getOrderDetails: async (orderId: string): Promise<OrderResponse> => {
    const response = await get(`afto/order/get-order/${orderId}`);
    return response.data;
  },
  getShipAddressDetails: async (shipAddressId: string): Promise<ShipAddressResponse> => {
    const response = await get(`tourist/shipp-address/ship-address-details/${shipAddressId}`);
    return response.data;
  },
  shipOrder: async (request: ShipOrderRequest): Promise<void> => {
    await post('afto/order/create-shipping', request);
  }
};
