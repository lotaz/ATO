import { UnitProduct } from '../content-moderator/certification.types';
import { ProductCategory } from './product-category.enum';

export enum OrderType {
  Online = 'Online',
  Onsite = 'Onsite'
}

export enum PaymentStatus {
  Paid = 'Paid',
  UnPaid = 'UnPaid',
  Failed = 'Failed',
  Refunded = 'Refunded'
}

export enum PaymentType {
  CashOnDelivery = 'CashOnDelivery',
  Transfer = 'Transfer',
  Refunded = 'Refunded'
}

export enum StatusOrder {
  Processing = 'Processing',
  Shipped = 'Shipped',
  Completed = 'Completed',
  Canceled = 'Canceled'
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
  vnPayPaymentResponses: VNPayPaymentResponseDTO[];
}
