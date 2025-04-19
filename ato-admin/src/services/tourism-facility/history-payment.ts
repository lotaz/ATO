import { get } from '../../helpers/axios-helper';

export interface VNPayPaymentResponse {
  responseId: string;
  orderId: string;
  bookingId: string | null;
  txnRef: string;
  amount: number;
  bankCode: string;
  bankTranNo: string;
  cardType: string;
  orderInfo: string;
  payDate: string;
  responseCode: string;
  tmnCode: string;
  transactionNo: string;
  transactionStatus: string;
  secureHash: string;
  typePayment: number;
  order: {
    account: any;
    orderDetails: Array<{
      product: any;
    }>;
  } | null;
  bookingAgriculturalTour: any | null;
}

export const paymentService = {
  getPaymentHistory: () => get<VNPayPaymentResponse[]>('afto/order/get-list-history-payment'),

  getPaymentDetail: (paymentId: string, payments: VNPayPaymentResponse[]) => payments.find((payment) => payment.responseId === paymentId)
};
