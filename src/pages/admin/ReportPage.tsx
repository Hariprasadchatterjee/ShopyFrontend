// src/pages/admin/ReportsPage.tsx

import CustomerInsightsReport from "../../components/Admin/reports/CustomerInsightsReport";
import LowStockReport from "../../components/Admin/reports/LowStockReport";
import ProductPerformanceReport from "../../components/Admin/reports/ProductPerformanceReport";


const ReportsPage = () => {
  return (
    <div className="p-4 md:p-8 bg-gray-900 min-h-screen container mx-auto text-gray-100">
      <div>
        <h1 className="text-3xl text-center md:text-start font-bold text-white">Store Reports</h1>
        <p className="text-gray-500 mt-1">Analyze your store's performance from here.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Make the product report span the full width on large screens */}
        <div className="lg:col-span-2 ">
            <ProductPerformanceReport />
        </div>
        
        {/* Customer and Stock reports side-by-side */}
        <CustomerInsightsReport />
        <LowStockReport />
      </div>
    </div>
  );
};

export default ReportsPage;