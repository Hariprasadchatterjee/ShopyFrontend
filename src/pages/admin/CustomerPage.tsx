// src/pages/admin/CustomersPage.tsx
import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";
import { useCustomersData } from "../../hooks/userCustomerData";
import type { Customer } from "../../types/Customer";
import { useNavigate } from "react-router-dom";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../components/ui/DataTable";

// Ensure this type is defined

const tabOptions = [
  { label: "All", count: 68817 },
  { label: "New", count: 6 },
  { label: "Top reviews", count: 2 },
];

const CustomersPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const navigate = useNavigate();
  const { data, loading, error } = useCustomersData(); // Our custom hook

  const handleDeleteCustomer = (event:React.MouseEvent<HTMLElement>, customer: Customer) => {
    event.stopPropagation();
    // In a real app, this would open a modal to change the role
    console.log("Attempting to delete for:", customer.name, "with ID:", customer.id);
    alert(`delete customer for ${customer.name}`); 
  };

  const handleCustomerDetails = (customer: Customer)=>{
      navigate(`/admin/customers/${customer.id}`);
  }

  const columns = React.useMemo<ColumnDef<Customer>[]>(()=>[
      {
        accessorKey: 'name',
        header: 'CUSTOMER',
        cell: ({ row }) => (
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 h-10 w-10 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {row.original.name.charAt(0)}
           </div>
            <span>{row.original.name}</span>
          </div>
        )
      },
      {
      accessorKey: 'email',
      header: 'EMAIL',
      // You absolutely need this line for your styling
      cell: (info) => <span className="text-blue-400 hover:underline cursor-pointer">{info.getValue() as string}</span>,
      },
      {
      accessorKey: 'orders',
      header: 'ORDERS',
      },
      {
      accessorKey: 'totalSpent',
      header: 'TOTAL SPENT',
      // Example: You could format this as currency
      cell: (info) => `${(info.getValue() as number)}`
      },
      {
        accessorKey: 'city',
        header: 'CITY',
        cell: (info: { getValue: () => unknown }) => info.getValue(),
      },
      {
        accessorKey: 'lastSeenFormatted', // Using the formatted field from the hook
        header: 'LAST SEEN',
        cell: (info: { getValue: () => unknown }) => info.getValue(),
      },
      {
        accessorKey: 'lastOrderFormatted',
        header: 'LAST ORDER',
        cell: (info: { getValue: () => unknown }) => info.getValue(),
      },
      {
      id: 'actions',
      header: 'ACTIONS',
      cell: ({ row }) => (
        <button onClick={(event) => handleDeleteCustomer(event, row.original)} className="text-red-500 hover:text-red-400 text-sm">
          Delete
        </button>
      ),
    },
  ],[])

  // --- Filtering logic (in real app, this would be done on the backend or in Redux) ---
  const filteredData = data.filter((customer: Customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    // Add logic for countryFilter, vipFilter, and tab filtering here
    return matchesSearch;
  });

  return (
    <div className="p-4 md:p-8 bg-gray-900 min-h-screen container mx-auto text-gray-100">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100 text-center md:text-start">Customers</h1>
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

      {/* Search and Filters Bar */}
      <div className="flex flex-wrap lg:flex-nowrap gap-4 flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-grow flex items-center bg-gray-700 rounded-md px-3 py-2 w-full md:w-auto focus:ring-2 focus:ring-indigo-500">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search customers"
            className="flex-grow bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap space-y-2 lg:flex-nowrap space-x-2 md:space-x-4 w-full md:w-auto">
          {/* Country Dropdown (Placeholder) */}
          <select
            className="bg-gray-700 text-gray-200 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
          >
            <option value="">Country</option>
            <option value="USA">USA</option>
            <option value="India">India</option>
            {/* Add more countries */}
          </select>

          <button className="flex items-center px-4 py-2 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 transition-colors duration-200">
            <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
            <span>Export</span>
          </button>

          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
            <PlusIcon className="h-5 w-5 mr-2" />
            <span>Add customer</span>
          </button>
        </div>
      </div>

      {/* Customer Table */}
      <DataTable columns={columns} data={filteredData || []} onRowClick={handleCustomerDetails} isLoading={loading} error={error} />
    </div>
  );
};

export default CustomersPage;
