// src/components/admin/reports/ProductPerformanceReport.tsx
import React from 'react';

const ProductPerformanceReport = () => {
  // Placeholder data - you would fetch this from your API
  const topProducts = [
    { id: 1, name: 'Premium Wireless Headphones', sku: 'PWH-001', unitsSold: 125, revenue: '₹2,49,875' },
    { id: 2, name: 'Smart Fitness Tracker', sku: 'SFT-002', unitsSold: 98, revenue: '₹1,46,902' },
    { id: 3, name: 'Organic Green Tea', sku: 'OGT-003', unitsSold: 210, revenue: '₹83,790' },
    { id: 4, name: 'Leather Messenger Bag', sku: 'LMB-004', unitsSold: 75, revenue: '₹2,24,925' },
    { id: 5, name: 'Yoga Mat Pro', sku: 'YMP-005', unitsSold: 150, revenue: '₹1,12,350' },
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-100 mb-4">Top Selling Products</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="p-3 font-semibold text-gray-100">Product Name</th>
              <th className="p-3 font-semibold text-gray-100">SKU</th>
              <th className="p-3 font-semibold text-gray-100">Units Sold</th>
              <th className="p-3 font-semibold text-gray-100">Total Revenue</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((product) => (
              <tr key={product.id} className="border-b hover:bg-green-500">
                <td className="p-3 text-gray-100">{product.name}</td>
                <td className="p-3 text-gray-100">{product.sku}</td>
                <td className="p-3 font-medium text-gray-100">{product.unitsSold}</td>
                <td className="p-3 font-medium text-gray-100">{product.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductPerformanceReport;