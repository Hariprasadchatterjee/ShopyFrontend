import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrdersData } from "../../hooks/OrderMockData";
import {
  DocumentArrowDownIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import type { ColumnDef } from "@tanstack/react-table";
import type { Order } from "../../types/Order";
import { DataTable } from "../../components/ui/DataTable";

const tabOptions = [
  { label: "All", count: 68817 },
  { label: "Pending payment", count: 6 },
  { label: "Unfulfiled", count: 2 },
];

const filterOptions = {
  paymentStatus: ["All", "Paid", "Failed", "Cancelled", "Pending"], // Matched to mock data
  fulfilmentStatus: [
    "All",
    "Fulfilled",
    "Processing", // Matched to mock data
    "Unfulfilled", // Corrected typo and matched to mock data
    "Cancelled", // Matched to mock data
  ],
};

// for status card type
type PaymentStatusMock = "Paid" | "Pending" | "Failed" | "Cancelled";
type FulfilmentStatusMock =
  | "Fulfilled"
  | "Unfulfilled"
  | "Processing"
  | "Cancelled";

export type PaymentStatus = "All" | "Paid" | "Failed" | "Cancelled" | "Pending";
export type FulfilmentStatus =
  | "All"
  | "Fulfilled"
  | "Processing"
  | "Unfulfilled"
  | "Cancelled";

interface IFilter {
  paymentStatus: PaymentStatus;
  fulfilmentStatus: FulfilmentStatus;
  searchTerm: string;
}
const initialFilters: IFilter = {
  paymentStatus: "All",
  fulfilmentStatus: "All",
  searchTerm: "",
};

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  // const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<IFilter>(initialFilters);
  const navigate = useNavigate();
  const { data, isLoading, error } = useOrdersData(); // Our custom hook

  const handleDeleteOrder = (
    event: React.MouseEvent<HTMLElement>,
    order: Order
  ) => {
    event.stopPropagation();
    alert(order.orderId);
  };

  const handleOrderDetails = (order: Order) => {
    navigate(`/admin/orders/${order.orderId}`);
  };

  const columns = useMemo<ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: "orderId",
        header: "ORDERID",
        // You absolutely need this line for your styling
        cell: (info) => (
          <span className="text-blue-400 hover:underline cursor-pointer">
            {info.getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "name",
        header: "CUSTOMER",
        cell: ({ row }) => (
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 h-10 w-10 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {row.original.customer?.name.charAt(0)}
            </div>
            <span>{row.original.customer?.name}</span>
          </div>
        ),
      },
      {
        accessorKey: "totals",
        header: "TOTALS",
        // Example: You could format this as currency
        cell: (info) => `${info.getValue() as number}`,
      },
      {
        accessorKey: "paymentStatus",
        header: "PAYMENT STATUS",
        cell: (info) => {
          const status = info.getValue() as PaymentStatusMock;
          const statusClass = {
            Paid: "bg-green-500/20 text-green-400",
            Pending: "bg-yellow-500/20 text-yellow-400",
            Failed: "bg-red-500/20 text-red-400",
            Cancelled: "bg-gray-500/20 text-gray-400",
          }[status];
          return (
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${statusClass}`}
            >
              {status}
            </span>
          );
        },
      },
      {
        accessorKey: "fulfilmentStatus", // Using the formatted field from the hook
        header: "FULFILMENT STATUS",
        cell: (info) => {
          const status = info.getValue() as FulfilmentStatusMock;
          const statusClass = {
            Fulfilled: "bg-blue-500/20 text-blue-400",
            Processing: "bg-purple-500/20 text-purple-400",
            Unfulfilled: "bg-orange-500/20 text-orange-400",
            Cancelled: "bg-gray-500/20 text-gray-400",
          }[status];
          return (
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${statusClass}`}
            >
              {status}
            </span>
          );
        },
      },
      {
        accessorKey: "deliveryType", // Using the formatted field from the hook
        header: "DELIVERY TYPE",
        cell: (info: { getValue: () => unknown }) => info.getValue(),
      },
      {
        accessorKey: "dateFormatted",
        header: "DATE",
        cell: (info: { getValue: () => unknown }) => info.getValue(),
      },
      {
        id: "actions",
        header: "ACTIONS",
        cell: ({ row }) => (
          <button
            onClick={(event) => handleDeleteOrder(event, row.original)}
            className="text-red-500 hover:text-red-400 text-sm"
          >
            Delete
          </button>
        ),
      },
    ],
    []
  );

  const handleFilterChange = (value: string, name: keyof IFilter) => {
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const filteredOrders = useMemo(() => {
    if (!data) {
      return [];
    }
    // Start with the full dataset
    let filteredData = [...data];

    // 1. Apply search term filter
    if (filter.searchTerm) {
      const searchTermLower = filter.searchTerm.toLowerCase();
      filteredData = filteredData.filter(
        (order) =>
          order.customer?.name.toLowerCase().includes(searchTermLower) ||
          order.orderId.toLowerCase().includes(searchTermLower)
      );
    }

    // 2. Apply payment status filter (if not "All")
    if (filter.paymentStatus !== "All") {
      filteredData = filteredData.filter(
        (order) => order.paymentStatus === filter.paymentStatus
      );
    }

    // 3. Apply fulfilment status filter (if not "All")
    if (filter.fulfilmentStatus !== "All") {
      filteredData = filteredData.filter(
        (order) => order.fulfilmentStatus === filter.fulfilmentStatus
      );
    }

    return filteredData;
  }, [data, filter]);

  return (
    <div className="p-4 md:p-8 bg-gray-900 min-h-screen container mx-auto text-gray-100">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100 text-center md:text-start">
          Orders
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap border-b border-gray-700 mb-6">
        {tabOptions.map((tab) => (
          <button
            key={tab.label}
            className={`py-2 px-4 text-sm font-medium focus:outline-none transition-colors duration-200
              ${
                activeTab === tab.label
                  ? "border-b-2 border-blue-500 text-blue-400"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.label} ({tab.count.toLocaleString()})
          </button>
        ))}
      </div>

      {/* Main body section */}
      <div className="flex flex-wrap lg:flex-nowrap gap-4 flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
        {/* Search and Filters Bar start*/}
        <div className="flex-grow flex items-center bg-gray-700 rounded-md px-3 py-2 w-full md:w-auto focus:ring-2 focus:ring-indigo-500">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search Orders"
            className="flex-grow bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none "
            value={filter.searchTerm}
            onChange={(e) => handleFilterChange(e.target.value, "searchTerm")}
          />
        </div>
        {/* Search and Filters Bar End*/}

        <div className="flex flex-wrap space-y-2 lg:flex-nowrap space-x-2 md:space-x-4 w-full md:w-auto">
          {/* Payment status Dropdown (Placeholder) */}
          <select
            className="bg-gray-700 text-gray-200 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            value={filter.paymentStatus}
            onChange={(event) =>
              handleFilterChange(event.target.value, "paymentStatus")
            }
          >
            {filterOptions.paymentStatus.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>

          {/* fulfilment status Dropdown (Placeholder) */}
          <select
            className="bg-gray-700 text-gray-200 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            value={filter.fulfilmentStatus}
            onChange={(event) =>
              handleFilterChange(event.target.value, "fulfilmentStatus")
            }
          >
            {filterOptions.fulfilmentStatus.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>

          <button className="flex items-center px-4 py-2 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 transition-colors duration-200">
            <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
            <span>Export</span>
          </button>

          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
            <PlusIcon className="h-5 w-5 mr-2" />
            <span>Add Order</span>
          </button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={filteredOrders || []}
        onRowClick={handleOrderDetails}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default OrdersPage;
