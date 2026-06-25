import logo from "../../../img/Dermablend_NAV.png";
import { FiSearch, FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-[#D3AB80]/50 px-20 h-28 shrink-0">
      <img src={logo} alt="Dermablend Logo" className="max-h-13 object-fix" />

      <div className="flex-1 max-w-4xl mx-8 flex items-center gap-2 bg-white/60 border border-[#c9a97a] rounded-lg px-4 h-[38px]">
        <FiSearch className="text-[#a07850] shrink-0" size={15} />
        <input
          type="text"
          placeholder="Buscar..."
          className="bg-transparent outline-none flex-1 text-sm text-[#5c3d1e] placeholder-[#b09070]"
        />
      </div>

      <div className="flex items-center gap-5 text-[#6b4c2a]">
        <FiShoppingCart size={19} className="cursor-pointer hover:text-[#3a1e08] transition-colors" />
      </div>
    </nav>
  );
};

export default Navbar;