import { AxiosResponse } from 'axios';
import { get } from '../../helpers/axios-helper';
import { PaymentHistory } from '../../types/admin/payment-history';

const BASE_URL = '/admin/payment-history';

export const paymentService = {
  // Get list of all support requests
  getPaymentHistorys: (): Promise<AxiosResponse<PaymentHistory[]>> => {
    return get(`${BASE_URL}`);
  },
  getPaymentHistoryDetail: (id: string, payments: PaymentHistory[]): PaymentHistory | undefined => {
    return payments.find((payment) => payment.responseId === id);
  }
};
export default paymentService;
