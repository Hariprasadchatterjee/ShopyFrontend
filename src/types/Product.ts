export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  slug?: string;
  price: number | string;
  salePrice?: number; // Optional: for items on sale
  currency: 'INR' | 'USD';
  imageUrl: string;
  images?: { url: string; public_id: string }[];
  stock: number;
  category: string;
  tags: string[];
  rating: number; // Average rating out of 5
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
  publishedOn?:string;
}