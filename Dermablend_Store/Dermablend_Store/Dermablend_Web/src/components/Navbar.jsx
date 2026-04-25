import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaSearch, FaUser, FaShoppingBag } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-derm-beige">
      
   
      <div className="bg-derm-brown text-derm-nude text-[9px] md:text-[10px] py-2 text-center tracking-[0.2em] uppercase px-4">
        Envío gratis en órdenes superiores a $75
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16 md:h-24">
          
     
          <div className="flex md:hidden flex-1">
            <button onClick={() => setIsOpen(true)} className="text-derm-brown">
              <FaBars className="w-6 h-6" />
            </button>
          </div>


          <div className="hidden md:flex flex-1 space-x-6 text-[10px] font-medium tracking-widest uppercase text-derm-brown/70">
            <Link to="/combos" className="hover:text-derm-brown">Combos</Link>
            <Link to="/cuerpo" className="hover:text-derm-brown">Cuerpo</Link>
            <Link to="/labios" className="hover:text-derm-brown">Labios</Link>
          </div>

          {/* Logo (CLICK → HOME) */}
          <Link to="/" className="flex-shrink-0 text-center flex-[2] md:flex-1">
            <h1 className="text-xl md:text-3xl font-serif tracking-tight text-derm-brown leading-none">
              DERMABLEND
            </h1>
            <span className="text-[8px] md:text-[10px] tracking-[0.4em] text-derm-gold block mt-1">
              PRO
            </span>
          </Link>

          
          <div className="flex items-center justify-end flex-1 space-x-3 md:space-x-6 text-derm-brown">
            
            <button className="hidden sm:block hover:text-derm-gold">
              <FaSearch className="w-5 h-5" />
            </button>

            <button className="hover:text-derm-gold">
              <FaUser className="w-5 h-5" />
            </button>

            <button className="relative hover:text-derm-gold">
              <FaShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 bg-derm-brown text-white text-[7px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                2
              </span>
            </button>

          </div>
        </div>
      </div>

     
      <div className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        
        <div className={`absolute left-0 top-0 h-full w-[80%] max-w-sm bg-derm-nude p-8 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          
          <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-derm-brown">
            <FaTimes className="w-6 h-6" />
          </button>
          
          <div className="mt-12 flex flex-col space-y-8 uppercase tracking-[0.2em] text-derm-brown font-medium">
            <Link to="/novedades" className="text-lg border-b border-derm-beige pb-2">
              Novedades
            </Link>
            <Link to="/rostro" className="text-lg border-b border-derm-beige pb-2">
              Rostro
            </Link>
            <Link to="/cuerpo" className="text-lg border-b border-derm-beige pb-2">
              Cuerpo
            </Link>
            <Link to="/blog" className="text-lg border-b border-derm-beige pb-2">
              Blog
            </Link>
            <Link to="/contacto" className="text-lg border-b border-derm-beige pb-2">
              Contacto
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;