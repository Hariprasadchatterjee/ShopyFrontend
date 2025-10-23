// src/components/admin/reports/CustomerInsightsReport.tsx
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const CustomerInsightsReport = () => {
  // Placeholder data
  const customerData = {
    newCustomers: 450,
    returningCustomers: 150,
  };

  const topCustomers = [
      { id: 1, name: 'Rohan Sharma', spend: '₹45,200' },
      { id: 2, name: 'Priya Patel', spend: '₹32,800' },
      { id: 3, name: 'Amit Singh', spend: '₹28,500' },
  ];

  const chartData = {
    labels: ['New Customers', 'Returning Customers'],
    datasets: [
      {
        data: [customerData.newCustomers, customerData.returningCustomers],
        backgroundColor: ['#3B82F6', '#10B981'],
        borderColor: ['#FFFFFF', '#FFFFFF'],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-100 mb-4">Customer Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Doughnut Chart */}
        <div className="h-48 flex justify-center">
          <Doughnut data={chartData} options={{ responsive: true, maintainAspectRatio: false }}/>
        </div>

        {/* Top Customers List */}
        <div>
            <h3 className="font-semibold text-gray-100 mb-2">Top Customers by Spend</h3>
            <ul className="space-y-3">
                {topCustomers.map(customer => (
                    <li key={customer.id} className="flex justify-between items-center bg-gray-50 p-2 rounded-md">
                        <span className="text-gray-800">{customer.name}</span>
                        <span className="font-bold text-green-600">{customer.spend}</span>
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomerInsightsReport;