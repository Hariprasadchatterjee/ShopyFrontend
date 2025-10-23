import { useMemo, useState } from "react";

import { FaFilter } from "react-icons/fa";
import FilterSlider from "../../components/common/Filters";
import ProductCard from "../../components/common/ProductCard";
import Pagination from "../../components/common/Pagination";



// --- Mock Data (replace with your API data) ---
const mockProducts = Array.from({ length: 45 }, (_, i) => ({
  id: i + 1,
  name: `Product Name ${i + 1}`,
  category: ["T-Shirts", "Hoodies", "Jeans"][i % 3],
  brand: ["Brand A", "Brand B", "Brand C"][i % 3],
  price: 29.99 + i * 5,
  originalPrice: 229.99 + i * 5,
  imageUrl: `public/Images/products/product_${i + 1}.png`,
  rating: 3.5 + (i % 15) / 10,
  reviewCount: 10 + i * 2,
  inStock: 10 + i * 2,
}));

type Filters = {
  category: string;
  brands: string[];
  pricerange: { label: string; min: number; max: number };
  rating: { label: string; value: number };
};

const initialFilters: Filters = {
  category: "All",
  brands: [],
  pricerange: { label: "All", min: 0, max: Infinity },
  rating: { label: "All", value: 0 },
};

const AllProductsPage = () => {
  const productsPerPage = 10;
  const [filters, setFilter] = useState<Filters>(initialFilters);
  const [isFilterOpen, setisFilterOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.category && filters.category !== "All") {
      count++;
    }
    if (filters.pricerange && filters.pricerange.label !== "All") {
      count++;
    }
    if (filters.rating && filters.rating.label !== "All") {
      count++;
    }

    count += filters.brands.length;

    return count;
  }, [filters]);

  const clearFilters = () => {
    setFilter(initialFilters);
  };

  const handleFilterChange = (name: string, value: string) => {
    setCurrentPage(1);
    if (name === "brands") {
      const newBrands = filters.brands.includes(value)
        ? filters.brands.filter((item) => item !== value)
        : [...filters.brands, value];
      setFilter((prev) => ({ ...prev, [name]: newBrands }));
    } else {
      setFilter((prev) => ({ ...prev, [name]: value }));
    }
  };

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const categoryMatch =
        filters.category === "All" || filters.category === product.category;

      const brandMatch =
        filters.brands.length === 0 || filters.brands.includes(product.brand);

      const priceMatch =
        product.price >= filters.pricerange.min &&
        product.price <= filters.pricerange.max;

      const ratingMatch = product.rating >= filters.rating.value;

      return categoryMatch && priceMatch && brandMatch && ratingMatch;
    });
  }, [filters]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const moveToCart = () => {
    console.log("moved");
  };
  const AddedToWishList = () => {
    console.log("moved");
  };
  return (
    <div className="container mx-auto py-4 px-8">
      {/* Mobile Filter section */}
      <div className="lg:hidden block">
        <div
          className={`fixed inset-0 max-w-xs w-full h-[100vh] overflow-y-hidden shadow-2xl transform transition-transform duration-300 bg-white z-50 ${
            isFilterOpen ? "translate-x-0" : "-translate-x-100"
          }`}
        >
          <div className="py-4 w-full">
            <div className=" flex justify-center items-center">
              <button onClick={() => setisFilterOpen(false)}>Cross</button>
            </div>
            <FilterSlider
              activeFilterCount={activeFilterCount}
              filters={filters}
              handleFilterChange={handleFilterChange}
              clearFilters={clearFilters}
            />
          </div>
        </div>
      </div>

      {/* Desktop Filter Section */}
      <div className="lg:grid md:grid-cols-4 lg:gap-4">
        <div className="lg:col-span-1 hidden lg:block">
          <div className="sticky top-8 max-w-xs w-full bg-white shadow-xl  overflow-y-auto z-50 rounded-2xl">
            <div className="py-4 w-full">
              <FilterSlider
                activeFilterCount={activeFilterCount}
                filters={filters}
                handleFilterChange={handleFilterChange}
                clearFilters={clearFilters}
              />
            </div>
          </div>
        </div>

        {/* Product Section */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-white">
              {filteredProducts.length} Products Found
            </p>

            <button
              type="button"
              className="relative flex border rounded-xl p-2 text-gray-400 hover:text-gray-500 lg:hidden"
              onClick={() => setisFilterOpen(!isFilterOpen)}
            >
              <FaFilter className="w-5 h-5" aria-hidden="true" />
              <span className="ml-2 text-sm font-medium">Filters</span>
              <span className="absolute -top-2 right-0 h-5 w-5 bg-red-500 rounded-full flex justify-center items-center">
                {activeFilterCount}
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {currentProducts.map((item) => (
              <ProductCard
                moveToCart={moveToCart}
                key={item.id}
                item={item}
                isWishList={true}
                handleAll={AddedToWishList}
              />
            ))}
          </div>
          {/* pagination section */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default AllProductsPage;
