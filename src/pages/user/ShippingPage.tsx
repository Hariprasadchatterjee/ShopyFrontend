// src/pages/ShippingPage.js

import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom"; // Assuming you use React Router for navigation
import CheckoutSteps from "../../components/common/CheckoutSteps";

// 1. Define the "shape" of your form data with a type
type FormValues = {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

const ShippingPage = () => {
  const getInitialValues = (): FormValues => {
    const savedAddress = localStorage.getItem("shippingAddress");
    try {
      return savedAddress
        ? JSON.parse(savedAddress)
        : {
            address: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
          };
    } catch (error) {
      console.error(
        "Failed to parse shipping address from localStorage",
        error
      );
      return { address: "", city: "", state: "", postalCode: "", country: "" };
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    // Optional: Set default values if they exist in localStorage or global state
    defaultValues: getInitialValues(),
  });

  const navigate = useNavigate();

  const submitHandler = (data) => {
    // Save the shipping address to localStorage or global state
    localStorage.setItem("shippingAddress", JSON.stringify(data));
    console.log("Shipping data saved:", data);

    // Navigate to the next page
    navigate("/payment");
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <CheckoutSteps step1 step2 />

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Shipping Address
          </h1>
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                {...register("address", { required: "Address is required" })} // 5. Register the input
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                  errors.address
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-indigo-500"
                }`}
                placeholder="Enter your street address"
              />
              {/* 6. Display validation error */}
              {errors.address && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                {...register("country", { required: "Country is required" })}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  ${
                  errors.country
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-indigo-500"
                }`}
                placeholder="Enter your country"
              />
              {errors.country && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.country.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                {...register("state", { required: "State is required" })}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  ${
                  errors.state
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-indigo-500"
                }`}
                placeholder="Enter your state"
              />
              {errors.state && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.state.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                {...register("city", { required: "City is required" })}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  ${
                  errors.city
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-indigo-500"
                }`}
                placeholder="Enter your city"
              />
              {errors.city && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="postalCode"
                className="block text-sm font-medium text-gray-700"
              >
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                {...register("postalCode", {
                  required: "Postal Code is required",
                })}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                  errors.postalCode
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-indigo-500"
                }`}
                placeholder="Enter your postal code"
              />
              {errors.postalCode && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.postalCode.message}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row-reverse items-center gap-4 pt-4">
              <button
                type="submit"
                className="w-full sm:w-auto flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
               
                Continue to Payment
                
              </button>
              {/* 7. Button to go back without validation */}
              <button
                type="button"
                onClick={() => navigate("/cart")} // Navigate to the previous page
                className="w-full sm:w-auto flex justify-center py-3 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Back to Cart
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
