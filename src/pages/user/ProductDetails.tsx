// src/components/ProductDetailPage.js

import React, { useState } from "react";

import { FaBuyNLarge } from "react-icons/fa";
import StarRating from "../../components/common/StarRating";

// --- Mock Data (replace with your API data) ---
const product = {
  name: "Premium Comfort T-Shirt",
  price: "$49.99",
  rating: 4.5,
  reviewCount: 117,
  description:
    "Experience the perfect blend of style and comfort with our Premium Comfort T-Shirt. Made from 100% ultra-soft, breathable cotton, this t-shirt is designed for all-day wear. Its modern fit and durable construction make it a staple for any wardrobe.",
  images: [
    "../../public/Images/products/product_1.png", // Main image
    "../../public/Images/products/product_14.png", // Thumbnail 1
    "../../public/Images/products/product_15.png", // Thumbnail 2
  ],
  stockCount: 12,
};

const relatedProducts = [
  {
    id: 1,
    name: "Classic Denim Jeans",
    price: "$89.99",
    imageUrl: "../../public/Images/products/product_10.png",
  },
  {
    id: 2,
    name: "Leather Biker Jacket",
    price: "$249.99",
    imageUrl: "../../public/Images/products/product_11.png",
  },
  {
    id: 3,
    name: "Urban Style Sneakers",
    price: "$120.00",
    imageUrl: "../../public/Images/products/product_12.png",
  },
  {
    id: 4,
    name: "Comfort Hoodie",
    price: "$65.00",
    imageUrl: "../../public/Images/products/product_13.png",
  },
];

const reviews = [
  {
    id: 1,
    author: "Hariprasad C.",
    avatarUrl: "/images/avatar1.png",
    rating: 5,
    date: "June 24, 2025",
    comment:
      "Absolutely love this t-shirt! The fabric is so soft and it fits perfectly. I've already ordered another one in a different color.",
  },
  {
    id: 2,
    author: "Jane Doe",
    avatarUrl: "/images/avatar2.png",
    rating: 4,
    date: "July 1, 2025",
    comment:
      "Great quality and very comfortable. It did shrink a tiny bit after the first wash, but it still fits well. Would recommend.",
  },
];

const ProductDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className=" font-sans">
      <div className="container mx-auto px-4 py-8 lg:px-8">
        {/* */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center justify-center">
          {/* */}
          <div className="space-y-4">
            <div className="bg-slate-900 p-4 rounded-lg shadow-md">
              <img
                src={selectedImage}
                alt="Main product"
                className="w-full h-auto object-cover rounded-lg transition-transform duration-300 ease-in-out"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`rounded-lg overflow-hidden border-2 ${
                    selectedImage === image
                      ? "border-indigo-500"
                      : "border-transparent"
                  } transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* */}
          <div>
            <h1 className="text-4xl font-extrabold text-orange-500 mb-2">
              {product.name}
            </h1>
            <div className="flex items-center mb-4">
              <StarRating rating={product.rating} />
              <a
                href="#reviews"
                className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                {product.reviewCount} reviews
              </a>
            </div>
            <p className="text-3xl font-bold text-white mb-6">
              {product.price}
            </p>
            <p className="text-white leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 items-center justify-center gap-4 mb-8">
              {/* */}
              <div className="flex items-center justify-center border border-gray-300 rounded-lg col-start-1 col-span-2 md:col-span-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 text-lg font-semibold text-white hover:bg-slate-800 rounded-l-lg"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="w-16 text-center border-none focus:ring-0 font-semibold text-white"
                />
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stockCount, q + 1))
                  }
                  className="px-4 py-2 text-lg font-semibold text-white hover:bg-slate-800 rounded-r-lg"
                >
                  +
                </button>
              </div>

              {/* */}
              <button className="flex-1 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>Add to Cart</span>
              </button>
              <button className="flex-1 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center space-x-2">
                <FaBuyNLarge className="text-3xl" />
                <p>Buy Now</p>
              </button>
            </div>
          </div>
        </div>

        {/* */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 rounded-lg shadow-md overflow-hidden group"
              >
                <a href="#" className="block">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-56 object-cover group-hover:opacity-80 transition-opacity duration-300"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white truncate">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-gray-600 font-bold">{item.price}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* */}
        <div id="reviews" className="mt-20">
          <div className="flex justify-around items-center">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Customer Reviews
            </h2>
            <button className="text-xl font-semibold font-mono text-white mb-8 text-center bg-orange-500 px-4 py-2 rounded-4xl cursor-pointer shadow-2xl">
              Rate Product
            </button>
          </div>
          <div className="max-w-4xl mx-auto space-y-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-slate-900 p-6 rounded-lg shadow-md flex space-x-4"
              >
                <img
                  src={review.avatarUrl}
                  alt={review.author}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-white">
                        {review.author}
                      </h4>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="mt-4 text-white">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
