// src/pages/admin/CustomerDetailPage.tsx

import { useParams, Link, useNavigate } from 'react-router-dom';
import { useOrdersData } from '../../hooks/OrderMockData';
import type { Order } from '../../types/Order';
import type { ColumnDef } from '@tanstack/react-table';
import React, { useMemo } from 'react';
import { DataTable } from '../../components/ui/DataTable';

const CustomerDetailPage = () => {
  // useParams() reads the dynamic parameter from the URL (e.g., the '123' in '/customers/123')
  // const { customerId } = useParams();
  // In a real app, you would use this ID to fetch the specific customer's data from your API
  // useEffect(() => {
  //   dispatch(fetchCustomerById(customerId));
  // }, [customerId, dispatch]);
  const navigate = useNavigate();
  const { data, isLoading, error } = useOrdersData();

  const handleDeleteOrder = (event:React.MouseEvent<HTMLElement>, order:Order)=>{
    event.stopPropagation();
       alert(order.orderId) 
  }

  const handleOrderDetails = (order: Order)=>{
    navigate(`/admin/customers/${order.orderId}`);
  }

    const columns = useMemo<ColumnDef<Order>[]>(()=>[
        {
        accessorKey: 'orderId',
        header: 'ORDERID',
        // You absolutely need this line for your styling
        cell: (info) => <span className="text-blue-400 hover:underline cursor-pointer">{info.getValue() as string}</span>,
        },
        {
        accessorKey: 'totals',
        header: 'TOTALS',
        // Example: You could format this as currency
        cell: (info) => `${(info.getValue() as number)}`
        },
        {
          accessorKey: 'paymentStatus',
          header: 'PAYMENT STS',
          cell: (info: { getValue: () => unknown }) => info.getValue(),
        },
        {
          accessorKey: 'fulfilmentStatus', // Using the formatted field from the hook
          header: 'FULFILMENT STS',
          cell: (info: { getValue: () => unknown }) => info.getValue(),
        },
        {
          accessorKey: 'deliveryType', // Using the formatted field from the hook
          header: 'DELIVERY TYPE',
          cell: (info: { getValue: () => unknown }) => info.getValue(),
        },
        {
          accessorKey: 'dateFormatted',
          header: 'DATE',
          cell: (info: { getValue: () => unknown }) => info.getValue(),
        },
        {
        id: 'actions',
        header: 'ACTIONS',
        cell: ({ row }) => (
          <button onClick={(event) => handleDeleteOrder(event, row.original)} className="text-red-500 hover:text-red-400 text-sm">
            Delete
          </button>
        ),
      },
    ],[])

  return (
    <div className="p-4 md:p-8 bg-gray-900 min-h-screen container mx-auto text-gray-100">
      <Link to="/admin/customers" className="text-blue-400 hover:underline mb-6 block">
        &larr; Back to Customers
      </Link>
      <div className='mb-4'>
      <h1 className="text-3xl font-bold">Customer Details</h1>
      </div>
      {/* You would display the full customer profile here */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">

          <div className="profile_section grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 grid-cols-1 lg:col-span-1 w-full gap-2">
            <div className="relative customer p-4 bg-gray-700 text-white border border-gray-500 rounded-md">
                <div className='flex flex-col  md:flex-row md:justify-center justify-start items-start md:items-center gap-6 pl-8 md:pl-0'>
                    <figure >
                      <img src="https://prium.github.io/phoenix/v1.22.0/assets/img/team/15.webp" alt="customerimage" className='w-30 rounded-full'/>
                    </figure>
                    <div className='flex flex-col items-start justify-center space-y-2'>
                        <h2 className='text-xl font-semibold font-mono'>Hariprasad Chatterjee</h2>
                        <p className='text-gray-300'>Joined 3 months ago</p>
                    </div>
                </div>
                <div>

                </div>
            </div>
            <div className="relative address p-4 bg-gray-700 rounded-md text-white border border-gray-500">
              <h2 className='text-xl font-semibold font-mono mb-2'>Default Address</h2>
              <div className="flex flex-col space-y-4 items-start justify-center">
                <div>
                  <p className='text-gray-400'>Address</p>
                  <p className='text-gray-400'>Shatinon Mekalan</p>
                  <p className='text-gray-400'>Vancouver, British Columbia</p>
                  <p className='text-gray-400'>Canada</p>
                </div>
                <div>
                  <p className='text-gray-400'>Email</p>
                  <p className='text-blue-400'>shatinon@jeemail.com</p>
                </div>
                <div>
                  <p className='text-gray-400'>Phone</p>
                  <p className='text-gray-400'>+1234567890</p>
                </div>
              </div>
            </div>
          </div>

          <div className="orders lg:col-span-2 w-full">
              <DataTable columns={columns } data={data || [] } onRowClick={handleOrderDetails} isLoading={isLoading} error={error}/>
          </div>

      </div>
    </div>
  );
};

export default CustomerDetailPage;