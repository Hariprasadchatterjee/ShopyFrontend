import { FaHeart } from "react-icons/fa";
import StarRating from "./StarRating";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { EyeIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { MdDelete } from "react-icons/md";

const ProductCard = ({ item, moveToCart, isWishList, handleAll }) => {
  const [isFavourite, setIsFavourite] = useState(true);
  // const handleFavourite = () => {
  //   setIsFavourite((prev) => (prev ? false : true));
  // };


  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group ">
      <figure className=" relative bg-orange-400 ">
        {/* Product Image */}
        <img
          src={item.imageUrl}
          alt="phones"
          className=" w-full  object-cover object-center"
        />

        {/* Out of Stock Badge */}
        {!item.inStock && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
              Out of Stock
            </span>
          </div>
        )}

        {/* Add to wishlist */}
        
        {
          isWishList ? (
            <div className="absolute top-2 right-2 h-7 w-7 bg-emerald-600 rounded-full group-hover:flex justify-center items-center hidden transition-all duration-300">
          <FaHeart
            onClick={() => handleAll(item.id)}
            className={` cursor-pointer ${
              isFavourite ? "text-white" : "text-red-500"
            }`}
          />
        </div>
          )
         :( <div className="absolute bottom-2 right-2 h-7 w-7 bg-emerald-600 rounded-full group-hover:flex justify-center items-center hidden transition-all duration-300">
          <MdDelete 
            onClick={() => handleAll(item.id)}
            className={` cursor-pointer`}
          />
          </div>
          )
        }

        {/* View Product */}
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="flex items-center gap-1 px-3 py-1 bg-black bg-opacity-70 text-white text-sm rounded-md hover:bg-opacity-90 transition-colors">
            <NavLink to={`/products/${item.slug}`}>
              <EyeIcon className="h-3 w-3" />
              View
            </NavLink>
          </button>
        </div>
      </figure>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-center justify-around mb-2">
          <h3 className="font-mono font-semibold text-gray-900  ">
            {item.name}
          </h3>
          <p className="text-sm text-gray-500 ">
            {item.category}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center">
            <StarRating />
          </div>
          <span className="text-sm text-gray-600">
            ({item.rating}) • {item.reviewCount} reviews
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-gray-900">
            ${item.price.toFixed(2)}
          </span>
          {item.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${item.originalPrice.toFixed(2)}
            </span>
          )}
          {item.originalPrice && (
            <span className="text-sm font-medium text-green-600">
              Save ${(item.originalPrice - item.price).toFixed(2)}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => moveToCart(item.id)}
            disabled={!item.inStock}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              item.inStock
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <ShoppingBagIcon className="h-4 w-4" />
            {item.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;
