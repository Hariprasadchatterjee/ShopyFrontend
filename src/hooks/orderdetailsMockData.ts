import type { OrderDetails } from "../types/orderDetails";


export const mockOrderDetailsData: OrderDetails = {
  orderId: 'ORD-2025-001',
  date: new Date('2025-10-14T10:30:00Z'),
  customer: {
    name: 'Rohan Sharma',
    email: 'rohan.sharma@example.com',
    shippingAddress: '123 Tech Park, Silicon Vihar, Bengaluru, 560100',
  },
  paymentStatus: 'Paid',
  fulfilmentStatus: 'Fulfilled',
  items: [
    {
      productId: 'PROD-001',
      name: 'Galaxy Nova Smartphone',
      brand: 'StellarTech',
      imageUrl: 'https://placehold.co/100x100/334155/FFFFFF?text=Nova',
      price: 69999,
      quantity: 1,
    },
    {
      productId: 'PROD-004',
      name: 'SoundWave+ Wireless Headphones',
      brand: 'AudioPhonic',
      imageUrl: 'https://placehold.co/100x100/1E293B/FFFFFF?text=Sound',
      price: 12499,
      quantity: 1,
    },
    {
      productId: 'PROD-005',
      name: 'Classic Cotton T-Shirt (Black)',
      brand: 'Threads',
      imageUrl: 'https://placehold.co/100x100/94A3B8/FFFFFF?text=Tee',
      price: 999,
      quantity: 2,
    },
  ],
  subtotal: 84496,
  shipping: 0,
  tax: 15209.28,
  grandTotal: 99705.28,
};
