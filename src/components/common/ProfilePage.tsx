// src/components/ProfilePage.js

import React, { useState } from "react";
import {
  UserCircleIcon,
  MapPinIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { RxCross2 } from "react-icons/rx";

// --- Mock Data (replace with data from your API) ---
const user = {
  name: "Hariprasad Chatterjee",
  email: "hari.chatterjee@example.com",
  phone: "8391984603",
  gender: "Male",
  avatar: "", // Placeholder avatar
};

const initialAddresses = [
  {
    id: 1,
    type: "Home",
    address: "Taldi Sukantapally, Nagartala",
    city: "South 24 Parganas",
    state: "West Bengal",
    zip: "743376",
    isDefault: true,
  },
  {
    id: 2,
    type: "Work",
    address: "Asutosh College Rd, Bhowanipore",
    city: "Kolkata",
    state: "West Bengal",
    zip: "700025",
    isDefault: false,
  },
];
// --- End Mock Data ---

// ## Account Settings Component ##
const AccountSettings = () => {
  // TODO: Add state and handlers for form inputs
  const [isChange, setIsChange] = useState(false);
  const [personalInfo, setPersonalnfo] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    gender: user.gender,
    avatar: user.avatar,
  });
  const [password, setPassword] = useState({
    current_password: "",
    new_password: "",
  });

  const handlePersonalInformation = (e) => {
    const { name, value } = e.target;
    console.log("name", name);
    setPersonalnfo((prev) => ({ ...prev, [name]: value }));
  };
  const handlePassword = (e) => {
    const { name, value } = e.target;
    console.log("name", name);
    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleImageModel = () => {
    setIsChange((prev) => (prev ? false : true));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (!validTypes.includes(file.type)) {
        console.log("Please select a valid image file (JPEG, PNG, GIF)");
        return;
      }
      if (file.size <= maxSize) {
        console.log("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          // console.log("New avatar:", event.target.result);
          setPersonalnfo((prev) => ({
            ...prev,
            ["avatar"]: event.target.result,
          }));
        }
      };
      reader.readAsDataURL(file);
      // Upload the actual file to server
      uploadAvatarToServer(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(personalInfo);
  };
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log(password);
  };
  const uploadAvatarToServer = (file) => {
    console.log(file);
  };

  return (
    <>
      {isChange && (
        <div className="absolute h-[40%] w-[40%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transala shadow-xl transform transition-all duration-300 px-4 py-3 rounded-md bg-black/30 backdrop-blur-sm">
          <RxCross2
            onClick={handleToggleImageModel}
            className="right-4 text-4xl absolute text-white"
          />
          <div className="flex items-center justify-center flex-col h-full gap-2">
            {personalInfo?.avatar ? (
              <img
                className="w-20 h-20 rounded-full object-cover"
                src={personalInfo.avatar}
                alt="User avatar"
              />
            ) : (
              <img
                className="w-20 h-20 rounded-full object-cover"
                src="../../../public/Images/logo/defaultavatar.jpg"
                alt="User avatar"
              />
            )}

            <input
              onChange={handleAvatarChange}
              type="file"
              id="custom-upload"
              className="hidden"
              accept="image/*"
            />
            <label
              htmlFor="custom-upload"
              className="bg-slate-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              Choose File
            </label>
            <button>Add</button>
          </div>
        </div>
      )}
      <div className={`space-y-8 `}>
        {/* Profile Photo Section */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Profile Photo
          </h3>
          <div className="flex items-center space-x-4">
            {personalInfo?.avatar ? (
              <img
                className="w-20 h-20 rounded-full object-cover"
                src={personalInfo.avatar}
                alt="User avatar"
              />
            ) : (
              <img
                className="w-20 h-20 rounded-full object-cover"
                src="../../../public/Images/logo/defaultavatar.jpg"
                alt="User avatar"
              />
            )}
            <div>
              <button
                onClick={handleToggleImageModel}
                className=" px-4 py-2  text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Change
              </button>
              <button className="ml-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                Remove
              </button>
            </div>
          </div>
        </div>

        {/* Personal Information Section */}
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-white rounded-lg shadow-md space-y-4"
        >
          <h3 className="text-lg font-semibold text-gray-800">
            Personal Information
          </h3>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={user.name}
              onChange={(e) => handlePersonalInformation(e)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm focus:outline-none py-2 pr-4 focus:ring-2 pl-4"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              defaultValue={user.email}
              onChange={(e) => handlePersonalInformation(e)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm focus:outline-none py-2 pr-4 focus:ring-2 pl-4"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              defaultValue={user.phone}
              onChange={(e) => handlePersonalInformation(e)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm focus:outline-none py-2 pr-4 focus:ring-2 pl-4"
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <div className="flex gap-3">
              <div>
                <input
                  type="radio"
                  name="gender"
                  id="male"
                  value="Male"
                  checked={personalInfo.gender === "Male"}
                  onChange={(e) => handlePersonalInformation(e)}
                  className=""
                />{" "}
                <label htmlFor="gender" className="ml-2 text-gray-700">
                  Male
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  name="gender"
                  id="female"
                  value="Female"
                  checked={personalInfo.gender === "Female"}
                  onChange={(e) => handlePersonalInformation(e)}
                  className=""
                />{" "}
                <label htmlFor="gender" className="ml-2 text-gray-700">
                  Female
                </label>
              </div>
              <div className="mt-4 p-3 bg-gray-100 rounded">
                <p className="text-sm">
                  Current selection: <strong>{user.gender}</strong>
                </p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </form>

        {/* Change Password Section */}
        <form
          onSubmit={handlePasswordSubmit}
          className="p-6 bg-white rounded-lg shadow-md space-y-4"
        >
          <h3 className="text-lg font-semibold text-gray-800">
            Change Password
          </h3>
          <div>
            <label
              htmlFor="current-password"
              className="block text-sm font-medium text-gray-700"
            >
              Current Password
            </label>
            <input
              onChange={(e) => handlePassword(e)}
              type="password"
              name="current_password"
              id="current-password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm focus:outline-none py-2 pr-4 focus:ring-2 pl-4"
            />
          </div>
          <div>
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              onChange={(e) => handlePassword(e)}
              type="password"
              name="new_password"
              id="new-password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm focus:outline-none py-2 pr-4 focus:ring-2 pl-4"
            />
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

// ## Manage Address Component ##
const ManageAddress = () => {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    type: "Home",
    address: "",
    city: "",
    state: "",
    zip: "",
    isDefault: false,
  });

    // Reset form data
  const resetForm = () => {
    setFormData({
      type: "Home",
      address: "",
      city: "",
      state: "",
      zip: "",
      isDefault: false
    });
  };

  // TODO: Add handlers for add, edit, delete
  // Handle Add New Address button click
  const handleAddNew = () => {
    setIsAdding(true);
    setEditingId(null);
    resetForm()
  };

  const handleEdit = (addr) => {
    setEditingId(addr.id);
    setIsAdding(false);
    setFormData({
      type: addr.type,
      address: addr.address,
      city: addr.city,
      state: addr.state,
      zip: addr.zip,
      isDefault: addr.isDefault,
    });
  };

  const handleCancel = () =>{
    setIsAdding(false)
    setEditingId(null);
    resetForm();
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    }
  };

  const handleInputChange = (e) =>{
    const { name, value, type, checked } = e.target;
    setFormData(prev=>({
      ...prev,
      [name] : type === "checkbox" ? checked : value
    }))
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log("formData",formData);
    
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Manage Addresses</h2>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Add New Address
        </button>
      </div>

      {/* Add/Edit Address Form */}
      {(isAdding || editingId) && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {isAdding ? "Add New Address" : "Edit Address"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Address Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className={`w-full rounded-md border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 `}
                >
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Default Address Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isDefault"
                  id="isDefault"
                  checked={formData.isDefault}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="isDefault"
                  className="ml-2 text-sm text-gray-700"
                >
                  Set as default address
                </label>
              </div>

              {/* Address Line */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your street address"
                  className={`w-full rounded-md border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                    className={`w-full rounded-md border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 `}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="Enter state"
                    className={`w-full rounded-md border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 `}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    placeholder="Enter ZIP code"
                    maxLength="6"
                    className={`w-full rounded-md border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 `}
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="block mx-auto w-full space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  {isAdding ? "Add Address" : "Update Address"}
                </button>
              </div>

            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="p-6 bg-white rounded-lg shadow-md border border-gray-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <span
                  className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                    addr.isDefault
                      ? "bg-indigo-100 text-indigo-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {addr.type} {addr.isDefault && "(Default)"}
                </span>
                <p className="mt-2 font-semibold text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-600">
                  {addr.address}, {addr.city}
                </p>
                <p className="text-sm text-gray-600">
                  {addr.state} - {addr.zip}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(addr)}
                  className="p-2 text-gray-500 hover:text-indigo-600"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(addr.id)}
                  className="p-2 text-gray-500 hover:text-red-600"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ## Main Profile Page Component ##
const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("account");

  const navItems = [
    { id: "account", label: "Account", icon: UserCircleIcon },
    { id: "address", label: "Manage Address", icon: MapPinIcon },
  ];

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <div className="p-4 bg-white rounded-lg shadow-md">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium ${
                        activeTab === item.id
                          ? "bg-indigo-100 text-indigo-700"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <item.icon className="h-6 w-6" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Right Content Area */}
          <main className="lg:col-span-3">
            {activeTab === "account" && <AccountSettings />}
            {activeTab === "address" && <ManageAddress />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
