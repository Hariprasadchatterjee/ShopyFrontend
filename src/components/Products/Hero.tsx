import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { useState, useEffect } from 'react';

// 2. Import the color-thief hook
import { useColor } from 'color-thief-react';
// 2. Import Swiper's CSS
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// 3. Demo data for the slides
const slides = [
  {
    superTitle: "Best Deal  on shoes",
    title: "Showes Like Awosome.",
    subTitle: "UP to 80% OFF",
    image: "../../../public/Images/products/product_14.png", // Replace with your actual image path
    
  },
  {
    superTitle: "Best Deal  on shoes",
    title: "Showes Like Awosome.",
    subTitle: "UP to 80% OFF",
    image: "../../../public/showes.avif", // Replace with your actual image path
    
  },
  {
    superTitle: "Latest TWS Earbuds",
    title: "CRYSTAL CLEAR AUDIO.",
    subTitle: "Starting from ₹1,499",
    image: "../../../public/Images/bannesrs/banner_1.png", // Replace with your actual image path
    
  },
  {
    superTitle: "High-Performance Laptops",
    title: "WORK & PLAY.",
    subTitle: "Save up to 30%",
    image: "../../../public/Images/products/product_3.png", // Replace with your actual image path
    
  },
  {
    superTitle: "High-Performance Laptops",
    title: "WORK & PLAY.",
    subTitle: "Save up to 30%",
    image: "../../../public/Images/products/product_4.png", // Replace with your actual image path
    
  },
];

// New component to handle individual slide logic
function SlideContent({ slide }) {
  const [bgColor, setBgColor] = useState("");

  // Use the hook to get the dominant color from the image
  // `crossOrigin` is important for fetching images from other domains
  const { data: dominantColor } = useColor(slide.image, 'hex', { crossOrigin: 'anonymous' });

  // Update the background color state when the dominant color is found
  useEffect(() => {
    if (dominantColor) {
      setBgColor(dominantColor);
    }
  }, [dominantColor]);

  return (
    <div 
      className="text-white p-8 md:p-12 rounded-2xl transition-colors duration-500"
      style={{ backgroundColor: bgColor }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        <div className="text-center md:text-left">
          <p className="font-medium opacity-80">{slide.superTitle}</p>
          <h1 className="text-4xl lg:text-6xl font-extrabold my-3 tracking-tight">{slide.title}</h1>
          <p className="text-xl lg:text-2xl opacity-80">{slide.subTitle}</p>
        </div>
        <div className="flex justify-center items-center">
            {/* Using mix-blend-screen can create a nice effect on dark backgrounds */}
          <img src={slide.image} alt={slide.title} className="max-h-64 " />
        </div>
      </div>
    </div>
  );
}

export function HeroCarousel() {
  return (
    <div className="container mx-auto px-4 py-8 relative group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => `<span class="${className} w-6 h-1 rounded-full bg-white bg-opacity-50 transition-all duration-300"></span>`,
        }}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        className="rounded-2xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <SlideContent slide={slide} />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Custom Navigation Arrows */}
      <div className="swiper-button-prev-custom absolute top-1/2 left-0 -translate-y-1/2 z-10 p-2 bg-white bg-opacity-80 rounded-full cursor-pointer transition-opacity duration-300 opacity-0 group-hover:opacity-100 lg:left-4">
        <FiChevronLeft size={28} className="text-gray-800" />
      </div>
      <div className="swiper-button-next-custom absolute top-1/2 right-0 -translate-y-1/2 z-10 p-2 bg-white bg-opacity-80 rounded-full cursor-pointer transition-opacity duration-300 opacity-0 group-hover:opacity-100 lg:right-4">
        <FiChevronRight size={28} className="text-gray-800" />
      </div>
    </div>
  );
};

export default HeroCarousel;
