export const OrderType = {
  Online: 0,
  Onsite: 1,
};

export const PaymentStatus = {
  Paid: 0,
  UnPaid: 1,
  Failed: 2,
  Refunded: 3,
};

export const PaymentType = {
  CashOnDelivery: 0,
  Transfer: 1,
  Refunded: 2,
};

export const StatusOrder = {
  RejecOrder: -1,
  Processing: 0,
  AcceptOrder: 1,
  Completed: 2,
};

export const StatusBooking = {
  Processing: 0,
  Completed: 1,
  Canceled: 2,
  ConfirmBooking: 3,
  InProgress: 4,
};
