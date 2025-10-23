// Represents a single product line item within an order
export interface LineItem {
  productId: string;
  name: string;
  brand: string;
  imageUrl: string;
  price: number; // Price per unit at the time of purchase
  quantity: number;
}

// Represents the full, detailed order object
export interface OrderDetails {
  orderId: string;
  date: Date;
  customer: {
    name: string;
    email: string;
    shippingAddress: string;
  };
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  fulfilmentStatus: 'Fulfilled' | 'Unfulfilled' | 'Processing';
  items: LineItem[]; // An array of the products in the order
  subtotal: number;
  shipping: number;
  tax: number;
  grandTotal: number;
}
