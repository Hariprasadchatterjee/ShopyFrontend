import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DocumentArrowDownIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../components/ui/DataTable";
import { useProductsData } from "../../hooks/productMockdata";
import type { Product } from "../../types/Product";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import ProductForm, { type IExistingImage, type IProductForm } from "../../components/ui/ProductForm";

const tabOptions = [
  { label: "All", count: 68817 },
  { label: "Published", count: 23426 },
  { label: "Drafts", count: 12 },
  { label: "On Discount", count: 120 },
];

const filterOptions = {
  Category: ["All", "Electronics", "Footwear", "Apparel"], // Matched to mock data
};

export type Category = "All" | "Electronics" | "Footwear" | "Apparel";

interface IFilter {
  categoryStatus: Category;
  searchTerm: string;
}
const initialFilters: IFilter = {
  categoryStatus: "All",
  searchTerm: "",
};

const ProductPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [filter, setFilter] = useState<IFilter>(initialFilters);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formMode, setFormMode] = useState<"closed" | "add" | "edit">("closed");
  // const navigate = useNavigate();
  const { data, isLoading, error } = useProductsData(); // Our custom hook

  const handleDeleteProduct = (
    event: React.MouseEvent<HTMLElement>,
    product: Product
  ) => {
    event.stopPropagation();
    alert(product.id);
  };

  const handleOpenAddForm = () => {
    setFormMode("add");
    setSelectedProduct(null);
  };

  const handleOpenEditForm = (product: Product) => {
    setFormMode("edit");
    setSelectedProduct({ ...product });
  };

  const handleCloseForm = () => {
    setFormMode("closed");
    setSelectedProduct(null);
  };

  const handleFormSubmit = async (formData: IProductForm, newFiles: File[], imagesToDelete: IExistingImage[])=>{
        console.log("--- Submitting Form ---");
        console.log("Mode:", formMode);
        console.log("Form Data:", formData);
        console.log("New Files:", newFiles);
        console.log("Images to Delete:", imagesToDelete);
        await new Promise(resolve => setTimeout(resolve, 1500));
        handleCloseForm();
  }

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "name",
        header: "PRODUCT",
        cell: ({ row }) => (
          <div className="flex items-center gap-4">
            <img
              src={row.original.imageUrl}
              alt={row.original.name}
              className="h-12 w-12 object-cover rounded-md"
            />
            <div className="flex flex-col">
              <span className="font-medium text-white hover:underline cursor-pointer">
                {row.original.name}
              </span>
              <span className="text-xs text-gray-400">
                {row.original.brand}
              </span>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "stock",
        header: "STOCK",
        cell: ({ row }) => {
          const stock = row.original.stock;
          let stockClass = "bg-green-500";
          if (stock < 100) stockClass = "bg-yellow-500";
          if (stock < 60) stockClass = "bg-red-500";
          return (
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${stockClass}`}></span>
              <span>{stock} in stock</span>
            </div>
          );
        },
      },
      {
        accessorKey: "price",
        header: "PRICE",
        cell: ({ row }) => {
          const price = `₹${row.original.price.toLocaleString("en-IN")}`;
          const salePrice = row.original.salePrice
            ? `₹${row.original.salePrice.toLocaleString("en-IN")}`
            : null;
          return (
            <div>
              {salePrice ? (
                <>
                  <span className="line-through text-gray-500">{price}</span>
                  <span className="ml-2 font-semibold text-white">
                    {salePrice}
                  </span>
                </>
              ) : (
                <span>{price}</span>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "category",
        header: "CATEGORY",
      },
      {
        accessorKey: "publishedOn",
        header: "PUBLISHED",
        cell: (info: { getValue: () => unknown }) => info.getValue(),
      },
      {
        id: "actions",
        header: "ACTIONS",
        cell: ({ row }) => (
          <div className="flex items-center gap-4">
            <button
              onClick={(event) => {
                event.stopPropagation();
                handleOpenEditForm(row.original);
              }}
              className="text-blue-400 hover:text-blue-300  font-medium cursor-pointer text-2xl"
            >
              <FaEdit />
            </button>
            <button
              onClick={(event) => handleDeleteProduct(event, row.original)}
              className="text-red-500 hover:text-red-400 text-2xl font-medium cursor-pointer"
            >
              <MdDeleteForever />
            </button>
          </div>
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
        (product) =>
          product.name?.toLowerCase().includes(searchTermLower) ||
          product.brand?.toLowerCase().includes(searchTermLower) ||
          product.id?.toLowerCase().includes(searchTermLower)
      );
    }

    // 2. Apply payment status filter (if not "All")
    if (filter.categoryStatus !== "All") {
      filteredData = filteredData.filter(
        (product) => product.category === filter.categoryStatus
      );
    }

    return filteredData;
  }, [data, filter]);

  return (
    <div className={`p-4 relative md:p-8 bg-gray-900 min-h-screen container mx-auto text-gray-100 `}>
      {formMode !== "closed" && (
        <div className="fixed inset-0 bg-transparent flex justify-center items-center z-50 p-4">
          <div className="w-full max-w-4xl h-[90vh] bg-slate-900 rounded-lg shadow-xl overflow-y-auto">
            <div className="p-6 border-b border-gray-700 flex justify-between       items-center sticky top-0 bg-gray-800 z-10">
              <h2 className="text-2xl font-bold text-white">
                {formMode === "add" ? "Add New Product" : "Edit Product"}
              </h2>
              <button
                onClick={handleCloseForm}
                className="text-gray-400 hover:text-white"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <ProductForm
              initialData={selectedProduct}
              onSubmit={handleFormSubmit}
              mode={formMode}
              status={"idle"}
            />
          </div>
        </div>
      )}
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
            value={filter.categoryStatus}
            onChange={(event) =>
              handleFilterChange(event.target.value, "categoryStatus")
            }
          >
            {filterOptions.Category.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>

          <button className="flex items-center px-4 py-2 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 transition-colors duration-200">
            <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
            <span>Export</span>
          </button>

          <button
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            onClick={() => handleOpenAddForm()}
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            <span>Add Product</span>
          </button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={filteredOrders || []}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default ProductPage;
