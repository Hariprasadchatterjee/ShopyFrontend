import React from "react";
import { UsersIcon, ClockIcon, BanknotesIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import SalesChart from "../../components/Admin/SalesChart";

// This is a reusable component for the stat cards
const StatCard = ({ title, value, icon: Icon, change, changeType }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-300">{title}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
      <div
        className={`text-sm mt-1 ${
          changeType === "increase" ? "text-green-500" : "text-red-500"
        }`}
      >
        {change}
      </div>
    </div>
    <div className="bg-blue-100 p-3 rounded-full">
      <Icon className="h-8 w-8 text-blue-600" />
    </div>
  </div>
);

const DashboardPage = () => {
  const salesChartData = {
    labels: [
      "Oct 8",
      "Oct 9",
      "Oct 10",
      "Oct 11",
      "Oct 12",
      "Oct 13",
      "Oct 14",
    ],
    salesData: [2200, 1950, 2500, 3100, 2800, 3500, 3300],
  };
  // Placeholder data - you would fetch this from your API
  const stats = [
    {
      title: "Total Revenue",
      value: "₹4,52,310",
      icon: BanknotesIcon ,
      change: "+12.5% from last month",
      changeType: "increase",
    },
    {
      title: "Total Orders",
      value: "2,315",
      icon: ClipboardDocumentListIcon ,
      change: "+5.1% from last month",
      changeType: "increase",
    },
    {
      title: "New Customers",
      value: "316",
      icon: UsersIcon,
      change: "-1.8% from last month",
      changeType: "decrease",
    },
    {
      title: "Pending Orders",
      value: "42",
      icon: ClockIcon,
      change: "Needs attention",
      changeType: "increase",
    },
  ];

  const recentOrders = [
    {
      id: "ORD001",
      customer: "Rohan Sharma",
      total: "₹2,500",
      status: "Shipped",
    },
    {
      id: "ORD002",
      customer: "Priya Patel",
      total: "₹1,250",
      status: "Pending",
    },
    {
      id: "ORD003",
      customer: "Amit Singh",
      total: "₹8,999",
      status: "Delivered",
    },
    { id: "ORD004", customer: "Sneha Reddy", total: "₹450", status: "Shipped" },
  ];

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white text-center md:text-start">
          Welcome back, Admin!
        </h1>
        <p className="text-gray-500 mt-1">
          Here's a snapshot of your store's performance.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Content Area: Chart and Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Sales Chart Placeholder */}
        <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">
            Sales Analytics
          </h2>
            <div>
              {/* Replace the placeholder div with the actual chart component */}
              <SalesChart chartData={salesChartData} />
            </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">
            Recent Orders
          </h2>
          <ul className="space-y-4">
            {recentOrders.map((order) => (
              <li key={order.id} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-200">
                    {order.customer}
                  </p>
                  <p className="text-sm text-gray-500">{order.id}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{order.total}</p>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
