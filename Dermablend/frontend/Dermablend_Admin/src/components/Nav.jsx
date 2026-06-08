// Nav.jsx define la barra de navegación visible en las páginas autenticadas.
import { Link } from 'react-router' // Link permite navegación interna sin recargar la página.

const Nav = () => {
  return (
    <nav className="flex bg-[#E2BA7C]/65 text-white shadow-md">
      <div className="container mx-auto px-2 py-8 flex justify-between items-center">
        <div className="flex-shrink-0 w-40 h-10">
          <img src=".././img/Dermablend_NAV.png" alt="Dermablend Logo" className="w-full h-full object-cover" />
        </div>

        {/* Se usa una lista horizontal para los enlaces de navegación. */}
        <ul className="flex space-x-4">
          <li>
            <Link to="/home" className="hover:text-gray-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-gray-200">
              Products
            </Link>
          </li>
          <li>
            <Link to="/inventory" className="hover:text-gray-200">
            Inventario
            </Link>
          </li>
          <li>
            <Link to="/clients" className="hover:text-gray-200">
            Clients
            </Link>
          </li>
          <li>
            <Link to="/employees" className="hover:text-gray-200">
            Employees
            </Link>
          </li>
          <li>
            <Link to="/orders" className="hover:text-gray-200">
            Orders
            </Link>
          </li>
          <li>
            <Link to="/reviews" className="hover:text-gray-200">
            Reviews
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav
