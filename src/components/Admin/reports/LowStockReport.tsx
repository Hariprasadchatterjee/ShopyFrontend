// src/components/admin/reports/LowStockReport.tsx
import React from 'react';

const LowStockReport = () => {
  // Placeholder data
  const lowStockItems = [
    { id: 1, name: 'Premium Wireless Headphones', sku: 'PWH-001', stock: 8 },
    { id: 2, name: 'Leather Messenger Bag', sku: 'LMB-004', stock: 12 },
    { id: 3, name: 'Smart Fitness Tracker', sku: 'SFT-002', stock: 5 },
    { id: 4, name: 'Gourmet Coffee Beans', sku: 'GCB-007', stock: 19 },
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-100 mb-4">Low Stock Items</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-green-500">
            <th className="p-3 font-semibold text-gray-100">Product Name</th>
            <th className="p-3 font-semibold text-gray-100">SKU</th>
            <th className="p-3 font-semibold text-gray-100">Stock on Hand</th>
          </tr>
        </thead>
        <tbody>
          {lowStockItems.map((item) => (
            <tr key={item.id} className="border-b hover:bg-green-500">
              <td className="p-3 text-gray-100">{item.name}</td>
              <td className="p-3 text-gray-100">{item.sku}</td>
              <td className={`p-3 font-bold ${item.stock < 10 ? 'text-red-600' : 'text-yellow-600'}`}>
                {item.stock}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LowStockReport;