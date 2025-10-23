// src/hooks/useCustomersData.ts
import { useState, useEffect, useMemo } from 'react';
import type { Customer } from '../types/Customer';


// --- MOCK DATA (Replace with API call in real app) ---
const mockCustomers: Customer[] = [
  { id: '1', name: 'Carry Anna', email: 'anna34@gmail.com', orders: 89, totalSpent: 23987, city: 'Budapest', lastSeen: new Date(Date.now() - 34 * 60 * 1000), lastOrder: new Date('2024-12-06T12:56:00') },
  { id: '2', name: 'Milind Mikajia', email: 'mimiku@yahoo.com', orders: 76, totalSpent: 21567, city: 'Manchester', lastSeen: new Date(Date.now() - 6 * 60 * 60 * 1000), lastOrder: new Date('2024-12-03T09:28:00') },
  { id: '3', name: 'Stanly Drinkwater', email: 'stelwasser@hotmail.com', orders: 69, totalSpent: 19872, city: 'Smallville', lastSeen: new Date(Date.now() - 43 * 60 * 1000), lastOrder: new Date('2024-12-04T12:56:00') },
  { id: '4', name: 'Josef Stravinsky', email: 'josefsky@bnkit.com', orders: 67, totalSpent: 17996, city: 'Metropolis', lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000), lastOrder: new Date('2024-12-04T10:16:00') },
  { id: '5', name: 'Igor Boribvson', email: 'vigison@technext.it', orders: 61, totalSpent: 16785, city: 'Central city', lastSeen: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), lastOrder: new Date('2024-11-28T07:00:00') },
  { id: '6', name: 'Katerina Karenin', email: 'karkat99@gmail.com', orders: 58, totalSpent: 14956, city: 'Gotham', lastSeen: new Date(Date.now() - 2 * 7 * 24 * 60 * 60 * 1000), lastOrder: new Date('2024-11-24T10:16:00') },
  { id: '7', name: 'Roy Anderson', email: 'andersonroy@netflix.chili', orders: 52, totalSpent: 12509, city: 'Vancouver', lastSeen: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), lastOrder: new Date('2024-11-18T05:43:00') },
  { id: '8', name: 'Martina scorcese', email: 'cesetina1@gmail.com', orders: 49, totalSpent: 11003, city: 'Viena', lastSeen: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000), lastOrder: new Date('2024-11-09T02:09:00') },
  { id: '9', name: 'Luis Buñuel', email: 'luisuel@live.com', orders: 44, totalSpent: 7897, city: 'Bangalore', lastSeen: new Date(Date.now() - 56 * 60 * 1000), lastOrder: new Date('2024-11-16T03:22:00') },
  { id: '10', name: 'Jean Renoir', email: 'renoi.jean1836@gmail.com', orders: 37, totalSpent: 7781, city: 'Chittagong', lastSeen: new Date(Date.now() - 24 * 60 * 60 * 1000), lastOrder: new Date('2024-11-07T08:00:00') },
  { id: '11', name: 'Ricky Antony', email: 'ricky@example.com', orders: 33, totalSpent: 7825, city: 'New Jersey', lastSeen: new Date(Date.now() - 1 * 60 * 60 * 1000), lastOrder: new Date('2024-10-18T08:00:00') },
  { id: '12', name: 'Charlie Chaplin', email: 'charlie@chaplin.com', orders: 28, totalSpent: 6500, city: 'London', lastSeen: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), lastOrder: new Date('2024-10-25T11:00:00') },
  { id: '13', name: 'Audrey Hepburn', email: 'audrey@classic.com', orders: 22, totalSpent: 5900, city: 'Paris', lastSeen: new Date(Date.now() - 3 * 60 * 60 * 1000), lastOrder: new Date('2024-10-30T14:30:00') },
  { id: '14', name: 'Humphrey Bogart', email: 'humphrey@bogart.com', orders: 15, totalSpent: 4100, city: 'Hollywood', lastSeen: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), lastOrder: new Date('2024-10-01T09:00:00') },
];

// Helper to format dates
const timeAgo = (date: Date): string => {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
};

const formatDate = (date: Date): string => {
    return date.toLocaleString('en-IN', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
};


export const useCustomersData = () => {
  const [data, setData] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // In a real app, this would be an async function dispatching Redux thunks
  useEffect(() => {
    setLoading(true);
    // Simulate API call delay
    const timer = setTimeout(() => {
      setData(mockCustomers);
      setLoading(false);
    }, 500); // Simulate 0.5 second loading
    return () => clearTimeout(timer);
  }, []); // Empty array means run once on mount

  // Memoize data formatting for performance
  const formattedData = useMemo(() => {
    return data.map(customer => ({
      ...customer,
      totalSpent: `₹${customer.totalSpent.toLocaleString()}`, // Format currency
      lastSeenFormatted: timeAgo(customer.lastSeen),
      lastOrderFormatted: formatDate(customer.lastOrder)
    }));
  }, [data]);

  return { data: formattedData, loading, error };
};