import logo from "../../../img/Dermablend_NAV.png";
import { FiSearch, FiShoppingCart, FiMenu } from "react-icons/fi";

const Navbar = ({ onMenuClick = () => {} }) => {
  return (
    <nav className="flex items-center justify-between gap-4 bg-[#D3AB80]/50 px-4 sm:px-8 lg:px-20 h-28 shrink-0">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Abrir menú"
        className="shrink-0 text-[#5c3d1e] hover:text-[#3a1e08] lg:hidden"
      >
        <FiMenu size={22} />
      </button>

      <img
        src={logo}
        alt="Dermablend Logo"
        className="h-8 sm:h-10 lg:h-13 w-auto object-contain shrink-0"
      />

      <div className="hidden min-w-0 flex-1 max-w-4xl sm:flex items-center gap-2 bg-white/60 border border-[#c9a97a] rounded-lg px-4 h-[38px]">
        <FiSearch className="text-[#a07850] shrink-0" size={15} />
        <input
          type="text"
          placeholder="Buscar..."
          className="bg-transparent outline-none min-w-0 flex-1 text-sm text-[#5c3d1e] placeholder-[#b09070]"
        />
      </div>

      <button
        type="button"
        aria-label="Buscar"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#c9a97a] bg-white/60 text-[#a07850] sm:hidden"
      >
        <FiSearch size={15} />
      </button>

      <div className="flex items-center gap-5 text-[#6b4c2a] shrink-0">
        <FiShoppingCart size={19} className="cursor-pointer hover:text-[#3a1e08] transition-colors" />
      </div>
    </nav>
  );
};

export default Navbar;