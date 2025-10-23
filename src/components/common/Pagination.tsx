import { generatePageNumbers } from "../Helper/generatePageNumbers"
  interface IPaginationProps{
    currentPage:number;
    totalPages:number;
    onPageChange:(currentPage:number)=>void
  }
const Pagination = ({currentPage, totalPages, onPageChange}:IPaginationProps) =>{
   const pageNumber = generatePageNumbers(totalPages, currentPage)

   const handlePrevious = ()=>{
    if (currentPage > 1) {
      
      onPageChange(currentPage - 1)
    }
   }
   const handleNext = ()=>{
    if (currentPage < totalPages) {
      
      onPageChange(currentPage + 1)
    }
   }
    return (
      <div className="flex justify-center items-center gap-2 mt-4">
        {/* Previous button */}
        <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm font-medium text-gray-700 rounded-md bg-white hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
          Prev
        </button>
        {
        pageNumber.map((page, i) => {
          // If the page is an ellipsis, render a non-clickable span
          if (page === '...') {
          return <span key={`ellipsis-${i}`} className="px-4 py-2 text-sm font-medium text-gray-700">...</span>;
        }

        const isActive = currentPage === page;
          return (
        <button
          className={`px-4 py-2 font-medium rounded-md transition-colors duration-200 ${
            isActive
          ? "bg-indigo-600 text-white shadow"
          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
          }`}
          key={i}
          onClick={() => {
            if (typeof page === "number") {
              onPageChange(page);
            }
          }}
        >
          {page}
        </button>
          );
        })
        }

         {/* Previous button */}
        <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-sm font-medium text-gray-700 rounded-md bg-white hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
          Next
        </button>
        
      </div>
    )
}

export default Pagination