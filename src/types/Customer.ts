// src/types/Customer.ts
export interface Customer {
  id: string;
  name: string;
  email: string;
  orders: number;
  totalSpent: number | string; // Can be number or formatted string
  city: string;
  lastSeen: Date;
  lastOrder: Date;
  // Formatted versions for display
  lastSeenFormatted?: string;
  lastOrderFormatted?: string;
}