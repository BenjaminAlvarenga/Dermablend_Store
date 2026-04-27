import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-derm-brown text-derm-nude pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Logo y descripción */}
          <div className="space-y-6 text-center sm:text-left">
            <div className="inline-block border-b border-derm-gold pb-2">
              <h2 className="text-2xl font-serif tracking-tighter uppercase">Dermablend</h2>
            </div>
            <p className="text-sm text-derm-beige/60 font-light leading-relaxed">
              Elevando tu rutina diaria con ciencia y naturaleza. Piel sana, belleza consciente.
            </p>
          </div>

          {/* Enlaces de Productos */}
          <div className="grid grid-cols-2 gap-4 sm:contents">
            <div className="space-y-4">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-derm-gold">Colecciones</h3>
              <ul className="text-xs space-y-3 font-light text-derm-beige/80 uppercase tracking-wider">
                <li><Link to="/rostro" className="hover:text-white transition-colors">Rostro</Link></li>
                <li><Link to="/cuerpo" className="hover:text-white transition-colors">Cuerpo</Link></li>
                <li><Link to="/solar" className="hover:text-white transition-colors">Solar</Link></li>
                <li><Link to="/combos" className="hover:text-white transition-colors">Combos</Link></li>
              </ul>
            </div>

            {/* Enlaces de Ayuda con link a Contacto */}
            <div className="space-y-4">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-derm-gold">Ayuda</h3>
              <ul className="text-xs space-y-3 font-light text-derm-beige/80 uppercase tracking-wider">
                <li><a href="#" className="hover:text-white transition-colors">Envíos</a></li>
                {/* Configuración para la página de contacto */}
                <li><Link to="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-6 pt-4 sm:pt-0">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-derm-gold text-center sm:text-left">
              Únete al club
            </h3>

            <div className="relative border-b border-white/20 pb-2">
              <input 
                type="email" 
                placeholder="EMAIL" 
                className="bg-transparent w-full text-xs focus:outline-none placeholder:text-derm-beige/40 pr-10 uppercase tracking-widest"
              />
              <button className="absolute right-0 bottom-2 text-derm-gold hover:text-white transition-colors">
                <FaArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex justify-center sm:justify-start space-x-5 opacity-70">
              <FaInstagram className="w-4 h-4 cursor-pointer hover:text-derm-gold" />
              <FaFacebook className="w-4 h-4 cursor-pointer hover:text-derm-gold" />
              <FaTwitter className="w-4 h-4 cursor-pointer hover:text-derm-gold" />
            </div>
          </div>
        </div>

        {/* Créditos */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-[9px] uppercase tracking-[0.3em] text-derm-beige/30 text-center">
            © 2026 Dermablend Pro. Crafted for your skin.
          </p>
          <div className="flex space-x-8 text-[9px] uppercase tracking-[0.2em] text-derm-beige/30">
            <a href="#" className="hover:text-derm-beige transition-colors">Privacidad</a>
            <a href="#" className="hover:text-derm-beige transition-colors">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;