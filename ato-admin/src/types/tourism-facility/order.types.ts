export enum OrderType {
  Online = 'Online',
  Onsite = 'Onsite'
}

export enum OrderStatus {
  Processing = 'Processing',
  Shipped = 'Shipped',
  Completed = 'Completed',
  Cancelled = 'Cancelled'
}

export enum PaymentStatus {
  Paid = 'Paid',
  UnPaid = 'UnPaid',
  Failed = 'Failed',
  Refunded = 'Refunded'
}

export interface OrderDetail {
  productId: number;
  orderId: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  product?: any; // You can replace 'any' with your Product type
}

export interface Order {
  orderId: number;
  customerId: number;
  orderDate: string;
  orderType: OrderType;
  bookingId?: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  createdDate: string;
  updatedDate?: string;
  orderDetails: OrderDetail[];
  customer?: any; // You can replace 'any' with your Customer type
}

export interface UpdateOrderStatusRequest {
  orderId: number;
  status: OrderStatus;
}

export interface UpdatePaymentStatusRequest {
  orderId: number;
  paymentStatus: PaymentStatus;
}
