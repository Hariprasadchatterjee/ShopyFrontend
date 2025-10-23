import { useEffect, useState } from "react";

import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import ProductCard from "../../components/common/ProductCard";

export interface IWishProduct {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  imageUrl: string;
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  slug: string;
}

const mockWishlistItems: IWishProduct[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 129.99,
    originalPrice: 159.99,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    slug: "wireless-bluetooth-headphones",
  },
  {
    id: 2,
    name: "Minimalist Watch",
    price: 89.99,
    originalPrice: 119.99,
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    category: "Accessories",
    rating: 4.2,
    reviewCount: 64,
    inStock: true,
    slug: "minimalist-watch",
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    originalPrice: 39.99,
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    category: "Clothing",
    rating: 4.7,
    reviewCount: 89,
    inStock: false,
    slug: "organic-cotton-tshirt",
  },
  {
    id: 4,
    name: "Smart Fitness Tracker",
    price: 79.99,
    originalPrice: 99.99,
    imageUrl:
      "https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.3,
    reviewCount: 203,
    inStock: true,
    slug: "smart-fitness-tracker",
  },
];

const WishList = () => {
  const [wishlistItems, setWishliatItems] = useState<IWishProduct[]>([]);
  const [loading, setloading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<
    "date-added" | "price-low-high" | "price-high-low" | "name" | "rating"
  >("date-added");
  const [selectedItems, setSelecteditems] = useState(new Set());

  const fetchProducts = () => {
    try {
      setTimeout(() => {
        setWishliatItems(mockWishlistItems);
        setloading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectAllItems = () => {
    if (wishlistItems.length === selectedItems.size) {
      setSelecteditems(new Set());
      console.log("selectedItems", selectedItems);
    } else {
      setSelecteditems(new Set(wishlistItems.map((item) => item.id)));
      console.log("selectedItems", selectedItems);
    }
  };

  const moveToCart = (itemId: number) => {
    console.log('Moving item to cart:', itemId);
    removeFromWishlist(itemId)
  };

  const removeFromWishlist = (itemId: number) => {
    const updateWishlist =  wishlistItems.filter(item=> item.id !== itemId);
    setWishliatItems(updateWishlist)
    setSelecteditems((prev)=>{
      const newSelected = new Set(prev);
        newSelected.delete(itemId);
        return newSelected
      }
    )
  };

  const handleMoveAllItems = () =>{
    console.log('Moving selected items to cart:', Array.from(selectedItems));
    handleAllClear()
  };

  const handleAllClear = () =>{
    setWishliatItems( (prev)=> (prev.filter(item => !selectedItems.has(item.id))))
    setSelecteditems(new Set())
  };

  const sortedProducts = [...wishlistItems].sort((a, b)=>{
        switch (sortBy) {
          case 'price-low-high':
            return a.price - b.price;
          case "price-high-low":
            return b.price - a.price;
          case "name":
            return a.name.localeCompare(b.name);
          case "rating":
            return b.rating - a.rating;
          default:
             return 0; // date-added - keep original order
        }
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-4">
                  <div className="h-48 bg-gray-900 rounded mb-4"></div>
                  <div className="h-4 bg-slate-900 rounded mb-2"></div>
                  <div className="h-4 bg-gray-500 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 py-4">
      {/* if wishlist is empty */}
      {wishlistItems?.length === 0 && (
        <div className="flex flex-col justify-center items-center gap-4 h-[50vh]">
          <h2 className="text-2xl font-bold text-white mb-4">
            Your WishList is Empty{" "}
          </h2>
          <p className="text-gray-200 mb-8">
            {" "}
            Save items you love to your wishlist. Review them anytime and easily
            move them to your cart.
          </p>
          <NavLink to="/">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors">
              <ShoppingBagIcon className="h-5 w-5" />
              Start Shopping
            </button>
          </NavLink>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-around items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold text-white">My Wishlist</h1>
          <p className="text-gray-200 mt-2 text-center">
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1 ? "item" : "items"} saved
          </p>
        </div>

        {/* Bulk Action */}
        <div>
          {wishlistItems.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4 ">
              <select
                value={sortBy}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white bg-black"
                onChange={(e) => setSortBy(e.target.value as "date-added" | "price-low-high" | "price-high-low" | "name" | "rating")}
              >
                <option value="date-added">Date Added</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="name">Name</option>
                <option value="rating">Rating</option>
              </select>

            {
              selectedItems && selectedItems.size > 0 && (
              <div className="flex justify-center items-center gap-2">
              <div>
                <button onClick={handleMoveAllItems} className="bg-indigo-500 text-white px-4 py-2 rounded-2xl hover:bg-indigo-400 cursor-pointer">Move {wishlistItems.length} items to Cart</button>
              </div>
              <div>
                <button onClick={handleAllClear} className="bg-red-500 text-white px-4 py-2 rounded-2xl hover:bg-indigo-400 cursor-pointer">Remove {wishlistItems.length} items from Cart</button>
              </div>
              </div>
              )
            }
            </div>
          )}
        </div>
      </div>

      {/* Select All */}
      {wishlistItems.length > 0 && (
        <div className="flex justify-start items-center space-x-2 mb-2">
          <input
            type="checkbox"
            checked={
              wishlistItems.length === selectedItems.size &&
              wishlistItems.length > 0
            }
            onChange={selectAllItems}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label className="text-gray-200 ">Select all {wishlistItems.length} items</label>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-4">
        {sortedProducts.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            moveToCart={moveToCart}
            isWishList={false}
            handleAll={removeFromWishlist}
          />
        ))}
      </div>
    </div>
  );
};

export default WishList;
