import { useState } from "react";

const mockWishlistItems = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 129.99,
    originalPrice: 159.99,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "Electronics",
    slug: "wireless-bluetooth-headphones",
    deliverStatus:"Delivered"
  },
  {
    id: 2,
    name: "Minimalist Watch",
    price: 89.99,
    originalPrice: 119.99,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    category: "Accessories",
    slug: "minimalist-watch",
    deliverStatus:"Delivered"
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    originalPrice: 39.99,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    category: "Clothing",
    slug: "organic-cotton-tshirt",
    deliverStatus:"Cancelled"
  },
  {
    id: 4,
    name: "Smart Fitness Tracker",
    price: 79.99,
    imageUrl: "https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?w=400&h=400&fit=crop",
    category: "Electronics",
    slug: "smart-fitness-tracker",
    deliverStatus:"Delivered"
  }
];

const OrderPage = () => {

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 text-white">
            <div className="lg:col-span-1 space-y-4 ">
              {/* For Desktop filter Section */}
              <div className="hidden lg:block">

              <h2>Filters</h2>
              <div className="flex flex-col gap-2">
                  <h3>ORDER STATUS</h3>
                  <label className="space-x-2" htmlFor="ontheway">
                  <input value="ontheway" className="accent-fuchsia-600" type="checkbox" name="ORstatus" id="ontheway" />
                  <span>On the way</span> 
                  </label>

                  <label className="space-x-2" htmlFor="Delivered">
                  <input value="Delivered" type="checkbox" name="ORstatus" id="Delivered" className="accent-fuchsia-600" />
                  <span>Delivered</span> 
                  </label>

                  <label className="space-x-2" htmlFor="Cancelled">
                  <input value="Cancelled" type="checkbox" name="ORstatus" id="Cancelled" className="accent-fuchsia-600" />
                  <span>Cancelled</span>                 
                  </label>

                  <label className="space-x-2" htmlFor="Returned">
                  <input value="Returned" type="checkbox" name="ORstatus" id="Returned" className="accent-fuchsia-600" />
                  <span>Returned</span>                 
                  </label>
              </div>

              

              <div className="flex flex-col gap-2">
                  <h3>ORDER TIME</h3>
                  <label className="space-x-2" htmlFor="Last">
                  <input value="Last" className="accent-fuchsia-600" type="checkbox" name="ORstatus" id="Last" />
                  <span>Last 30 days</span> 
                  </label>


                  <label className="space-x-2" htmlFor="Older">
                  <input value="Older" type="checkbox" name="Older" id="Older" className="accent-fuchsia-600" />
                  <span>Older</span>
                  
                  </label>
              </div>
              </div>

              {/* For mobile Filter Section */}
              
            </div>
            <div className="lg:col-span-3 ">
              {/* For order items Section */}

              {/* Search Bar */}
              <div className=" flex flex-col lg:flex-row justify-center items-center mb-2 ">

                <div className="flex justify-center items-center w-full">
              <input className="flex-3 border pl-6 pr-4 py-2 rounded-l-4xl focus:outline-none focus:ring-2 focus:ring-orange-500" type="search" name="" id="" placeholder="Search Your Order here ..."/>

              <button className=" lg:py-2 py-3 rounded-r-4xl border px-2 bg-orange-500 lg:font-medium text-sm">Search Order</button>
                </div>

              <div className="flex justify-center items-center gap-4 lg:hidden my-4 ">
                 
                  <div >
                    <select className="px-4 py-2 border border-gray-300 rounded" name="" id="">
                      <option className="text-blue-500" >ORDER STATUS</option>
                      <option className="text-blue-500" value="ontheway">On The Way</option>
                      <option className="text-blue-500" value="ontheway">Delivered</option>
                      <option className="text-blue-500" value="ontheway">Cancelled</option>
                      <option className="text-blue-500" value="ontheway">Returned</option>
                    </select>
                  </div>
                  <div >
                    <select className="px-4 py-2 border border-gray-300 rounded" name="" id="">
                      <option className="text-blue-500" >ORDER TIME</option>
                      <option className="text-blue-500" value="ontheway">Last 30 days</option>
                      <option className="text-blue-500" value="ontheway">Older</option>
                    </select>
                  </div>
                
              </div>

              </div>

            {
              mockWishlistItems.map( (item)=>(

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 border border-white py-4 px-8 mb-2">
                <figure>
                  <img src={item.imageUrl} alt="" className="w-[50%]"/>
                </figure>
                <div className="description">
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                </div>
                <div>
                  ₹{item.price}
                </div>
                <div className="flex flex-col gap-2 items-center justify-start">
                  <p>{item.deliverStatus} on Sep 23</p>
                  <p>
                  {
                  item.deliverStatus === "Delivered" ? "Your Item has been delivered" : ""
                  }
                  </p>
                  <p>Rate & Review Product</p>
                </div>
              </div>
              ))
            }

            </div>
        </div>
    </div>
  )
}

export default OrderPage