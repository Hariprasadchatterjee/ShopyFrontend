// src/components/ProductCarousel.tsx

// 1. Import Swiper components and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

// 2. Import Swiper's core styles and modules' styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Demo data for the carousel
const products = [
  { id: 1, name: "AURA Pro Smartphone", price: 69999, image: "../../../public/laptop.avif" },
  { id: 2, name: "ZenBook Laptop", price: 84990, image: "../../../public/headphone.avif" },
  { id: 3, name: "NoiseFree Headphones", price: 19999, image: "../../../public/phones.avif" },
  { id: 4, name: "Urban Runner Sneakers", price: 2499, image: "../../../public/showes.avif" },
];



export function ProductCarousel() {
  return (
    <div className="container mx-auto py-12 px-8 md:px-0">
      <div className=" text-content flex justify-between items-center mb-8">
      <h2 className="relative text-xl md:text-3xl text-white font-bold  ">Featured <span className='text-indigo-600 '>Products</span>
        <div className='absolute w-full h-1 bg-indigo-600 rounded-xl -bottom-2'></div>
      </h2>

      <div className="text-sm md:text-2xl text-white font-bold flex justify-center items-center gap-2">
        View All
        <MdKeyboardDoubleArrowRight />
        </div>
      </div>
      
      <Swiper
        // 3. Add the modules you want to use
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={30}
        
        // 4. Configure responsiveness using breakpoints
        slidesPerView={1}
        breakpoints={{
          // when window width is >= 640px
          640: {
            slidesPerView: 2,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 3,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 4,
          },
        }}
        
        // 5. Add navigation arrows and pagination dots
        navigation
        pagination={{ clickable: true }}
        className="pb-10" // Add padding-bottom for pagination dots
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            {/* This is your product card styled with Tailwind CSS */}
            <div className=" rounded-lg shadow-md overflow-x-hidden bg-white  group">
              <div className="relative hover:scale-100">
                <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
                <div className="absolute inset-0 hover:bg-black  opacity-0 group-hover:opacity-70 transition-all  flex items-center justify-center ">
                  <button className="bg-indigo-800 text-white px-4 py-2 rounded-lg cursor-pointer">
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="p-4 ">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-600 mt-1">₹{product.price.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}