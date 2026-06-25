import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiPackage,
  FiUsers,
  FiBox,
  FiUser,
  FiFolder,
  FiEdit2,
  FiSmile 
} from "react-icons/fi";

const links = [
  { to: "/home", label: "Homepage", icon: FiHome },
  { to: "/employees", label: "Employees", icon: FiUsers },
  { to: "/clients", label: "Clients", icon: FiSmile  },
  { to: "/products", label: "Productos", icon: FiBox },
  { to: "/orders", label: "Orders", icon: FiFolder },
  { to: "/reviews", label: "Reviews", icon: FiEdit2 },
  { to: "/perfil", label: "Perfil", icon: FiUser },
];

const Sidebar = () => {
  return (
    <aside className="w-50 bg-[#D3AB80]/50 flex flex-col pt-2 shrink-0">
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-3 px-11 py-3.5 text-sm transition-all duration-150 border-l-[3px] ` +
            (isActive
              ? "bg-white text-[#3a1e08] font-bold"
              : "text-[#5c3d1e] font-medium border-transparent hover:bg-white/30 hover:text-[#3a1e08]")
          }
        >
          <Icon size={16} className="shrink-0" />
          {label}
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;
