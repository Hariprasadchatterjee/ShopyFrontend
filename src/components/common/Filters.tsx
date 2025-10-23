

const filterOptions = {
  categories: ["All", "T-Shirts", "Hoodies", "Jeans"],
  brands: ["Brand A", "Brand B", "Brand C"],
  priceRanges: [
    { label: "All", min: 0, max: Infinity },
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 to $100", min: 50, max: 100 },
    { label: "Over $100", min: 100, max: Infinity },
  ],
  ratings: [
    { label: "All", value: 0 },
    { label: "4 Stars & Up", value: 4 },
    { label: "3 Stars & Up", value: 3 },
    { label: "2 Stars & Up", value: 2 },
  ],
};
interface IFiterProps{
  activeFilterCount:number;
  filters:{
  category: string,
  brands: string[],
  pricerange: { label: string; min: number; max: number };
  rating: { label: string; value: number };
};
handleFilterChange:(name:any, value:any)=> void;
clearFilters: ()=>void
}
const FilterSlider = ({activeFilterCount, filters, handleFilterChange, clearFilters}:IFiterProps) => {
    return (
    <div className="space-y-4">
        <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-xl font-bold">Filters ({activeFilterCount})</h2>
        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Clear all
          </button>
        )}
      </div>
      {/* Categories Filter */}
      <div>
        <h2 className="mb-4 text-center text-2xl font-mono">Categories</h2>
        <div className="space-y-2 px-4">
          {filterOptions.categories.map((item, index) => {
            return (
              <button
                className={`bg-blue-200 text-black rounded-md block w-full  pl-4 py-2  text-md ${
                  filters.category === item
                    ? "bg-indigo-400 text-indigo-700"
                    : "hover:bg-gray-400"
                }`}
                key={index}
                onClick={() => handleFilterChange("category", item)}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {/* Brands Filter */}
      <div>
        <h2 className="mb-4 text-center text-2xl font-mono">Brands</h2>
        <div className="space-y-2 px-4">
          {filterOptions.brands.map((item, index) => {
            return (
              <label key={index} htmlFor="" className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="brand"
                  checked={filters.brands.includes(item)}
                  onChange={() => handleFilterChange("brands", item)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span>{item}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* priceRanges Filter */}
      <div>
        <h2 className="mb-4 text-center text-2xl font-mono">priceRanges</h2>
        <div className="space-y-2 px-4">
          {filterOptions.priceRanges.map((item, index) => {
            return (
              <label
                key={index}
                className="flex justify-start items-center gap-2"
              >
                <input
                  type="radio"
                  name="price"
                  checked={filters.pricerange.label === item.label}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  onChange={() => handleFilterChange("pricerange", item)}
                />
                <span>{item.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Ratings Filter */}
      <div>
        <h2 className="mb-4 text-center text-2xl font-mono">Ratings</h2>
        <div className="space-y-2 px-4">
          {filterOptions.ratings.map((item, index) => {
            return (
              <label
                key={index}
                className="flex justify-start items-center gap-2"
              >
                <input
                  type="radio"
                  name="rating"
                 checked={filters.rating.label === item.label}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  onChange={() => handleFilterChange("rating", item)}
                />
                <span>{item.label}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FilterSlider