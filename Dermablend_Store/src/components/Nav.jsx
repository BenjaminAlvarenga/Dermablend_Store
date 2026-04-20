import React from "react";

const Nav = () => {
  return (
    <nav className="bg-[#E2BA7C] text-white p-3 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* <div className="text-lg font-bold">Dermablend Store</div> */}
        <img style={{ width: '20%', height: 'auto' }} src="https://res.cloudinary.com/dzp4cts29/image/upload/v1776558097/dermablend_4k_e9cwdq.png" alt="" />
        <input className="bg-[#F5E6D3] text-[#333] placeholder:text-[#666] border border-[#ccc] pe-100" type="search" placeholder="  Search" aria-label=" Search" />
      </div>
    </nav>
  );
};

export default Nav;
