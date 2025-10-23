import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchComponent = () => {
  const [searchItem, setSearchItem] = useState("");

  return (
    <form className="relative w-full ">
      <input
        onChange={(e) => setSearchItem(e.target.value)}
        type="text"
        placeholder="Search here"
        id=""
        value={searchItem}
        className="bg-slate-900 px-4 py-2 pl-12 pr-12 rounded-full focus:outline-none placeholder:text-white-700 w-full h-[3rem] border placeholder:text-xl text-xl focus:ring-2 focus:ring-indigo-500"
      />

      <button className="absolute left-4 top-[1rem]">
        <FaSearch size={20} />
      </button>
    </form>
  );
};

export default SearchComponent;
