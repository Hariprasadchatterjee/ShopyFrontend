import { useState } from "react";
import { MdMenuBook } from "react-icons/md";
import { FiChevronRight } from 'react-icons/fi';
// ... import other icons as shown in the data structure above

// (Paste the categoryData array from above here)
// At the top of your component file
import { FiGift, FiHome, FiCpu, FiTrello, FiMusic, FiShoppingBag, FiAward, FiTool } from 'react-icons/fi';

const categoryData = [
  {
    id: "collectibles-art",
    name: "Collectibles & Art",
    icon: FiGift,
    subCategories: [
      { id: "ca-collectibles", name: "Collectibles", href: "#" },
      { id: "ca-antiques", name: "Antiques", href: "#" },
      { id: "ca-sports", name: "Sports Memorabilia", href: "#" },
      { id: "ca-art", name: "Art", href: "#" },
    ],
  },
  {
    id: "home-garden",
    name: "Home & Garden",
    icon: FiHome,
    subCategories: [
      { id: "hg-yard", name: "Yard, Garden & Outdoor", href: "#" },
      { id: "hg-crafts", name: "Crafts", href: "#" },
      { id: "hg-improvement", name: "Home Improvement", href: "#" },
      { id: "hg-pet", name: "Pet Supplies", href: "#" },
    ],
  },
  {
    id: "sporting-goods",
    name: "Sporting Goods",
    icon: FiAward,
    subCategories: [
      { id: "sg-outdoor", name: "Outdoor Sports", href: "#" },
      { id: "sg-team", name: "Team Sports", href: "#" },
      { id: "sg-exercise", name: "Exercise & Fitness", href: "#" },
      { id: "sg-golf", name: "Golf", href: "#" },
    ],
  },
  {
    id: "electronics",
    name: "Electronics",
    icon: FiCpu,
    subCategories: [
      { id: "e-computers", name: "Computers & Tablets", href: "#" },
      { id: "e-camera", name: "Camera & Photo", href: "#" },
      { id: "e-tv", name: "TV, Audio & Surveillance", href: "#" },
      { id: "e-cell", name: "Cell Phone & Accessories", href: "#" },
    ],
  },
    {
    id: "auto-parts",
    name: "Auto Parts & Accessories",
    icon: FiTool,
    subCategories: [
      { id: "ap-gps", name: "GPS & Security Devices", href: "#" },
      { id: "ap-radar", name: "Radar & Laser Detectors", href: "#" },
      { id: "ap-care", name: "Care & Detailing", href: "#" },
      { id: "ap-scooter", name: "Scooter Parts & Accessories", href: "#" },
    ],
  },
  {
    id: "musical-instruments",
    name: "Musical Instruments & Gear",
    icon: FiMusic,
    subCategories: [
      { id: "mi-guitar", name: "Guitar", href: "#" },
      { id: "mi-pro-audio", name: "Pro Audio Equipment", href: "#" },
      { id: "mi-string", name: "String", href: "#" },
      { id: "mi-stage", name: "Stage Lighting & Effects", href: "#" },
    ],
  },
];

export function CategoryDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 text-white">
        <MdMenuBook className="text-2xl" />
        
      </button>

      {isOpen && (
        <div
          className="
            absolute top-full left-0 mt-4 w-screen max-w-7xl 
            bg-slate-900 text-white rounded-lg shadow-xl border border-slate-700 z-50
            origin-top-left transition-all duration-300 ease-in-out p-6
          "
        >
          {/* Upward-pointing triangle */}
          <span className="absolute h-4 w-4 [clip-path:polygon(50%_0,_0_100%,_100%_100%)] bg-slate-900 -top-4 left-4 border-t border-l border-slate-700"></span>

          {/* Main Grid for Categories */}
          <ul className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-x-8 gap-y-10
          ">
            {categoryData.map((category) => {
              // A good pattern for using icon components from data
              const Icon = category.icon; 
              return (
                <li key={category.id}>
                  {/* Category Heading */}
                  <div className="flex items-center gap-3 border-b border-slate-700 pb-3">
                    <Icon className="text-indigo-400" size={24} />
                    <h2 className="font-bold text-lg text-gray-100">{category.name}</h2>
                  </div>

                  {/* Sub-Category List */}
                  <ul className="mt-4 space-y-2">
                    {category.subCategories.map((item) => (
                      <li key={item.id}>
                        <a href={item.href} className="text-gray-400 hover:text-white transition-colors duration-200">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>

          {/* "See all" link at the bottom */}
          <div className="border-t border-slate-700 mt-8 pt-4 flex justify-center">
             <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                See all Categories
                <FiChevronRight />
             </a>
          </div>
        </div>
      )}
    </div>
  );
}