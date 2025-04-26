import { UnitProduct } from '../content-moderator/certification.types';
import { ProductCategory } from './product-category.enum';

export enum OrderType {
  Online = 0,
  Onsite = 1
}

export enum PaymentStatus {
  Paid = 0,
  UnPaid = 1,
  Failed = 2,
  Refunded = 3
}

export enum PaymentType {
  CashOnDelivery = 0,
  Transfer = 1,
  Refunded = 2
}

export enum StatusOrder {
  RejecOrder = -1,
  Processing = 0,
  AcceptOrder = 1,
  Completed = 2
}

export interface ProductDTO_Order {
  productId: string;
  productName: string;
  imgs?: string[];
  description?: string;
  unitProduct?: UnitProduct;
  productCategory: ProductCategory;
}

export interface OrderDetailResponse {
  orderId: string;
  quantity: number;
  unitPrice: number;
  product?: ProductDTO_Order;
}

export interface VNPayPaymentResponseDTO {
  responseId: string;
  orderId?: string;
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
}

export enum TypePayment {
  TourPayment = 0,
  OrderPayment = 1,
  Refunded = 2
}

export interface OrderResponse {
  orderId: string;
  bookingId?: string;
  orderDate: Date;
  orderType: OrderType;
  statusOrder: StatusOrder;
  paymentType: PaymentType;
  paymentStatus: PaymentStatus;
  cancelDate?: Date;
  totalAmount: number;
  createDate: Date;
  updateDate?: Date;
  orderDetails: OrderDetailResponse[];
  shipAddressId: string;
  vnPayPaymentResponses: VNPayPaymentResponseDTO[];
}
