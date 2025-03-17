import dayjs from 'dayjs';
import { Order, OrderStatus, OrderType, PaymentStatus } from '../../types/tourism-facility/order.types';

export const mockOrders: Order[] = [
  {
    orderId: 1,
    customerId: 101,
    orderDate: dayjs().subtract(1, 'day').toISOString(),
    orderType: OrderType.Online,
    bookingId: 1,
    status: OrderStatus.Processing,
    paymentStatus: PaymentStatus.UnPaid,
    totalAmount: 1500000,
    createdDate: dayjs().subtract(1, 'day').toISOString(),
    orderDetails: [
      {
        productId: 1,
        orderId: 1,
        quantity: 2,
        unitPrice: 750000,
        totalPrice: 1500000,
        product: {
          productName: 'Premium Food Package A'
        }
      }
    ]
  },
  {
    orderId: 2,
    customerId: 102,
    orderDate: dayjs().subtract(2, 'day').toISOString(),
    orderType: OrderType.Onsite,
    bookingId: 1,
    status: OrderStatus.Completed,
    paymentStatus: PaymentStatus.Paid,
    totalAmount: 2250000,
    createdDate: dayjs().subtract(2, 'day').toISOString(),
    updatedDate: dayjs().subtract(1, 'day').toISOString(),
    orderDetails: [
      {
        productId: 2,
        orderId: 2,
        quantity: 3,
        unitPrice: 750000,
        totalPrice: 2250000,
        product: {
          productName: 'Organic Food Set B'
        }
      }
    ]
  },
  {
    orderId: 3,
    customerId: 103,
    orderDate: dayjs().subtract(3, 'day').toISOString(),
    orderType: OrderType.Online,
    bookingId: 1,
    status: OrderStatus.Shipped,
    paymentStatus: PaymentStatus.Paid,
    totalAmount: 3000000,
    createdDate: dayjs().subtract(3, 'day').toISOString(),
    updatedDate: dayjs().subtract(1, 'hour').toISOString(),
    orderDetails: [
      {
        productId: 3,
        orderId: 3,
        quantity: 2,
        unitPrice: 1000000,
        totalPrice: 2000000,
        product: {
          productName: 'Deluxe Food Package C'
        }
      },
      {
        productId: 4,
        orderId: 3,
        quantity: 1,
        unitPrice: 1000000,
        totalPrice: 1000000,
        product: {
          productName: 'Premium Food Set D'
        }
      }
    ]
  },
  {
    orderId: 4,
    customerId: 104,
    orderDate: dayjs().subtract(4, 'day').toISOString(),
    orderType: OrderType.Online,
    bookingId: 1,
    status: OrderStatus.Cancelled,
    paymentStatus: PaymentStatus.Refunded,
    totalAmount: 1750000,
    createdDate: dayjs().subtract(4, 'day').toISOString(),
    updatedDate: dayjs().subtract(3, 'day').toISOString(),
    orderDetails: [
      {
        productId: 5,
        orderId: 4,
        quantity: 1,
        unitPrice: 1750000,
        totalPrice: 1750000,
        product: {
          productName: 'Special Food Package E'
        }
      }
    ]
  }
];
