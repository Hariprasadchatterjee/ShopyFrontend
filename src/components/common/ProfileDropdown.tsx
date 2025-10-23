import { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FiGrid, FiUserPlus, FiLogOut } from 'react-icons/fi';
import { FaHeart, FaJediOrder } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

// Define a type for your user object for better code quality
interface User {
  name: string;
  avatarUrl: string;
  role: 'admin' | 'user';
}

const isLoggedIn = true;

// Demo user data - replace this with your actual user state from Redux/context
const demoUser: User = {
  name: 'Hariprasad C.',
  avatarUrl: 'https://prium.github.io/phoenix/v1.22.0/assets/img/icons/logo.png',
  role: 'admin', // Change to 'user' to see the Dashboard link disappear
};

export function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const user = demoUser; // In your real app, get this from your global state

  return (
    // The parent div must be relative to position the dropdown correctly
    
    <div  className="relative">
      {/* The Profile Icon that triggers the dropdown */}
      {
        isLoggedIn ? (<CgProfile size={30} onClick={() => setIsOpen(!isOpen)} className="cursor-pointer" />) : (<NavLink to="/login" className="bg-emerald-400 px-4 py-2 rounded-4xl font-mono font-semibold text-indigo-500">LogIN</NavLink>)
      }
      
      
      {/* The Dropdown Menu */}
      {isOpen && (
        <div 
          className="
            absolute top-10 right-0 mt-3 w-64 
            bg-slate-900 text-white rounded-lg shadow-xl border border-gray-200 z-50
            origin-top-right transition-all duration-500 ease-in-out
            transform opacity-100 scale-100
          "
        >
          <span className="absolute h-5 w-5 [clip-path:polygon(50%_0,_0_100%,_100%_100%)] bg-white -top-5 right-1 "></span>
          {/* User Info Header */}
          <div className="flex items-center space-x-4 p-4 border-b border-gray-200">
            <img src={user.avatarUrl} alt="User Avatar" className="h-12 w-12 rounded-full" />
            <div>
              <p className="font-semibold text-white">{user.name}</p>
              <p className="text-sm text-gray-500 capitalize">{user.role}</p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2 text-white">
            {/* profile */}
            <NavLink onClick={() => setIsOpen(!isOpen)} to="/profile" className="flex items-center space-x-3 px-4 py-2  hover:bg-slate-700">
            <CgProfile className="cursor-pointer" />
            <span>Profile</span>
            </NavLink>
            {/* Wish List */}
            <NavLink onClick={() => setIsOpen(!isOpen)} to="/wishlist" className="flex items-center space-x-3 px-4 py-2  hover:bg-slate-700">
            <FaHeart className="cursor-pointer text-red-500"  />
            <span>Wish List</span>
            </NavLink>

            {/* order List */}
            <NavLink onClick={() => setIsOpen(!isOpen)} to="/order" className="flex items-center space-x-3 px-4 py-2  hover:bg-slate-700">
            <FaJediOrder  className="cursor-pointer text-blue-500"  />
            <span>Order</span>
            </NavLink>

            {/* Conditional Dashboard Link for Admins */}
            {user.role === 'admin' && (
              <NavLink  to="/admin" className="flex items-center space-x-3 px-4 py-2  hover:bg-slate-700">
                <FiGrid />
                <span>Dashboard</span>
              </NavLink>
            )}

            <a href="/account/add" className="flex items-center space-x-3 px-4 py-2  hover:bg-slate-700">
              <FiUserPlus onClick={() => setIsOpen(!isOpen)} />
              <span>Add another account</span>
            </a>
          </div>

          {/* Sign Out Button */}
          <div className="border-t border-gray-600">
            <button  className="w-full text-left flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50">
              <FiLogOut />
              <span onClick={() => setIsOpen(!isOpen)}>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}