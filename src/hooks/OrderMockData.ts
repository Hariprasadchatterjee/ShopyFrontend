// src/data/mockOrders.ts

import { useEffect, useMemo, useState } from 'react';
import type { Order } from '../types/Order';

export const mockOrders: Order[] = [
  {
    orderId: 'ORD-2025-001',
    totals: 149.99,
    customer: {
      name: 'Rohan Sharma',
      email: 'rohan.sharma@example.com',
      avatarUrl: 'https://i.pravatar.cc/150?u=rohan'
    },
    paymentStatus: 'Paid',
    fulfilmentStatus: 'Fulfilled',
    deliveryType: 'Cash on delivery',
    date: new Date('2025-10-14T10:30:00Z'),
  },
  {
    orderId: 'ORD-2025-002',
    totals: 34.50,
    customer: {
      name: 'Priya Patel',
      email: 'priya.patel@example.com',
      avatarUrl: 'https://i.pravatar.cc/150?u=priya'
    },
    paymentStatus: 'Paid',
    fulfilmentStatus: 'Processing',
    deliveryType: 'Standard Shipping',
    date: new Date('2025-10-13T14:00:00Z'),
  },
  {
    orderId: 'ORD-2025-003',
    totals: 250.00,
    customer: {
      name: 'Amit Singh',
      email: 'amit.singh@example.com',
    },
    paymentStatus: 'Pending',
    fulfilmentStatus: 'Unfulfilled',
    deliveryType: 'Local delivery',
    date: new Date('2025-10-12T09:15:00Z'),
  },
  {
    orderId: 'ORD-2025-004',
    totals: 75.20,
    customer: {
      name: 'Sneha Gupta',
      email: 'sneha.gupta@example.com',
      avatarUrl: 'https://i.pravatar.cc/150?u=sneha'
    },
    paymentStatus: 'Paid',
    fulfilmentStatus: 'Fulfilled',
    deliveryType: 'Standard Shipping',
    date: new Date('2025-10-11T18:45:00Z'),
  },
  {
    orderId: 'ORD-2025-005',
    totals: 15.00,
    customer: {
      name: 'Vikram Kumar',
      email: 'vikram.kumar@example.com',
    },
    paymentStatus: 'Failed',
    fulfilmentStatus: 'Cancelled',
    deliveryType: 'Express Shipping',
    date: new Date('2025-10-10T11:05:00Z'),
  },
  {
    orderId: 'ORD-2025-005',
    totals: 15.00,
    customer: {
      name: 'Vikram Kumar',
      email: 'vikram.kumar@example.com',
    },
    paymentStatus: 'Failed',
    fulfilmentStatus: 'Cancelled',
    deliveryType: 'Express Shipping',
    date: new Date('2025-10-10T11:05:00Z'),
  },
  {
    orderId: 'ORD-2025-005',
    totals: 15.00,
    customer: {
      name: 'Vikram Kumar',
      email: 'vikram.kumar@example.com',
    },
    paymentStatus: 'Failed',
    fulfilmentStatus: 'Cancelled',
    deliveryType: 'Express Shipping',
    date: new Date('2025-10-10T11:05:00Z'),
  },
  {
    orderId: 'ORD-2025-005',
    totals: 15.00,
    customer: {
      name: 'Vikram Kumar',
      email: 'vikram.kumar@example.com',
    },
    paymentStatus: 'Failed',
    fulfilmentStatus: 'Cancelled',
    deliveryType: 'Express Shipping',
    date: new Date('2025-10-10T11:05:00Z'),
  },
  {
    orderId: 'ORD-2025-005',
    totals: 15.00,
    customer: {
      name: 'Vikram Kumar',
      email: 'vikram.kumar@example.com',
    },
    paymentStatus: 'Failed',
    fulfilmentStatus: 'Cancelled',
    deliveryType: 'Express Shipping',
    date: new Date('2025-10-10T11:05:00Z'),
  },
  {
    orderId: 'ORD-2025-005',
    totals: 15.00,
    customer: {
      name: 'Vikram Kumar',
      email: 'vikram.kumar@example.com',
    },
    paymentStatus: 'Failed',
    fulfilmentStatus: 'Cancelled',
    deliveryType: 'Express Shipping',
    date: new Date('2025-10-10T11:05:00Z'),
  },
  {
    orderId: 'ORD-2025-005',
    totals: 15.00,
    customer: {
      name: 'Vikram Kumar',
      email: 'vikram.kumar@example.com',
    },
    paymentStatus: 'Failed',
    fulfilmentStatus: 'Cancelled',
    deliveryType: 'Express Shipping',
    date: new Date('2025-10-10T11:05:00Z'),
  },
  {
    orderId: 'ORD-2025-005',
    totals: 15.00,
    customer: {
      name: 'Vikram Kumar',
      email: 'vikram.kumar@example.com',
    },
    paymentStatus: 'Failed',
    fulfilmentStatus: 'Cancelled',
    deliveryType: 'Express Shipping',
    date: new Date('2025-10-10T11:05:00Z'),
  },
  {
    orderId: 'ORD-2025-005',
    totals: 15.00,
    customer: {
      name: 'Vikram Kumar',
      email: 'vikram.kumar@example.com',
    },
    paymentStatus: 'Failed',
    fulfilmentStatus: 'Cancelled',
    deliveryType: 'Express Shipping',
    date: new Date('2025-10-10T11:05:00Z'),
  },
  {
    orderId: 'ORD-2025-005',
    totals: 15.00,
    customer: {
      name: 'Vikram Kumar',
      email: 'vikram.kumar@example.com',
    },
    paymentStatus: 'Failed',
    fulfilmentStatus: 'Cancelled',
    deliveryType: 'Express Shipping',
    date: new Date('2025-10-10T11:05:00Z'),
  },
];

    const formateDate = (date: Date) : string =>{
       return date.toLocaleString('en-IN',{
          month:"short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric"
        })
    }

export const useOrdersData = ()=>{
    const [data, setData] = useState<Order[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      setLoading(true);
     
      const timer =   setTimeout(() => {
        setData(mockOrders)
        setLoading(false);
      }, 1000);

      return () => {
        clearTimeout(timer)
      }
    }, [mockOrders])

    const formatedData = useMemo(() => {
        return data.map((item)=>{
          return {
            ...item,
            totals: `₹${item.totals.toLocaleString()}`,
            dateFormatted: formateDate(item.date),
          }
        })
    }, 
    [data])
    
    return { data:formatedData, isLoading, error }
}