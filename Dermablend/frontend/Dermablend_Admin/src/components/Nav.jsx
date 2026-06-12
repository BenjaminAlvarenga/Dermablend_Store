// Nav.jsx define la barra de navegación visible en las páginas autenticadas.
import { Link } from "react-router-dom";
import logo from "../../img/Dermablend_NAV.png";

const Nav = () => {
  return (
    <nav className="flex bg-[#E2BA7C]/65 text-white shadow-md">
      <div className="container mx-auto px-2 py-8 flex justify-between items-center">
        <div className="flex-shrink-0 w-40 h-10">
          <img
            src={logo}
            alt="Dermablend Logo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Se usa una lista horizontal para los enlaces de navegación. */}
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/home"
              className="px-4 py-2 rounded-xl text-white transition duration-200 ease-in-out transform hover:scale-105 hover:bg-white/20 hover:text-white hover:font-"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="px-4 py-2 rounded-xl text-white transition duration-200 ease-in-out transform hover:scale-105 hover:bg-white/20 hover:text-white"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/clients"
              className="px-4 py-2 rounded-xl text-white transition duration-200 ease-in-out transform hover:scale-105 hover:bg-white/20 hover:text-white"
            >
              Clients
            </Link>
          </li>
          <li>
            <Link
              to="/employees"
              className="px-4 py-2 rounded-xl text-white transition duration-200 ease-in-out transform hover:scale-105 hover:bg-white/20 hover:text-white"
            >
              Employees
            </Link>
          </li>
          <li>
            <Link
              to="/orders"
              className="px-4 py-2 rounded-xl text-white transition duration-200 ease-in-out transform hover:scale-105 hover:bg-white/20 hover:text-white"
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              to="/reviews"
              className="px-4 py-2 rounded-xl text-white transition duration-200 ease-in-out transform hover:scale-105 hover:bg-white/20 hover:text-white"
            >
              Reviews
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
