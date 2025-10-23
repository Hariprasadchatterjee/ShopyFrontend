import { Outlet } from "react-router-dom";
import AdminSidebar from "../Admin/AdminSlidebar";


const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto bg-black">
        {/* The specific admin page (e.g., Dashboard) will be rendered here */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
