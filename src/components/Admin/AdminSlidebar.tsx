// src/components/admin/AdminSidebar.tsx
import  { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  ShoppingBagIcon,
  UsersIcon,
  CogIcon,
} from '@heroicons/react/24/outline'; // You'll need to install Heroicons if you haven't: npm install @heroicons/react
import { CiMenuFries } from "react-icons/ci";
import { RxCross1 } from 'react-icons/rx';
import { FaMotorcycle } from 'react-icons/fa';
import { SiSimpleanalytics } from "react-icons/si";
import { RiCoupon2Fill } from "react-icons/ri";


const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Define your navigation links
  const navLinks = [
    { name: 'Dashboard', icon: HomeIcon, path: '/admin' },
    { name: 'Products', icon: ShoppingBagIcon, path: '/admin/products' },
    { name: 'Orders', icon: FaMotorcycle , path: '/admin/orders' },
    { name: 'Customers', icon: UsersIcon, path: '/admin/customers' },
    { name: 'Reports', icon: SiSimpleanalytics , path: '/admin/reports' },
    { name: 'coupon', icon: RiCoupon2Fill  , path: '/admin/coupon' },
    { name: 'Setting', icon: CogIcon, path: '/admin/settings' },
  ];

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      <div className="md:hidden fixed top-3 left-4 z-50 ">
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-700 bg-white rounded-md shadow-md">
          {isOpen ? <RxCross1  className="h-6 w-6" /> : <CiMenuFries  className="h-6 w-6" />}
        </button>
      </div>

      {/* Overlay for mobile sidebar when open */}
      {isOpen && (
        <div
          className="inset-0 fixed opacity-20 bg-amber-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Desktop & Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-5 space-y-6 transform md:relative md:translate-x-0 transition duration-200 ease-in-out z-50
          ${isOpen ? 'translate-x-0 ' : '-translate-x-full'}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-100">Admin Panel</h2>
          {/* Close button for mobile */}
          <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-400 hover:text-white">
            <RxCross1 className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav>
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center space-x-2 p-3 my-2 rounded-lg transition duration-200 ease-in-out
                ${isActive
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
              onClick={() => setIsOpen(false)} // Close sidebar on link click for mobile
            >
              <link.icon className="h-6 w-6" />
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout Button (Example) */}
        <div className="absolute bottom-5 left-0 w-full px-5">
            <button className="flex items-center space-x-2 p-3 rounded-lg w-full bg-red-600 text-white hover:bg-red-700 transition duration-200 ease-in-out">
                <UsersIcon className="h-6 w-6" /> {/* Using a placeholder icon */}
                <span>Logout</span>
            </button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;