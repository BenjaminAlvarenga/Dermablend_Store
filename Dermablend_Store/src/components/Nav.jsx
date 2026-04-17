import React from "react";

const Nav = () => {
  return (
    <nav className="bg-[#E2BA7C] text-white p-8 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* <div className="text-lg font-bold">Dermablend Store</div> */}
        <img src="" alt="" />
        <ul className="flex items-center space-x-6">
          <li>
            <a href="/" className="hover:text-gray-200">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-gray-200">
              About
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:text-gray-200">
              Contact
            </a>
          </li>
        </ul>
        <input className="bg-[#F5E6D3] text-[#333] placeholder:text-[#666] border border-[#ccc] items-center pe-70" type="search" placeholder="Search" aria-label=" Search" />
      </div>
    </nav>
  );
};

export default Nav;
