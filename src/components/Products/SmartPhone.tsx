import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { MdAddShoppingCart, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { A11y, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import StarRating from "../common/StarRating";
import ProductCard from "../common/ProductCard";

// Demo data for the smartphone deals
const smartphones = [
  {
    id: 1,
    name: "AURA Pro",
    imageUrl: "../../../public/Images/products/product_1.png",
    originalPrice: 74999,
    price: 69999,
    discount: "Save 7%",
    rating: 3,
    reviews: 5,
    inStock: 0,
    category: "Electronics",
  },
  {
    id: 2,
    name: "PixelNova 8",
    imageUrl: "../../../public/Images/products/product_15.png",
    originalPrice: 59990,
    price: 52990,
    discount: "Flat ₹7000 Off",
    rating: 3,
    reviews: 5,
    inStock: 13,
    category: "Electronics",
  },
  {
    id: 3,
    name: "Galaxy Stellar",
    imageUrl: "../../../public/Images/products/product_14.png",
    originalPrice: 99999,
    price: 89999,
    discount: "10% Off",
    rating: 3,
    reviews: 5,
    inStock: 13,
    category: "Electronics",
  },
  {
    id: 4,
    name: "RedCore Fury",
    imageUrl: "../../../public/Images/products/product_1.png",
    originalPrice: 24999,
    price: 21999,
    discount: "Save ₹3000",
    rating: 3,
    reviews: 5,
    inStock: 13,
    category: "Electronics",
  },
];

export function SmartphoneDealsCarousel() {

    const moveToCart = (id)=>{
    console.log(id);
    
  }

    const AddedToWishList =(itemId)=>{
      console.log(
        "added in wishlist"
      );
      
  }
  return (
    <div className="container mx-auto py-4 px-4">
      <div className=" text-content flex justify-between items-center mb-8">
        <h2 className="relative text-xl md:text-3xl text-white font-bold  ">
          Top Sales On <span className="text-indigo-600 ">SmartPhones</span>
          <div className="absolute w-full h-1 bg-indigo-600 rounded-xl -bottom-2"></div>
        </h2>
        <div className="text-sm md:text-2xl text-white font-bold flex justify-center items-center gap-2">
          View All
          <MdKeyboardDoubleArrowRight />
        </div>
      </div>

      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1044: { slidesPerView: 4 },
        }}
        navigation
        pagination={{ clickable: true }}
        className="pb-10"
      >
        {smartphones.map((item, index) => (
          <SwiperSlide>
            <ProductCard moveToCart={moveToCart} key={item.id} item={item} isWishList={true} handleAll={AddedToWishList}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
