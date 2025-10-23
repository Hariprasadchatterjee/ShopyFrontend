import React, { useState } from 'react';
import { mockOrderDetailsData } from '../../hooks/orderdetailsMockData';

// --- Types and Data are now included in this file to resolve import errors ---

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

// Mock data is now defined locally

// --- End of included types and data ---

// In a real app, you would fetch this data based on an ID from the URL
// For example: const { data: order } = useOrderDetails(orderId);
const order: OrderDetails = mockOrderDetailsData;

const OrderDetailsPage: React.FC = () => {
  const [ordersts, setOrdersts] = useState<OrderDetails>(order);
  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
    const { name, value } = e.target;
    setOrdersts((prev)=>({...prev,[name]:value}))
  }

  return (
    <div className="bg-gray-900 min-h-screen p-4 md:p-8 text-gray-200">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-3xl text-center lg:text-start font-bold text-white">
            Order Details
          </h1>
          <p className="text-gray-400">
            Order <span className="text-blue-400 font-semibold">{order.orderId}</span>
          </p>
          <p className="text-sm text-gray-500">
            Placed on {order.date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Main Content: Order Table and Summary */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side: Product Table */}
          <div className="flex-grow bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Items in this Order</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                {/* Table Head */}
                <thead className="border-b border-gray-600 text-sm text-gray-400">
                  <tr>
                    <th className="py-3 pr-4">Product</th>
                    <th className="py-3 px-4">Brand</th>
                    <th className="py-3 px-4 text-right">Price</th>
                    <th className="py-3 px-4 text-center">Quantity</th>
                    <th className="py-3 pl-4 text-right">Total</th>
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                  {order.items.map((item: LineItem) => (
                    <tr key={item.productId} className="border-b border-gray-700">
                      {/* Product Column */}
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="h-16 w-16 object-cover rounded-md"
                          />
                          <span className="font-medium text-white">{item.name}</span>
                        </div>
                      </td>
                      {/* Brand Column */}
                      <td className="py-4 px-4 text-gray-400">{item.brand}</td>
                      {/* Price Column */}
                      <td className="py-4 px-4 text-right">{formatCurrency(item.price)}</td>
                      {/* Quantity Column */}
                      <td className="py-4 px-4 text-center">{item.quantity}</td>
                      {/* Total Column */}
                      <td className="py-4 pl-4 text-right font-semibold text-white">
                        {formatCurrency(item.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Side: Summary and Customer Info */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-white">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between"><span className="text-gray-400">Subtotal:</span> <span>{formatCurrency(order.subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Shipping:</span> <span>{formatCurrency(order.shipping)}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Tax (18%):</span> <span>{formatCurrency(order.tax)}</span></div>
                <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-gray-600 mt-2"><span>Grand Total:</span> <span>{formatCurrency(order.grandTotal)}</span></div>
              </div>

              {/* Status Update Section */}
              <h2 className="text-xl font-semibold mt-8 mb-4 text-white">Update Status</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="paymentStatus" className="block text-sm font-medium text-gray-400 mb-1">
                    Payment Status
                  </label>
                  <select
                    id="paymentStatus"
                    name="paymentStatus"
                    value={ordersts.paymentStatus}
                    onChange={handleStatusChange}
                    className="w-full bg-gray-700 text-white p-2 rounded-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="fulfilmentStatus" className="block text-sm font-medium text-gray-400 mb-1">
                    Fulfilment Status
                  </label>
                  <select
                    id="fulfilmentStatus"
                    name="fulfilmentStatus"
                    value={ordersts.fulfilmentStatus}
                    onChange={handleStatusChange}
                    className="w-full bg-gray-700 text-white p-2 rounded-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Fulfilled">Fulfilled</option>
                    <option value="Unfulfilled">Unfulfilled</option>
                    <option value="Processing">Processing</option>
                  </select>
                </div>
              </div>

              <h2 className="text-xl font-semibold mt-8 mb-4 text-white">Customer Details</h2>
              <div className="text-sm space-y-2">
                <p className="font-semibold text-white">{order.customer.name}</p>
                <p className="text-gray-400">{order.customer.email}</p>
                <p className="text-gray-400">{order.customer.shippingAddress}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;

