import { post } from "../helpers/axios-helper";

const API_URL = "/tourist/order";

const paymentService = {
  async createOrder(orderData) {
    const response = await post(API_URL + "/add-order", orderData);
    console.log("res", response);
    return response.data;
  },
};

export default paymentService;
