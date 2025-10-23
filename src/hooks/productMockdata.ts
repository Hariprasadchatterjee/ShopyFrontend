import { useEffect, useMemo, useState } from 'react';
import type { Product } from '../types/Product';

export const mockProducts: Product[] = [
  {
    id: 'PROD-001',
    name: 'Galaxy Nova Smartphone',
    brand: 'StellarTech',
    description: 'The latest flagship smartphone with a stunning 120Hz AMOLED display, a triple-camera system, and blazing-fast 5G connectivity.',
    price: 74999,
    salePrice: 69999,
    currency: 'INR',
    imageUrl: 'https://placehold.co/600x600/334155/FFFFFF?text=Galaxy+Nova',
    stock: 150,
    category: 'Electronics',
    tags: ['smartphone', '5g', 'camera', 'android'],
    rating: 4.8,
    reviewCount: 215,
    createdAt: new Date('2025-09-01T10:00:00Z'),
    updatedAt: new Date('2025-10-15T14:30:00Z'),
  },
  {
    id: 'PROD-002',
    name: 'AeroBook Pro Laptop',
    brand: 'Zenith',
    description: 'A powerful and lightweight ultrabook designed for professionals on the go. Features an Intel Core i7 processor, 16GB RAM, and a 1TB NVMe SSD.',
    price: 129999,
    currency: 'INR',
    imageUrl: 'https://placehold.co/600x600/475569/FFFFFF?text=AeroBook+Pro',
    stock: 75,
    category: 'Electronics',
    tags: ['laptop', 'ultrabook', 'intel', 'professional'],
    rating: 4.9,
    reviewCount: 120,
    createdAt: new Date('2025-08-15T11:20:00Z'),
    updatedAt: new Date('2025-10-10T18:00:00Z'),
  },
  {
    id: 'PROD-003',
    name: 'Urban Explorer Sneakers',
    brand: 'Kicks Co.',
    description: 'Comfortable and stylish sneakers perfect for everyday wear. Made with breathable mesh and a durable rubber sole.',
    price: 4999,
    currency: 'INR',
    imageUrl: 'https://placehold.co/600x600/64748B/FFFFFF?text=Urban+Sneakers',
    stock: 300,
    category: 'Footwear',
    tags: ['shoes', 'sneakers', 'casual', 'lifestyle'],
    rating: 4.5,
    reviewCount: 350,
    createdAt: new Date('2025-07-20T09:00:00Z'),
    updatedAt: new Date('2025-10-16T12:00:00Z'),
  },
  {
    id: 'PROD-004',
    name: 'SoundWave+ Wireless Headphones',
    brand: 'AudioPhonic',
    description: 'Immerse yourself in high-fidelity audio with these noise-cancelling wireless headphones. 30-hour battery life and crystal-clear microphone.',
    price: 14999,
    salePrice: 12499,
    currency: 'INR',
    imageUrl: 'https://placehold.co/600x600/1E293B/FFFFFF?text=SoundWave+',
    stock: 220,
    category: 'Electronics',
    tags: ['headphones', 'audio', 'wireless', 'noise-cancelling'],
    rating: 4.7,
    reviewCount: 188,
    createdAt: new Date('2025-09-10T15:00:00Z'),
    updatedAt: new Date('2025-10-14T09:45:00Z'),
  },
  {
    id: 'PROD-005',
    name: 'Classic Cotton T-Shirt',
    brand: 'Threads',
    description: 'A soft and durable 100% premium cotton t-shirt. An essential wardrobe staple available in multiple colors.',
    price: 999,
    currency: 'INR',
    imageUrl: 'https://placehold.co/600x600/94A3B8/FFFFFF?text=Classic+T-Shirt',
    stock: 500,
    category: 'Apparel',
    tags: ['t-shirt', 'clothing', 'casual', 'cotton'],
    rating: 4.6,
    reviewCount: 512,
    createdAt: new Date('2025-06-01T08:00:00Z'),
    updatedAt: new Date('2025-10-17T03:23:00Z'),
  },
];

const formatDate = (date : Date)=>{
  return date.toLocaleString("en-IN",{
    month:"short",
    day:"numeric",
    hour:"numeric",
    minute:"numeric",
    hour12:true,
  })
}

export const useProductsData = () => {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // In a real app, this would be an async function dispatching Redux thunks
  useEffect(() => {
    setLoading(true);
    // Simulate API call delay
    const timer = setTimeout(() => {
      setData(mockProducts);
      setLoading(false);
    }, 500); // Simulate 0.5 second loading
    return () => clearTimeout(timer);
  }, []); // Empty array means run once on mount

  // Memoize data formatting for performance
  const formattedData = useMemo(() => {
    return data.map(product => ({
      ...product,
      price: `₹${product.price.toLocaleString()}`, // Format currency
      publishedOn: formatDate(product.createdAt)
    }));
  }, [data]);

  return { data: formattedData, isLoading, error };
};
