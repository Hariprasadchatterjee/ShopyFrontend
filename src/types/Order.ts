// src/types/Order.ts
export type PaymentStatus = 'Paid' | 'Pending' | 'Failed';
export type FulfilmentStatus = 'Fulfilled' | 'Unfulfilled' | 'Processing' | 'Cancelled';
export type DeliveryType = 'Cash on delivery' | 'Express Shipping' | 'Standard Shipping' | 'Local delivery';

export interface Customer {
  name: string;
  email: string;
  avatarUrl?: string; // Optional property
}

export interface Order {
  orderId: string;
  totals: number | string;
  customer?:Customer;
  paymentStatus: PaymentStatus;
  fulfilmentStatus: FulfilmentStatus;
  deliveryType: DeliveryType;
  date: Date;
  // Formatted versions for display
  dateFormatted?: string;
}