// src/components/CartPage.js

import React, { useState, useMemo } from 'react';
import { Link, NavLink } from 'react-router-dom'; // Assuming you use React Router for navigation

// --- Mock Data (replace with your actual cart data from state management) ---
const initialCartItems = [
  {
    id: 1,
    name: 'Premium Comfort T-Shirt',
    href: '#',
    color: 'Navy',
    size: 'L',
    price: 49.99,
    quantity: 1,
    stock: 12,
    imageSrc: '../../public/headphone.avif',
    imageAlt: 'Comfortable navy t-shirt.',
  },
  {
    id: 2,
    name: 'Urban Style Sneakers',
    href: '#',
    color: 'White',
    size: '10',
    price: 120.00,
    quantity: 1,
    stock: 15,
    imageSrc: '../../public/showes.avif',
    imageAlt: 'White stylish sneakers.',
  },
];
// --- End Mock Data ---


const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleQuantityChange = ( id, newQuantity) => {
    // Ensure quantity is at least 1
    
    setCartItems(
      cartItems.map((item) => 
        item.id === id
          ? { ...item, quantity: Math.max(1, Math.min(item.stock, newQuantity)) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Calculate subtotal using useMemo for performance
  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const shippingEstimate = 5.00;
  const taxEstimate = useMemo(() => subtotal * 0.08, [subtotal]); // 8% tax
  const orderTotal = useMemo(() => subtotal + shippingEstimate + taxEstimate, [subtotal, shippingEstimate, taxEstimate]);

  // Handle empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="bg-slate-900 min-h-[60vh] flex items-center justify-center">
        <div className="text-center p-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          <h2 className="mt-4 text-2xl font-bold text-white">Your cart is empty</h2>
          <p className="mt-2 text-gray-600">Looks like you haven't added anything to your cart yet.</p>
          <Link
            to="/" // Link to your main products/home page
            className="mt-6 inline-block bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }


  return (
    <div className="bg-slate-800">
      <div className="container mx-auto px-4 py-8 lg:px-8 lg:py-16">
        <h1 className="text-3xl font-extrabold text-white mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-2 bg-slate-900 rounded-lg shadow-md p-6">
            <ul role="list" className="divide-y divide-gray-200">
              {cartItems.map((product) => (
                <li key={product.id} className="flex py-6">
                  <div className="h-24 w-24  rounded-md border border-gray-200">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1  flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-white">
                        <h3>
                          <a href={product.href}>{product.name}</a>
                        </h3>
                        <p className="ml-4">${(product.price * product.quantity).toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-sm text-white">{product.color} | {product.size}</p>
                    </div>
                    <div className="flex flex-1  items-end justify-between text-sm">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-gray-300 rounded">
                        <button onClick={() => handleQuantityChange(product.id, product.quantity - 1)} className="dicrement px-3 py-1 text-white hover:bg-gray-100">-</button>
                        <input type="text" readOnly value={product.quantity} className="w-12 text-center border-none focus:ring-0 text-white" />
                        <button onClick={() => handleQuantityChange(product.id, product.quantity + 1)} className="increment px-3 py-1 text-white hover:bg-gray-100">+</button>
                      </div>

                      <div className="flex">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(product.id)}
                          className="font-medium text-indigo-600 hover:text-indigo-500 flex items-center space-x-1"
                        >
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                            </svg>
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium text-white border-b pb-4">Order summary</h2>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-white">Subtotal</p>
                  <p className="text-sm font-medium text-white">${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-white">Shipping estimate</p>
                  <p className="text-sm font-medium text-white">${shippingEstimate.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <p className="text-sm text-white">Tax estimate</p>
                  <p className="text-sm font-medium text-white">${taxEstimate.toFixed(2)}</p>
                </div>
                <div className='flex items-center justify-center'>
                  <input placeholder='Voucher' type="text" name="" id="" className='w-full pl-4 pr-8 py-2 focus:outline-none focus:ring-2 ring-indigo-600 border rounded-l-2xl text-white'/>
                  <button className='py-2 px-4 border rounded-r-2xl text-white bg-orange-500'>Apply</button>
                </div>
                <div className="flex items-center justify-between text-base font-medium text-white pt-4 border-t">
                  <p>Order total</p>
                  <p>${orderTotal.toFixed(2)}</p>
                </div>
              </div>
              <div className="mt-6">
                <button
                  className="w-full bg-orange-500 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:bg-orange-600 transition-colors duration-300"
                >
                  <NavLink to="/shipping">
                  Proceed to Checkout
                  </NavLink>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CartPage;