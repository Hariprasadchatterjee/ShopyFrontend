import { Outlet } from "react-router-dom";
import Footer from "../common/Footer";
import Header from "../common/Header";

const UserLayout = () => {
  return (
    <>
      <Header />
      {/* Main Content */}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default UserLayout;
