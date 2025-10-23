// src/components/ui/DataTable.tsx  <-- A new reusable component

import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import type {
    ColumnDef, // Import the ColumnDef type!
    SortingState,
} from "@tanstack/react-table"

import { ChevronUpIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// Make the component generic
interface DataTableProps<TData extends object> {
  data: TData[];
  columns: ColumnDef<TData>[]; // Columns are now a prop with a generic type
  onRowClick?: (row: TData)=> void
  isLoading?: boolean;
  error?: string | null;
}

export function DataTable<TData extends object>({ data, columns, onRowClick, isLoading, error }: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns, // Use the columns from props
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) {
    return <div className="text-center p-8 text-gray-400">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-400">Error: {error}</div>;
  }

  // The rest of your rendering logic is exactly the same!
  return (
    <div className="bg-gray-800 rounded-lg shadow-xl text-gray-300">
        <div className="overflow-x-auto relative">
            <table className="w-full text-sm">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id} className="border-b border-gray-700 bg-gray-900">
                            {headerGroup.headers.map(header => (
                                <th key={header.id} colSpan={header.colSpan} className="py-3 px-4 font-semibold text-left text-gray-400 uppercase cursor-pointer select-none" onClick={header.column.getToggleSortingHandler()}>
                                    <div className="flex items-center space-x-1">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {{
                                            asc: <ChevronUpIcon className="h-4 w-4 ml-1" />,
                                            desc: <ChevronDownIcon className="h-4 w-4 ml-1" />,
                                        }[header.column.getIsSorted() as string] ?? null}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr 
                        onClick={()=>onRowClick && onRowClick(row.original)}
                        key={row.id} 
                        className="border-b border-gray-700 hover:bg-gray-700"
                        >
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="py-3 px-4">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between p-4 border-t border-gray-700">
            <span className="text-sm text-gray-400">
                Page{' '}<strong>{table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</strong>
            </span>
            <div className="flex items-center space-x-2">
                <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="p-2 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50">
                    <ChevronLeftIcon className="h-5 w-5" />
                </button>
                <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="p-2 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50">
                    <ChevronRightIcon className="h-5 w-5" />
                </button>
            </div>
        </div>
    </div>
  );
}