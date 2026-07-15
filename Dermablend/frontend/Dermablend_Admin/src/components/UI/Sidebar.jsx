import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiPackage,
  FiUsers,
  FiBox,
  FiUser,
  FiFolder,
  FiEdit2,
  FiSmile,
  FiLogOut
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

const Sidebar = ({ open = false, onClose = () => {} }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("fakestore_token");
    localStorage.removeItem("fakestore_user");
    localStorage.removeItem("fakestore_email");
    sessionStorage.removeItem("fakestore_token");
    sessionStorage.removeItem("fakestore_user");
    sessionStorage.removeItem("fakestore_email");
    onClose();
    navigate("/");
  };

  return (
    <>
      {open && (
        <div
          className="fixed left-56 top-28 bottom-0 right-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={
          "fixed left-0 top-28 bottom-0 z-40 w-56 bg-[#e8d2ba] flex flex-col pt-2 overflow-y-auto shadow-xl transition-transform duration-200 ease-in-out " +
          "lg:static lg:z-auto lg:h-full lg:w-56 lg:shrink-0 lg:translate-x-0 lg:bg-[#e8d2ba] lg:shadow-none " +
          (open ? "translate-x-0" : "-translate-x-full")
        }
      >
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
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

        <button
          type="button"
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 px-11 py-3.5 text-sm font-medium text-[#5c3d1e] border-l-[3px] border-transparent transition-all duration-150 hover:bg-white/30 hover:text-[#3a1e08]"
        >
          <FiLogOut size={16} className="shrink-0" />
          Cerrar sesión
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
