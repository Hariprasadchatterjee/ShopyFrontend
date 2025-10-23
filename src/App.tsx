import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/user/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ProductDetailPage from "./pages/user/ProductDetails";
import CartPage from "./pages/user/Cart";
import AllProductsPage from "./pages/user/AllProductsPage";
import ProfilePage from "./components/common/ProfilePage";
import WishlistPage from "./pages/user/WishList";
import OrderPage from "./pages/user/OrderPage";
import ShippingPage from "./pages/user/ShippingPage";
import PaymentPage from "./pages/user/PaymentPage";
import PlaceOrderPage from "./pages/user/PlaceOrderPage";
import SuccessPage from "./pages/user/SuccessPage";
import AdminLayout from "./components/Layout/AdminLayout";
import NotFoundPage from "./pages/NotFound";
import ProtectedRoute from "./components/Helper/ProtectedRoute";
import DashboardPage from "./pages/admin/DashboardPage";
import ProductPage from "./pages/admin/ProductPage";
import CustomerPage from "./pages/admin/CustomerPage";
import OrdersPage from "./pages/admin/OrdersPage";
import ReportsPage from "./pages/admin/ReportPage";
import SettingPage from "./pages/admin/SettingPage";
import CouponPage from "./pages/admin/CouponPage";
import CustomerDetailPage from "./pages/admin/CustomerDetailPage";
import OrderDetailPage from "./pages/admin/OrderDetailPage";
import AddProductPage from "./pages/admin/AddProductPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* User Layout */}
          <Route path="/" element={<UserLayout />}>
            {/* ================================================================== */}
            {/* 🛒 User Layout & Routes                                           */}
            {/* All public-facing routes will have the UserLayout (e.g., Navbar, Footer) */}
            {/* ================================================================== */}
            <Route index element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/product/:name" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/allproducts" element={<AllProductsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/Payment" element={<PaymentPage />} />
            <Route path="/placeorder" element={<PlaceOrderPage />} />
            <Route path="/success" element={<SuccessPage />} />
          </Route>

          {/* Admin Layout */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="products" element={<ProductPage />} />
            <Route path="addproducts" element={<AddProductPage />} />
            <Route path="customers" element={<CustomerPage />} />
            <Route path="customers/:customerId" element={<CustomerDetailPage />} /> 
            <Route path="orders" element={<OrdersPage />} />
            <Route path="orders/:orderId" element={<OrderDetailPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="coupon" element={<CouponPage />} />
            <Route path="setting" element={<SettingPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
