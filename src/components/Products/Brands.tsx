import { FiTruck, FiRefreshCw, FiHeadphones, FiShield } from "react-icons/fi";

// Demo data for brand logos
const brands = [
  {
    id: 1,
    name: "Hi tech",
    logoUrl:
      "../../../public/Images/bnrands/brand_1.webp",
  },
  {
    id: 2,
    name: "HP",
    logoUrl: "../../../public/Images/bnrands/brand_2.jpg",
  },
  {
    id: 3,
    name: "Apple",
    logoUrl:
      "../../../public/Images/bnrands/brand_3.png",
  },
  {
    id: 4,
    name: "A4Tech",
    logoUrl:
      "../../../public/Images/bnrands/brand_4.png",
  },
  {
    id: 5,
    name: "Hitachi",
    logoUrl:
      "../../../public/Images/bnrands/brand_5.png",
  },
  {
    id: 6,
    name: "Huawei",
    logoUrl:
      "../../../public/Images/bnrands/brand_6.png",
  },
  {
    id: 7,
    name: "Ikea",
    logoUrl:
      "../../../public/Images/bnrands/brand_7.png",
  },
  {
    id: 8,
    name: "Sony",
    logoUrl:
      "../../../public/Images/bnrands/brand_8.png",
  },
];

const features = [
  {
    icon: FiTruck,
    title: "Free Delivery",
    description: "Free shipping over $100",
  },
  {
    icon: FiRefreshCw,
    title: "Free Return",
    description: "Free shipping over $100",
  },
  {
    icon: FiHeadphones,
    title: "Customer Support",
    description: "Friendly 24/7 customer support",
  },
  {
    icon: FiShield,
    title: "Money Back Guarantee",
    description: "Quality checked by our team",
  },
];

export function BrandScroller() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 bg-slate-900 p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="relative text-xl md:text-3xl text-white font-bold  ">
            Our Popular <span className="text-indigo-600 ">Brands</span>
            <div className="absolute w-full h-1 bg-indigo-600 rounded-xl -bottom-2"></div>
          </h2>
          <a
            href="#"
            className="text-sm font-semibold text-indigo-600 hover:underline"
          >
            View all
          </a>
        </div>

        {/* Infinite Scroller */}
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] group">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
            {brands.map((brand) => (
              <li key={brand.id}>
                <img
                  src={brand.logoUrl}
                  alt={brand.name}
                  className="h-10 w-auto"
                />
              </li>
            ))}
          </ul>
          {/* This is the crucial part for the seamless loop */}
          <ul
            className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
            aria-hidden="true"
          >
            {brands.map((brand) => (
              <li  key={brand.id}>
                <img
                  src={brand.logoUrl}
                  alt={brand.name}
                  className="h-10 w-auto bg-white text-white"
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 pt-8 border-t">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4">
              <feature.icon className="text-white" size={36} />
              <div>
                <h3 className="font-semibold text-gray-500">{feature.title}</h3>
                <p className="text-sm text-white">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
