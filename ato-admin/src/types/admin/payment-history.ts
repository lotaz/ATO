export enum TypePayment {
  TourPayment = 0,
  OrderPayment = 1,
  Refunded = 2,
}

export interface Order {
  orderId: string;
  customerId: string;
  orderDate: Date;
  totalAmount: number;
  account: Account;
}
export interface Account {
  fullname: string;
  email: string;
}
export interface BookingAgriculturalTour {
    bookingId: string;
    tourId: string;
    customerId: string;
    bookingDate: Date;
    numberOfAdults: number;
    numberOfChildren?: number;
    totalAmmount: number;
    customer:Account;
    agriculturalTourPackage?: AgriculturalTourPackage;
  }
  export interface AgriculturalTourPackage {
    tourId: string;
    packageName: string;
  }
export interface OrderDetail {
    orderId: string;
    productId: string;
    quantity: number;
    unitPrice: number;
    order?: Order;
    product?: Product;
  }
  export interface Product {
    productId: string;
    productName: string;
  }
export interface PaymentHistory {
  responseId: string;
  orderId?: string;
  bookingId?: string;
  txnRef: string;
  amount: number;
  bankCode: string;
  bankTranNo: string;
  cardType: string;
  orderInfo: string;
  payDate: Date;
  responseCode: string;
  tmnCode: string;
  transactionNo: string;
  transactionStatus: string;
  secureHash: string;
  typePayment: TypePayment;
  order?: Order;
  bookingAgriculturalTour?: BookingAgriculturalTour;
}