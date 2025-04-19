import { get } from '../../helpers/axios-helper';

export interface VNPayPaymentResponse {
  responseId: string;
  orderId: string | null;
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
}

export interface AgriculturalTourPackage {
  tourId: string;
  packageName: string;
  description: string;
  imgs: string[];
  slot: number;
  priceOfAdults: number;
  priceOfChildren: number;
  childTicketAge: number | null;
  startTime: string;
  endTime: string;
  durations: number;
  durationsType: number;
  tourDestinations: any[];
  tourGuides: any[];
}

export interface TourBooking {
  bookingId: string;
  tourId: string;
  bookingDate: string;
  numberOfAdults: number;
  numberOfChildren: number;
  totalAmmount: number;
  paymentStatus: number;
  statusBooking: number;
  agriculturalTourPackage: AgriculturalTourPackage;
  orders: any[];
  vnPayPaymentResponses: VNPayPaymentResponse[];
}

export const bookTourService = {
  getBookings: () => get<TourBooking[]>('tour-company/book-tour/get-list-book-tours'),
  getBookingsByBookingId: (bookId: string) => get<TourBooking[]>(`tour-company/book-tour/get-book-tour/${bookId}`)
};