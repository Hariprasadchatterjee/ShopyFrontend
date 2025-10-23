import { FaCartPlus } from "react-icons/fa";
import SearchComponent from "./SearchComponent";
import { ProfileDropdown } from "./ProfileDropdown";
import { NavLink } from "react-router-dom";


const TopBar = () => {
  return (
    
    <>
      <header className="container mx-auto  ">
        <div
          className="
        px-4 
        py-4
        text-white grid 
        grid-cols-2         
        gap-x-6 gap-y-4  
        items-center
        w-full               
        md:grid-cols-[1fr_2fr_1fr] "
        >
          <figure className="logo flex gap-2  items-center">
            <img
              src="https://prium.github.io/phoenix/v1.22.0/assets/img/icons/logo.png"
              alt="logo png"
              className="w-10"
            />
            <span className="font-semibold tracking-wide text-xl">Phoenix</span>
          </figure>

          <div className=" row-start-2 col-span-2 md:row-start-1 md:col-span-1 md:col-start-2">
            <SearchComponent/>
          </div>

          <div className="flex justify-end items-center gap-5 cursor-pointer">
            <div className="relative ">
              <span className="absolute h-4 w-4 bg-red-500 rounded-full flex items-center justify-center top-[0rem] right-[-0.5rem]">
                5
              </span>
              <NavLink to="/cart">
              <FaCartPlus size={30} />
              </NavLink>
            </div>

            <div >
              
             <ProfileDropdown/>
            </div>
          </div>
        </div>
      </header>
     
    </>
  
  )
}

export default TopBar