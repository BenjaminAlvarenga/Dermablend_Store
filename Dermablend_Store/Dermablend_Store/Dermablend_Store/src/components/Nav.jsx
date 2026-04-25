import React from "react";
import { IoIosSearch } from "react-icons/io";

const Nav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-[88px] bg-[#E2BA7C] text-white shadow-md z-50 flex items-center">
      <div className="container mx-auto px-4 flex justify-between items-center gap-4">
        
        {/* Contenedor del Logo: Ajusta su tamaño en móviles y escritorio */}
        <div className="flex-shrink-0 w-32 md:w-48">
          <img 
            className="w-full h-auto" 
            src="https://res.cloudinary.com/dzp4cts29/image/upload/v1776558097/dermablend_4k_e9cwdq.png" 
            alt="Dermablend Logo" 
          />
        </div>
        {/* Barra de búsqueda: Se expande y encoge según el espacio disponible */}
        <div className="flex-grow max-w-2xl">
          <input 
            className="w-full bg-[#F5E6D3] text-[#333] placeholder:text-[#666] border border-[#ccc] py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#cfa366]" 
            type="search" 
            placeholder="Search" 
            aria-label="Search" 
          />
        </div>

        {/* Espacio para iconos o menú futuro (opcional, ayuda a equilibrar el diseño) */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="p-2 hover:bg-[#d4ac6e] rounded-full transition-colors">
            <span className="sr-only">Notificaciones</span>
            <IoIosSearch />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
