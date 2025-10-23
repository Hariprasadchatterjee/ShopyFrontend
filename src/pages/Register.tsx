import React, { useState } from 'react'
import { FaEye } from 'react-icons/fa';
import { IoIosEyeOff } from 'react-icons/io';

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    return (
      
      <div className="min-h-[80vh] bg-gray-50 flex flex-col justify-center  sm:px-6 px-6 lg:px-8 rounded-4xl shadow-2xl w-[80%] lg:w-4xl mx-auto py-12 my-12 ">
        <div className=" md:flex justify-center items-center space-x-2 ">
        <div className="hidden lg:block">
          <figure >
            <img src="../../public/Screenshot 2025-10-02 184530.png" alt="" />
          </figure>
        </div>
        <div className="">
        <div className="sm:mx-auto  sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign Up to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a href="/login" className="font-medium text-orange-600 hover:text-indigo-500">
              already have an account
            </a>
          </p>
        </div>
  
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Name 
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="john doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address 
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
  
              <div className="">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={`${showPassword?"password":"text"}`}
                    autoComplete="current-password"
                    required
                    className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm `}
                    placeholder="••••••••"
                  />
                <span onClick={()=>setShowPassword(!showPassword)} className="absolute top-3 right-3 text-xl">{showPassword?<FaEye />:<IoIosEyeOff />}</span>
                </div>
              </div>

              <div className="">
                <label htmlFor="cfpassword" className="block text-sm font-medium text-gray-700">
                 Confirm Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="cfpassword"
                    name="password"
                    type={`${showPassword?"password":"text"}`}
                    autoComplete="current-password"
                    required
                    className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm `}
                    placeholder="••••••••"
                  />
                <span onClick={()=>setShowPassword(!showPassword)} className="absolute top-3 right-3 text-xl">{showPassword?<FaEye />:<IoIosEyeOff />}</span>
                </div>
              </div>
  
  
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      
        </div>
  
      </div>
      </div>
    );
}

export default RegisterPage