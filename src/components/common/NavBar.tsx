import { NavLink } from "react-router-dom";
import { MdExpandMore } from "react-icons/md";
import { CategoryDropdown } from "./CategoryDropdown";
import { useState } from "react";

const naVContent = [
  { name: "Home", link: "/", icon: "" },
  { name: "Product", link: "/allproducts", icon: "" },
  { name: "About", link: "/about", icon: "" },
  { name: "Contact", link: "/contact", icon: "" },
];

const Navbar = () => {
  const [moreOpen, setMoreOpen] = useState(false);
  return (
    <>
      <div className="w-full bg-slate-900 h-12 shadow-2xl">
        <div className="container mx-auto">
          <div className="grid grid-cols-[1fr_3fr] space-x-4 p-2">
            <div className="relative flex justify-start items-center gap-2">
              <CategoryDropdown />
              <h2 className="text-white font-bold tracking-wider text-md md:text-xl">
                Category
              </h2>
            </div>

            <nav>
              <ul className="hidden md:flex items-center justify-end space-x-4 ">
                {naVContent.map((item, index) => {
                  return (
                    <li
                      className="text-white font-mono text-md md:text-xl"
                      key={index}
                    >
                      <NavLink to={item.link}>{item.name}</NavLink>
                    </li>
                  );
                })}
              </ul>

              {/* Mobile navbar */}
              <ul className="md:hidden flex items-center justify-end p-2 gap-4 text-white font-bold">
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li
                  onClick={() => setMoreOpen(!moreOpen)}
                  className="flex items-center justify-center cursor-pointer relative"
                >
                  More
                  <MdExpandMore />
                  {moreOpen && (
                    <ul
                      className="absolute w-40 top-full right-0 bg-slate-900 border-2 border-slate-700 z-50 flex flex-col items-center justify-center    origin-top-right transition-all duration-500 ease-in-out
            transform opacity-100 scale-100 rounded-xl"
                    >
                      {naVContent.map((item, index) => (
                        <li
                          className="text-white font-serif text-md md:text-xl hover:bg-slate-400 w-full py-2 px-2 border-b-1"
                          key={index}
                        >
                          <NavLink to={item.link}>{item.name}</NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
