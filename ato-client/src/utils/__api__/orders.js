import { get } from "helpers/axios-helper";

const API_URL = "/tourist/order";

const getOrders = async () => {
  try {
    const response = await get(`${API_URL}/get-list-orders`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

const getOrder = async (orderId) => {
  try {
    const response = await get(`${API_URL}/get-order/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};

const formatOrderData = (order) => {
  return {
    id: order.orderId,
    orderDate: new Date(order.orderDate),
    status: order.statusOrder,
    paymentStatus: order.paymentStatus,
    paymentType: order.paymentType,
    totalAmount: order.totalAmount,
    orderType: order.orderType,
    items: order.orderDetails.map((detail) => ({
      id: detail.product.productId,
      name: detail.product.productName,
      quantity: detail.quantity,
      price: detail.unitPrice,
      images: detail.product.imgs,
      category: detail.product.productCategory,
      payment: detail.vnPayPaymentResponses?.[0] || null,
    })),
  };
};

export default {
  getOrders,
  getOrder,
  formatOrderData,
};
